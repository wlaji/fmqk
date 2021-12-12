import {
  getUserInfoById,
  getAppCheckInfo
} from '../../api/index'
import {
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
  zoHadChildArr,
  zoBodyStatusArr,
  zoAcceptFamilyCohabitationArr
} from '../../utils/data'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isCheck:2,
    userInfo: {
      photos: []
    }
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
    let id = options.id;
    getUserInfoById({
      id
    }).then(res => {
      this.setData({
        userInfo: this.initUserData(res.data)
      })
      console.log(this.initUserData(res.data))
    })
  },
  initUserData(item) {
    let condition = item.conditionList.find(citem => {
      return citem.conditionType === 1
    })
    let condition2 = item.conditionList.find(citem => {
      return citem.conditionType === 2
    })
    item.baseInfo = {
      gender: item.gender,
      age: item.age,
      height: condition.height,
      bodyWeight:condition.bodyWeight,
      incomeMin:condition.incomeMin,
      incomeMax:condition.incomeMax,
      income:`${condition.incomeMin||'不定'}-${condition.incomeMax||'不定'}`,
      location: condition.region ? JSON.parse(condition.region)[0] + '-' + JSON.parse(condition.region)[1] : '',
      education: educationArr[condition.education],
      marriage: marriageArr[condition.marriage],
      hadChild: hadChildArr[condition.hadChild],
      wantChild: wantChildArr[condition.wantChild],
      profession: professionArr[condition.profession],
      houseStatus: houseStatusArr[condition.houseStatus],
      carStatus: carStatusArr[condition.carStatus],
      nativeRegion: condition.nativeRegion ? JSON.parse(condition.nativeRegion)[0] + JSON.parse(condition.nativeRegion)[1] : '',
      smoke: smokeArr[condition.smoke],
      drink: drinkArr[condition.drink],
      starSign: starSignArr[condition.starSign],
      nation: nationArr[condition.nation],
      whenMarriage: whenMarriageArr[condition.whenMarriage]
    }
    if (condition2) {
      item.metaInfo = {
        gender:condition2.gender,
        minAge: condition2.minAge,
        maxAge: condition2.maxAge,
        minHeight: condition2.minHeight,
        maxHeight: condition2.maxHeight,
        minWeight:condition2.minWeight,
        maxWeight:condition2.maxWeight,
        education: educationArr[condition2.education],
        profession: professionArr[condition2.profession],
        marriage: marriageArr[condition2.marriage],
        hadChild: zoHadChildArr[condition2.hadChild],
        bodyStatus:zoBodyStatusArr[condition2.bodyStatus],
        acceptFamilyCohabitation:zoAcceptFamilyCohabitationArr[condition2.acceptFamilyCohabitation],
        incomeMin: condition2.incomeMin,
        incomeMax: condition2.incomeMax,
        carStatus:carStatusArr[condition2.carStatus],
        houseStatus:houseStatusArr[condition2.houseStatus],
        location: condition2.region
      }
    }
    item.pictureList = [];
    item.photos.forEach(citem => {
      item.pictureList.push(citem.photoPath)
    })
    console.log(item)
    return item
  },
  cloneId() {
    wx.setClipboardData({
      data: `用户编号:${this.data.userInfo.id}`,
      success: function (res) {}
    })
  },
  preview(event) {
    let currentUrl = event.currentTarget.dataset.src
    wx.previewImage({
      current: currentUrl, // 当前显示图片的http链接
      urls: this.data.userInfo.pictureList // 需要预览的图片http链接列表
    })
  },
  goMember(){
    wx.navigateTo({
      url: '/pages/member/member',
    })
  }
})