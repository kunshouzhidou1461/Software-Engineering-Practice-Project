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
  }

})