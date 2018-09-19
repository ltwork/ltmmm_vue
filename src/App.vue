<template>
  <div>
    <!-- 1.0 头部 -->
    <div class="header">
      <!-- 1.0 导航栏头部 -->
      <div class="head-top">
        <div class="section">
          <div class="left-box">
            <span>雷霆买买买</span>
            <a target="_blank" href="#"></a>
            <a target="_blank" href="#"></a>
          </div>
          <div v-if="isReady" id="menu" class="right-box">
            <span v-show="!isLogin">
              <router-link to="/login" class="">登录</router-link>
              <strong>|</strong>
              <a href="" class="">注册</a>
              <strong>|</strong>
            </span>
            <span v-show="isLogin">
              <router-link to="/vipcenter" class="">会员中心</router-link>
              <strong>|</strong>
              <a @click="logout">退出</a>
              <strong>|</strong>
            </span>
            <router-link to="/shopcart" class="">
              <i id="shoppingCartCount" class="iconfont icon-cart"></i>购物车(
              <span>
                <span>{{$store.getters.getBuyCount}}</span>
              </span>)</router-link>
          </div>
        </div>
      </div>

      <!-- 2.0 导航条 -->
      <div class="head-nav">
        <div class="section">
          <div id="menu2" class="nav-box menuhd">
            <ul>
              <li class="index">
                <a href="#" class="">
                  <span class="out" style="top: 0px;">首页</span>
                </a>
              </li>
              <li class="news">
                <a href="#" class="">
                  <span class="out" style="top: 0px;">每日精选</span>
                </a>
              </li>
              <li class="photo">
                <a href="#" class="">
                  <span class="out" style="top: 0px;">秒杀专区</span>
                </a>
              </li>
              <li class="video">
                <a href="http://www.jd.com" target="_blank" class="">
                  <span class="out" style="top: 0px;">京东超市</span>
                </a>
              </li>
              <li class="down">
                <a href="#" class="">
                  <span class="out" style="top: 0px;">会员权益</span>
                </a>
              </li>
              <li class="goods">
                <router-link to="/goodslist" class="router-link-exact-active ">
                  <span class="out" style="top: 0px;">购物商城</span>
                </router-link>
              </li>
            </ul>
          </div>
          <div class="search-box">
            <div class="input-box">
              <input id="keywords" name="keywords" type="text" onkeydown="if(event.keyCode==13){};" placeholder="输入关健字" x-webkit-speech="">
            </div>
            <a href="javascript:;">
              <i class="iconfont icon-search"></i>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- 2.0 中间部分-路由 -->
    <router-view></router-view>

    <!-- 3.0 底部 -->
    <div class="footer">
      <div class="section">
        <div class="foot-nav">
          <a href="">关于我们</a>
          <strong>|</strong>
          <a href="">联系我们</a>
          <strong>|</strong>
          <a href="">联系客服</a>
          <strong>|</strong>
          <a href="">合作招商</a>
          <strong>|</strong>
          <a href="">商家帮助</a>
          <strong>|</strong>
          <a href="">营销中心</a>
          <strong>|</strong>
          <a href="">隐私政策</a>
        </div>
        <div class="foot-box">
          <div class="copyright">
            <p>版权所有 雷霆买买买 </p>
            <p>公司地址：https://github.com/ltwork 联系电话：13888888888</p>
            <p class="gray">Copyright © 2009-2018 itcast Corporation,All Rights Reserved.</p>
          </div>
          <div class="service">
            <p>周一至周日 9:00-24:00</p>
            <a href="#">
              <i class="iconfont icon-phone"></i>在线客服</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 导入jquery
/**
import $ from 'jquery'
// 把导入的jquery挂在到window
window.$ = $
window.jQuery = $
 */

import { bus } from './common/common'

export default {
  data() {
    return {
      isReady:false,
      isLogin: true
    }
  },
  created() {
    bus.$on('loginSuccess', () => {
      this.isReady = true
      this.isLogin = true
    })

    this.checkLogin()
  },
  methods: {
    checkLogin() {
      const url = `site/account/islogin`
      this.$axios.get(url).then(response => {
        this.isReady = true
        if (response.data.code === 'logined') {
          this.isLogin = true
        } else {
          this.isLogin = false
        }
      })
    },
    logout() {
      this.$confirm('确定退出吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$axios.get('site/account/logout').then(response => {
            if (response.data.status === 0) {
              // 通过编程式导航，跳转到首页
              this.$router.push({ path: '/goodslist' })

              // 更改isLogin为false
              this.isLogin = false
            }
          })
        })
        .catch(() => {})
    }
  },
  // App template的内容渲染到浏览器之后调用
  mounted() {
    $('#menu2 li a').wrapInner('<span class="out"></span>')
    $('#menu2 li a').each(function() {
      $('<span class="over">' + $(this).text() + '</span>').appendTo(this)
    })

    $('#menu2 li a').hover(
      function() {
        $('.out', this)
          .stop()
          .animate({ top: '48px' }, 300) // move down - hide
        $('.over', this)
          .stop()
          .animate({ top: '0px' }, 300) // move down - show
      },
      function() {
        $('.out', this)
          .stop()
          .animate({ top: '0px' }, 300) // move up - show
        $('.over', this)
          .stop()
          .animate({ top: '-48px' }, 300) // move up - hide
      }
    )
  }
}
</script>

// 一定不能加scoped
<style scoped>
/** 导入jquery插件的样式 **/
@import './statics/site/jquery_plugins/hoverNav/css/style.css';
</style>
