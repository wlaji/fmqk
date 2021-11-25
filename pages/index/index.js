// index.js
// 获取应用实例
const app = getApp()
import {
  getPushUserNoLogin,
  getPushUserByUserId
} from '../../api/index'
Page({
  data: {
    userList: [],
    loading: false,
    noMore: false,
    loadingFailed: false,
    isLogin: false,
    page: 1,
    pageSize: 10,
    total:'',
  },

  onLoad() {

  },

  initUserData(list){
    list.forEach(item=>{
      let condition = item.conditionList.find(citem=>{
        return citem.conditionType === 1
      })
      item.location = condition.region&&condition.region.length?JSON.parse(condition.region)[1]:'';
      item.height = condition.height;
    })
    return list
  },

  onShow() {
    if (wx.getStorageSync('token')) {
      this.setData({
        isLogin: true
      })
      getPushUserByUserId({
        page:this.data.page,
        pageSize:this.data.pageSize
      }).then(res => {
        let list = this.initUserData(res.data.list)
        this.setData({
          userList: list,
          total:res.data.total
        })
      })
    } else {
      this.setData({
        isLogin: false
      })
      getPushUserNoLogin().then(res => {
        this.setData({
          userList: res.data
        })
      })
    }
  },

  viewDetail(event) {
    console.log(event)
    if(this.data.isLogin){
      let id = event.currentTarget.dataset.id
      wx.navigateTo({
        url: `/pages/userDetail/userDetail?id=${id}`,
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '您还没登录~~',
        confirmText: '去登陆',
        cancelText:'再看看',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/completeInfo/completeInfo',
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },

  onReachBottom() {
    console.log(321321)
    if(!this.data.isLogin){
      return false;
    }
    if(this.data.total<=this.data.userList.length){
      this.setData({
        noMore: true
      })
      return false;
    }
    this.setData({
      loading: true
    })
    setTimeout(() => {
      this.setData({
        loading: false
      })
    }, 1000)
    this.setData({
      page:this.data.page+1
    })
    getPushUserByUserId({
      page:this.data.page,
      pageSize:this.data.pageSize
    }).then(res => {
      let list = this.initUserData(res.data.list)
      this.setData({
        userList: this.data.userList.concat(list)
      })
    })
  },

  onPullDownRefresh() {
    wx.showLoading({
      title: '刷新中...',
    })
    this.onShow()
    setTimeout(() => {
      wx.hideLoading();
      //停止下拉刷新
      wx.stopPullDownRefresh();
    }, 2000)
  },
  filterLocation(val){
    console.log(val)
    return '321321'
  }
})