// pages/service/service.js
import {
    getPushUserByUserId
} from '../../api/index'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        show:false,
        isLogin: false,
        userList: [{
            nickName: 'Cindy',
            age: 20,
            photos: ['https://images.unsplash.com/photo-1484399172022-72a90b12e3c1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGdpcmx8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'],
            location:'长沙市',
            profession:'IT',
            des:'我喜欢编程'
        },{
            nickName: '小红',
            age: 20,
            photos: ['https://images.unsplash.com/photo-1557555187-23d685287bc3?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGdpcmx8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'],
            location:'岳阳市',
            profession:'驾校教练',
            des:'我喜欢运动'
        },{
            nickName: '静静',
            age: 20,
            photos: ['https://images.unsplash.com/photo-1545912452-8aea7e25a3d3?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGdpcmx8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'],
            location:'衡阳市',
            profession:'科研',
            des:'我喜欢爬山'
        },{
            nickName: '你好',
            age: 20,
            photos: ['https://images.unsplash.com/photo-1464863979621-258859e62245?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fGdpcmx8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'],
            location:'汨罗市',
            profession:'厨师',
            des:'我喜欢做好吃的菜'
        },{
            nickName: 'caren',
            age: 20,
            photos: ['https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGdpcmx8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'],
            location:'深圳市',
            profession:'护士',
            des:'我喜欢看电视，睡觉，吃零食'
        },{
            nickName: 'tet',
            age: 20,
            photos: ['https://unsplash.com/photos/8a95EVm0ovQ'],
            location:'上海市',
            profession:'教师',
            des:'我喜欢运动'
        },]
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
            getPushUserByUserId({
                page: this.data.page,
                pageSize: this.data.pageSize
            }).then(res => {
                // this.setData({
                //     userList: res.data.list
                // })
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

    showExtend(){
        this.setData({
            show:!this.data.show
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