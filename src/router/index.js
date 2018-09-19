//es6的导入方式 commonjs const Vue = require('vue')
// import Vue from 'vue'
// import VueRouter from 'vue-router'
// // import store from '../store' 

// // 才算集成完VueRouter
// Vue.use(VueRouter)

// 网络请求相关
import axios from 'axios'

axios.defaults.baseURL = 'http://47.106.148.205:8899/'
axios.defaults.withCredentials=true
Vue.prototype.$axios = axios

// 导入组件
/** 
import goodslist from '../components/goods/goodslist.vue'
import goodsinfo from '../components/goods/goodsinfo'
import shopcart from '../components/shopcart/shopcart'
import order from '../components/order/order'
import login from '../components/account/login'
import pay from '../components/pay/pay'
import paySuccess from '../components/pay/paySuccess'
import vipcenter from '../components/vipcenter/vipcenter'
import myOrders from '../components/vipcenter/myOrders.vue'
import orderInfo from '../components/vipcenter/orderInfo'
*/
const goodslist = () => import(/* webpackChunkName: "goodslist" */ '../components/goods/goodslist.vue')
const goodsinfo = () => import(/* webpackChunkName: "goodsinfo" */ '../components/goods/goodsinfo.vue')
const shopcart = () => import(/* webpackChunkName: "shopcart" */ '../components/shopcart/shopcart.vue')
const order = () => import(/* webpackChunkName: "order" */ '../components/order/order.vue')
const login = () => import(/* webpackChunkName: "login" */ '../components/account/login.vue')
const pay = () => import(/* webpackChunkName: "pay" */ '../components/pay/pay.vue')
const paySuccess = () => import(/* webpackChunkName: "paySuccess" */ '../components/pay/paySuccess.vue')
const vipcenter = () => import(/* webpackChunkName: "vipcenter" */ '../components/vipcenter/vipcenter.vue')
const myOrders = () => import(/* webpackChunkName: "myOrders" */ '../components/vipcenter/myOrders.vue')
const orderInfo = () => import(/* webpackChunkName: "orderInfo" */ '../components/vipcenter/orderInfo.vue')

// 创建路由对象，设置路由规则，自动注册组件
const router = new VueRouter({
    routes:[
        {path:'/',redirect:'/goodslist'},
        {name:'goodslist',path:'/goodslist',component:goodslist},
        {path:'/goodsinfo/:goodsid',component:goodsinfo},
        {path:'/shopcart',component:shopcart},
        {path:'/login',component:login},

        /***************** 下面的路由规则是需要验证是否登录的 */
        {path:'/order',meta: { needLogin : true },component:order},
        {path:'/pay',meta: { needLogin : true },component:pay},
        {path:'/paySuccess',meta: { needLogin : true },component:paySuccess},
        {path:'/vipcenter',meta: { needLogin : true },component:vipcenter},
        {path:'/myOrders',meta: { needLogin : true },component:myOrders},
        {path:'/orderInfo/:orderid',meta: { needLogin : true },component:orderInfo}
    ]
})

/**
 * to 想要去的组件的链接
 * from 从哪里来
 * next 控制是否有权限去
 */
router.beforeEach((to, from, next) => {
    // 保存起来你想去的页面
    if(to.fullPath!='/login'){
        localStorage.setItem('lastVisitPath',to.fullPath)
        // store.commit('changeLastVisitPath',to.fullPath)
    }

    if(to.meta.needLogin){ // 需要先进行登录判断
        const url = `site/account/islogin`
        axios.get(url).then(response=>{
            if(response.data.code === 'logined'){
                next()
            }else{
                // 使用编程式导航，跳转到登录页面
                router.push({path:'/login'})
            }
        })
    }else{ // 不需要验证是否登录
        next()
    }
})

//es6的导出 相当于 commonjs module.exports = router
export default router