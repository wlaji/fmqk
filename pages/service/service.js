// pages/service/service.js
import {
    searchMember,
    getAppCheckInfo
} from '../../api/index'
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
const starSignArr = ["牧羊座", "金牛座", "双子座", "巨蟹座", "狮子座", "处女座", "天秤座", "天蝎座", "射手座", "魔蝎座", "水瓶座", "双鱼座"]
import {
    educationArr,
    genderArray,
    professionArr
} from '../../utils/data'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isCheck: 2,
        show: false,
        isLogin: false,
        userList: [],
        form: {
            gender: null,
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
        genderArray,
        professionArr,
        showDialog: false,
        bgSrc2: '/static/images/21.jpg',
    },
    initUserData(list) {
        list.forEach((item, index) => {
            let condition = item.conditionList.find(citem => {
                return citem.conditionType == 1
            })
            if (!condition) {
                list.splice(index, 1)
            } else {
                if (condition.region && JSON.parse(condition.region)[1] === '市辖区') {
                    item.location = JSON.parse(condition.region)[0]
                } else {
                    item.location = condition.region ? JSON.parse(condition.region)[1] : '';
                }
                item.height = condition.height;
                item.profession = professionArr[condition.profession],
                    item.gender = condition.gender
            }
        })
        return list
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
            if (!this.data.userList.length) {
                searchMember(this.data.form).then(res => {
                    let list = this.initUserData(res.data)
                    this.setData({
                        userList: list
                    })
                })
            }
        } else {
            this.setData({
                isLogin: false
            })
        }
    },

    showExtend() {
        this.setData({
            showDialog: !this.data.showDialog
        })
    },

    onClose() {
        this.setData({
            showDialog: false,
        })
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

    changeFilter(e) {
        console.log(e);
        let name = e.target.dataset.name,
            val = e.target.dataset.val;
        this.setData({
            [`form.${name}`]: val
        })
    },
    resetForm() {
        let obj = {
            gender: null,
            incomeMin: null,
            incomeMax: null,
            minHeight: null,
            maxHeight: null,
            starSign: null,
            profession: null,
            education: null,
        }
        this.setData({
            form: obj
        })
    },
    changeForm(e) {
        const val = e.detail,
            prop = e.target.dataset.prop;
        this.setData({
            [`form.${prop}`]: val
        })
    },
    submitForm() {
        Toast.loading({
            message: '加载中...',
            forbidClick: true,
            duration: 500
        });
        this.onClose();
        searchMember(this.data.form).then(res => {
            let list = this.initUserData(res.data)
            this.setData({
                userList: list
            })
        })
    },
    goTop() {
        wx.pageScrollTo({
            scrollTop: 0,
            duration: 100,
        })
    },
    onShareAppMessage () {

    }
})