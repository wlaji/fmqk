// pages/basicInfo/basicInfo.js
let incomeArr = ['不限', '3000元', '5000元', '8000元', '12000元', '20000元', '50000元'];
let ageArr = ['不限']
for (let i = 18; i < 100; i++) {
  ageArr.push(i + '岁')
}
let heightArr = ['不限']
for (let i = 129; i < 212; i++) {
  heightArr.push(i + 'cm')
};
import {
  educationArr,
  marriageArr,
  hadChildArr,
  wantChildArr,
  girlBodilyFormArr,
  manlBodilyFormArr,
  smokeArr,
  drinkArr,
  girlbodyShapeArr,
  manbodyShapeArr,
} from '../../utils/data'

import {
  getUserInfoById,
  editMemberCondition,
  getAppCheckInfo
} from '../../api/index'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isCheck: 1,
    showDialog: false,
    buttons: [{
      text: '取消'
    }, {
      text: '确认'
    }],
    newNickName: '',
    form: {
      id: '',
      gender: '',
      incomeMin: '',
      incomeMax: '',
      minAge: '',
      maxAge: '',
      minHeight: '',
      maxHeight: '',
      education: '',
      marriage: '',
      bodyShape: '',
      region: '',
      hadChild: '',
      wantChild: '',
      smoke: '',
      drink: ''
    },
    educationArr,
    marriageArr,
    hadChildArr,
    wantChildArr,
    girlBodilyFormArr,
    manlBodilyFormArr,
    smokeArr,
    drinkArr,
    girlbodyShapeArr,
    manbodyShapeArr,
    incomeMultiArray: [],
    incomeMultiIndex: [0, 0],
    ageMultiArray: [],
    ageMultiIndex: [0, 0],
    heightMultiArray: [],
    heightMultiIndex: [0, 0]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      incomeMultiArray: this.getMultiArray(this.data.incomeMultiIndex, incomeArr),
      ageMultiArray: this.getMultiArray(this.data.ageMultiIndex, ageArr),
      heightMultiArray: this.getMultiArray(this.data.heightMultiIndex, heightArr),
    })
    getUserInfoById({
      id: JSON.parse(wx.getStorageSync('userInfo')).id
    }).then(res => {
      let userInfo = res.data;
      let condition = res.data.conditionList.find(item => {
        return item.conditionType == 2
      })
      if (!condition) {
        return
      }
      let {
        incomeMin,
        incomeMax,
        minAge,
        maxAge,
        minHeight,
        maxHeight,
        education,
        marriage,
        bodyShape,
        region,
        hadChild,
        wantChild,
        smoke,
        drink,
      } = condition
      this.setData({
        'form.id': condition.id || '',
        'form.gender': userInfo.gender,
        'form.incomeMin': incomeMin ? incomeMin + '元' : '不限',
        'form.incomeMax': incomeMax ? incomeMax + '元' : '不限',
        'form.minAge': minAge ? minAge + '岁' : '不限',
        'form.maxAge': maxAge ? maxAge + '岁' : '不限',
        'form.minHeight': minHeight ? minHeight + 'cm' : '不限',
        'form.maxHeight': maxHeight ? maxHeight + 'cm' : '不限',
        'form.education': education,
        'form.marriage': marriage,
        'form.bodyShape': bodyShape,
        'form.region': region ? JSON.parse(region) : '',
        'form.hadChild': hadChild,
        'form.wantChild': wantChild,
        'form.smoke': smoke,
        'form.drink': drink,
      })
      console.log(this.data.form.gender)
    })

    getAppCheckInfo().then(res => {
      this.setData({
        isCheck: Number(res.data.configValue)
      })
    })
  },
  getMultiArray(multiIndex, arr) {
    let multiArray = [];
    multiArray[0] = arr
    let val = multiArray[0][multiIndex[0]];
    console.log(val)
    if (val === '不限') {
      multiArray[1] = arr
    } else {
      let filterArr = arr.filter(item => {
        if (item === '不限') {
          return true
        }
        return parseInt(item) > parseInt(val)
      })
      multiArray[1] = filterArr
    }
    return multiArray
  },
  changeForm(e) {
    const prop = e.target.dataset.name;
    this.setData({
      [`form.${prop}`]: e.detail.value
    })
  },
  bindAgeMultiPickerChange(e) {
    this.setData({
      ageMultiIndex: e.detail.value,
      'form.minAge': this.data.ageMultiArray[0][e.detail.value[0]],
      'form.maxAge': this.data.ageMultiArray[1][e.detail.value[1]]
    })
  },
  bindAgeMultiPickerColumnChange(e) {
    let data = {
      multiIndex: this.data.ageMultiIndex,
      multiArray: this.data.ageMultiArray
    }
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        let val = data.multiArray[0][e.detail.value];
        if (val === '不限') {
          data.multiArray[1] = data.multiArray[0]
        } else {
          let filterArr = data.multiArray[0].filter(item => {
            if (item === '不限') {
              return true
            }
            return parseInt(item) > parseInt(val)
          })
          console.log(val, data.multiArray[0], filterArr)
          data.multiArray[1] = filterArr
        }
        data.multiIndex[1] = 0;
        break;
    }
    this.setData({
      ageMultiIndex: data.multiIndex,
      ageMultiArray: data.multiArray
    })
  },
  bindHeightMultiPickerChange(e) {
    this.setData({
      heightMultiIndex: e.detail.value,
      'form.minHeight': this.data.heightMultiArray[0][e.detail.value[0]],
      'form.maxHeight': this.data.heightMultiArray[1][e.detail.value[1]]
    })
  },
  bindHeightMultiPickerColumnChange(e) {
    let data = {
      multiIndex: this.data.heightMultiIndex,
      multiArray: this.data.heightMultiArray
    }
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        let val = data.multiArray[0][e.detail.value];
        if (val === '不限') {
          data.multiArray[1] = data.multiArray[0]
        } else {
          let filterArr = data.multiArray[0].filter(item => {
            if (item === '不限') {
              return true
            }
            return parseInt(item) > parseInt(val)
          })
          console.log(val, data.multiArray[0], filterArr)
          data.multiArray[1] = filterArr
        }
        data.multiIndex[1] = 0;
        break;
    }
    this.setData({
      heightMultiIndex: data.multiIndex,
      heightMultiArray: data.multiArray
    })
  },
  bindIncomeMultiPickerChange(e) {
    this.setData({
      incomeMultiIndex: e.detail.value,
      'form.incomeMin': this.data.incomeMultiArray[0][e.detail.value[0]],
      'form.incomeMax': this.data.incomeMultiArray[1][e.detail.value[1]]
    })
  },
  bindIncomeMultiPickerColumnChange(e) {
    let data = {
      multiIndex: this.data.incomeMultiIndex,
      multiArray: this.data.incomeMultiArray
    }
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        let val = data.multiArray[0][e.detail.value];
        if (val === '不限') {
          data.multiArray[1] = data.multiArray[0]
        } else {
          let filterArr = data.multiArray[0].filter(item => {
            if (item === '不限') {
              return true
            }
            return parseInt(item) > parseInt(val)
          })
          console.log(val, data.multiArray[0], filterArr)
          data.multiArray[1] = filterArr
        }
        data.multiIndex[1] = 0;
        break;
    }
    this.setData({
      incomeMultiIndex: data.multiIndex,
      incomeMultiArray: data.multiArray
    })
  },
  save() {
    let form = this.data.form;
    let incomeMin = form.incomeMin === '不限' ? '' : parseInt(form.incomeMin),
      incomeMax = form.incomeMax === '不限' ? '' : parseInt(form.incomeMax),
      minAge = form.minAge === '不限' ? '' : parseInt(form.minAge),
      maxAge = form.maxAge === '不限' ? '' : parseInt(form.maxAge),
      minHeight = form.minHeight === '不限' ? '' : parseInt(form.minHeight),
      maxHeight = form.maxHeight === '不限' ? '' : parseInt(form.maxHeight);
    editMemberCondition({
      id: form.id,
      incomeMin: incomeMin,
      incomeMax: incomeMax,
      minAge,
      maxAge,
      minHeight,
      maxHeight,
      region: form.region ? JSON.stringify(form.region) : '',
      education: form.education,
      marriage: form.marriage,
      hadChild: form.hadChild,
      wantChild: form.wantChild,
      bodyShape: form.bodyShape,
      smoke: form.smoke,
      drink: form.drink,
      conditionType: 2,
    }).then(res => {
      wx.navigateBack({
        delta: 0,
      })
    })
  },
})