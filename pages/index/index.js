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
    pageSize: 20
  },

  onLoad() {

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
        this.setData({
          userList: res.data.list
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
    this.setData({
      loading: true
    })
    setTimeout(() => {
      this.setData({
        loading: false
      })
    }, 3000)
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
  }
})