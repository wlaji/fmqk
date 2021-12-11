// index.js
// 获取应用实例
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
const app = getApp()
import {
  getPushUserNoLogin,
  getPushUserByUserId,
  getAppCheckInfo
} from '../../api/index'
Page({
  data: {
    background: [{
      url:'/static/images/2.jpg'
    },{
      url:'/static/images/2.jpg'
    },{
      url:'/static/images/2.jpg'
    }],
    isCheck:2,
    userList: [],
    userNologinList:[],
    loading: false,
    noMore: false,
    loadingFailed: false,
    isLogin: false,
    page: 1,
    pageSize: 20,
    total: '',
    bgSrc2: '/static/images/20.jpg'
  },

  onLoad() {

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
    getAppCheckInfo().then(res => {
      this.setData({
        isCheck: Number(res.data.configValue)
      })
    })
    if (wx.getStorageSync('token')) {
      this.setData({
        isLogin: true,
      })
      if(!this.data.userList.length){
        this.setData({
          page: 1,
          noMore: false
        })
        getPushUserByUserId({
          page: this.data.page,
          pageSize: this.data.pageSize
        }).then(res => {
          let list = this.initUserData(res.data.list)
          this.setData({
            userList: list,
            total: res.data.total
          })
        })
      }
    } else {
      this.setData({
        isLogin: false
      })
      getPushUserNoLogin().then(res => {
        let list = this.initUserData(res.data)
        this.setData({
          userNologinList: list,
        })
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
    this.setData({
      page: this.data.page + 1
    })
    getPushUserByUserId({
      page: this.data.page,
      pageSize: this.data.pageSize
    }).then(res => {
      let list = this.initUserData(res.data.list)
      this.setData({
        userList: this.data.userList.concat(list),
        loading: false
      })
    })
  },

  onPullDownRefresh() {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
    });
    this.setData({
      userList: []
    })
    this.onShow();
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