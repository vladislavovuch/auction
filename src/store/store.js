import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

Vue.use(Vuex);

import LoadingIndicator from './modules/LoadingIndicator'

import urlsMapping from './UrlsMapping'

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    modules: [
        LoadingIndicator,
    ],
    state: {
        BASE_URL: 'http://localhost:3000',
        lotsShortList: [
        ],
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
        getLot(context, payload) {
            window.fetch(urlsMapping.getLotsUrl(payload))
                .then(response => {
                    console.log(response);
                    if (response.status !== 200) {
                        throw new Error();
                    }
                    return response.json();
                })
                .then(response => {
                    console.log(response);
                    // if get empty array from server
                    if (response.length === 0) {
                        throw new Error('There isnt such lot on server');
                    }
                    context.commit('addLot', response[0]);
                })
                .catch(err => {
                    console.warn(err);

                })
        },
        async createNewLotPreview(context, lot) {
            const shortListUrl = urlsMapping.lotsPreviewUrl();

            const lotPreview = await context.dispatch('getLotPreviewInfo', lot);

            return axios.post(shortListUrl, lotPreview)
                .then(response => {
                    console.log(response);
                    if (response.status !== 201) {
                        throw new Error(response.statusText);
                    }
                })
                .catch(err => {
                    console.warn(err);
                    throw new Error('server error');
                })
        },
        createNewLotDetails(context, lot) {
            const url = urlsMapping.lotsDetailsUrl();
            const options = {
                'Access-Control-Allow-Origin': '*'
            };
            return axios.post(url, lot, options)
                .then(response => {
                    console.log(response);
                    if (response.status !== 201) {
                        throw new Error(response.statusText);
                    }
                })
                .catch(err => {
                    console.warn(err);
                    throw new Error('server error');
                });
        },
        /**
         * because of serverless arcticecture I have to make 2 requests -
         * 1. create lot in lots ShortList (for preview)
         * 2. create lot in lots Details list with details info
         */
        async createNewLot(context, lot) {
            this.commit('toggleIndicator', 'We process the entered data');
            try {
                await Promise.all([context.dispatch('createNewLotDetails', lot), context.dispatch('createNewLotPreview', lot)]);
            } catch (e) {
                //show msg that server failed
                console.log('server failed');
            }
            // stop indicator
            this.commit('toggleIndicator');
            console.log('After all requests');



        },
        getLotPreviewInfo(context, lot) {
            const preview = {
                id: lot.id,
                img: lot.imagesList[0],
                title: lot.title,
                finishDate: lot.finishDate,
                price: lot.price,
                author: lot.author,
            }
            return preview;
        }
    }
})
