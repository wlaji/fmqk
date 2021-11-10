// pages/register/register.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        codeText: '获取验证码',
        getCodeStatus: true,
        time: 10,
        form: {
            telNumber: '',
            password: '',
            code: ''
        },
        errorMsg: '', // 验证表单显示错误信息
        rules: [{
            name: 'telNumber',
            rules: [{
                required: true,
                message: '请输入手机号码'
            }, {
                mobile: true,
                message: '电话格式不对'
            }]
        }, {
            name: 'code',
            rules: [{
                required: true,
                message: '请输入验证码'
            }]
        }, {
            name: 'password',
            rules: [{
                required: true,
                message: '请输入密码'
            }]
        }],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    timeDown() {
        let time = this.data.time;
        let that = this;
        let timerId = setTimeout(function run() {
            if (time <= 0) {
                that.setData({
                    getCodeStatus:true,
                    codeText: '获取验证码',
                })
                clearTimeout(timerId);
                return;
            }
            time--;
            that.setData({
                codeText: '重发验证码(' + time + 's)'
            })
            timerId = setTimeout(run, 1000);
        }, 1000);
    },
    getCode() {
        this.selectComponent('#form').validateField('telNumber', (isValid, errors) => {
            if (isValid) {
                this.setData({
                    getCodeStatus:false
                })
                this.timeDown()
            } else {
                this.setData({
                    errorMsg: errors.message
                })
            }
        })
    },
    formInputChange(e) {
        const {
            field
        } = e.currentTarget.dataset
        this.setData({
            [`form.${field}`]: e.detail.value
        })
    },
    weSubmitForm() {
        const {
            telNumber,
            password
        } = this.data.form
        this.selectComponent('#form').validate((valid, errors) => {
            if (!valid) {
                const firstError = Object.keys(errors)
                if (firstError.length) {
                    this.setData({
                        errorMsg: errors[firstError[0]].message
                    })
                }
            } else {
                wx.showToast({
                    title: '提交成功',
                })
            }
        })
    },
    getPhoneNumber(e) {
        wx.showLoading({
            title: '加载中',
        })
        setTimeout(() => {
            wx.hideLoading()
        }, 1000)
        wx.login({
            success(res) {
                if (res.code) {
                    //发起网络请求
                    wx.request({
                        url: 'https://4031w093e1.goho.co/login',
                        data: {
                            code: res.code
                        }
                    })
                } else {
                    console.log('登录失败！' + res.errMsg)
                }
            }
        })
    }
})