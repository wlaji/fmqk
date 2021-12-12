import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';
import {
  getUserInfoById,
  deletePhoto
} from '../../api/index'
import {
  ApiRootUrl
} from '../../utils/util'
Page({
  data: {
    userInfo: '',
    fileList: [],
  },
  onLoad: function (options) {
    this.getUserInfo()
  },
  getUserInfo() {
    getUserInfoById({
      id: JSON.parse(wx.getStorageSync('userInfo')).id
    }).then(res => {
      let fileList = [];
      res.data.photos.forEach(item => {
        fileList.push({
          url: item.photoPath,
          id: item.id
        })
      })
      this.setData({
        fileList,
        userInfo: res.data
      })
    })
  },
  beMember() {
    wx.navigateTo({
      url: '/pages/member/member',
    })
  },
  afterRead(event) {
    let userId = JSON.parse(wx.getStorageSync('userInfo')).id;
    let that = this;
    const {
      file
    } = event.detail;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.uploadFile({
      url: `${ApiRootUrl}/photo/upload`, //仅为示例，非真实的接口地址
      filePath: file.url,
      name: 'file',
      formData: {
        'userId': userId
      },
      header: {
        'content-type': 'multipart/form-data'
      },
      success(res) {
        console.log(res);
        let data = JSON.parse(res.data)
        if (data.code == 200) {
          wx.showToast({
            title: '上传成功',
            icon: 'success',
            duration: 1000
          })
          that.getUserInfo();
        } else {
          wx.showToast({
            title: data.message,
            icon: 'none',
            duration: 1000
          })
        }
      },
    })
  },
  deletePhoto(event) {
    let id = event.detail.file.id
    //删除接口
    deletePhoto({
      id
    }).then(res => {
      Notify({
        type: 'success',
        message: '删除成功',
        duration: 1000
      });
      this.getUserInfo()
    })
  }
})