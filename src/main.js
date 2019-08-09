import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import {router} from './router'
import './registerServiceWorker'
import axios from 'axios'
import VueRouter from 'vue-router';

Vue.use(VueRouter)
var VueTruncate = require('vue-truncate-filter')

Vue.use(VueTruncate);

Vue.prototype.$http = axios
Vue.prototype.$axios = axios
Vue.use(Buefy)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
