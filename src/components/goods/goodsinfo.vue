<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div v-if="goodsData.goodsinfo" class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <!-- 放大镜的代码写在这里 -->
                            <div class="pic-box">
                                <div class="magnifier" id="magnifier1">
                                    <div class="magnifier-container">
                                        <div class="images-cover"></div>
                                        <!--当前图片显示容器-->
                                        <div class="move-view"></div>
                                        <!--跟随鼠标移动的盒子-->
                                    </div>
                                    <div class="magnifier-assembly">
                                        <div class="magnifier-btn">
                                            <span class="magnifier-btn-left">&lt;</span>
                                            <span class="magnifier-btn-right">&gt;</span>
                                        </div>
                                        <!--按钮组-->
                                        <div class="magnifier-line">
                                            <ul class="clearfix animation03">
                                                <li v-for="item in goodsData.imglist" :key="item.id">
                                                    <div class="small-img">
                                                        <img :src="item.original_path" />
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <!--缩略图-->
                                    </div>
                                    <div class="magnifier-view"></div>
                                    <!--经过放大的图片显示容器-->
                                </div>
                            </div>
                            <div class="goods-spec">
                                <h1>{{goodsData.goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsData.goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsData.goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodsData.goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{goodsData.goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <el-input-number size="small" v-model="goodsCount" :min="1" :max="goodsData.goodsinfo.stock_quantity"></el-input-number>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsData.goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button class="buy">立即购买</button>
                                                <button @click="addToShopCart" ref="addToShopCartRef" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <Affix>
                                <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                    <ul>
                                        <li @click="isShowIntroduction = true">
                                            <a href="javascript:;" :class="{selected:isShowIntroduction}">商品介绍</a>
                                        </li>
                                        <li @click="isShowIntroduction = false">
                                            <a :class="{selected:!isShowIntroduction}" href="javascript:;">商品评论</a>
                                        </li>
                                    </ul>
                                </div>
                            </Affix>
                            <!-- 商品介绍 -->
                            <div v-show="isShowIntroduction" class="tab-content entry" style="display: block;">
                                <p style="padding:5px;" v-html="goodsData.goodsinfo.content"></p>
                            </div>
                            <!-- 商品评论 -->
                            <div v-show="!isShowIntroduction" class="tab-content" style="display: block;">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea id="txtContent" ref="txtContentRef" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" name="submit" type="submit" value="提交评论" @click="postComment" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p v-if="commentInfo.totalcount === 0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="item in commentInfo.message" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.add_time | dateFmt('YYYY-MM-DD HH:mm:ss')}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>
                                    </ul>
                                    <!-- 分页条的位置 -->
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageIndex" :page-sizes="[2, 5, 10, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="commentInfo.totalcount">
                                        </el-pagination>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="item in goodsData.hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                            <router-link :to="'/goodsinfo/'+item.id" class="">
                                                <img v-lazy="item.img_url">
                                            </router-link>
                                        </div>
                                        <div class="txt-box">
                                           <router-link :to="'/goodsinfo/'+item.id" class="">{{item.title}}</router-link>
                                            <span>{{item.add_time | dateFmt}}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 3.0 被动画元素 -->
        <transition
              v-on:before-enter="beforeEnter"
              v-on:enter="enter"
              v-on:after-enter="afterEnter">
            <div ref="animateDivRef" v-show="isShow" v-if="goodsData.imglist" class="animateDiv">
                <img :src="goodsData.imglist[0].original_path" alt="">
            </div>
        </transition>
    </div>
</template>

<style scoped>
.animateDiv{
    position: absolute;
    top:0px;
    left:0px;
    width:50px;
    height: 50px;
}

.animateDiv img{
    width:100%;
    height: 100%;
}
@import '../../statics/site/jquery_plugins/jqimgzoom/css/magnifier.css';
</style>


<script>
// 导入放大镜插件
import '../../statics/site/jquery_plugins/jqimgzoom/js/magnifier'

// 按需导入
import { Affix } from 'iview'

export default {
  components: { Affix },
  data() {
    return {
      goodsData: {},
      goodsCount: 1, // 商品数量
      isShowIntroduction: true, //是否显示商品介绍
      pageIndex: 1, // 页码 默认从第一页开始查
      pageSize: 2, // 页容量，每页默认2条
      commentInfo: {}, // 评论信息
      addToShopCartOffset:null, //加入购物车按钮的偏移量【开始】
      shoppingCartCountOffset:null, //购买数量的偏移量【结束】
      isShow:false,
      isNeedChange:true // 是否需要更改
    }
  },
  created() {
    this.getGoodsInfoData()
    this.getCommentInfoData()
  },
  watch:{
      $route:function(){
          this.goodsCount = 1
        //   this.isNeedChange = true
          // 重新获取数据
          this.getGoodsInfoData()
          this.getCommentInfoData()
      }
  },
  updated() {
      if(this.isNeedChange){
        // data发生了变化并且，视图已经渲染完毕了
        $('#magnifier1').imgzoon({ magnifier: '#magnifier1' })
        this.isNeedChange = false
      }
  },
  methods: {
    // 获取商品详情信息
    getGoodsInfoData() {
      const url = `site/goods/getgoodsinfo/${this.$route.params.goodsid}`
      this.$axios.get(url).then(response => {
        this.goodsData = response.data.message

        this.isNeedChange = true

        // 获取被动画元素动画开始和结束时候的偏移量
        setTimeout(() => {
            // data发生了变化并且，视图已经渲染完毕了
            // $('#magnifier1').imgzoon({ magnifier: '#magnifier1' })

            // 获取动画开始时候的偏移量
            this.addToShopCartOffset = $(this.$refs.addToShopCartRef).offset()

            // 设置被动画元素的位置
            $(this.$refs.animateDivRef).offset(this.addToShopCartOffset)

            // 获取动画结束时候的偏移量
            this.shoppingCartCountOffset = $("#shoppingCartCount").offset()
        }, 200);
      })
    },
    // 获取评论数据
    getCommentInfoData() {
      const url = `site/comment/getbypage/goods/${
        this.$route.params.goodsid
      }?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`

      this.$axios.get(url).then(response => {
        this.commentInfo = response.data
      })
    },
    // 分页相关
    // 页容量改变
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.pageIndex = 1

      this.getCommentInfoData()
    },
    // 当前页码改变
    handleCurrentChange(pageIndex) {
      this.pageIndex = pageIndex

      this.getCommentInfoData()
    },
    // 提交评论
    postComment() {
      const textContent = this.$refs.txtContentRef
      if (textContent.value.trim().length === 0) {
        this.$message({
          message: '评论内容不能为空!',
          type: 'warning'
        })
        return
      }

      // 发送请求给后台
      this.$axios
        .post(
          `site/validate/comment/post/goods/${this.$route.params.goodsid}`,
          {
            commenttxt: textContent.value
          }
        )
        .then(response => {
          if (response.data.status === 0) {
            // 清空原先填写内容
            textContent.value = ''

            // 提示成功
            this.$message({
              message: '评论成功!',
              type: 'success'
            })

            // 重新加载第一页数据
            this.pageIndex = 1
            this.getCommentInfoData()
          }
        })
    },
    // 加入购物车
    addToShopCart(){
        this.isShow = true

        // 调用store.commit去触发mutations方法
        const goods = {
            goodsId:this.$route.params.goodsid,
            count:this.goodsCount
        }

        this.$store.commit('addGoods',goods)
        // this.$store.dispatch('asyncAddGoods',goods)
    },
    // 动画相关
    beforeEnter: function (el) {
        el.style.left = `${this.addToShopCartOffset.left}px`
        el.style.top = `${this.addToShopCartOffset.top}px`
        el.style.transform = `scale(1)`
    },
    // 此回调函数是可选项的设置
    // 与 CSS 结合时使用
    enter: function (el, done) {
        el.style.transition = "all .5s"

        // 刷新动画帧
        el.offsetWidth

        el.style.left = `${this.shoppingCartCountOffset.left}px`
        el.style.top = `${this.shoppingCartCountOffset.top}px`
        el.style.transform = `scale(0.5)`

        // ...
        done()
    },
    afterEnter: function () {
        this.isShow = false
    }
  }
}
</script>