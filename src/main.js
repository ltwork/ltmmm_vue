/** 
import Vue from 'vue'
import ElementUI from 'element-ui'
import VueLazyload from 'vue-lazyload'

// 集成ElementUI
Vue.use(ElementUI) // 其实在注册组件
import 'element-ui/lib/theme-chalk/index.css'
*/

import App from './App'

Vue.use(VueLazyload, {
    loading: require('./statics/site/images/01.gif')
})

/** 导入自己的样式 */
import "./statics/site/css/style.css"

// 在浏览器端建议使用 import es6的module形式导入模块
import router from './router'

// 导入过滤器
import './filters'

// 导入store
import store from './store'

// console.log(process.env.NODE_ENV)

// import "../test/test2"

new Vue({
    router, //$route、$router
    store, //$store
    render:h=>h(App)
}).$mount('#app')
