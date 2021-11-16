// pages/basicInfo/basicInfo.js
import {
  getUserInfoById
} from '../../api/index'
import {
  getHeightIndex,
  getIncomeIndex,
  bodyWeightArr,
  genderArray,
  heightArr,
  incomeArr,
  educationArr,
  marriageArr,
  hadChildArr,
  wantChildArr,
  houseStatusArr,
  carStatusArr,
  girlbodyShapeArr,
  manbodyShapeArr,
  smokeArr,
  drinkArr,
  starSignArr,
  nationArr,
  whenMarriageArr
} from '../../utils/data'
import professionObj from '../../utils/profession'

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
      nickName: '',
      gender: '',
      birthday: '',
      height: '',
      income: '',
      incomeMin:'',
      incomeMax:'',
      region: '',
      education: '',
      marriage: '',
      hadChild: '',
      wantChild: '',
      profession: '',
      houseStatus: '',
      carStatus: '',
      nativeRegion: '',
      bodyWeight: '',
      bodyShape: '',
      smoke: '',
      drink: '',
      starSign: '',
      nation: '',
      whenMarriage: ''
    },
    jsonData: {
      nickname: '昵称',
      profession: '职业'
    },
    currentProp: '',
    bodyWeightArr,
    genderArray,
    heightArr,
    incomeArr,
    educationArr,
    marriageArr,
    hadChildArr,
    wantChildArr,
    houseStatusArr,
    carStatusArr,
    girlbodyShapeArr,
    manbodyShapeArr,
    smokeArr,
    drinkArr,
    starSignArr,
    nationArr,
    whenMarriageArr,
    isLogin: false,
    userInfo: '',
    professionObj,
    multiIndex: [0, 0],
    multiArray: [],
    incomeMultiArray: [['不限','3000元','5000元','8000元','12000元','20000元','50000元'],['不限','3000元','5000元','8000元','12000元','20000元','50000元']],
    incomeMultiIndex: [0, 0]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.updatePro(this.data.multiIndex)
  },
  onShow() {
    if (wx.getStorageSync('token')) {
      this.setData({
        isLogin: true
      })
      getUserInfoById({
        id: JSON.parse(wx.getStorageSync('userInfo')).id
      }).then(res => {
        let userInfo = res.data,
          condition = res.data.conditionList[0],
          nickName = userInfo.nickName;
        let {
          gender,
          birthday,
          height,
          incomeMin,
          incomeMax,
          region,
          education,
          marriage,
          hadChild,
          wantChild,
          profession,
          houseStatus,
          carStatus,
          nativeRegion,
          bodyWeight,
          bodyShape,
          smoke,
          drink,
          starSign,
          nation,
          whenMarriage
        } = condition
        this.setData({
          'form.nickName': nickName,
          'form.gender': gender,
          'form.birthday': birthday.replace(/\//g, "-"),
          'form.height': getHeightIndex(heightArr, height),
          'form.income': getIncomeIndex(incomeArr, incomeMin, incomeMax),
          'form.region': region ? JSON.parse(region) : '',
          'form.education': education,
          'form.marriage': marriage,
          'form.hadChild': hadChild,
          'form.wantChild': wantChild,
          'form.profession': profession,
          'form.houseStatus': houseStatus,
          'form.carStatus': carStatus,
          'form.nativeRegion': nativeRegion ? JSON.parse(nativeRegion) : '',
          'form.bodyWeight': bodyWeight,
          'form.bodyShape': bodyShape,
          'form.smoke': smoke,
          'form.drink': drink,
          'form.starSign': starSign,
          'form.nation': nation,
          'form.whenMarriage': whenMarriage,
        })
      })
    } else {
      this.setData({
        isLogin: false
      })
    }
  },

  updatePro(multiIndex) {
    let multiArray = [];
    let level0 = professionObj.level0
    let level1 = professionObj.level1
    multiArray[0] = level0
    multiArray[1] = level1[level0[multiIndex[0]].id]
    this.setData({
      multiArray,
      multiIndex
    })
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
    let dialogProp = ['nickname', 'profession']
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

  },
  bindMultiPickerChange(e) {
    this.setData({
      multiIndex: e.detail.value,
      'form.profession': [this.data.multiArray[0][e.detail.value[0]].name,this.data.multiArray[1][e.detail.value[1]].name]
    })
  },
  bindMultiPickerColumnChange(e) {
    let multiIndex = this.data.multiIndex
    multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        multiIndex[1] = 0
        break;
    }
    this.updatePro(multiIndex)
  },
  bindIncomeMultiPickerChange(e){
    this.setData({
      incomeMultiIndex: e.detail.value,
      'form.incomeMin': this.data.incomeMultiArray[0][e.detail.value[0]],
      'form.incomeMax': this.data.incomeMultiArray[1][e.detail.value[1]]
    })
  },
  bindIncomeMultiPickerColumnChange(e){
    let data = {
      multiIndex:this.data.incomeMultiIndex,
      multiArray:this.data.incomeMultiArray
    }
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        let val = data.multiArray[0][e.detail.value];
        if(val === '不限'){
          data.multiArray[1] = data.multiArray[0]
        }else{
          let filterArr = data.multiArray[0].filter(item=>{
            if(item === '不限'){
              return true
            }
            return parseInt(item)>parseInt(val)
          })
          console.log(val,data.multiArray[0],filterArr)
          data.multiArray[1] = filterArr
        }
        data.multiIndex[1] = 0;
        break;
    }
    this.setData({
      incomeMultiIndex:data.multiIndex,
      incomeMultiArray:data.multiArray
    })
  }
})