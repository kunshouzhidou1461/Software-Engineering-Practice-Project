const app = getApp()

Page({
  data: {
  
    date: '2019-11-11',
    time: '12:00'
 

  },
  onLoad: function () {

  },
 
  formSubmit: function (e) {
    var money = e.detail.value.money
    var content = e.detail.value.content
    var description = e.detail.value.description
    app.globalData.Money = money
    app.globalData.Content = content
    app.globalData.Description = description
    // console.log(app.globalData.Description)
    // console.log(app.globalData.Content)
    // console.log(app.globalData.Money)
    console.log(e)
    var warn = "";//弹框时提示的内容
    var flag = true;//判断信息输入是否完整
    //判断的顺序依次是：姓名-手机号-地址-具体地址-预约日期-预约时间-开荒面积
    if (e.detail.value.money == "") {
      warn = "请填写您的赏金！";
    } else if (e.detail.value.content == '') {
      warn = "请填写您的任务简述"
    } else if (e.detail.value.description == "") {
      warn = "请输入您的任务详情";
    } else {
      flag = false;//若必要信息都填写，则不用弹框，且页面可以进行跳转
      var that = this;
      //？后面跟的是需要传递到下一个页面的参数
      wx.switchTab({
        url: '../market/market?money=' ,
        success:function(e){
          var page = getCurrentPages().pop();
          if(page == undefined||page == null)return;
          page.onLoad();
        }
      })
        // + e.detail.value.money + '&content=' + e.detail.value.content + "&description=" + that.data.description
      console.log('form发生了submit事件，携带数据为：', e.detail.value);
    }
    //如果信息填写不完整，弹出输入框
    if (flag == true) {
      wx.showModal({
        title: '提示',
        content: warn
      })
    }
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