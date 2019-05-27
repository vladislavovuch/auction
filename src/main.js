import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'

Vue.config.productionTip = false;


/**
 * Emulate expremental js technology - closest, but with ie11 support
 *
 * Find the closest ancestor of the target (or the current element itself)
 * which matches the given selector
 *
 * @param {Object} target
 * @param {String} selector
 * @param {Object} currentTarget
 * @returns {Object} - return finded element or null if nothing was finded
 */
Vue.prototype.$closest = function (target, selector, currentTarget = null) {
    if (target !== currentTarget) {
        const fl = target.matches(selector);
        return fl ? target : this.$closest(target.parentNode, selector, currentTarget);
    }
    return null;
};

Vue.prototype.$uuid = function () {
    let d = new Date().getTime();
    if (window.performance && typeof window.performance.now === "function") {
        d += performance.now(); //use high-precision timer if available
    }
    const guid = 'xxxxxxxx-xxxx-vxxx-hxxx-xxxxxxxxxxxx'.replace(/x/g, function (c) {
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return guid;
};

// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
// import "firebase/auth";
// import "firebase/firestore";
import 'firebase/storage'


const firebaseConfig = {
    apiKey: 'AIzaSyDP-bbfVwnM0ugf92BfzSXCjPIHrtuTxPQ',
    // authDomain: '<your-auth-domain>',
    // databaseURL: 'https://tecki.firebaseio.com/',
    storageBucket: 'auction-a1976.appspot.com'
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const vm = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');


