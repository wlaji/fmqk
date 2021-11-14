// pages/login/login.js
import {byPassword} from '../../api/index'
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        loginType:1,
        codeText: '获取验证码',
        getCodeStatus: true,
        time: 10,
        form: {
            loginTel: '',
            code: '',
            password:'',
        },
        errorMsg: '', // 验证表单显示错误信息
        rules1: [{
            name: 'loginTel',
            rules: [{
                required: true,
                message: '请输入手机号码'
            }, {
                mobile: true,
                message: '电话格式不对'
            }]
        },{
            name: 'password',
            rules: [{
                required: true,
                message: '请输入登录密码'
            }]
        }],
        rules2: [{
            name: 'loginTel',
            rules: [{
                required: true,
                message: '请输入手机号码'
            }, {
                mobile: true,
                message: '电话格式不对'
            }]
        },{
            name: 'code',
            rules: [{
                required: true,
                message: '请输入验证码'
            }]
        }],
    },
    formInputChange(e) {
        const {
            field
        } = e.currentTarget.dataset
        this.setData({
            [`form.${field}`]: e.detail.value
        })
    },
    timeDown() {
        let time = this.data.time;
        let that = this;
        let timerId = setTimeout(function run() {
            if (time <= 0) {
                that.setData({
                    getCodeStatus: true,
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
                    getCodeStatus: false
                })
                this.timeDown()
            } else {
                this.setData({
                    errorMsg: errors.message
                })
            }
        })
    },
    // weui提交表单
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
                if(this.data.loginType === 1){
                    byPassword(this.data.form).then(res=>{
                        wx.setStorageSync('token', res.data.token)
                        wx.setStorageSync('userInfo', JSON.stringify(res.data.userInfo))
                        wx.switchTab({
                            url: '/pages/index/index'
                        })
                    })
                }else{
                    wx.showToast({
                        title: '暂未开放此功能',
                        icon: 'none',
                        duration: 2000
                      })
                }
                
            }
        })
    },
    // 重置表单
    restForm() {
        this.setData({
            'form.loginTel': '',
            'form.code': '',
            'form.password': '',
        })
    },
    changeLoginType(){
        this.restForm()
        if(this.data.loginType === 1){
            this.setData({
                loginType:2
            })
        }else{
            this.setData({
                loginType:1
            })
        }
    }
})