import {get,post} from '../utils/util'
//未登录获取首页推荐列表
export const getPushUserNoLogin = function (data) {
	return post('/app/user/getPushUserNoLogin',data)
}

//登录之后获取首页推荐
export const getPushUserByUserId = function (data) {
	return post('/app/user/getPushUserByUserId',data)
}

//密码登录
export const byPassword = function (data) {
	return post('/app/login/byPassword',data)
}

//用户注册
export const register = function (data) {
	return post('/app/user/register',data)
}

//获取注册验证码
export const sendRegisterCode = function (data) {
	return get('/message/sendRegisterCode',data)
}

//添加用户条件
export const editMemberCondition = function (data) {
	return post('/app/user/editMemberCondition',data)
}

//根据用户id 获取用户详情
export const getUserInfoById = function (data) {
	return get('/app/user/getUserInfoById',data)
}

//修改密码
export const changePassword = function (data) {
	return get('app/user/changePassword',data)
}

//修改昵称
export const changeMemberNickName = function (data) {
	return get('/app/user/changeMemberNickName',data)
}



