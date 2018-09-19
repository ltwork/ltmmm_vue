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
                                <li class="active">
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
                    <div class="cart-box">
                        <h2 class="slide-tit">
                            <span>1、收货地址</span>
                        </h2>
                        <div id="orderForm" name="orderForm" url="">
                            <!-- 收获地址的表单 -->
                            <el-form status-icon :model="order" :rules="rules" ref="orderForm" label-width="150px" class="form-box address-info">
                                <el-form-item label="收货人姓名" prop="accept_name">
                                    <el-input style="width:500px;" v-model="order.accept_name"></el-input>
                                </el-form-item>
                                <el-form-item label="所属地区" prop="area">
                                    <v-distpicker :province="order.area.province.value" :city="order.area.city.value" :area="order.area.area.value"
                                    @selected="onSelected"></v-distpicker>
                                </el-form-item>
                                <el-form-item label="详情地址" prop="address">
                                    <el-input style="width:500px;" v-model="order.address"></el-input>
                                </el-form-item>
                                <el-form-item label="手机号码" prop="mobile">
                                    <el-input style="width:500px;" v-model="order.mobile"></el-input>
                                </el-form-item>
                                <el-form-item label="电子邮箱">
                                    <el-input style="width:500px;" v-model="order.email"></el-input>
                                </el-form-item>
                                <el-form-item label="邮政编码">
                                    <el-input style="width:250px;" v-model="order.post_code"></el-input>
                                </el-form-item>
                            </el-form>
                            <h2 class="slide-tit">
                                <span>2、支付方式</span>
                            </h2>
                            <ul class="item-box clearfix">
                                <!--取得一个DataTable-->
                                <li>
                                    <label>
                                        <el-radio v-model="order.payment_id" label="6">在线支付
                                            <em>手续费：0.00元</em>
                                        </el-radio>
                                    </label>
                                </li>
                            </ul>
                            <h2 class="slide-tit">
                                <span>3、配送方式</span>
                            </h2>
                            <ul class="item-box clearfix">
                                <!--取得一个DataTable-->
                                <li>
                                    <el-radio-group v-model="order.express_id">
                                        <el-radio @change="order.expressMoment=20" label="1">顺丰快递
                                            <em>手续费：20元</em>
                                        </el-radio>
                                        <el-radio @change="order.expressMoment=10" label="2">圆通快递
                                            <em>手续费：10元</em>
                                        </el-radio>
                                        <el-radio @change="order.expressMoment=8" label="3">韵达快递
                                            <em>手续费：8元</em>
                                        </el-radio>
                                    </el-radio-group>
                                </li>
                            </ul>
                            <h2 class="slide-tit">
                                <span>4、商品清单</span>
                            </h2>
                            <div class="line15"></div>
                            <table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
                                <tbody>
                                    <tr>
                                        <th colspan="2" align="left">商品信息</th>
                                        <th width="84" align="left">单价</th>
                                        <th width="84" align="center">购买数量</th>
                                        <th width="104" align="left">金额(元)</th>
                                    </tr>
                                    <tr v-for="item in goodsList" :key="item.id">
                                        <td width="68">
                                            <a target="_blank" href="/goods/show-89.html">
                                                <img :src="item.img_url" class="img">
                                            </a>
                                        </td>
                                        <td>
                                            <a target="_blank" href="/goods/show-89.html">{{item.title}}</a>
                                        </td>
                                        <td>
                                            <span class="red">
                                                ￥{{item.sell_price}}
                                            </span>
                                        </td>
                                        <td align="center">{{item.buycount}}</td>
                                        <td>
                                            <span class="red">
                                                ￥{{item.sell_price * item.buycount}}
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="line15"></div>
                            <h2 class="slide-tit">
                                <span>5、结算信息</span>
                            </h2>
                            <div class="buy-foot clearfix">
                                <div class="left-box">
                                    <dl>
                                        <dt>订单备注(100字符以内)</dt>
                                        <dd>
                                            <textarea name="message" v-model="order.message" class="input" style="height:35px;"></textarea>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="right-box">
                                    <p>
                                        商品
                                        <label class="price">{{totalCount}}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                                        <label id="goodsAmount" class="price">{{totalPrice}}</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                                    </p>
                                    <p>
                                        运费：￥
                                        <label id="expressFee" class="price">{{order.expressMoment}}</label> 元
                                    </p>
                                    <p class="txt-box">
                                        应付总金额：￥
                                        <label id="totalAmount" class="price">{{getTotalAmount}}</label>
                                    </p>
                                    <p class="btn-box">
                                        <a class="btn button" href="/cart.html">返回购物车</a>
                                        <a id="btnSubmit" @click="goOrder" class="btn submit">确认提交</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import VDistpicker from 'v-distpicker'

