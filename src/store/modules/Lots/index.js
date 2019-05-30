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
            console.dir(state.lots);
            return state.lots.find(lot => lot.id === id);
        },
        getLotIndex: state => id => {
            return state.lots.findIndex(lot => lot.id === id);
        },
        lotsPreview(state) {
            return state.lotsShortList;
        }
    },
    mutations: {
        updateLots(state, {index, lot}) {
            if (index === -1) {
                state.lots.push(lot);
            } else {
                state.lots.splice(index, 1, lot);
            }
        },
        initLotsPreview(state, list) {
            state.lotsShortList = list;
            console.log(state.lotsShortList);
        }
    },
    actions: {
        changeSpecificLot(context, lot) {
            const index = context.getters.getLotIndex(lot.id);
            context.commit('updateLots', {index, lot});
        },
        getSpecificLot(context, id) {
            const database = firebase.database();
            const url = urlsMapping.lotsDetailsUrl(id);
            const details = database.ref(url);
            /**
             * add listener to update lot data
             */
            details.on('value', function (data) {
                const lot = data.val();
                if (data.exists()) {
                    context.dispatch('changeSpecificLot', lot);
                }
            });

        },
        getLotsPreview(context) {
            const database = firebase.database();
            const url = urlsMapping.getLotsPreviewUrl();
            const preview = database.ref(url);
            preview.once('value', function (data) {
                console.log('Get preview from server');
                const previewObj = data.val();
                context.commit('initLotsPreview', previewObj);
            })
        },
        async createNewLotPreview(context, lot) {
            const url = urlsMapping.postLotsPreviewUrl(lot.id);
            const database = firebase.database();
            const lotPreview = await context.dispatch('getLotPreviewInfo', lot);
            return database.ref(url).set(lotPreview);
        },
        createNewLotDetails(context, lot) {
            const url = urlsMapping.lotsDetailsUrl(lot.id);
            const database = firebase.database();
            return database.ref(url).set(lot);
        },
        /**
         * because of serverless arcticecture I have to make 2 requests -
         * 1. create lot in lots ShortList (for preview)
         * 1. create lot in lots ShortList (for preview)
         * 2. create lot in lots Details list with details info
         */
        async sendLotData(context, lot) {
            try {
                return await Promise.all([
                    context.dispatch('createNewLotDetails', lot),
                    context.dispatch('createNewLotPreview', lot)
                ]);
                console.log('All is fine');
            } catch (e) {
                console.log('server failed');
                console.warn(e);
                throw new Error('Failed to send lot data');
            }
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
        },
        async makeRate(context, {rate, id, lot}) {
            const msg = 'Saving your rate';
            context.commit('toggleIndicator', msg);
            try {
                const url = urlsMapping.sendRateUrl(id);
                const database = firebase.database();
                database.ref(url).push(rate);
                /**
                 * after saving current rate i have to update current price in preview and details lists
                 */
                await context.dispatch('sendLotData', lot);

            } catch (e) {
                console.warn(e);
                const info = {
                    title: 'Failed to save your rate',
                    info: 'Try to reload page and make your rate again'
                };
                context.commit('toggleModalWindow', info);
            }
            context.commit('toggleIndicator', msg);
        }
    }
}
