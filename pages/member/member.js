// pages/member/member.js
import {payment} from '../../api/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    form:{
      openingTime:1,
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  czHy(){
    payment({
      userLevel: 2,
      openingTime: this.data.form.openingTime,
      method:'wxPay'
    }).then(res=>{
      console.log(res)
      wx.requestPayment({
        timeStamp: res.data.timestamp,
        nonceStr: res.data.noncestr,
        package: res.data.package,
        signType: 'MD5',
        paySign: res.data.sign,
        success (res) { },
        fail (res) {
          console.log(res)
        }
      })
    })
   
  },
  onClickOpeningTime(e){
    this.setData({
        'form.openingTime':e.currentTarget.dataset.name
    })
},
})