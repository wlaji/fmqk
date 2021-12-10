const address = require('../../utils/city.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        animationAddressMenu: {},
        addressMenuIsShow: false,
        value: [0, 0, 0],
        provinces: [],
        citys: [],
        areas: [],
        areaInfo: {
            currentProvinceName: '',
            currentCityName: '',
            currentAreaName: ''
        },
        infoStatus: 1,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options);
        var id = address.provinces[0].id
        this.setData({
            provinces: address.provinces,
            citys: address.citys[id],
            areas: address.areas[address.citys[id][0].id],
        })
        this.getAreaInfo()
    },
    back(e) {
        console.log(e)
    },
    changeStatus(e) {
        console.log(e)
        const status = Number(e.currentTarget.dataset.status) + 1
        this.setData({
            infoStatus: status
        })
    },
    skipSelectLocation(){
        this.setData({
            infoStatus: 2
        })
    },
    getAreaInfo() {
        var value = this.data.value
        var provinces = this.data.provinces
        var citys = this.data.citys
        var areas = this.data.areas
        var provinceNum = value[0]
        var cityNum = value[1]
        var countyNum = value[2]

        var currentProvinceId = provinces[provinceNum].id
        var currentProvinceName = provinces[provinceNum].name

        var currentCityId = citys[cityNum].id
        var currentCityName = citys[cityNum].name

        var currentAreaId = areas[countyNum].id
        var currentAreaName = areas[countyNum].name
        this.setData({
            areaInfo: {
                currentProvinceName,
                currentCityName,
                currentAreaName
            }
        })
    },
    cityChange(e) {
        var value = e.detail.value
        var provinces = this.data.provinces
        var citys = this.data.citys
        var areas = this.data.areas
        var provinceNum = value[0]
        var cityNum = value[1]
        var countyNum = value[2]
        // 如果省份选择项和之前不一样，表示滑动了省份，此时市默认是省的第一组数据，
        if (this.data.value[0] != provinceNum) {
            var id = provinces[provinceNum].id
            this.setData({
                value: [provinceNum, 0, 0],
                citys: address.citys[id],
                areas: address.areas[address.citys[id][0].id],
            })

        } else if (this.data.value[1] != cityNum) {
            // 滑动选择了第二项数据，即市，此时区显示省市对应的第一组数据
            var id = citys[cityNum].id
            this.setData({
                value: [provinceNum, cityNum, 0],
                areas: address.areas[citys[cityNum].id],
            })
        } else {
            // 滑动选择了区
            this.setData({
                value: [provinceNum, cityNum, countyNum]
            })
        }
        this.getAreaInfo()
    },
})