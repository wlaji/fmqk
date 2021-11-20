// pages/basicInfo/basicInfo.js
let incomeArr = ['不限', '3000元', '5000元', '8000元', '12000元', '20000元', '50000元'];
let ageArr = ['不限']
for (let i = 18; i < 100; i++) {
  ageArr.push(i)
}
let heightArr = ['不限']
for (let i = 129; i < 212; i++) {
  heightArr.push(i)
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
    heightMultiInde: [0, 0]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  getMultiArray(multiIndex,arr) {
    let multiArray = [];
    multiArray[0] = arr
    let val = arr[0][multiIndex[0]];
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
  onShow(){

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
    console.log(e.detail.value)
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