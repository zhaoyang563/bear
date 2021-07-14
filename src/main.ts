import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Vuex from 'vuex'
import axios from 'axios'

// import echarts from 'echarts'
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts


Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Vuex)

 
Vue.config.productionTip = false
// 全局配置域名
// axios.defaults.baseURL = 'https://renewp.eicp.vip/'
// target: 'http://192.168.199.246:9704/',
// axios.defaults.baseURL = 'http://testjk.renewp.com:9595/'
axios.defaults.baseURL = '/'
// axios.defaults.headers['Content-Type'] = "application/x-www-form-urlencoded"

// 拦截处理 请求拦截
axios.interceptors.request.use(function (config) {
  // config 为默认请求配置 与传入请求配置得到结合
  // 必须return
  // 添加统一请求头
  if(localStorage.getItem('userLoginInfo') != null) {
    let locationStr:string|null = localStorage.getItem('userLoginInfo');
    let userInfo = JSON.parse(''+locationStr);
    console.log(userInfo);
    if(userInfo != null && userInfo.token != null) {
      config.headers['token'] = userInfo.token;
    }
  }
  return config
}), function (error:any) {
  // 请求失败处理
  return Promise.reject(error)
}

function parseShell(locationStr:string|null) {
  localStorage == null?'':JSON.parse(''+locationStr);
}


Vue.prototype.$axios = axios

// Vue.directive('resize', {
//   bind(el, binding) {
//     let width = '';
//     function get() {
//       let style = document.defaultView.getComputedStyle(el);
//       if (width !== style.width) {
//         binding.value(width);
//       }
//       width = style.width;
//     }

//     el.__vueReize__ = setInterval(get, 200);
//   },
//   unbind(el) {
//     clearInterval(el.__vueReize__);
//   },
// });

// 全局路由守卫
router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0)
  next()
})

// axios before set header and check



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

