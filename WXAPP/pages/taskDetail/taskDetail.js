const app = getApp()
var taskData = require("../../data/task-data.js")
Page({
  data: {

  },
  onLoad: function (options) {
    var taskId = options.id
    var taskCondition = options.condition
    console.log(taskCondition)
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
    wx.showModal({
      title: '',
      content: '是否接单',
      success(res){
        if(res.confirm){
          wx.switchTab({
            url: '../market/market'
          })
        }
      }
    })
    
  }
})
