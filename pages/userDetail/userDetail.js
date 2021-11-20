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
        'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGdpcmx8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGdpcmx8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGdpcmx8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
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