import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './plugins/element.js'
import "./assets/css/common.css"
// 路由权限管理
import "./router/permission.js"
// 引入axios
import api from "./api/index"
// 挂载全局
Vue.prototype.$api = api
// 引入Eventbus
import "./utils/event-bus"
// 引入echarts
import Echarts from "./plugins/echarts"
Vue.use(Echarts)

Vue.config.productionTip = false

// 页面刷新赋值vuex,防止刷新回到登录页
if(localStorage.getItem("ego")){
  const user = JSON.parse(localStorage.getItem("ego"));
  store.commit("loginModule/setUser", user);
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
