const KEY = "goods"

// 先取出本地已有的数据
const getLocalGoods = () => {
    return JSON.parse(localStorage.getItem(KEY) || '{}')
}

// 统计本地最新的商品的总数
const getTotalCount = () => {
    // {87:3,88:2}
    const localGoods = getLocalGoods()

    let totalCount = 0
    for(const key in localGoods){
        totalCount+=localGoods[key]
    }

    return totalCount
}

/**供Vuex调用的，把商品存储到本地 */
/**
 * {goodsId:90,count:2}
 * 
 *  key                     value
 * goods                   {87:3,88:2}
 * id作为key，数量作为value，但是如果原先key存在数量要累加
 */
const addLocalGoods = goods => {
    // 把goods中的商品存储到本地
    // localGoods === {87:3,88:2}
    const localGoods = getLocalGoods()

    // 传递过来的goodsId已经在本地有了
    if (localGoods[goods.goodsId]){ 
        localGoods[goods.goodsId] += goods.count
    }else{
        localGoods[goods.goodsId] = goods.count
    }

    localStorage.setItem(KEY,JSON.stringify(localGoods))

    // 存储完毕之后，统计最新的数量，返回给Vuex
    return getTotalCount()
}

/**
 * 更改商品数量的方法
 * 
 * goods ===> {goodsId:87,count:4}
 */
const updateLocalGoods = goods => {
    // 更新本地商品数量
    // {87:3,88:2}
    const localGoods = getLocalGoods()

    localGoods[goods.goodsId] = goods.count
    // ===> {87:4,88:2}

    localStorage.setItem(KEY,JSON.stringify(localGoods))

    // 返回重新计算的总数
    return getTotalCount()
}

// 根据id删除商品
const deleteLocalGoodsById = goodsId => {
    const localGoods = getLocalGoods()

    delete localGoods[goodsId]

    localStorage.setItem(KEY,JSON.stringify(localGoods))

    // 返回重新计算的总数
    return getTotalCount()
}

// 按需导出，可以导出多个成员，默认导出只能导出一个
export {
    addLocalGoods,
    getTotalCount,
    getLocalGoods,
    updateLocalGoods,
    deleteLocalGoodsById
}