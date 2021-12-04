// pages/service/service.js
import {
    searchMember
} from '../../api/index'
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
import {
    educationArr,
    starSignArr,
} from '../../utils/data'

let incomeArr = [{
    value: null,
    text: '不限',
}, {
    value: 3000,
    text: '3000元',
}, {
    value: 5000,
    text: '5000元',
}, {
    value: 10000,
    text: '10000元',
}, {
    value: 15000,
    text: '15000元',
}, {
    value: 20000,
    text: '20000元',
}, {
    value: 50000,
    text: '50000元',
}];
let heightArr = [{
    value: null,
    text: '不限'
}]
for (let i = 129; i < 212; i++) {
    heightArr.push({
        value: i,
        text: i + 'cm'
    })
};

let newEducationArr = [{
    value: null,
    text: '不限',
}]

educationArr.forEach((item, index) => {
    newEducationArr.push({
        value: index,
        text: item
    })
})

let newStarSignArr = [{
    value: null,
    text: '不限',
}]

starSignArr.forEach((item, index) => {
    newStarSignArr.push({
        value: index,
        text: item
    })
})

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
        newEducationArr,
        newStarSignArr,
        heightArr: [{
                values: heightArr
            },
            {
                values: heightArr
            }
        ],
        incomeArr: [{
                values: incomeArr
            },
            {
                values: incomeArr
            }
        ],
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
        if (wx.getStorageSync('token')) {
            searchMember(this.data.form).then(res => {
                let list = this.initUserData(res.data)
                this.setData({
                    userList: list
                })
            })
        }
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

    onChangeHeight(event) {
        const {
            picker,
            value,
            index
        } = event.detail;
        let newArr = heightArr.filter(item => {
            return item.value > value[0].value || item.value === null
        })
        picker.setColumnValues(1, newArr);
        if (index === 0) {
            picker.setColumnIndex(1, 0)
        }
        this.setData({
            'form.minHeight': picker.getValues()[0].value,
            'form.maxHeight': picker.getValues()[1].value
        })
    },

    onChangeIncome(event) {
        const {
            picker,
            value,
            index
        } = event.detail;
        let newArr = incomeArr.filter(item => {
            return item.value > value[0].value || item.value === null
        })
        picker.setColumnValues(1, newArr);
        if (index === 0) {
            picker.setColumnIndex(1, 0)
        }
        this.setData({
            'form.incomeMin': picker.getValues()[0].value,
            'form.incomeMax': picker.getValues()[1].value
        })
    },

    onChangeEducation(event) {
        const {
            picker,
            value,
            index
        } = event.detail;
        console.log(value)
        this.setData({
            'form.education': value.value
        })
    },

    onChangeStarSign(event) {
        const {
            picker,
            value,
            index
        } = event.detail;
        this.setData({
            'form.starSign': value.value
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

    filterFn() {
        Toast.loading({
            message: '加载中...',
            forbidClick: true,
            duration:500
        });
        this.onClose();
        searchMember(this.data.form).then(res => {
            let list = this.initUserData(res.data)
            this.setData({
                userList: list
            })
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
})