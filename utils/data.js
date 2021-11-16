const getIndex = (arr, val,propName)=>{
  if(!val){
    return ''
  }
  if(propName === 'gender'){
    let findIndex = arr.findIndex(item => {
      return item.value == val
    })
    console.log(findIndex)
    if(findIndex>=0){
      return findIndex
    }
    return ''
  }else{
    let findIndex = arr.findIndex(item => {
      return item == val
    })
    if(findIndex>=0){
      return findIndex
    }
    return ''
  }
}

const genderArray = [{
    name: '男',
    value: '0',
    checked: true
  },
  {
    name: '女',
    value: '1'
  }
]
let heightArr = ['149cm以下']
for (let i = 150; i < 210; i++) {
  heightArr.push(i + 'cm')
}
heightArr.push('210cm以上')
const incomeArr = ["3000元以下", "3001-5000元", "5001-8000元", "8001-12000元", "12001-20000元", "20001-50000元", "50000元以上"]
const educationArr = ["高中及以下", "中专", "大专", "大学本科", "硕士", "博士"]
const marriageArr = ["未婚", "已婚", "丧偶"]
const hadChildArr = ["没有小孩", "有孩子且住在一起", "有孩子且偶尔会住在一起", "有孩子但不在身边"]
const wantChildArr = ["视情况而定", "想要孩子", "不想要孩子", "以后告诉你"]
const houseStatusArr = ["和家人同住", "已购房", "租房", "打算婚后购房", "住在单位宿舍"]
const carStatusArr = ["已买车", "未买车"]
let bodyWeightArr = ['30kg以下']
for (let i = 30; i < 130; i++) {
  bodyWeightArr.push(i + 'kg')
}
bodyWeightArr.push('130kg以上')
const girlbodyShapeArr = ["保密", "一般", "瘦长", "苗条", "高大美丽", "丰满", "富线条美"]
const manbodyShapeArr = ["保密", "一般", "瘦长", "修身", "高大美丽", "肌肉男", "匀称"]
const smokeArr = ["不吸烟", "稍微抽一点烟", "烟抽的很多", "社交场合会抽烟"]
const drinkArr = ["不喝酒", "稍微喝一点酒", "酒喝得很多", "社交场合会喝酒"]
const starSignArr = ["牧羊座(03.21-04.20)", "金牛座(04.21-05.20)", "双子座(05.21-06.21)", "巨蟹座(06.22-07.22)", "狮子座(07.23-08.22)", "处女座(08.23-09.22)", "天秤座(09.23-10.22)", "天蝎座(10.23-11.22)", "射手座(11.22-12.21)", "魔蝎座(12.22-01.19)", "水瓶座(01.20-02.19)", "双鱼座(02.20-03.20)"]
const nationArr = ["汉族", "壮族", "满族", "回族", "苗族", "维吾尔族", "土家族", "彝族", "蒙古族", "藏族", "布依族", "侗族", "瑶族", "朝鲜族", "白族", "哈尼族", "哈萨克族", "黎族", "傣族", "畲族", "傈僳族", "仡佬族", "东乡族", "高山族", "拉祜族", "水族", "佤族", "纳西族", "羌族", "土族", "仫佬族", "锡伯族", "柯尔克孜族", "达斡尔族", "景颇族", "毛南族", "撒拉族", "布朗族", "塔吉克族", "阿昌族", "普米族", "鄂温克族", "怒族", "京族", "基诺族", "德昂族", "保安族", "俄罗斯族", "裕固族", "乌孜别克族", "门巴族", "鄂伦春族", "独龙族", "塔塔尔族", "赫哲族", "珞巴族"]
const whenMarriageArr = ["认同闪婚","一年内","两年内","三年内","时机成熟就结婚"]
export {
  getIndex,
  genderArray,
  bodyWeightArr,
  heightArr,
  incomeArr,
  educationArr,
  marriageArr,
  hadChildArr,
  wantChildArr,
  houseStatusArr,
  carStatusArr,
  girlbodyShapeArr,
  manbodyShapeArr,
  smokeArr,
  drinkArr,
  starSignArr,
  nationArr,
  whenMarriageArr
}
