<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li>
                                    <div class="progress">
                                        <span>2</span>
                                        填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span>
                                        支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <!--商品列表-->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <tr>
                                    <th width="48" align="center">
                                        <a>选择</a>
                                    </th>
                                    <th align="left" colspan="2">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>
                                <tr v-for="(item,index) in goodsList" :key="item.id">
                                    <td width="48" align="center">
                                        <el-switch v-model="item.isSelected" active-color="#409eff" inactive-color="#555555">
                                        </el-switch>
                                    </td>
                                    <td align="left" colspan="2">
                                        <div style="display:flex;align-items:center;"><img :src="item.img_url" alt="" style="width: 50px; height: 50px; margin-right: 10px;">
                                            <span>{{item.title}}</span>
                                        </div>
                                    </td>
                                    <td width="84" align="left">{{item.sell_price}}</td>
                                    <td width="104" align="center">
                                        <inputnumber :initCount="item.buycount" :goodsId="item.id" @goodsCountChange="getChangedGoods" />
                                    </td>
                                    <td width="104" align="left">{{item.sell_price * item.buycount}}</td>
                                    <td width="54" align="center">
                                        <a @click="deleteGoods(item.id,index)">删除</a>
                                    </td>
                                </tr>
                                <tr v-if="goodsList.length === 0">
                                    <td colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning">
                                                <i class="iconfont icon-tip"></i>
                                            </div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>您的购物车为空，
                                                    <a href="/index.html">马上去购物</a>吧！</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">{{getTotalCount}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                        <span class="red">￥</span>
                                        <b class="red" id="totalAmount">{{getTotalPrice}}</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--/商品列表-->
                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <button class="button" @click="continueBuy">继续购物</button>
                            <button class="submit" @click="goToOrder">立即结算</button>
                        </div>
                    </div>
                    <!--购物车底部-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getLocalGoods } from '../../common/localStorageTool'

// 导入子组件
import inputnumber from '../subcomponents/inputnumber'

// import axios from 'axios'

export default {
  // 局部注册
  components: { inputnumber },
  data() {
    return {
      goodsList: []
    }
  },
  computed: {
    getTotalCount() {
      let totalCount = 0
      this.goodsList.forEach(goods => {
        if (goods.isSelected) {
          totalCount += goods.buycount
        }
      })

      return totalCount
    },
    getTotalPrice() {
      let totalPrice = 0
      this.goodsList.forEach(goods => {
        if (goods.isSelected) {
          totalPrice += goods.sell_price * goods.buycount
        }
      })

      return totalPrice
    }
  },
  created() {
    this.getGoodsListData()
  },
  methods: {
    // 获取商品列表
    getGoodsListData() {
      // {87:6,88:2}
      const localGoods = getLocalGoods()
      // 获取对象中的key，放入到一个数组中
      const keys = Object.keys(localGoods)

      if (keys.length === 0) return

      const url = `site/comment/getshopcargoods/${keys.join(',')}`

      this.$axios.get(url).then(response => {
        response.data.message.forEach(goods => {
          goods.buycount = localGoods[goods.id]
          goods.isSelected = true
        })

        this.goodsList = response.data.message
      })
    },
    // 获取子组件传递过来的更改之后的商品信息
    getChangedGoods(updateGoods) {
      this.goodsList.forEach(goods => {
        if (goods.id === updateGoods.goodsId) {
          goods.buycount = updateGoods.count
        }
      })

      // 调用Vuex的方法，调用mutations，传递载荷
      const goods = {
        goodsId: updateGoods.goodsId,
        count: updateGoods.count
      }

      this.$store.commit('updateGoods', goods)
    },
    // 删除商品
    deleteGoods(goodsId, index) {
      // 删除改商品
      this.goodsList.splice(index, 1)

      // 调用mutations的deleteGoodsById
      this.$store.commit('deleteGoodsById', goodsId)
    },
    // 继续购物
    continueBuy() {
      // this.$router.push({path:'/goodslist'})
      this.$router.push({ name: 'goodslist' })
        // axios.get('http://www.baidu.com').then(response=>{
        //     console.log(response)
        // })
    },
    goToOrder() {
      const ids = []
      this.goodsList.forEach(goods => {
        if (goods.isSelected) {
          ids.push(goods.id)
        }
      })

      if (ids.length === 0) {
        this.$message({
          message: '至少要选择一个商品结算',
          type: 'warning'
        })
        return
      }

      // 通过编程式导航跳转到下订单组件
      this.$router.push({path:'/order',query:{ids:ids.join(',')}})
    }
  }
}
</script>
