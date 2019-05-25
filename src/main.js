import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'

Vue.config.productionTip = false;

Vue.prototype.$closest = function (target, selector, currentTarget = null) {
    if(target !== currentTarget) {
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


