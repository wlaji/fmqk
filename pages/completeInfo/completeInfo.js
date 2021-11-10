const amapFile = require('../../libs/amap-wx.130')
const config = require('../../libs/key')
const heightArr = ['149cm以下']
for (let i = 150; i < 210; i++) {
    heightArr.push(i + 'cm')
}
Page({
    /**
     * 页面的初始数据
     */
    data: {
        radioItems: [{
                name: '男',
                value: '1',
                checked: true
            },
            {
                name: '女',
                value: '2'
            }
        ],
        form: {
            sex: 2,
            region: ['广东省', '广州市', '海珠区'],
            birthday: '2016-09-01',
            height: 26,
            education: 3,
            maritalStatus: 0,
            monthlyProfit: 4,
        },
        heightArray: heightArr,
        educationArr: ["高中及以下", "中专", "大专", "大学本科", "硕士", "博士"],
        maritalArr: ["未婚", "已婚", "丧偶"],
        monthlyProfitArr: ["3000元以下", "3001-5000元", "5001-8000元", "8001-12000元", "12001-20000元", "20001-50000元", "50000元以上"],

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
    }
})