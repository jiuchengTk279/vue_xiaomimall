import Vue from 'vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLazyLoad from 'vue-lazyload'
import VueCookie from 'vue-cookie'
import store from './store'
import App from './App.vue'
// import env from '../env.js'

// mock 开关打开的时候才用，不打开的时候不使用
const mock = false;
if (mock) {
  // require 防止预编译，导致请求被拦截
  require('./mock/api');
}

// 根据前端的跨域方式做调整  /a/b : /api/a/b => /a/b
// easy-mock 地址
// axios.defaults.baseURL = 'https://www.easy-mock.com/mock/5dc7afee2b69d9223b633cbb/mimall';
// 真实地址
axios.defaults.baseURL = '/api';
// axios.defaults.baseURL = 'http://test-www.imooc.com/api';
// 做请求超时的处理 8s 
axios.defaults.timeout = 8000;
// 根据环境变量获取不同的请求地址
// axios.defaults.baseURL = env.baseURL;

// 接口错误拦截
axios.interceptors.response.use(function(response){
  let res = response.data
  let path = location.hash;
  if (res.status == 0) {
    return res.data
  } else if(res.status == 10) {
    // 如果不是首页就跳转到登录页，如果是首页就不用跳转
    if (path != '#/index') {
      window.location.href = '/#/login';
    }
    return Promise.reject(res);
  } else {
    alert(res.msg)
    return Promise.reject(res);
  }
})

Vue.use(VueAxios, axios);
Vue.use(VueLazyLoad, {
  loading: '/imgs/loading-svg/loading-bars.svg'
})
Vue.use(VueCookie);
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
