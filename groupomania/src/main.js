import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import axios from 'axios';
import VueResource from 'vue-resource';

Vue.config.productionTip = false
Vue.use(VueResource)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')

export default
  axios.create({
    baseURL: 'http://localhost:3000/api',
    //timeout: 2000,
    headers: {
      'Content-type': 'application/json',
    },
  });