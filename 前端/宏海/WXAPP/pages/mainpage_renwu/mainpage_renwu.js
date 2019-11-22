// pages/mainpage_renwu/mainpage_renwu.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModalStatus: false,
    hiddenb:false,
     showModal: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    if (app.globalData.userid != 0) {
      this.setData({
        hiddenb:true
      })
    }
    console.log(app.globalData.userid)
    if (app.globalData.userid ==0){
      // wx.showToast({
      //   title: '去我的进行登录 ',
      //   icon:"warning",
      //   duration:3000
      // })
      this.setData({
        showModal:true
      })
    }   ///改
  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function () {
  },
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  /**
    * 对话框取消按钮点击事件
    */
  onCancel: function () {
    this.hideModal();
  },
  
 
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  gomarket: function () {
    wx.switchTab({
      url: '../market/market'
    })
  },
  gome_renwu: function () {
    wx.navigateTo({
      url: '../mymission/mymission'
    })
  },
  gorelease:function(){
    wx.navigateTo({
      url: '../release/release',
    })
  }
})