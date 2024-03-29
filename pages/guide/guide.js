// pages/guide/guide.js
import {
  getAppCheckInfo
} from '../../api/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isCheck: 1,
    bgSrc: '/static/images/1.jpg',
    bgSrc2: '/static/images/11.jpg'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getAppCheckInfo().then(res => {
      this.setData({
        isCheck: Number(res.data.configValue)
      })
    })
    let token = wx.getStorageSync('token')
    if (token) {
      wx.switchTab({
        url: '/pages/index/index',
      })
    }
  },

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