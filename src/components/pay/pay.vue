<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="javascript:;">支付中心</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit pay">
                        <a href="javascript:;" class="selected">支付中心</a>
                    </div>
                    <div class="form-box payment">
                        <div class="el-row">
                            <div class="el-col el-col-18">
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>订 单 号：</dt>
                                            <dd>{{orderInfo.order_no}}</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>收货人姓名：</dt>
                                            <dd>{{orderInfo.accept_name}}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>送货地址：</dt>
                                            <dd>{{orderInfo.area}} {{orderInfo.address}}
                                            </dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>手机号码：</dt>
                                            <dd>{{orderInfo.mobile}}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付金额：</dt>
                                            <dd>{{orderInfo.order_amount}} 元</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付方式：</dt>
                                            <dd>在线支付</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</dt>
                                            <dd>{{orderInfo.message}}</dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                            <div class="el-col el-col-6">
                                <!-- <dzh-qrcode :url="url" img_url="https://gss2.bdstatic.com/9fo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=37a542f55ada81cb5aeb8b9f330fbb73/d6ca7bcb0a46f21f24c2f452fd246b600c33ae39.jpg"></dzh-qrcode> -->
                                <dzh-qrcode :url="url" :img_url="img_url"></dzh-qrcode>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import DZHQRCode from 'dzh-qrcode'

export default {
  // 局部注册
  components: { 'dzh-qrcode': DZHQRCode },
  data() {
    return {
      orderInfo: {},
      url: '',
      interval: -1,
      img_url: ''
    }
  },
  created() {
    this.img_url = require('../../statics/site/images/alipay.png')
    this.getOrderInfo()
    this.getOrderStatus()
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
  mounted() {
    this.url = `http://47.106.148.205:8899/site/validate/pay/alipay/${
      this.$route.query.orderid
    }`
  },
  methods: {
    getOrderInfo() {
      const url = `site/validate/order/getorder/${this.$route.query.orderid}`

      this.$axios.get(url).then(response => {
        if (response.data.message[0].status === 2) {
          this.$router.push({ path: '/paySuccess' })
        } else {
          this.orderInfo = response.data.message[0]
        }
      })
    },
    // 轮询订单状态
    getOrderStatus() {
      this.interval = setInterval(() => {
        const url = `site/validate/order/getorder/${this.$route.query.orderid}`

        this.$axios.get(url).then(response => {
          if (response.data.message[0].status === 2) {
            this.$router.push({ path: '/paySuccess' })
          }
        })
      }, 3000)
    }
  }
}
</script>
