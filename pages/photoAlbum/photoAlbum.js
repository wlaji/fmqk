// pages/photoAlbum/photoAlbum.js
import {
  getUserInfoById
} from '../../api/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserInfo()
  },
  onShow: function () {

  },
  getUserInfo(){
    getUserInfoById({
      id: JSON.parse(wx.getStorageSync('userInfo')).id
    }).then(res => {
      console.log(res)
      let imgList = [];
      res.data.photos.forEach(item=>{
        imgList.push(item.photoPath)
      })
      this.setData({
        imgList
      })
    })
  },
  beMember() {
    wx.navigateTo({
      url: '/pages/member/member',
    })
  },
  uploadPhoto() {
    let userId = JSON.parse(wx.getStorageSync('userInfo')).id;
    let that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        wx.showLoading({
          title: '上传中',
        })
        setTimeout(function () {
          wx.hideLoading()
        }, 2000)
        wx.uploadFile({
          url: 'https://4031w093e1.goho.co/photo/upload ', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'userId': userId
          },
          success (res){
            console.log(res)
            let data = JSON.parse(res.data)
            if(data.code == 200){
              wx.showToast({
                title: '上传成功',
                icon: 'success',
                duration: 1000
              })
              that.getUserInfo();
            }else{
              wx.showToast({
                title: data.message,
                icon:'none',
                duration: 1000
              })
            }
          },
        })
      }
    })
  },
  preview(event) {
    console.log(event.currentTarget.dataset.src)
    let currentUrl = event.currentTarget.dataset.src
    wx.previewImage({
      current: currentUrl, // 当前显示图片的http链接
      urls: this.data.imgList // 需要预览的图片http链接列表
    })
  }
})