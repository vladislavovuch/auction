import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

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
        lots: [
            {
                id: '1',
                title: 'Lot number 1',
                img: {
                    url: 'static/true_story.jpg',
                    alt: 'lot number 1',
                },
                description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.\n' +
                    '                Architecto debitis dicta excepturi explicabo iusto nulla quo\n' +
                    '                rerum veritatis voluptas. Blanditiis deserunt doloremque,\n' +
                    '                fuga fugiat inventore modi sint! Culpa delectus doloribus et explicabo\n' +
                    '                neque nisi quaerat repudiandae veritatis! Laboriosam, magnam quae!\n' +
                    '                Lorem ipsum dolor sit amet, consectetur adipisicing elit.\n' +
                    '                Adipisci cum eos quibusdam quod sapiente vel? Consequuntur in quae quidem vel.\n' +
                    '            ',
                price: 11,
                min_rate: 10,

            }
        ]
    },
    getters: {
        getLot(state, id) {
            state
        }
    },
    mutations: {},
    actions: {
        getLot(context, payload) {
            window.fetch()
        }
    }
})
