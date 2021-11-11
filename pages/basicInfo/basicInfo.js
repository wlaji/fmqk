// pages/basicInfo/basicInfo.js
import {
  weightArr,
  sexArray2,
  heightArr,
  monthlyProfitArr,
  educationArr,
  maritalArr,
  hasChildrenArr,
  wantChildrenArr,
  hasRoomArr,
  hasCarArr,
  girlBodilyFormArr,
  manlBodilyFormArr,
  isSmokenArr,
  isDrinkArr,
  constellationArr,
  nationArr,
  marridTimeArr
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
      nickname: '微信用户',
      sex: 1,
      birthday: '2016-09-01',
      height: 0,
      income: 0,
      region: ['广东省', '广州市', '海珠区'],
      education: 0,
      maritalStatus: 0,
      hasChildren: 0,
      wantChildren: 0,
      occupation: '请选择',
      hasRoom: 0,
      hasCar: 0,
      nativePlace: [],
      weight: 0,
      bodilyForm: 0,
      isSmoken: 0,
      isDrink: 0,
      constellation: 0,
      nation: 0,
      marridTime: 0
    },
    jsonData: {
      nickname: '昵称',
      occupation: '职业'
    },
    currentProp: '',
    weightArr,
    sexArray2,
    heightArr,
    monthlyProfitArr,
    educationArr,
    maritalArr,
    hasChildrenArr,
    wantChildrenArr,
    hasRoomArr,
    hasCarArr,
    girlBodilyFormArr,
    manlBodilyFormArr,
    isSmokenArr,
    isDrinkArr,
    constellationArr,
    nationArr,
    marridTimeArr
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  nickNameChange(e) {
    this.setData({
      newNickName: e.detail.value
    })
  },
  dialogFn(e) {
    let ind = e.detail.index;
    //点击取消
    if (ind === 0) {
      this.setData({
        showDialog: false
      })
    } else {
      this.setData({
        showDialog: false,
        [`form.${this.data.currentProp}`]: this.data.newNickName
      })
    }
  },
  changeForm(e) {
    const prop = e.target.dataset.name;
    let dialogProp = ['nickname','occupation']
    if (dialogProp.includes(prop)) {
      this.setData({
        newNickName: '',
        currentProp: prop,
        showDialog: true
      })
    } else {
      this.setData({
        [`form.${prop}`]: e.detail.value
      })
    }
  },
  save() {

  }
})