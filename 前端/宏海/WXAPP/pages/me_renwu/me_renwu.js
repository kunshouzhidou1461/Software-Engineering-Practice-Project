//index.js
//获取应用实例
const app = getApp()

Page({

  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    text:"已经注册过？点击此处登陆",
    hidden:false,
    showModalStatus: false
  },
  //事件处理函数
  // bindViewTap: function() {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
  onLoad: function (options) {
    
    showView: (options.showView == "true" ? true : false)
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  del: function () {
    wx.request({
      url: 'https://www.dicky99.xyz:8080/user/del/180',
      method: 'GET',
      success: function (res) {
        console.log(res.data)

      }
    })
  },
  powerDrawer: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
  },
  util: function (currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例   
    var animation = wx.createAnimation({
      duration: 200,  //动画时长  
      timingFunction: "linear", //线性  
      delay: 0  //0则不延迟  
    });

    // 第2步：这个动画实例赋给当前的动画实例  
    this.animation = animation;

    // 第3步：执行第一组动画  
    animation.opacity(0).rotateX(-100).step();

    // 第4步：导出动画对象赋给数据对象储存  
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画  
    setTimeout(function () {
      // 执行第二组动画  
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象  
      this.setData({
        animationData: animation
      })

      //关闭  
      if (currentStatu == "close") {
        this.setData(
          {
            showModalStatus: false
          }
        );
      }
    }.bind(this), 200)

    // 显示  
    if (currentStatu == "open") {
      this.setData(
        {
          showModalStatus: true
        }
      );
    }
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
        if (res.data.status == 500) {
          wx.showToast({
            title: '您已经注册过账号了',
            image: '/img/fail.png'
          })
        }
        else {
         
          wx.switchTab({
            url: '/pages/mainpage_renwu/mainpage_renwu',
          })
          wx.showToast({
            title: '注册成功',
            duration: 2000
          })
        }
      }
    })
  },
  sign: function () {
    var that = this
    wx.request({
      url: 'https://www.dicky99.xyz:8080/user/judge/' + app.globalData.openid,
      method: 'GET',
      success: function (res) {
        console.log(res.data)
        app.globalData.userid = res.data.userId
        app.globalData.contactDetail = res.data.contactDetail
        // wx.setStorageSync('contactDetail', app.globalData.contactDetail)//将contactDetail存入本地缓存      
        // wx.setStorageSync('user_id', app.globalData.userid)//将userid存入本地缓存
        console.log(res.data.userId)
        if (res.data.userId != undefined) {
          that.setData({
            hidden: true
          })
          wx.showToast({
            title: '登录成功',
          })
          }
        else
        {
          wx.showToast({
            title: '请先注册',
            image:'/img/fail.png'
          })
        }
       
      }
    })
    
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  gomainpage: function () {
    wx.redirectTo({
      url: '../main_page/main_page',
    })
  },
  gome_renwu: function () {
    wx.redirectTo({
      url: '../mymission/mymission'
    })
  },
  toinfo:function(){
    wx.navigateTo({
      url: '../userinfo/userinfo',
    })
  }
})