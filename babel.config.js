//es6 转 es5
module.exports = {
  presets: [
    "@vue/app"
  ],
  "plugins": [["import", {
    "libraryName": "iview",
    "libraryDirectory": "src/components"
  }]]
};
