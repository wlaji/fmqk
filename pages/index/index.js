// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    userList: [{
        src: 'https://images.unsplash.com/photo-1558339136-19ee57afe7a6?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8JUU1JUE1JUIzJUU1JUFEJUE5fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        name: '小红',
        age: '30',
        location: '岳阳'
      },
      {
        src: 'https://images.unsplash.com/photo-1558339136-19ee57afe7a6?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8JUU1JUE1JUIzJUU1JUFEJUE5fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        name: '小红',
        age: '30',
        location: '岳阳'
      },
      {
        src: 'https://images.unsplash.com/photo-1558339136-19ee57afe7a6?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8JUU1JUE1JUIzJUU1JUFEJUE5fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        name: '小红',
        age: '30',
        location: '岳阳'
      },{
        src: 'https://images.unsplash.com/photo-1558339136-19ee57afe7a6?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8JUU1JUE1JUIzJUU1JUFEJUE5fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        name: '小红',
        age: '30',
        location: '岳阳'
      },
      {
        src: 'https://images.unsplash.com/photo-1558339136-19ee57afe7a6?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8JUU1JUE1JUIzJUU1JUFEJUE5fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        name: '小红',
        age: '30',
        location: '岳阳'
      },{
        src: 'https://images.unsplash.com/photo-1558339136-19ee57afe7a6?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8JUU1JUE1JUIzJUU1JUFEJUE5fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        name: '小红',
        age: '30',
        location: '岳阳'
      },
      {
        src: 'https://images.unsplash.com/photo-1558339136-19ee57afe7a6?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8JUU1JUE1JUIzJUU1JUFEJUE5fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        name: '小红',
        age: '30',
        location: '岳阳'
      }
    ],
    loading: false,
    noMore: false,
    loadingFailed: false,
    isLogin: false,
  },

  onLoad() {
    this.setData({
      isLogin: app.globalData.token ? true : false
    })
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
    setTimeout(() => {
      wx.hideLoading();
      //停止下拉刷新
      wx.stopPullDownRefresh();
    }, 2000)
  }
})