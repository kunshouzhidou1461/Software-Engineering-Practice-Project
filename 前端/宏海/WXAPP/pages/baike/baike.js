// pages/baike/baike.js
Page({
  data: {
    focus: true,
    inputValue: ''
  },
  search:function(){
    wx.redirectTo({
      url: '../search_result/search_result',
    })
  },
  onLoad: function (options) {
    wx.showToast({
      title: '施工中...',
      icon: "loading",
      duration: 100000000
    })
  },
})