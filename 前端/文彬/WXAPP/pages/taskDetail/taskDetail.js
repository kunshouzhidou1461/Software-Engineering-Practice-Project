const app = getApp()

Page({
  data: {

  },
  onLoad: function () {

  },
  onUnload: function () {
    wx.reLaunch({
      url: 'pages/market/market'
    })
  },
  goback:function(){
    wx.switchTab({
      url: '../market/market'
    })
  }
})
