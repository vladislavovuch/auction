import Vue from 'vue'
import Router from 'vue-router'
import AuctionLots from './views/AuctionLots'
import LotDetails from './views/LotDetails'
import AddLot from './views/AddLot'
import SuccessfulPublishment from './views/LotSuccessfulPublishment'
import LotsPreview from './views/LotsPreview'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        /* {
             path: '/',
             name: 'home',
             component: Home
         },
       /*{
             path: '/about',
             name: 'about',
             // route level code-splitting
             // this generates a separate chunk (about.[hash].js) for this route
             // which is lazy-loaded when the route is visited.
             component: () => import(/!* webpackChunkName: "about" *!/ './views/About.vue')
         },*/
        {
            path: '/auction',
            component: AuctionLots,
            name: 'Auction',
            children: [
                {
                    path: 'lot-detailes-:id',
                    component: LotDetails,
                    name: 'Lotdetailes',
                },
                {
                    path: '',
                    component: LotsPreview,
                    name: 'Lotdetailes',
                },

            ]
        },
        {
            path: '/add-lot',
            component: AddLot,
        },
        {
            path: '/successful-publishment',
            component: SuccessfulPublishment,
        }

    ]
})
