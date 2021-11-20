const amapFile = require('../../libs/amap-wx.130')
const config = require('../../libs/key')
import {
    heightArr,
    genderArray,
    educationArr,
    marriageArr,
    incomeArr
} from '../../utils/data';
Page({
    /**
     * 页面的初始数据
     */
    data: {
        radioItems: genderArray,
        form: {
            gender: 0,
            region: ['广东省', '广州市', '海珠区'],
            birthday: '1997-09-01',
            height: 25,
            education: 3,
            marriage: 0,
            income: 3,
        },
        heightArray: heightArr,
        educationArr: educationArr,
        marriageArr: marriageArr,
        incomeArr: incomeArr,
        incomeMultiArray: [
            ['不限', '3000元', '5000元', '8000元', '12000元', '20000元', '50000元'],
            ['不限', '3000元', '5000元', '8000元', '12000元', '20000元', '50000元']
        ],
        incomeMultiIndex: [0, 0]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        wx.getLocation({
            type: 'wgs84',
            success(res) {
                const latitude = res.latitude
                const longitude = res.longitude
                let myAmapFun = new amapFile.AMapWX({
                    key: config.Config.key
                });
                myAmapFun.getRegeo({
                    location: `${longitude},${latitude}`,
                    success: (data) => {
                        console.log(data)
                        let province = data[0].regeocodeData.addressComponent.province;
                        let city = data[0].regeocodeData.addressComponent.city;
                        let area = data[0].regeocodeData.addressComponent.district
                        // city:[]
                        if (Object.prototype.toString.call(city) == "[object Array]") {
                            city = city.join('');
                        }
                        that.setData({
                            'form.region': [province, city, area]
                        })
                    },
                    fail: function (info) {
                        //失败回调
                        console.log(info)
                    }
                })
            }
        })
    },

    changeForm(e) {
        const prop = e.target.dataset.name;
        this.setData({
            [`form.${prop}`]: e.detail.value
        })
    },

    getRegisterInfo() {
        let form = this.data.form;
        let gender = genderArray[form.gender].value,
            region = form.region,
            birthday = form.birthday.replace(/-/g, "/"),
            height = parseInt(heightArr[form.height]),
            education = form.education,
            marriage = form.marriage,
            income = incomeArr[form.income];
        if (income === '3000元以下') {
            incomeMin = -1;
            incomeMax = 3000
        } else if (income === '50000元以上') {
            incomeMin = 50000;
            incomeMax = -1
        } else {
            incomeMin = parseInt(income.split('-')[0]);
            incomeMax = parseInt(income.split('-')[1]);
        }
        return {
            gender,
            region,
            birthday,
            height,
            education,
            marriage,
            income,
            incomeMin,
            incomeMax,
            conditionType: 1,
        }
    },

    goRegister() {
        let info = this.getRegisterInfo();
        wx.setStorageSync('registerInfo', JSON.stringify(info))
        wx.navigateTo({
            url: '/pages/register/register',
        })
    }
})