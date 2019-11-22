// pages/mymission/mission.js
var taskData = require("../../data/task-data.js")
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  tiao:function(){
    wx.navigateTo({
      url: '/pages/goaccepted/goaccepted',
    })
  },
  del: function(e) {
    console.log(e)
    var taskid = e.currentTarget.dataset.taskid
    console.log(taskid)
   
    wx.showModal({
      title: '',
      content: '是否删除任务',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: 'https://www.dicky99.xyz:8080/task/del/' + taskid, //是taskid,
            method: 'GET',
            success: res => {
              console.log(res.data)
            },
            fail: function (erro) {
              console.log(erro)
            }
          })
          
        }
         else if (res.cancel) {
          console.log('用户点击取消')
        }
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // var taskId = options.id
    // console.log(taskId)
    // var taskdata = taskData.tasklist[taskId]
    // console.log(taskdata)
    // console.log(taskdata.condition)
    // this.setData({
    //   taskdata,  
    //   taskdata.condition:"已接单"
    // })
    // console.log(app.globalData.userid)
    wx.request({
      url: 'https://www.dicky99.xyz:8080/task/getUnacceptedTasksById/' + app.globalData.userid,
      method: 'GET',
      success: res => {
        console.log(res.data)
        this.setData({
          task: res.data

        })
      },


    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  
})