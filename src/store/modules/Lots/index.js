import firebase from 'firebase/app'
import urlsMapping from "../../UrlsMapping";
import axios from "axios";

export default {
    state: {
        BASE_URL: 'http://localhost:3000',
        lotsShortList: [],
        lots: []
    },
    getters: {
        getLot: state => id => {
            return state.lots.find(lot => lot.id === id);
        },
    },
    mutations: {
        addLot(state, payload) {
            state.lots.push(payload);
        }
    },
    actions: {
        getSpecificLot(context, payload) {
            // window.fetch(urlsMapping.getLotsUrl(payload))
            //     .then(response => {
            //         console.log(response);
            //         if (response.status !== 200) {
            //             throw new Error();
            //         }
            //         return response.json();
            //     })
            //     .then(response => {
            //         console.log(response);
            //         // if get empty array from server
            //         if (response.length === 0) {
            //             throw new Error('There isnt such lot on server');
            //         }
            //         context.commit('addLot', response[0]);
            //     })
            //     .catch(err => {
            //         console.warn(err);
            //
            //     })

            // for details - watch on particular lot`s details
            // for preview - watch on all lots
            const database = firebase.database();
            const details = database.ref('LotsDetails/');
            details.on('child_changed', function (data) {
                console.dir(data);
                console.dir(data.val());
                // setCommentValues(postElement, data.key, data.val().text, data.val().author);
            });

        },
        getLotsPreview() {
            const database = firebase.database();
            const preview = database.ref('LotsPreview');
            preview.once('value', function (data) {
                console.dir(data);
                console.dir(data.val());
            })
        },
        async createNewLotPreview(context, lot) {
            // const shortListUrl = urlsMapping.lotsPreviewUrl();
            //
            // const lotPreview = await context.dispatch('getLotPreviewInfo', lot);
            //
            // return axios.post(shortListUrl, lotPreview)
            //     .then(response => {
            //         console.log(response);
            //         if (response.status >= 200 && response.status < 300) {
            //             throw new Error(response.statusText);
            //         }
            //     })
            //     .catch(err => {
            //         console.warn(err);
            //         throw new Error('server error');
            //     })
            const database = firebase.database();
            return database.ref('LotsPreview/' + lot.id).set(lot);
        },
        async createNewLotDetails(context, lot) {
            const url = urlsMapping.lotsDetailsUrl();
            // const options = {
            //     'Access-Control-Allow-Origin': '*'
            // };
            // return axios.post(url, lot)
            //     .then(response => {
            //         console.log(response);
            //         if (response.status >= 200 && response.status < 300) {
            //             throw new Error(response.statusText);
            //         }
            //     })
            //     .catch(err => {
            //         console.warn(err);
            //         throw new Error('server error');
            //     });
            const database = firebase.database();
            return database.ref('LotsDetails/' + lot.id).set(lot);
        },
        /**
         * because of serverless arcticecture I have to make 2 requests -
         * 1. create lot in lots ShortList (for preview)
         * 2. create lot in lots Details list with details info
         */
        async createNewLot(context, lot) {
            this.commit('toggleIndicator', 'We process the entered data');
            try {
                await Promise.all([
                    context.dispatch('createNewLotDetails', lot),
                    context.dispatch('createNewLotPreview', lot)
                ]);
                console.log('if all is fine');
                context.commit('toggleModalWindow', {title: 'Lot successfuly publishment', info: ''});
            } catch (e) {
                console.log('server failed');
                context.commit('toggleModalWindow', {});
            }
            // stop indicator
            this.commit('toggleIndicator');
        },
        getLotPreviewInfo(context, lot) {
            const preview = {
                id: lot.id,
                img: lot.imagesList[0],
                title: lot.title,
                finishDate: lot.finishDate,
                price: lot.price,
                author: lot.author,
            };
            return preview;
        }
    }
}
