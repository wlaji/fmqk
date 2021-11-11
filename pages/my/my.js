// pages/my/my.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isLogin: false,
        picPath: '/static/images/user.png',
        userInfo: {
            name: '小红',
            id: '3213kdfjka',
            picPath: ''
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            isLogin: app.globalData.token ? true : false
        })
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
    changPhoto() {
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success(res) {
                // tempFilePath可以作为img标签的src属性显示图片
                const tempFilePaths = res.tempFilePaths
            }
        })
    },
    logOut() {
        wx.removeStorageSync('token')
        wx.switchTab({
            url: '/pages/index/index',
        })
    }
})