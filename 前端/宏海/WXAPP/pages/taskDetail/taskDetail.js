const app = getApp()
var taskData = require("../../data/task-data.js")
Page({
  data: {

  },
  onLoad: function (options) {
    var taskId = options.id
    var taskdata = taskData.tasklist[taskId]
    this.setData({
      taskdata
      })
    console.log(taskId)
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
