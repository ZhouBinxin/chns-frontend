/* eslint-disable semi */
import Vue from 'vue'
import App from './App'
import router from './router/router'
import * as echarts from 'echarts'
import ElementUI from 'element-ui'
import '../src/dist/css/global.css'

// 引入vuex中的store
import store from './store/store.js'

Vue.prototype.$echarts = echarts
Vue.use(ElementUI)

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
