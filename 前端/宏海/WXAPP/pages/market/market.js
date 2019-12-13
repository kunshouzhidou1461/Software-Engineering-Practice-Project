var util = require('../../utils/util.js');


const app = getApp()

Page({
  data: {
    tabTxt: ['类型', '排序方式', '排序','状态'],//分类
    tab: [true, true, true,true],
    categoryList: [{ 'id': '1', 'title': '快递' }, { 'id': '2', 'title': '拼车' }, { 'id': '3', 'title': '代课' },{ 'id': '4', 'title': '其他' }],
    category_id: 0,//类型
    category_txt: '',
    jiage_id: 0,//排序方式
    jiage_txt: '',
    xiaoliang_id: 0,//排序 
    xiaoliang_txt: '',
    status_id:0,//状态
     status_txt: ''
  },

  // 选项卡
  filterTab: function (e) {
    var data = [true, true, true,true], index = e.currentTarget.dataset.index;
    data[index] = !this.data.tab[index];
    this.setData({
      tab: data
    })
  },

  //筛选项点击操作
  filter: function (e) {
    var self = this, id = e.currentTarget.dataset.id, txt = e.currentTarget.dataset.txt, tabTxt = this.data.tabTxt;
    switch (e.currentTarget.dataset.index) {
      case '0':
        tabTxt[0] = txt;
        self.setData({
          tab: [true, true, true,true],
          tabTxt: tabTxt,
          category_id: id,
          category_txt: txt
        });
        break;
      case '1':
        tabTxt[1] = txt;
        self.setData({
          tab: [true, true, true, true],
          tabTxt: tabTxt,
          jiage_id: id,
          jiage_txt: txt
        });
        break;
      case '2':
        tabTxt[2] = txt;
        self.setData({
          tab: [true, true, true, true],
          tabTxt: tabTxt,
          xiaoliang_id: id,
          xiaoliang_txt: txt
        });
        break;
      case '3':
        tabTxt[3] = txt;
        self.setData({
          tab: [true, true, true, true],
          tabTxt: tabTxt,
          status_id: id,
          status_txt: txt
        });
        break;
    }
    //数据筛选
    self.getDataList();
  },

  //加载数据
  getDataList: function () {
    //调用数据接口，获取数据

    var categoryid = this.data.category_id-1
    if (categoryid ==-1){
      categoryid ="all"
    }
    var sort = this.data.xiaoliang_id-1

    var status = this.data.status_id
    //排序类型
    var sortby = this.data.jiage_id-1
    if (sortby==0){
      sortby = "postAt"
    }
    else if (sortby ==1){
      sortby = "bounty"
    }
    else if (sortby ==2){
      sortby ="creditIndex"
    }
    else if (sortby ==-1){
      sortby = "postAt"
    }
  // 排序方式
    if (sort ==0){
      sort = "desc"
    }
    else if (sort ==1){
      sort ="asc"
    }
    else if(sort ==-1){
      sort = "desc"
    }
  // 状态
    if (status ==1){
      status ="accepted"
    }
    else if(status ==2){
      status = "unaccepted"
    }
    else if (status==0){
      status = "all"
    }

    console.log(sort)
    console.log(categoryid)
    wx.request({
      url: 'https://www.dicky99.xyz:8080/task/select?status='+status+'&category=' + categoryid + '&sortBy=' + sortby+'&sort=' + sort,
      method: 'GET',
      success: res => {
        console.log(res.data)
        var type1 = "未接单"
        var type2 = "已接单"
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].status == "0") {
            res.data[i].type = type1
          }
          else if (res.data[i].status == "1") {
            res.data[i].type = type2
          }
        }
        this.setData({
          task: res.data,
        })

        // for (var i = 0; i < res.data.length; i++) {

        //   if (res.data[i].status == 0) {
        //     var status = "未接单"
        //     res.data[i].status == "未接单"
        //     console.log(res.data[i].status)
        //     that.setData({ task: res.data })
        //   }

        // }

      },

    })


  },

  onPullDownRefresh: function () {
    wx.showNavigationBarLoading()  //在标题栏中显示加载
    this.onLoad()  //重新加载数据
    //模拟加载  1秒
    setTimeout(function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1000);
  },

  onLoad: function (res) {
    var that = this


    //加在市场
    wx.request({
      url: 'https://www.dicky99.xyz:8080/task/select?status=all&category=all&sortBy=postAt&sort=desc',
      method: 'GET',
      success: res=> {
        console.log(res.data)
        var type1 = "未接单"
        var type2 = "已接单"
        for(var i=0;i<res.data.length;i++){
          if (res.data[i].status =="0"){
            res.data[i].type = type1
          }
          else if(res.data[i].status == "1")
          {
            res.data[i].type = type2
          }
        }
        that.setData({
          task: res.data,
        })
       
        // for (var i = 0; i < res.data.length; i++) {
      
        //   if (res.data[i].status == 0) {
        //     var status = "未接单"
        //     res.data[i].status == "未接单"
        //     console.log(res.data[i].status)
        //     that.setData({ task: res.data })
        //   }
         
        // }

      },
    
    })
 


  },

  jump: function (event) {
    console.log(event)
    var taskid = event.currentTarget.dataset.taskid
    console.log(taskid)
    wx.navigateTo({
      url: '../taskDetail/taskDetail?taskid=' + taskid,
    })

  },

  fliter: function () {
    wx.redirectTo({
      url: '../fliter/fliter',
    })
  },

  search: function () {
    wx.request({
      url: 'https://www.dicky99.xyz:8080/task/all',
      method: 'GET',
      success: function (res) {
        console.log(res.data)
        console.log(app.globalData.userid)
      }
    })
  }

})