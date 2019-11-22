const app = getApp()
var taskData = require("../../data/task-data.js")
Page({
  data: {
    task: [],
    
  },
  onLoad: function (options) {
    var contactDetail = app.globalData.contactDetail
    this.setData({
      contactDetail
    })
    var taskindex = options.index
    console.log(taskindex)
    wx.request({
      url: 'https://www.dicky99.xyz:8080/task/all',
      method: 'GET',
      success: res => {
        console.log(res.data)

        this.setData({

          task: res.data[taskindex]


        })
      },
    })  
    if (app.globalData.userid == 0) {
      wx.showToast({
        title: '去我的进行登录 ',
        image: '/img/fail.png'
      })
    } 

    // var taskdata = taskData.tasklist[taskId]
    // this.setData({
    //   taskdata
    // })
  },
  onUnload: function () {
    wx.reLaunch({
      url: 'pages/market/market'
    })
  },
  goback: function (e) {
    // console.log(e)
    var taskId = e.currentTarget.dataset.taskid
    // console.log(taskId)

    wx.showModal({
      title: '',
      content: '是否接单',
      success(res) {
        if (res.confirm) {

          wx.request({
            url: 'https://www.dicky99.xyz:8080/task/acceptTask?taskId=' + taskId + '&userId=' + app.globalData.userid,
            method: 'POST',
            success: function (res) {
              console.log(res.data)
              if(res.data.status=="error"){
                wx.showToast({
                  title: '任务已经被接取！',
                  image:'/img/fail.png'
                })
              }    //若任务被人接取提示任务已经被人接取
              else if(res.data.status == "success")
              {
                wx.showToast({
                  title: '成功接取',
                  duration: 2000
                })
                wx.switchTab({
                  url: '/pages/mainpage_renwu/mainpage_renwu',
                  duration:3000
                })
              }          
            },
          })

        }
        }
    })
    }
})