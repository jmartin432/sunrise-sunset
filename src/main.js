// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false
Vue.component('AppInput')
Vue.component('AppResults')
Vue.component('AppCanvas')

new Vue({ // eslint-disable-line no-new
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  watch: {
    date: function () {
      console.log('watch date')
    }
  }
})
