// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

import Vuetify from 'vuetify'
import './style/reset.css'
import 'vuetify/dist/vuetify.min.css' 
import VueResource from 'vue-resource'

Vue.use(Vuetify)
Vue.use(VueResource);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
