// pages/register/register.js
import {
    register,
    sendRegisterCode,
    editMemberCondition,
    byPassword,
    registerByWx,
    getUserInfoById
} from '../../api/index';
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';
import {
    isEmpty,
    isPhone
} from '../../utils/validate';
Page({
    /**
     * 页面的初始数据
     */
    data: {
        registerInfo: "",
        codeText: '获取验证码',
        getCodeStatus: true,
        time: 10,
        isPassowrd: true,
        form: {
            loginTel: '',
            password: ''
        },
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

    onShow(){
        wx.login()
    },

    changePasswordType() {
        this.setData({
            isPassowrd: !this.data.isPassowrd
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
        if (isPhone(this.data.form.loginTel)) {
            this.setData({
                getCodeStatus: false
            })
            this.timeDown();
            sendRegisterCode({
                loginTel: this.data.form.loginTel
            })
        } else {
            Notify('手机号不能为空或者格式错误');
        }
    },
    formInputChange(e) {
        const {
            field
        } = e.currentTarget.dataset
        this.setData({
            [`form.${field}`]: e.detail
        })
    },
    weSubmitForm() {
        let validPhone = isPhone(this.data.form.loginTel);
        let validPwd = isEmpty(this.data.form.password);
        if (!validPhone) {
            Notify('手机号不能为空或者格式错误');
            return
        }
        if (!validPwd) {
            Notify('密码不能为空');
            return
        }
        register(this.data.form).then(res => {
            Notify({
                type: 'success',
                message: '注册成功'
            });
            return byPassword(this.data.form)
        }).then(res => {
            wx.setStorageSync('token', res.data.token)
            wx.setStorageSync('userInfo', JSON.stringify(res.data.userInfo))
            return editMemberCondition(this.data.registerInfo)
        }).then(res => {
            wx.switchTab({
                url: '/pages/index/index',
            })
        })
    },
    getPhoneNumber(e) {
        // 获取到微信服务器返回的加密数据
        const iv = e.detail.iv;
        const encryptedData = e.detail.encryptedData;
        let that = this;
        if (!encryptedData) {
            return false;
        }
        wx.login({
            //获取code
            success: async function (res) {
                console.log(res.code)
                //调用开发服务器，服务器先通过code获取openid和session_key，然后再解密好加密数据
                let loginRes = await registerByWx({
                    code: res.code,
                    encrypData: encryptedData,
                    ivData: iv
                })
                wx.setStorageSync('token', loginRes.data.token)
                wx.setStorageSync('userInfo', JSON.stringify(loginRes.data.userInfo))
                let userInfoDetail = await getUserInfoById({
                    id: loginRes.data.userInfo.id
                })
                let condition = userInfoDetail.data.conditionList.find(item => {
                    return item.conditionType == 1
                })
                if (!condition) {
                    await editMemberCondition(that.data.registerInfo)
                }
                wx.switchTab({
                    url: '/pages/index/index',
                })
            }
        })
    },
    onShareAppMessage () {

    }
})