// pages/userDetail/userDetail.js
import {
  getUserInfoById
} from '../../api/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      photo: [
        'https://images.unsplash.com/photo-1636878540162-c815c775ad5d?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1636955957257-9b49a3bdf897?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1636906321514-1ec0d67fcf07?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
      ]
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id;
    getUserInfoById({
      id
    }).then(res => {
      // this.setData({
      //   userInfo:res.data
      // })
    })
  },
  cloneId() {
    wx.setClipboardData({
      data: `用户编号:${this.data.userInfo.id}`,
      success: function (res) {
        wx.showToast({
          title: '复制成功',
        });
      }
    })
  }
})