export default {
  components: { VDistpicker },
  computed:{
      getTotalAmount(){
          this.order.goodsAmount = this.totalPrice + this.order.expressMoment
          return this.totalPrice + this.order.expressMoment
      }
  },
  data() {
    const checkMobile = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号码不能为空!'))
      }

      // 用正则匹配手机号
      var reg = /^1[3,4,5,7,8][0-9]{9}$/

      setTimeout(() => {
        if (!reg.test(value)) {
          callback(new Error('手机号码不正确!'))
        } else {
          callback()
        }
      }, 1000)
    }
    return {
      goodsList: [], //纯粹展示用
      totalCount:0, //总件数
      totalPrice:0,//总价格
      order: {
        // 需要提交给后台
        accept_name: '煤老板', // 收货人姓名
        area: {
          // 所属地区
          province: {
            code: '440000',
            value: '广东省'
          },
          city: {
            code: '440300',
            value: '深圳市'
          },
          area: {
            code: '440306',
            value: '宝安区'
          }
        },
        address: '中粮商务公园', // 详细地址
        mobile: '13812345678', // 手机号码
        email: 'meilaoban@126.com', // 电子邮箱
        post_code: '518101', //邮政编码
        payment_id: '6', //支付方式，在线支付
        express_id: '1', //快递方式 1 顺丰 2 圆通  3 韵达
        expressMoment:20, // 快递费用
        message:'请快点发货',
        goodsAmount:0, // 商品总金额 === 商品的金额 + 快递费
      },
      rules: {
        accept_name: [
          { required: true, message: '请输入收货人姓名', trigger: 'blur' }
        ],
        area: [{ required: true, message: '请选择所属区域', trigger: 'blur' }],
        address: [
          { required: true, message: '详细地址不能为空', trigger: 'blur' }
        ],
        mobile: [{ required: true, validator: checkMobile, trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getGoodsList()
  },
  methods: {
    getGoodsList() {
      const url = `site/comment/getshopcargoods/${this.$route.query.ids}`

      // {87:3,88:2}
      const localGoods = JSON.parse(localStorage.getItem('goods') || '{}')

      // 设置order的goodsids属性及cargoodsobj
      this.order.goodsids = this.$route.query.ids
      // 选择结算的几个，就提交后台几个
      const cargoodsobj = {}
      // [87,88]
      const ids = this.order.goodsids.split(',')
      ids.forEach(key=>{
          cargoodsobj[key] = localGoods[key]
      })
      this.order.cargoodsobj = cargoodsobj

      this.$axios.get(url).then(response => {
        response.data.message.forEach(goods => {
          goods.buycount = localGoods[goods.id]

          this.totalCount += goods.buycount
          this.totalPrice += goods.buycount * goods.sell_price
        })

        this.goodsList = response.data.message
      })
    },
    onSelected(data){
        this.order.area = data
    },
    goOrder(){
        this.$refs.orderForm.validate((valid) => {
          if (valid) {
            //1.调用后台的接口
            const url = 'site/validate/order/setorder'

            this.$axios.post(url,this.order).then(response=>{
                if(response.data.status === 0){
                    // 2.带上订单跳转到支付页面
                    this.$router.push({path:'/pay',query:{orderid:response.data.message.orderid}})

                    // 3.删除本地已经下单的商品
                    const ids = this.order.goodsids.split(',')
                    ids.forEach(id=>{
                        this.$store.commit('deleteGoodsById',id)
                    })
                }
            })
          } else {
            this.$message.error('信息必须填写完整!');
          }
        });
    }
  }
}
</script>
