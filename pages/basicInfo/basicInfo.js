import {
  getUserInfoById,
  editMemberCondition,
  changeMemberNickName,
  getAppCheckInfo
} from '../../api/index'
import {
  getHeightIndex,
  getIncomeIndex,
  getWeightIndex,
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
  smokeArr,
  drinkArr,
  starSignArr,
  nationArr,
  whenMarriageArr,
  professionArr
} from '../../utils/data'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    isCheck:2,
    showDialog: false,
    buttons: [{
      text: '取消'
    }, {
      text: '确认'
    }],
    newNickName: '',
    form: {
      id: '',
      nickName: '',
      gender: '',
      birthday: '',
      height: '',
      income: '',
      incomeMin: '',
      incomeMax: '',
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
    smokeArr,
    drinkArr,
    starSignArr,
    nationArr,
    whenMarriageArr,
    professionArr,
    userInfo: '',
    multiIndex: [0, 0],
    multiArray: [],
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
    getAppCheckInfo().then(res => {
      setTimeout(() => {
        this.setData({
          isCheck: Number(res.data.configValue)
        })
      }, 1000)
    })
    getUserInfoById({
      id: JSON.parse(wx.getStorageSync('userInfo')).id
    }).then(res => {
      let userInfo = res.data;
      let condition = res.data.conditionList.find(item => {
        return item.conditionType == 1
      })
      let nickName = userInfo.nickName;
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
        smoke,
        drink,
        starSign,
        nation,
        whenMarriage
      } = condition
      console.log(incomeMin, incomeMax)
      this.setData({
        'form.id': condition.id,
        'form.nickName': nickName,
        'form.gender': gender,
        'form.birthday': birthday.replace(/\//g, "-"),
        'form.height': getHeightIndex(heightArr, height),
        'form.incomeMin': incomeMin,
        'form.incomeMax': incomeMax,
        'form.region': region ? JSON.parse(region) : '',
        'form.education': education,
        'form.marriage': marriage,
        'form.hadChild': hadChild,
        'form.wantChild': wantChild,
        'form.profession': profession,
        'form.houseStatus': houseStatus,
        'form.carStatus': carStatus,
        'form.nativeRegion': nativeRegion ? JSON.parse(nativeRegion) : '',
        'form.bodyWeight': getWeightIndex(bodyWeightArr, bodyWeight),
        'form.smoke': smoke,
        'form.drink': drink,
        'form.starSign': starSign,
        'form.nation': nation,
        'form.whenMarriage': whenMarriage,
      })
      console.log(this.data.form)
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
        'form.nickName': this.data.newNickName
      })
      changeMemberNickName({
        nickName: this.data.newNickName
      }).then(res => {
        wx.navigateBack({
          delta: 0,
        })
      })
    }
  },

  changeNickName(e) {
    this.setData({
      newNickName: this.data.form['nickName'],
      showDialog: true
    })
  },

  changeForm(e) {
    const prop = e.target.dataset.name;
    if (prop === 'income') {
      let income = incomeArr[e.detail.value],
        incomeMin,
        incomeMax;
      if (income === '3000元以下') {
        incomeMin = '';
        incomeMax = 3000
      } else if (income === '50000元以上') {
        incomeMin = 50000;
        incomeMax = ''
      } else {
        incomeMin = parseInt(income.split('-')[0]);
        incomeMax = parseInt(income.split('-')[1]);
      }
      console.log(incomeMin,incomeMax)
      this.setData({
        'form.incomeMin':incomeMin,
        'form.incomeMax':incomeMax
      })
    } else {
      this.setData({
        [`form.${prop}`]: e.detail.value
      })
    }
  },
  save() {
    let form = this.data.form;
    editMemberCondition({
      id: form.id,
      gender: form.gender,
      birthday: form.birthday.replace(/-/g, "/"),
      height: heightArr[form.height],
      incomeMin: form.incomeMin,
      incomeMax: form.incomeMax,
      region: form.region ? JSON.stringify(form.region) : '',
      education: form.education,
      marriage: form.marriage,
      hadChild: form.hadChild,
      wantChild: form.wantChild,
      profession: form.profession,
      houseStatus: form.houseStatus,
      carStatus: form.carStatus,
      nativeRegion: form.nativeRegion ? JSON.stringify(form.nativeRegion) : '',
      bodyWeight: bodyWeightArr[form.bodyWeight],
      smoke: form.smoke,
      drink: form.drink,
      starSign: form.starSign,
      nation: form.nation,
      whenMarriage: form.whenMarriage,
      conditionType: 1,
    }).then(res => {
      wx.navigateBack({
        delta: 0,
      })
    })
  },
})