import Vue from 'vue'
import Router from 'vue-router'
import AuctionLots from './views/AuctionLots'
import LotDetails from './views/LotDetails'
import AddLot from './views/AddLot'
import SuccessfulPublishment from './views/LotSuccessfulPublishment'
import LotsPreview from './views/LotsPreview'
import Home from './views/Home'

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '',
            component: Home,
        },
        {
            path: '/auction',
            component: AuctionLots,
            name: 'Auction',
            children: [
                {
                    path: 'lot-detailes-:id',
                    component: LotDetails,
                    name: 'Lot detailes',
                },
                {
                    path: '',
                    component: LotsPreview,
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
