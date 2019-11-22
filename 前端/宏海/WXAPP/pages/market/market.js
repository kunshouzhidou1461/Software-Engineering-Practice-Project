var util = require('../../utils/util.js');
var taskData = require("../../data/task-data.js")


console.log(taskData.tasklist)
const app = getApp()

Page({
  data: {
    date: '2019-11-11',

  },
  onPullDownRefresh: function () {
    　　　wx.showNavigationBarLoading()  //在标题栏中显示加载
           this.onLoad()  //重新加载数据
    　　　　//模拟加载  1秒
    　　　　setTimeout(function () {
      　　　　// complete
      　　　　wx.hideNavigationBarLoading() //完成停止加载
      　　　　wx.stopPullDownRefresh() //停止下拉刷新
    　　　　}, 1000);
  },

  onLoad: function(res) {
    var that = this
    var DATE = util.formatDate(new Date());

    //加在市场
    wx.request({
      url: 'https://www.dicky99.xyz:8080/task/all',
      method: 'GET',
      // data:{
      //   bounty: res.data.bounty
      // },
      success: function(res) {
        // for(var i=0;i<res.data.length;i++){
        // console.log(res.data[i].isAccept)
        // that.setData({
        //   isaccept: res.data[i].isAccept
        // })
        // }
        that.setData({
          task: res.data,
        })
      },
      
    })
    
    that.setData({
      // task.isAccept:app.globalData.isAccept,
      date: DATE,
      
    })

  },

  jump: function(event) {
    console.log(event)
    var taskindex = event.currentTarget.dataset.taskid
    var isAccept = event.currentTarget.dataset.isAccept
    console.log(taskindex)
    wx.navigateTo({
      url: '../taskDetail/taskDetail?index=' + taskindex, //还没传任务的状态isAccept
    })

  },

  fliter: function() {
    wx.redirectTo({
      url: '../fliter/fliter',
    })
  },

  search: function() {
    wx.request({
      url: 'https://www.dicky99.xyz:8080/task/all',
      method: 'GET',
      success: function(res) {
        console.log(res.data)
        console.log(app.globalData.userid)
      }
    })
  }

})