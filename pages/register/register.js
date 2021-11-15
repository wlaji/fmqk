// pages/register/register.js
import {register,sendRegisterCode,editMemberCondition,byPassword} from '../../api/index'
Page({
    /**
     * 页面的初始数据
     */
    data: {
        registerInfo:"",
        codeText: '获取验证码',
        getCodeStatus: true,
        time: 10,
        form: {
            loginTel: '',
            code: '',
            password:''
        },
        errorMsg: '', // 验证表单显示错误信息
        rules: [{
            name: 'loginTel',
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
        },{
            name: 'password',
            rules: [{
                required: true,
                message: '请输入登录密码'
            }]
        }]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let registerInfo = JSON.parse(wx.getStorageSync('registerInfo'))
        registerInfo.region = JSON.stringify(registerInfo.region)
        this.setData({
            registerInfo
        })
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
        this.selectComponent('#form').validateField('loginTel', (isValid, errors) => {
            if (isValid) {
                this.setData({
                    getCodeStatus:false
                })
                this.timeDown()
                sendRegisterCode({
                    loginTel:this.data.form.loginTel
                })
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
        this.selectComponent('#form').validate((valid, errors) => {
            if (!valid) {
                const firstError = Object.keys(errors)
                if (firstError.length) {
                    this.setData({
                        errorMsg: errors[firstError[0]].message
                    })
                }
            } else {
                register(this.data.form).then(res=>{
                    wx.showToast({
                        title: '注册成功',
                    })
                    return byPassword(this.data.form)
                }).then(res=>{
                    wx.setStorageSync('token', res.data.token)
                    wx.setStorageSync('userInfo', JSON.stringify(res.data.userInfo))
                    return editMemberCondition(this.data.registerInfo)
                }).then(res=>{
                    console.log(res);
                    wx.switchTab({
                      url: '/pages/index/index',
                    })
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