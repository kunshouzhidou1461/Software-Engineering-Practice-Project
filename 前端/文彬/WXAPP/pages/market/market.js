var util = require('../../utils/util.js');
const app = getApp()

Page({
  data: {
    date: '2019-11-11',
  },
  onLoad: function () {
    var DATE = util.formatDate(new Date());

    this.setData({

      date: DATE,
    })
  },
  jump: function (event) {
    console.log(event)
    wx.redirectTo({
      url: "../taskDetail/taskDetail",
    })
  },
  fliter:function(){
    wx.redirectTo({
      url: '../fliter/fliter',
    })
  }
})