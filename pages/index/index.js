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
          userList: res.data
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
    console.log(event.currentTarget.dataset)
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
  },
  goRegister() {
    wx.showModal({
      title: '提示',
      content: '您还没登录~~',
      confirmText: '去登陆',
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
  },
})