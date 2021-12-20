// pages/member/member.js
import {
  payment,
  getChargeLevelPrice
} from '../../api/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    form: {
      openingTime: 1,
      czData: '',
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getChargeLevelPrice().then(res => {
      console.log(res)
      this.setData({
        czData: res.data
      })
    })
  },
  czHy() {
    payment({
      userLevel: 2,
      openingTime: this.data.form.openingTime,
      method: 'wxPay'
    }).then(res => {
      wx.requestPayment({
        timeStamp: res.data.timestamp,
        nonceStr: res.data.noncestr,
        package: res.data.package,
        signType: res.data.signType,
        paySign: res.data.sign,
        success(res) {
          wx.showToast({
            title: '支付成功',
            icon: 'success',
            duration: 2000
          })
          wx.switchTab({
            url: '/pages/my/my',
          })
        },
        fail(res) {
          wx.showToast({
            title: '支付失败',
            icon: 'error',
            duration: 2000
          })
        }
      })
    })

  },
  onClickOpeningTime(e) {
    this.setData({
      'form.openingTime': e.currentTarget.dataset.name
    })
  },
  onShareAppMessage () {

  }
})