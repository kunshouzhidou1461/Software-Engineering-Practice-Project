
const app = getApp()

Page({
  data: {
  
   
    // app_openid: app_openid
    array: ['快递', '拼车', '代课', '其他'],
    index: 0,
  },
  onLoad: function () {
    // console.log(app.globalData.userid)
    // wx.getStorage({
    //   key: 'app_openid',
    //   success: function(res) {
    //     var userid=res.data
    //     // console.log(userid)
    //   },
    // })
    console.log(app.globalData.contactDetail)
    var nickname = app.globalData.userInfo.nickName
    var contactDetail = app.globalData.contactDetail
    this.setData({
      nickname,
      contactDetail
    })
  },


  bindPickerChange: function (e) {

    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },


  formSubmit: function (e) {
    var category = this.data.index;
    // if (e.detail.value.description.length == 0){
    //   wx.showToast({
    //     title: '任务详情不能为空',
    //     image: '/img/fail.png'
    //   })
    // }
    // else if (e.detail.value.title.length == 0){
    //   wx.showToast({
    //     title: '任务标题不能为空',
    //     image: '/img/fail.png'
    //   })
    // }
    // else if (e.detail.value.bounty.length == 0){
    //   wx.showToast({
    //     title: '赏金不能为空',
    //     image: '/img/fail.png'
    //   })
    // }
    // else{

    wx.request({
      url: 'https://www.dicky99.xyz:8080/task/publish',
      data: {
        'userName': app.globalData.userInfo.nickName,
        'bounty': e.detail.value.bounty,
        'description': e.detail.value.description,
        'title': e.detail.value.title,
        'userId': app.globalData.userid,
        "tips": e.detail.value.tips,
        "category": category
      },
      method: 'POST',
      headers:
      {
        "Content-Type": "application/json"
      },
      success: function (res) {
        console.log(res.data)
       // console.log("type打印出来", type)
        if (res.data.status =="success"){
          wx.showToast({
            title: '发布成功',
            duration: 2000
          })
          wx.navigateTo({
            url: '/pages/market/market',
          })
        }
        else{
          wx.showToast({
            title: '发布失败',
          })
        }
      }
    })
    wx.switchTab({
      url: '/pages/market/market',
    })
    // }
  
      console.log('form发生了submit事件，携带数据为：', e.detail.value);
   
   
  },


  formReset: function () {
    console.log('form发生了reset事件')
  },


  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    // console.log(e)
    this.setData({
      time: e.detail.value
    })
  },

})