// pages/my/my.js
const app = getApp()
import {
    getUserInfoById,
    getAppCheckInfo
} from '../../api/index'
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isCheck: 2,
        isLogin: false,
        picPath: '/static/images/user.png',
        userInfo: {
            name: '小红',
            id: '3213kdfjka',
            picPath: ''
        },
        bgSrc2: '/static/images/22.jpg'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    onShow() {
        getAppCheckInfo().then(res => {
            setTimeout(() => {
                this.setData({
                    isCheck: Number(res.data.configValue)
                })
            }, 1000)
        })
        if (wx.getStorageSync('token')) {
            this.setData({
                isLogin: true
            })
            getUserInfoById({
                id: JSON.parse(wx.getStorageSync('userInfo')).id
            }).then(res => {
                this.setData({
                    userInfo: res.data
                })
            })
        } else {
            this.setData({
                isLogin: false
            })
        }
    },
    uploadPhoto() {
        wx.navigateTo({
            url: '/pages/photoAlbum/photoAlbum',
        })
    },
    logOut() {
        Dialog.confirm({
                title: '提示',
                message: '确定要退出登录吗',
            })
            .then(() => {
                wx.removeStorageSync('token')
                wx.removeStorageSync('userInfo')
                wx.navigateTo({
                    url: '/pages/login/login',
                })
            })
            .catch(() => {
                // on cancel
            });
    },
    beMember() {
        wx.navigateTo({
            url: '/pages/member/member',
        })
    },
    onShareAppMessage () {

    }
})