// pages/basicInfo/basicInfo.js
let incomeArr = ['不限', '3000', '5000', '8000', '12000', '20000', '50000'];
let ageArr = ['不限']
for (let i = 18; i < 100; i++) {
  ageArr.push(i)
}
let heightArr = ['不限']
for (let i = 140; i < 212; i++) {
  heightArr.push(i)
};
import {
  bodyWeightArr,
  genderArray,
  educationArr,
  marriageArr,
  hadChildArr,
  houseStatusArr,
  carStatusArr,
  zoHadChildArr,
  zoBodyStatusArr,
  zoAcceptFamilyCohabitationArr,
  provinces,
  professionArr
} from '../../utils/data'
bodyWeightArr.unshift('不限')
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
    form: {
      isCheck:2,
      id: '',
      gender: '',
      minAge: '',
      maxAge: '',
      minHeight: '',
      maxHeight: '',
      minWeight: '',
      maxWeight: '',
      education: '',
      profession: '',
      marriage: '',
      hadChild: '',
      bodyStatus: '',
      acceptFamilyCohabitation: '',
      incomeMin: '',
      incomeMax: '',
      carStatus: '',
      houseStatus: '',
      region: '',
    },
    bodyWeightArr,
    genderArray,
    educationArr,
    marriageArr,
    hadChildArr,
    houseStatusArr,
    carStatusArr,
    zoHadChildArr,
    zoBodyStatusArr,
    zoAcceptFamilyCohabitationArr,
    provinces,
    professionArr,
    incomeMultiArray: [],
    incomeMultiIndex: [0, 0],
    ageMultiArray: [],
    ageMultiIndex: [0, 0],
    heightMultiArray: [],
    heightMultiIndex: [0, 0],
    weightMultiIndex: [0, 0],
    weightMultiArray: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getAppCheckInfo().then(res => {
      setTimeout(() => {
        this.setData({
          isCheck: Number(res.data.configValue)
        })
      }, 1000)
    })
    this.setData({
      incomeMultiArray: this.getMultiArray(this.data.incomeMultiIndex, incomeArr),
      ageMultiArray: this.getMultiArray(this.data.ageMultiIndex, ageArr),
      heightMultiArray: this.getMultiArray(this.data.heightMultiIndex, heightArr),
      weightMultiArray: this.getMultiArray(this.data.weightMultiIndex, bodyWeightArr),
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
        id,
        gender,
        minAge,
        maxAge,
        minHeight,
        maxHeight,
        minWeight,
        maxWeight,
        education,
        profession,
        marriage,
        hadChild,
        bodyStatus,
        acceptFamilyCohabitation,
        incomeMin,
        incomeMax,
        carStatus,
        houseStatus,
        region
      } = condition
      this.setData({
        'form.id': id || '',
        'form.gender': gender,
        'form.minAge': minAge ? minAge : '不限',
        'form.maxAge': maxAge ? maxAge : '不限',
        'form.minHeight': minHeight ? minHeight : '不限',
        'form.maxHeight': maxHeight ? maxHeight : '不限',
        'form.minWeight': minWeight ? minWeight : '不限',
        'form.maxWeight': maxWeight ? maxWeight : '不限',
        'form.education': education,
        'form.profession': profession,
        'form.marriage': marriage,
        'form.hadChild': hadChild,
        'form.bodyStatus': bodyStatus,
        'form.acceptFamilyCohabitation': acceptFamilyCohabitation,
        'form.incomeMin': incomeMin ? incomeMin : '不限',
        'form.incomeMax': incomeMax ? incomeMax : '不限',
        'form.carStatus': carStatus,
        'form.houseStatus': houseStatus,
        'form.region': region,
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
    if(prop==='region'){
      this.setData({
        [`form.region`]: this.data.provinces[e.detail.value].name
      })
    }else{
      this.setData({
        [`form.${prop}`]: e.detail.value
      })
    }
  },
  bindMultiPickerChange(e) {
    let prop = e.target.dataset.name;
    if (prop === 'weight') {
      this.setData({
        weightMultiIndex: e.detail.value,
        'form.minWeight': this.data.weightMultiArray[0][e.detail.value[0]],
        'form.maxWeight': this.data.weightMultiArray[1][e.detail.value[1]]
      })
    }
    if (prop === 'age') {
      this.setData({
        ageMultiIndex: e.detail.value,
        'form.minAge': this.data.ageMultiArray[0][e.detail.value[0]],
        'form.maxAge': this.data.ageMultiArray[1][e.detail.value[1]]
      })
    }
    if (prop === 'height') {
      this.setData({
        heightMultiIndex: e.detail.value,
        'form.minHeight': this.data.heightMultiArray[0][e.detail.value[0]],
        'form.maxHeight': this.data.heightMultiArray[1][e.detail.value[1]]
      })
    }
    if (prop === 'income') {
      this.setData({
        incomeMultiIndex: e.detail.value,
        'form.incomeMin': this.data.incomeMultiArray[0][e.detail.value[0]],
        'form.incomeMax': this.data.incomeMultiArray[1][e.detail.value[1]]
      })
    }
  },
  bindMultiPickerColumnChange(e) {
    let prop = e.target.dataset.name;
    let data;
    if (prop === 'weight') {
      data = {
        multiIndex: this.data.weightMultiIndex,
        multiArray: this.data.weightMultiArray
      }
    } else if (prop === 'age') {
      data = {
        multiIndex: this.data.ageMultiIndex,
        multiArray: this.data.ageMultiArray
      }
    } else if (prop === 'height') {
      data = {
        multiIndex: this.data.heightMultiIndex,
        multiArray: this.data.heightMultiArray
      }
    } else if (prop === 'income') {
      data = {
        multiIndex: this.data.incomeMultiIndex,
        multiArray: this.data.incomeMultiArray
      }
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
          data.multiArray[1] = filterArr
        }
        data.multiIndex[1] = 0;
        break;
    }
    if (prop === 'weight') {
      this.setData({
        weightMultiIndex: data.multiIndex,
        weightMultiArray: data.multiArray
      })
    } else if (prop === 'age') {
      this.setData({
        ageMultiIndex: data.multiIndex,
        ageMultiArray: data.multiArray
      })
    } else if (prop === 'height') {
      this.setData({
        heightMultiIndex: data.multiIndex,
        heightMultiArray: data.multiArray
      })
    } else if (prop === 'income') {
      this.setData({
        incomeMultiIndex: data.multiIndex,
        incomeMultiArray: data.multiArray
      })
    }
  },
  save() {
    let form = this.data.form;
    let incomeMin = form.incomeMin === '不限' ? '' : parseInt(form.incomeMin),
      incomeMax = form.incomeMax === '不限' ? '' : parseInt(form.incomeMax),
      minAge = form.minAge === '不限' ? '' : parseInt(form.minAge),
      maxAge = form.maxAge === '不限' ? '' : parseInt(form.maxAge),
      minHeight = form.minHeight === '不限' ? '' : parseInt(form.minHeight),
      maxHeight = form.maxHeight === '不限' ? '' : parseInt(form.maxHeight),
      minWeight = form.minWeight === '不限' ? '' : parseInt(form.minWeight),
      maxWeight = form.maxWeight === '不限' ? '' : parseInt(form.maxWeight);
    editMemberCondition({
      conditionType: 2,
      id: form.id,
      gender:form.gender,
      minAge,
      maxAge,
      minHeight,
      maxHeight,
      minWeight,
      maxWeight,
      education: form.education,
      profession: form.profession,
      marriage: form.marriage,
      hadChild: form.hadChild,
      bodyStatus: form.bodyStatus,
      acceptFamilyCohabitation: form.acceptFamilyCohabitation,
      incomeMin,
      incomeMax,
      carStatus: form.carStatus,
      houseStatus: form.houseStatus,
      region:form.region
    }).then(res => {
      wx.navigateBack({
        delta: 0,
      })
    })
  },
})