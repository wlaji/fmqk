import utils from '../utils/util'
//获取首页信息
export const getProfessionList = function (data) {
	return utils.get('/api/getProfessionList', data)
}

//网站信息
export function getGroupInfo(data) {
	return utils.post('/api/getGroupInfo', data)
}