const app = getApp()

Page({
  data: {
    task: [],
    
  },
  onLoad: function (options) {
    var contactDetail = app.globalData.contactDetail
    this.setData({
      contactDetail
    })
    var taskid = options.taskid
    console.log(taskid)
    wx.request({
      url: 'https://www.dicky99.xyz:8080/task/taskInfo/' + taskid,
      method: 'GET',
      success: res => {
        console.log(res.data)

        this.setData({

          task:res.data

        })
      },
    })  
    if (app.globalData.userid == 0) {
      wx.showToast({
        title: '未登录！ ',
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
    var userID = e.currentTarget.dataset.userid
    if (userID == app.globalData.userid){
     wx.showToast({
       title: '不允许',
       image: '/img/fail.png'
     })
    }else{
      
    wx.showModal({
      title: '',
      content: '是否接单',
      success(res) {
        console.log(taskId)
        console.log(app.globalData.userid)
        if (res.confirm) {
          wx.request({
            url: 'https://www.dicky99.xyz:8080/task/acceptTask?taskId=' + taskId + '&userId=' + app.globalData.userid,
            method: 'POST',
            success: function (res) {
              console.log(res.data)
              if (res.data.error_reason =="Task has been accepted"){
                wx.showToast({
                  title: '任务已被接取！',
                  image:'/img/warning1.png'
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
    }
})