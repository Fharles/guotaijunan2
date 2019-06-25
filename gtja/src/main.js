// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import MuseUI from 'muse-ui';
import store from './store/store.js'
import 'muse-ui/dist/muse-ui.css'
Vue.config.productionTip = false
Vue.prototype.axios = axios
Vue.use(MuseUI)
/* eslint-disable no-new */
new Vue({
  el: '#app', 
  router,
  store,
  components: { App },
  template: '<App/>'
})
