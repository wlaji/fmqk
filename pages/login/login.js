// pages/login/login.js
import {
    byPassword
} from '../../api/index'
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';
import {
    isEmpty,
    isPhone
} from '../../utils/validate'
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        loginType: 1,
        codeText: '获取验证码',
        getCodeStatus: true,
        time: 10,
        isPassowrd: true,
        form: {
            loginTel: '',
            code: '',
            password: ''
        },
    },
    changePasswordType() {
        this.setData({
            isPassowrd: !this.data.isPassowrd
        })
    },
    formInputChange(e) {
        const {
            field
        } = e.currentTarget.dataset
        this.setData({
            [`form.${field}`]: e.detail
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
        console.log(this.data.form.loginTel)
        if (isPhone(this.data.form.loginTel)) {
            this.setData({
                getCodeStatus: false
            })
            this.timeDown()
        } else {
            Notify('手机号不能为空或者格式错误');
        }
    },
    // weui提交表单
    weSubmitForm() {
        let validPhone = isPhone(this.data.form.loginTel);
        let validPwd = isEmpty(this.data.form.password);
        let validCode = isEmpty(this.data.form.code);
        console.log(validPhone, validPwd, validCode)
        if (this.data.loginType === 1) {
            if (!validPhone) {
                Notify('手机号不能为空或者格式错误');
                return
            }
            if (!validPwd) {
                Notify('密码不能为空');
                return
            }
        } else if (this.data.loginType === 2) {
            if (!validPhone) {
                Notify('手机号不能为空或者格式错误');
                return
            }
            if (!validCode) {
                Notify('验证码不能为空');
                return
            }
        }
        byPassword(this.data.form).then(res => {
            wx.setStorageSync('token', res.data.token)
            wx.setStorageSync('userInfo', JSON.stringify(res.data.userInfo))
            wx.switchTab({
                url: '/pages/index/index'
            })
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
    changeLoginType() {
        this.restForm()
        if (this.data.loginType === 1) {
            this.setData({
                loginType: 2
            })
        } else {
            this.setData({
                loginType: 1
            })
        }
    }
})