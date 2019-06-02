import firebase from 'firebase/app/'
import urlsMapping from "../../UrlsMapping";

export default {
    state: {
        articles: null,
        categories: [],
    },
    getters: {
        getArticles(state) {
            return state.articles;
        }
    },
    mutations: {
        setArticles(state, arr) {
            state.articles = arr;
        }
    },
    actions: {
        getArticles(context) {
            const db = firebase.firestore();

            db.collection("Articles").get()
                .then(querySnapshot => {
                    const arr = [];
                    querySnapshot.forEach(function (doc) {
                        arr.push(doc.data());
                    });
                    console.log(arr);
                    context.commit('setArticles', arr);
                })
                .catch(err => {
                    console.warn(err);
                });
        },
        filterByCategories(context, categories) {
            try {
                const db = firebase.firestore();
                const promisesArr = [];
                for (let i = 0; i < categories.length; i++) {
                    promisesArr.push(db.collection("Articles").where('category', '==', categories[i]).get());
                }
                Promise.all(promisesArr)
                    .then(snapshots => {
                        const tempArr = [];
                        snapshots.forEach(querySnapshot => {
                            querySnapshot.forEach(function (doc) {
                                tempArr.push(doc.data());
                            });
                        });
                        context.commit('setArticles', tempArr);
                    })
                    .catch(err => {
                        throw new Error('Promise.all failed')
                    })
            } catch (err) {
                console.warn(err);
                context.commit('toggleModalWindow', {
                    title: "Failed to filter data",
                })
            }

        }
    }
}
