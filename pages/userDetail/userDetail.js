// pages/userDetail/userDetail.js
import {
  getUserInfoById
} from '../../api/index'
import {
  getIndex,
  getHeightIndex,
  getIncomeIndex,
  genderArray,
  bodyWeightArr,
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
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      photos: [
        'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGdpcmx8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGdpcmx8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGdpcmx8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
      ]
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id;
    getUserInfoById({
      id
    }).then(res => {
      this.setData({
        userInfo: this.initUserData(res.data)
      })
    })
  },
  initUserData(item) {
    let condition = item.conditionList.find(citem => {
      return citem.conditionType === 1
    })
    let condition2 = item.conditionList.find(citem => {
      return citem.conditionType === 2
    })
    item.baseInfo={
      education: educationArr[condition.education],
      location: condition.region ? JSON.parse(condition.region)[1] : '',
      profession:condition.profession,
      height:condition.height,
      marriage: marriageArr[condition.marriage],
      starSign: starSignArr[condition.starSign],
      income: incomeArr[getIncomeIndex(incomeArr,condition.incomeMin,condition.incomeMax)],
      nation: nationArr[condition.nation],
      nativeRegion: condition.nativeRegion ?JSON.parse(condition.nativeRegion)[0]+JSON.parse(condition.nativeRegion)[1] : '',
      bodyShape: condition.gender==0?manbodyShapeArr[condition.bodyShape]:girlbodyShapeArr[condition.bodyShape],
      smoke: smokeArr[condition.smoke],
      drink: drinkArr[condition.drink],
      hadChild: hadChildArr[condition.hadChild],
      wantChild: wantChildArr[condition.wantChild],
      carStatus: carStatusArr[condition.carStatus],
      houseStatus: houseStatusArr[condition.houseStatus],
      whenMarriage: whenMarriageArr[condition.whenMarriage],
      bodyWeight:condition.bodyWeight
    }
    item.metaInfo = {
      minAge:condition2.minAge,
      maxAge:condition2.maxAge,
      minHeight:condition2.minHeight,
      maxHeight:condition2.maxHeight,
      incomeMin:condition2.incomeMin,
      incomeMax:condition2.incomeMax,
      education:educationArr[condition2.education],
      marriage:marriageArr[condition2.marriage],
      bodyShape:condition.gender==0?girlbodyShapeArr[condition2.bodyShape]:manbodyShapeArr[condition2.bodyShape],
      location: condition2.region ? JSON.parse(condition2.region)[1] : '',
      hadChild: hadChildArr[condition2.hadChild],
      wantChild:wantChildArr[condition2.wantChild],
      smoke:smokeArr[condition2.smoke],
      drink:drinkArr[condition2.drink],
    }
    item.pictureList = [];
    item.photos.forEach(citem=>{
      item.pictureList.push(citem.photoPath)
    })
    console.log(item)
    return item
  },
  cloneId() {
    wx.setClipboardData({
      data: `用户编号:${this.data.userInfo.id}`,
      success: function (res) {
        wx.showToast({
          title: '复制成功',
        });
      }
    })
  },
  preview(event){
    let currentUrl = event.currentTarget.dataset.src
    console.log(currentUrl)
    wx.previewImage({
      current: currentUrl, // 当前显示图片的http链接
      urls: this.data.userInfo.pictureList // 需要预览的图片http链接列表
    })
  },
})