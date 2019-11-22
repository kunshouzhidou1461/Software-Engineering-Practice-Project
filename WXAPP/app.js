//app.js

App({
  onLaunch: function () {
    // 展示本地存储能力
   
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.getStorage({
      key: 'user_id',
      success:res => {
         this.globalData.userid =res.data 
         console.log(res.data)
      },
    })
    wx.getStorage({
      key: 'contactDetail',
      success: res=> {
        this.globalData.contactDetail = res.data
        // console.log(res.data)
      },
    })
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey
        // console.log(res.code)
        if (res.code) {
          // console.log(res.code)
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session',//微信服务器获取appid的网址 不用变
            method: 'post',//必须是post方法
            data: {
              js_code: res.code,
              appid: 'wx56fd49ca2db6c37a',//仅为实例appid
              secret: 'a0ce950fd6d96f48317033032fc568cc',//仅为实例secret
              grant_type: 'authorization_code'
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded',
            },
            success: response => {
             
              // console.log(response.data.openid)

              this.globalData.openid = response.data.openid

              wx.setStorageSync('app_openid', response.data.openid); //将openid存入本地缓              
              wx.setStorageSync('sessionKey', response.data.session_key)//将session_key 存入本地缓存命名为SessionKey
            }
          })
        } else {
          console.log("登陆失败");
        }
      }
    })

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    openid:"11",
    // openid = o7m585R0Bf9Kv7Ryugh19WI1HGUk
    userid:0,
    //userid = 64 
    contactDetail:"",
    isAccept:[],
    task: []

  }
})