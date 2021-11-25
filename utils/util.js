// const ApiRootUrl = 'http://192.168.1.5:8089';
const ApiRootUrl = 'http://121.40.112.169:8089';
export const formatTime = (date) => {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

export const formatNumber = (n) => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 封封微信的的request
 */
function request(url, data = {}, method = "GET") {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: `${ApiRootUrl}${url}`,
      data: data,
      method: method,
      header: {
        'Content-Type': 'application/json',
        'token': wx.getStorageSync('token')
      },
      success: function (res) {
        console.log("success", res);
        if (res.statusCode == 200) {
          if (res.data.code == 401) {
            //需要登录后才可以操作
            wx.removeStorageSync('token')
            wx.removeStorageSync('userInfo')
            wx.navigateTo({
              url: '/pages/login/login',
            })
          } else if (res.data.code == 500) {
            wx.showToast({
              title: res.data.message,
              icon: 'none',
              duration: 2000
            })
          } else {
            resolve(res.data);
          }
        } else {
          reject(res.errMsg);
        }

      },
      fail: function (err) {
        reject(err)
        console.log("failed")
      }
    })
  });
}

export const get = (url, data = {}) => {
  return request(url, data, 'GET')
}

export const post = (url, data = {}) => {
  return request(url, data, 'POST')
}

/**
 * 检查微信会话是否过期
 */
export const checkSession = () => {
  return new Promise(function (resolve, reject) {
    wx.checkSession({
      success: function () {
        resolve(true);
      },
      fail: function () {
        reject(false);
      }
    })
  });
}

/**
 * 调用微信登录
 */
export const login = () => {
  return new Promise(function (resolve, reject) {
    wx.login({
      success: function (res) {
        if (res.code) {
          resolve(res.code);
        } else {
          reject(res);
        }
      },
      fail: function (err) {
        reject(err);
      }
    });
  });
}

export const getUserInfo = () => {
  return new Promise(function (resolve, reject) {
    wx.getUserInfo({
      withCredentials: true,
      success: function (res) {
        if (res.detail.errMsg === 'getUserInfo:ok') {
          resolve(res);
        } else {
          reject(res)
        }
      },
      fail: function (err) {
        reject(err);
      }
    })
  });
}

export const redirect = (url) => {
  //判断页面是否需要登录
  if (false) {
    wx.redirectTo({
      url: '/pages/auth/login/login'
    });
    return false;
  } else {
    wx.redirectTo({
      url: url
    });
  }
}

export const showErrorToast = (msg) => {
  wx.showToast({
    title: msg,
    image: '/static/images/icon_error.png'
  })
}