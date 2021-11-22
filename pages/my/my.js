// pages/my/my.js
const app = getApp()
import {getUserInfoById} from '../../api/index'
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
            getUserInfoById({
                id:JSON.parse(wx.getStorageSync('userInfo')).id
            }).then(res=>{
                this.setData({
                    userInfo:res.data
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
        wx.showModal({
            title: '提示',
            content: '确定要退出登录吗',
            success(res) {
                if (res.confirm) {
                    wx.removeStorageSync('token')
                    wx.removeStorageSync('userInfo')
                    wx.navigateTo({
                        url: '/pages/login/login',
                    })
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },
    beMember(){
        wx.navigateTo({
          url: '/pages/member/member',
        })
    }
})