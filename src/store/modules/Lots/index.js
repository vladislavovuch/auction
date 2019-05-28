import firebase from 'firebase/app'
import urlsMapping from "../../UrlsMapping";
import axios from "axios";
import router from '../../../router'

export default {
    state: {
        BASE_URL: 'http://localhost:3000',
        lotsShortList: null,
        lots: []
    },
    getters: {
        getLot: state => id => {
            return state.lots.find(lot => lot.id === id);
        },
        lotsPreview(state) {
            return state.lotsShortList;
        }
    },
    mutations: {
        addLot(state, payload) {
            state.lots.push(payload);
        },
        initLotsPreview(state, list) {
            state.lotsShortList = list;
            console.log(state.lotsShortList);
        }
    },
    actions: {
        getSpecificLot(context, id) {
            // for details - watch on particular lot`s details
            // for preview - watch on all lots
            const database = firebase.database();
            const url = urlsMapping.lotsDetailsUrl(id);
            const details = database.ref(url);
            details.on('value', function (data) {
                console.dir(data);
                const lot = data.val();
                console.dir(lot);
                context.commit('addLot', lot);
            });

        },
        getLotsPreview(context) {
            const database = firebase.database();
            const url = urlsMapping.lotsPreviewUrl();
            const preview = database.ref(url);
            preview.once('value', function (data) {
                console.dir(data);
                console.dir(data.val());
                const previewObj = data.val();
                context.commit('initLotsPreview', previewObj);
            })
        },
        async createNewLotPreview(context, lot) {
            const url = urlsMapping.lotsPreviewUrl(lot.id);
            const database = firebase.database();
            const lotPreview = await context.dispatch('getLotPreviewInfo', lot);
            return database.ref(url).set(lotPreview);
        },
        async createNewLotDetails(context, lot) {
            const url = urlsMapping.lotsDetailsUrl(lot.id);
            const database = firebase.database();
            return database.ref(url).set(lot);
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
                // context.commit('toggleModalWindow', {title: 'Lot successfuly publishment', info: ''});
                router.push('/successful-publishment');
            } catch (e) {
                console.log('server failed');
                context.commit('toggleModalWindow', {});
            }
            // stop indicator
            context.commit('toggleIndicator');
        },
        getLotPreviewInfo(context, lot) {
            const preview = {
                id: lot.id,
                img: lot.imagesList[0],
                title: lot.title,
                finishDate: lot.finishDate,
                price: lot.price,
                author: lot.author.name,
            };
            return preview;
        }
    }
}
