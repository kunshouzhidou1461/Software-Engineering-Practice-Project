// pages/mymission/mission.js
var taskData = require("../../data/task-data.js")
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
    winWidth: 0,

    winHeight: 0,

    // tab切换  

    currentTab: 0,  

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
              wx.showToast({
                title: '删除成功',
              })
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
    wx.request({
      url: 'https://www.dicky99.xyz:8080/task/getAcceptedTasksById/' + app.globalData.userid,
      method: 'GET',
      success: res => {
        console.log(res.data)
        this.setData({  
          task2: res.data

        })
      },


    })
    var that = this;  
    wx.getSystemInfo({
      success: function(res) {
        that.setData({

          winWidth: res.windowWidth,

          winHeight: res.windowHeight

        });  
      },
    })
    wx.request({
      url: 'https://www.dicky99.xyz:8080/task/getReleasedTasksById/' + app.globalData.userid,
      method: 'GET',
      success: res => {
        console.log(res.data)
        that.setData({
          task: res.data

        })

       
      },


    })
  },
  bindChange: function (e) {



    var that = this;

    that.setData({ currentTab: e.detail.current });



  },  
  swichNav: function (e) {



    var that = this;



    if (this.data.currentTab === e.target.dataset.current) {

      return false;

    } 
    else {

      that.setData({

        currentTab: e.target.dataset.current

      })

    }

  },
  



  // hidden:function(){
   
  //   var hidden = that.data.hidden 
  //   that.setData({
  //     hidden: !that.data.hidden
  //   })
  // }, 

  
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