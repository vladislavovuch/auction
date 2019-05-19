import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import urlsMapping from './UrlsMapping'

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state: {
        BASE_URL: 'http://localhost:3000',
        lotsShortList: [
            {
                id: '1',
                img: {
                    url: 'static/brandson.jpg',
                    alt: 'Lot`s image - ancient coin'
                },
                description: {
                    title: 'Lot number 1',
                    finishDate: '20/10/2019 20:00',
                    price: 11,
                    author: 'Jon Show',
                }
            },
            {
                id: '2',
                img: {
                    url: 'static/brandson.jpg',
                    alt: 'Lot`s image - ancient coin'
                },
                description: {
                    title: 'Lot number 1',
                    finishDate: '20/10/2019 20:00',
                    price: 11,
                    author: 'Jon Show',
                }
            },
            {
                id: '3',
                img: {
                    url: 'static/brandson.jpg',
                    alt: 'Lot`s image - ancient coin'
                },
                description: {
                    title: 'Lot number 1',
                    finishDate: '20/10/2019 20:00',
                    price: 11,
                    author: 'Jon Show',
                }
            },
            {
                id: '4',
                img: {
                    url: 'static/true_story.jpg',
                    alt: 'Lot`s image - ancient coin'
                },
                description: {
                    title: 'Lot number 1',
                    finishDate: '20/10/2019 20:00',
                    price: 11,
                    author: 'Jon Show',
                }

            },
            {
                id: '5',
                img: {
                    url: 'static/stages.jpg',
                    alt: 'Lot`s image - ancient coin'
                },
                description: {
                    title: 'Lot number 1',
                    finishDate: '20/10/2019 20:00',
                    price: 11,
                    author: 'Jon Show',
                }

            },
            {
                id: '6',
                img: {
                    url: 'static/stages.jpg',
                    alt: 'Lot`s image - ancient coin'
                },
                description: {
                    title: 'Lot number 1',
                    finishDate: '20/10/2019 20:00',
                    price: 11,
                    author: 'Jon Show',
                }

            },
            {
                id: '7',
                img: {
                    url: 'static/true_story.jpg',
                    alt: 'Lot`s image - ancient coin'
                },
                description: {
                    title: 'Lot number 1',
                    finishDate: '20/10/2019 20:00',
                    price: 11,
                    author: 'Jon Show',
                }

            },
            {
                id: '8',
                img: {
                    url: 'static/true_story.jpg',
                    alt: 'Lot`s image - ancient coin'
                },
                description: {
                    title: 'Lot number 1',
                    finishDate: '20/10/2019 20:00',
                    price: 11,
                    author: 'Jon Show',
                }

            },
            {
                id: '9',
                img: {
                    url: 'static/stages.jpg',
                    alt: 'Lot`s image - ancient coin'
                },
                description: {
                    title: 'Lot number 1',
                    finishDate: '20/10/2019 20:00',
                    price: 11,
                    author: 'Jon Show',
                }
            },
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
                    context.commit('addLot', response[0])
                })
                .catch(err => {
                    console.warn(err);

                })
        }
    }
})
