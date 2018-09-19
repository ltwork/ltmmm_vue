// 集成Vuex
/** 
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
*/

// 按需导入
import {
    addLocalGoods,
    getTotalCount,
    updateLocalGoods,
    deleteLocalGoodsById
} from '../common/localStorageTool'

// 创建空白仓库，并且导出
const store = new Vuex.Store({
    state:{
       buyCount:0,
    //    lastVisitPath:''
    },
    getters:{
        // 获取仓库中购物数量的方法
        getBuyCount:state=>{
            return state.buyCount > 0 ? state.buyCount : getTotalCount()
        },
        // getLastVisitPath(state){
        //     return state.lastVisitPath
        // }
    },
    mutations:{
        // changeLastVisitPath(state,path){
        //     state.lastVisitPath = path
        // },
        // goods === {goodsId:87,count:3}
        addGoods(state,goods){
            state.buyCount = addLocalGoods(goods)
        },
        // 参数 goods === {goodsId:87,count:3}
        updateGoods(state,goods){
            state.buyCount = updateLocalGoods(goods)
        },
        // 参数 goodsId 87
        deleteGoodsById(state,goodsId){
            state.buyCount = deleteLocalGoodsById(goodsId)
        }
    },
    actions:{
        // 类似于store
        asyncAddGoods(context,goods){
            // 模拟耗时操作
            setTimeout(() => {
                context.commit('addGoods',goods)
            }, 2000);
        }
    }
})

export default store