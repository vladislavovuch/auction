import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import LoadingIndicator from './modules/LoadingIndicator'
import ModalWindow from './modules/ModalWindow'
import ImageUpload from './modules/ImageUpload'
import Lots from './modules/Lots'

export default new Vuex.Store({
    // strict: process.env.NODE_ENV !== 'production',
    modules: [
        LoadingIndicator,
        ModalWindow,
        ImageUpload,
        Lots,
    ],
    state: {

    },
    getters: {

    },
    mutations: {

    },
    actions: {

    }
})
