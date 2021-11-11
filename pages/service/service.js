// pages/service/service.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isLogin:false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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
    }
})