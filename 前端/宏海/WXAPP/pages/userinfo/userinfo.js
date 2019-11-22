// pages/userinfo/userinfo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  formSubmit: function (e) {
    console.log('form发生了submit事件，提交数据：', e.detail.value)
    wx.request({
      url: 'https://www.dicky99.xyz:8080/user/register',
      data: {
        'userName': app.globalData.userInfo.nickName,
        'userSex': e.detail.value.userSex,
        'contactType': e.detail.value.contactType,
        'contactDetail': e.detail.value.contactDetail,
        'openid': app.globalData.openid
        
      },
      method: 'POST',
      header: {
        "Content-Type": "application/json"
      },
      success: res => {
        console.log(res.data)
        console.log(res.data.userId)
        app.globalData.userid = res.data.userId
        app.globalData.sex = res.data.userSex
        app.globalData.contactDetail = res.data.contactDetail
        // wx.setStorageSync('contactDetail', app.globalData.contactDetail)//将contactDetail存入本地缓存
        // wx.setStorageSync('user_id', app.globalData.userid)//将userid存入本地缓存
        console.log(app.globalData.userid)
        if(res.data.status==500){
          wx.showToast({
            title: '您已经注册过账号了',
            image: '/img/fail.png'
          })
        }
        else{
          wx.showToast({
            title: '注册成功',
            duration:2000
          })
          wx.switchTab({
            url: '/pages/mainpage_renwu/mainpage_renwu',
          })
        }
      }
    })
  },

  del:function(){
    wx.request({
      url: 'https://www.dicky99.xyz:8080/user/del/141',
      method: 'GET',
      success: function (res) {
        console.log(res.data)
       
      }
    })
  },
  search: function () {
    wx.request({
      url: 'https://www.dicky99.xyz:8080/user/alluser',
      method: 'GET',
      success: function (res) {
        console.log(res.data)

      }
    })
  },


  formReset: function () {
    console.log('form发生了reset事件')
    wx.request({
      url: 'https://www.dicky99.xyz:8080/user/alluser',
      method: 'GET',
      success: function (res) {
        console.log(res.data)
        console.log(app.globalData.userid)
      }
    })
  }


})