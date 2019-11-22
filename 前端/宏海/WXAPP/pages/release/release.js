
const app = getApp()

Page({
  data: {
  
    date: '2019-11-11',
    time: '12:00',
    // app_openid: app_openid

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
 
  formSubmit: function (e) {
    if (e.detail.value.description.length == 0){
      wx.showToast({
        title: '任务详情不能为空',
        image: '/img/fail.png'
      })
    }
    else if (e.detail.value.title.length == 0){
      wx.showToast({
        title: '任务标题不能为空',
        image: '/img/fail.png'
      })
    }
    else if (e.detail.value.bounty.length == 0){
      wx.showToast({
        title: '赏金不能为空',
        image: '/img/fail.png'
      })
    }
    else{
    wx.request({
      url: 'https://www.dicky99.xyz:8080/task/publish',
      data: {
        'userName': app.globalData.userInfo.nickName,
        'bounty': e.detail.value.bounty,
        'description': e.detail.value.description,
        'title': e.detail.value.title,
        'userId': app.globalData.userid,
        "tips": e.detail.value.tips
      },
      method: 'POST',
      headers:
      {
        "Content-Type": "application/json"
      },
      success: function (res) {
        console.log(res.data)
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
    }
  //   var warn = "";//弹框时提示的内容
  //   var flag = true;//判断信息输入是否完整
    
  //   if (e.detail.value.bounty == "") {
  //     warn = "请填写您的赏金！";
  //   } else if (e.detail.value.content == '') {
  //     warn = "请填写您的任务简述"
  //   } else if (e.detail.value.description == "") {
  //     warn = "请输入您的任务详情";
  //   } else {
  //     flag = false;//若必要信息都填写，则不用弹框，且页面可以进行跳转

  //     var that = this;
  //     //？后面跟的是需要传递到下一个页面的参数
  //     wx.switchTab({
  //       url: '../market/market' ,
  //       success:function(e){
  //         var page = getCurrentPages().pop();
  //         if(page == undefined||page == null)return;
  //         page.onLoad();
  //       }
  //     })
      console.log('form发生了submit事件，携带数据为：', e.detail.value);
  //   }
  //   //如果信息填写不完整，弹出输入框
  //   if (flag == true) {
  //     wx.showModal({
  //       title: '提示',
  //       content: warn
  //     })
  //   }

   
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
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
})