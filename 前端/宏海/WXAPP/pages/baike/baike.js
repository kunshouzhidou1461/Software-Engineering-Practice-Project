
var bake = require('../../utils/bake-data.js')

Page({
  data: {
    focus: true,
    inputValue: '',
    bake: []
  },

  //键盘输入时实时调用搜索方法
  input(e) {
    console.log(e)
    this.search(e.detail.value)
  },
  //点击完成按钮时触发
  confirm(e) {
    this.search(e.detail.value)
  },
  search(key) {
    var that = this;
    //从本地缓存中异步获取指定 key 的内容

    var bake = wx.getStorage({
      key: 'bake.baike',
      //从Storage中取出存储的数据
      success: function (res) {
        // console.log(res)
        if (key == '') { //用户没有输入时全部显示
          that.setData({
            bake: res.data
          })
          return;
        }
        var arr = []; //临时数组，用于存放匹配到的数组
        for (let i in res.data) {
          res.data[i].show = false; //所有数据隐藏
          if (res.data[i].search.indexOf(key) >= 0) {
            res.data[i].show = true; //让匹配到的数据显示
            arr.push(res.data[i])
          }
        }
        if (arr.length == 0) {
          that.setData({
            bake: [{ show: true, name: '没有相关数据！' }]
          })
        } else {
          that.setData({
            bake: arr
          })
        }
      },
    })
  },

onLoad:function(e){
    // var baikedata = [
    //   { name: "开学在校证明", show: true, search: "开学在校证明" },
    //   { name: "西安市第二人民医院", show: true, search: "西安市第二人民医院" },
    //   { name: "兰州市第一人民医院", show: true, search: "兰州市第一人民医院" },
    //   { name: "兰州市第二人民医院", show: true, search: "兰州市第二人民医院" }
    // ]
    wx.setStorage({
      key: 'bake.baike',
      data: bake.baike
    })
    this.setData({
      bake: bake.baike
    })

  // this.setData({
  //   baike: bakeData.baike
  // })

  // wx.setStorage({
  //   key: 'baike',
  //   data: bakeData.baike
  // })
},






  tap:function(e){
    
    var baikeId = e.currentTarget.dataset.id
    console.log(baikeId)
    wx.navigateTo({
      url: '../search_result/search_result?id=' + baikeId,
})
  }
})
