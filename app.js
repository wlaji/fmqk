// app.js
App({
  onLaunch() {
    let token = wx.getStorageSync('token')
    if (token) {
      // wx.switchTab({
      //   url: '/pages/index/index',
      // })
    }
  },
  globalData: {
    token: ''
  }
})