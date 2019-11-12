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
})
