// pages/released_detail/released_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden: false,
    showModalStatus: false,
    array: ['快递', '拼车', '代课', '其他'],
    index: 0,
  },
  bindPickerChange: function (e) {

    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    
    wx.getStorage({
      key: 'bounty',
      success: res => {
        this.setData({
          bounty: res.data
        })
      }
    })
    wx.getStorage({
      key: 'description',
      success: res => {
        this.setData({
          description: res.data
        })
      }
    })
    wx.getStorage({
      key: 'title',
      success: res => {
        this.setData({
          title: res.data
        })
      }
    })
    wx.getStorage({
      key: 'tips',
      success: res => {
        this.setData({
          tips: res.data
        })
      }
    })
    wx.getStorage({
      key: 'taskId',
      success: res => {
        this.setData({
          taskId: res.data
        })
      }
    })

    var taskid = options.taskid
    console.log(taskid)
    wx.request({
      url: 'https://www.dicky99.xyz:8080/task/taskInfo/' + taskid,
      method: 'GET',
      success: res => {
        console.log(res.data)
        //将任务信息存入本地缓存，修改是调用 修改
        wx.setStorageSync("taskId", res.data.taskId)
        wx.setStorageSync("title", res.data.title)
        wx.setStorageSync("description", res.data.description)
        wx.setStorageSync("tips", res.data.tips)
        wx.setStorageSync("bounty", res.data.bounty)
        this.setData({

          task: res.data

        })
      },
      
    })
    wx.getStorage({
      key: 'bounty',
      success: res=>{        
        this.setData({
          bounty: res.data
        })
      }
    })
    wx.getStorage({
      key: 'description',
      success: res => {
        this.setData({
          description: res.data
        })
      }
    })
    wx.getStorage({
      key: 'title',
      success: res => {
        this.setData({
          title: res.data
        })
      }
    })
    wx.getStorage({
      key: 'tips',
      success: res => {
        this.setData({
          tips: res.data
        })
      }
    })
    wx.getStorage({
      key: 'taskId',
      success: res => {
        this.setData({
          taskId: res.data
        })
      }
    })

  },
  onShow() {
    const self = this
    let description = wx.getStorageSync('description')
    let tips = wx.getStorageSync('tips')
    let bounty = wx.getStorageSync('bounty')
    let title = wx.getStorageSync('title')
    if (description) {
      self.data.description = description      
      self.setData(self.data)
    }
    if (title) {
      self.data.title = title
      self.setData(self.data)
    }
    if (bounty) {
      self.data.bounty = bounty
      self.setData(self.bounty)
    }
    if (tips) {
      self.data.tips = tips
      self.setData(self.tips)
    }
 
      // page载入的时候先读取一次，wx.getStorageSync('userText')里面有没有内容，有内容就填充，没有则什么也不做
  },
  formSubmit:function(e){
  this.onShow()
    wx.request({
      url: 'https://www.dicky99.xyz:8080/task/updateTask',
      method: 'POST',
      Headers:
        { "Content-Type": "application/json" },
      data:
      {
        "taskId": this.data.taskId,
        "title": e.detail.value.title,
        "description": e.detail.value.description,
        "bounty": e.detail.value.bounty,
        "tips": e.detail.value.tips
      },
      success:res=>{
        console.log(res.data)
        if (res.data.status == "success"){
          wx.showToast({
            title: '修改成功',
          })
          var timer = setTimeout(function(){
            wx.navigateTo({
              url: '../mymission/mymission',
            })
          },2000) 
        
        }
      }
      
    })
    console.log(this.data.taskId)
  },
// 删除
  del: function (e) {

  var taskid= this.data.task.taskId
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
              wx.navigateTo({
                url: '../mymission/mymission',
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
// 修改

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
  // edit:function(e){
  //   var taskid = this.data.task.taskId
  //   wx.showModal({
  //     title: '是否修改任务',
  //     success(res){
  //       if(res.confirm){
  //         wx.request({
  //           url: 'https://www.dicky99.xyz:8080/task/checkStatus/' + taskid,
  //           method:"GET",
  //           success:res=>{
  //             console.log(res.data)
  //             if (res.data.authority == "enable"){
  //               console.log("可以修改")
  //             //  修改操作



  //             } 
  //             else if(res.data.authority == "disable")
  //             {
  //               console.log("不可以修改")
  //               wx.showToast({
  //                 title: '任务已被接取不可修改',
  //               })
  //             }
              
             
  //           }
  //         })
  //       }
  //     }
      
  //   })
  // },




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

  }
})