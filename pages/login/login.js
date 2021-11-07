// pages/login/login.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
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
    getCode() {
        console.log(321321)
    },
    // weui提交表单
    weSubmitForm() {
        const {
            telNumber,
            code
        } = this.data.form
        console.log(telNumber)
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
    // 重置表单
    restForm() {
        this.setData({
            'form.telNumber': '',
            'form.code': '',
        })
    },
})