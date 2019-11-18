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
    
    var task = [
      {
        condition: "已接单",
        content: "玫瑰园二楼水煮带饭",
        tips: "不要辣",
        money: "20",
        description: "玫瑰园二楼水煮带饭什么菜什么菜什么菜什么菜什么菜什么菜什么菜什么菜什么菜什么菜什么菜什么菜什么菜什么菜",
        id: "0"
      },
      {
        condition: "未接单",
        content: "韵达快递二十件",
        tips: "有重物",
        description: "订单号 手机号姓名订单号 手机号姓名订单号 手机号姓名订单号 手机号姓名订单号 手机号姓名订单号 手机号姓名订单号 手机号姓名订单号 手机号姓名订单号 手机号姓名订单号 手机号姓名订单号 手机号姓名订单号 手机号姓名订单号 手机号姓名订单号 手机号姓名订单号 手机号姓名订单号 手机号姓名",
        money: "100",
        id: "1"
      },
      {
        condition: "未接单",
        content: "四六级材料",
        tips: "有做过",
        description: "四六级材料四六级材料四六级材料四六级材料四六级材料四六级材料四六级材料四六级材料四六级材料四六级材料四六级材料四六级材料四六级材料四六级材料v四六级材料四六级材料四六级材料四六级材料四六级材料四六级材料四六级材料四六级材料四六级材料四六级材料",
        money: "5",
        id: "2"
      },
      {
        condition: "未接单",
        content: "四六级材料",
        tips: "有做过",
        description: "四六级材料四六级材料四六级材料四六级材料四六级材料四六级材料四六级材料四六级材料四六级材料四六级材料四六级材料四六级材料四六级材料四六级材料v四六级材料四六级材料四六级材料四六级材料四六级材料四六级材料四六级材料四六级材料四六级材料四六级材料",
        money: "5",
        id: "3"
      },
    ]
    taskData.tasklist
    that.setData({

      taskData: taskData.tasklist,
      task,
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
    console.log(taskId)
  },
  fliter:function(){
    wx.redirectTo({
      url: '../fliter/fliter',
    })
  }

})



