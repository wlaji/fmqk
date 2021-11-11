// pages/login/login.js
const app = getApp()
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
        this.selectComponent('#form').validateField('telNumber', (isValid, errors) => {
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
        const {
            telNumber,
            code
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
                let token = 'fjdklhjaflkdjlajfldjafjdl'
                wx.setStorageSync('token', token)
                wx.switchTab({
                    url: '/pages/index/index'
                })
            }
        })
    },
    // 重置表单
    restForm() {
        this.setData({
            'form.telNumber': '',
            'form.code': '',
        })
    },
})