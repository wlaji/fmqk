// pages/basicInfo/basicInfo.js
import {
  incomeArr,
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
Page({
  /**
   * 页面的初始数据
   */
  data: {
    showDialog: false,
    buttons: [{
      text: '取消'
    }, {
      text: '确认'
    }],
    newNickName: '',
    form: {
      gender: 1,
      income: 0,
      education: '',
      marriage: '',
      bodyShape: '',
      region: ['广东省', '广州市', '海珠区'],
      hadChild: '',
      wantChild: '',
      smoke: '',
      drink: ''
    },
    incomeArr,
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
    incomeMultiArray: [['不限','3000元','5000元','8000元','12000元','20000元','50000元'],['不限','3000元','5000元','8000元','12000元','20000元','50000元']],
    incomeMultiIndex: [0, 0]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  changeForm(e) {
    const prop = e.target.dataset.name;
    this.setData({
      [`form.${prop}`]: e.detail.value
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
  }
})