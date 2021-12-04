// index.js
// 获取应用实例
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
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
    total: '',
  },

  onLoad() {
    if (wx.getStorageSync('token')) {
      getPushUserByUserId({
        page: 1,
        pageSize: this.data.pageSize
      }).then(res => {
        let list = this.initUserData(res.data.list)
        this.setData({
          userList: list,
          total: res.data.total
        })
      })
    } else {
      getPushUserNoLogin().then(res => {
        let list = this.initUserData(res.data)
        this.setData({
          userList: list,
        })
      })
    }
  },

  initUserData(list) {
    list.forEach(item => {
      let condition = item.conditionList.find(citem => {
        return citem.conditionType === 1
      })
      item.location = condition.region && condition.region.length ? JSON.parse(condition.region)[1] : '';
      item.height = condition.height;
      item.profession = condition.profession
    })
    return list
  },

  onShow() {
    if (wx.getStorageSync('token')) {
      this.setData({
        isLogin: true
      })
    } else {
      this.setData({
        isLogin: false
      })
    }
  },

  viewDetail(event) {
    console.log(event)
    if (this.data.isLogin) {
      let id = event.currentTarget.dataset.id
      wx.navigateTo({
        url: `/pages/userDetail/userDetail?id=${id}`,
      })
    } else {
      Dialog.confirm({
          title: '提示',
          message: '您还没登录!',
          confirmButtonText: "去登陆",
          cancelButtonText: "再看看"
        })
        .then(() => {
          wx.navigateTo({
            url: '/pages/completeInfo/completeInfo',
          })
        })
        .catch(() => {
          // on cancel
        });

    }
  },

  onReachBottom() {
    if (!this.data.isLogin) {
      return false;
    }
    if (this.data.total <= this.data.userList.length) {
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
      page: this.data.page + 1
    })
    getPushUserByUserId({
      page: this.data.page,
      pageSize: this.data.pageSize
    }).then(res => {
      let list = this.initUserData(res.data.list)
      this.setData({
        userList: this.data.userList.concat(list)
      })
    })
  },

  onPullDownRefresh() {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
    });
    this.setData({
      page:1
    })
    this.onLoad();
    setTimeout(() => {
      //停止下拉刷新
      wx.stopPullDownRefresh();
    }, 1000)
  },
  filterLocation(val) {
    console.log(val)
    return '321321'
  }
})