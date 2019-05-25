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

const vm = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');


