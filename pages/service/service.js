// pages/service/service.js
import {
    searchMember
} from '../../api/index'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        show: false,
        isLogin: false,
        userList: [],
        conditions: {
            incomeMin: null,
            incomeMax: null,
            minHeight: null,
            maxHeight: null,
            starSign: null,
            profession: null,
            education: null,
        }
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
            searchMember(this.data.conditions).then(res => {
                this.setData({
                    userList: res.data.list
                })
            })
        } else {
            this.setData({
                isLogin: false
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
            wx.showModal({
                title: '提示',
                content: '您还没登录~~',
                confirmText: '去登陆',
                cancelText: '再看看',
                success(res) {
                    if (res.confirm) {
                        wx.navigateTo({
                            url: '/pages/completeInfo/completeInfo',
                        })
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                }
            })
        }
    },

    showExtend() {
        this.setData({
            show: !this.data.show
        })
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
        this.onShow()
        setTimeout(() => {
            wx.hideLoading();
            //停止下拉刷新
            wx.stopPullDownRefresh();
        }, 2000)
    }
})