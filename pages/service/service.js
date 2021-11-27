// pages/service/service.js
import {
    searchMember
} from '../../api/index'

import {
    educationArr,
    starSignArr,
} from '../../utils/data'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        show: false,
        isLogin: false,
        userList: [],
        form: {
            incomeMin: null,
            incomeMax: null,
            minHeight: null,
            maxHeight: null,
            starSign: null,
            profession: null,
            education: null,
        },
        educationArr,
        starSignArr,
        showDialog: false,
        buttons: [{
            text: '取消'
        }, {
            text: '确认'
        }],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    initUserData(list) {
        list.forEach(item => {
            let condition = item.conditionList.find(citem => {
                return citem.conditionType === 1
            })
            item.location = condition.region && condition.region.length ? JSON.parse(condition.region)[1] : '';
            item.height = condition.height;
            item.profession = condition.profession
        })
        return list
    },

    dialogFn(e){
        let ind = e.detail.index;
        //点击取消
        if (ind === 0) {
          this.setData({
            showDialog: false
          })
        } else {
          this.setData({
            showDialog: false
          })
        }
    },

    onShow() {
        if (wx.getStorageSync('token')) {
            this.setData({
                isLogin: true
            })
            searchMember(this.data.conditions).then(res => {
                let list = this.initUserData(res.data)
                this.setData({
                    userList: list
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
            showDialog: !this.data.showDialog
        })
    },

    changeForm() {

    },

    onClose(){
        this.setData({
            showDialog: false
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