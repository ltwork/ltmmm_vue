// 配置参考: https://cli.vuejs.org/zh/config/#%E5%85%A8%E5%B1%80-cli-%E9%85%8D%E7%BD%AE
module.exports = {
  // 关闭掉整个eslint的代码检查功能
  lintOnSave:false,
  // 设置页面加载的baseURL
  baseUrl: "./",
  productionSourceMap:false, // 不生成sourceMap文件
  configureWebpack:{
    externals: {
      vue: 'Vue'
    }
  }
};
