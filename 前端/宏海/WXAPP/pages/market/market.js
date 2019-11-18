var util = require('../../utils/util.js');
var taskData = require("../../data/task-data.js")


console.log(taskData.tasklist)
const app = getApp()

Page({
  data: {
    date: '2019-11-11',
  },
  onLoad: function () {
    var DATE = util.formatDate(new Date());
    var that=this
    var Money = app.globalData.Money
    var Content = app.globalData.Content
    var Description = app.globalData.Description
    
    
    taskData.tasklist
    that.setData({

      taskData: taskData.tasklist,
      // task,
      money:Money,
      date: DATE,
    })

  },
  
  jump: function (event) {
    console.log(event)
    var taskId = event.currentTarget.dataset.taskid
    var taskCondition = event.currentTarget.dataset.taskcondition
    console.log(taskCondition)
    wx.navigateTo({
      url: '../taskDetail/taskDetail?id='+taskId +"&condition="+taskCondition,
    })
    console.log(taskCondition)
  },
  fliter:function(){
    wx.redirectTo({
      url: '../fliter/fliter',
    })
  }

})



