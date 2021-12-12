const getIndex = (arr, val, propName) => {
  if (!val) {
    return ''
  }
  if (propName === 'gender') {
    let findIndex = arr.findIndex(item => {
      return item.value == val
    })
    console.log(findIndex)
    if (findIndex >= 0) {
      return findIndex
    }
    return ''
  } else {
    let findIndex = arr.findIndex(item => {
      return item == val
    })
    if (findIndex >= 0) {
      return findIndex
    }
    return ''
  }
}

const getHeightIndex = (arr, val) => {
  if (!val) {
    return ''
  }
  let findInd = arr.findIndex(item => {
    return item == val
  })
  if (findInd >= 0) {
    return findInd
  }
  return ''
}

const getWeightIndex = (arr, val) => {
  if (!val) {
    return ''
  }
  let findInd = arr.findIndex(item => {
    return item == val
  })
  if (findInd >= 0) {
    return findInd
  }
  return 0
}
const getIncomeIndex = (arr, min, max) => {
  console.log(arr,min,max);
  let val
  if (!min) {
    val = '3000元以下'
  } else if (!max) {
    val = '50000元以上'
  } else {
    val = min + '-' + max + '元'
  }
  let findInd = arr.findIndex(item => {
    return item === val
  })
  if (findInd >= 0) {
    return findInd
  }
  return 0
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
let heightArr = []
for (let i = 140; i < 210; i++) {
  heightArr.push(i)
}
const incomeArr = ["3000元以下", "3000-5000元", "5000-8000元", "8000-12000元", "12000-20000元", "20000-50000元", "50000元以上"]
const educationArr = ["高中", "中专", "大专", "大学本科", "硕士", "博士"]
const marriageArr = ["未婚", "离异", "离异未育", "丧偶"]
const hadChildArr = ["没有小孩", "有孩子且住在一起", "有孩子且偶尔会住在一起", "有孩子但不在身边"]
const wantChildArr = ["视情况而定", "想要孩子", "不想要孩子", "以后告诉你"]
const houseStatusArr = ["和家人同住", "已购房", "租房", "打算婚后购房", "住在单位宿舍"]
const carStatusArr = ["已买车", "未买车"]
let bodyWeightArr = []
for (let i = 30; i < 130; i++) {
  bodyWeightArr.push(i)
}
const girlbodyShapeArr = ["保密", "一般", "瘦长", "苗条", "高大美丽", "丰满", "富线条美"]
const manbodyShapeArr = ["保密", "一般", "瘦长", "修身", "高大", "肌肉男", "匀称"]
const smokeArr = ["不吸烟", "稍微抽一点烟", "烟抽的很多", "社交场合会抽烟"]
const drinkArr = ["不喝酒", "稍微喝一点酒", "酒喝得很多", "社交场合会喝酒"]
const starSignArr = ["牧羊座(03.21-04.20)", "金牛座(04.21-05.20)", "双子座(05.21-06.21)", "巨蟹座(06.22-07.22)", "狮子座(07.23-08.22)", "处女座(08.23-09.22)", "天秤座(09.23-10.22)", "天蝎座(10.23-11.22)", "射手座(11.22-12.21)", "魔蝎座(12.22-01.19)", "水瓶座(01.20-02.19)", "双鱼座(02.20-03.20)"]
const nationArr = ["汉族", "壮族", "满族", "回族", "苗族", "维吾尔族", "土家族", "彝族", "蒙古族", "藏族", "布依族", "侗族", "瑶族", "朝鲜族", "白族", "哈尼族", "哈萨克族", "黎族", "傣族", "畲族", "傈僳族", "仡佬族", "东乡族", "高山族", "拉祜族", "水族", "佤族", "纳西族", "羌族", "土族", "仫佬族", "锡伯族", "柯尔克孜族", "达斡尔族", "景颇族", "毛南族", "撒拉族", "布朗族", "塔吉克族", "阿昌族", "普米族", "鄂温克族", "怒族", "京族", "基诺族", "德昂族", "保安族", "俄罗斯族", "裕固族", "乌孜别克族", "门巴族", "鄂伦春族", "独龙族", "塔塔尔族", "赫哲族", "珞巴族"]
const whenMarriageArr = ["认同闪婚", "一年内", "两年内", "三年内", "时机成熟就结婚"];
const professionArr = ['销售','IT工程师','教授','在校学生','产品经理','总经理','副总/总监','部门经理','中层管理','企业家','个体老板','高级干部','公务员','律师','医生','护士','专家学者','工程师','设计师','艺术家','演员','模特','离/退休','技术员','服务员','普通员工','自由职业','无业'];
const provinces = [{
  "name": "北京市",
  "id": "110000"
}, {
  "name": "天津市",
  "id": "120000"
}, {
  "name": "河北省",
  "id": "130000"
}, {
  "name": "山西省",
  "id": "140000"
}, {
  "name": "内蒙古自治区",
  "id": "150000"
}, {
  "name": "辽宁省",
  "id": "210000"
}, {
  "name": "吉林省",
  "id": "220000"
}, {
  "name": "黑龙江省",
  "id": "230000"
}, {
  "name": "上海市",
  "id": "310000"
}, {
  "name": "江苏省",
  "id": "320000"
}, {
  "name": "浙江省",
  "id": "330000"
}, {
  "name": "安徽省",
  "id": "340000"
}, {
  "name": "福建省",
  "id": "350000"
}, {
  "name": "江西省",
  "id": "360000"
}, {
  "name": "山东省",
  "id": "370000"
}, {
  "name": "河南省",
  "id": "410000"
}, {
  "name": "湖北省",
  "id": "420000"
}, {
  "name": "湖南省",
  "id": "430000"
}, {
  "name": "广东省",
  "id": "440000"
}, {
  "name": "广西壮族自治区",
  "id": "450000"
}, {
  "name": "海南省",
  "id": "460000"
}, {
  "name": "重庆市",
  "id": "500000"
}, {
  "name": "四川省",
  "id": "510000"
}, {
  "name": "贵州省",
  "id": "520000"
}, {
  "name": "云南省",
  "id": "530000"
}, {
  "name": "西藏自治区",
  "id": "540000"
}, {
  "name": "陕西省",
  "id": "610000"
}, {
  "name": "甘肃省",
  "id": "620000"
}, {
  "name": "青海省",
  "id": "630000"
}, {
  "name": "宁夏回族自治区",
  "id": "640000"
}, {
  "name": "新疆维吾尔自治区",
  "id": "650000"
}, {
  "name": "台湾省",
  "id": "710000"
}, {
  "name": "香港特别行政区",
  "id": "810000"
}, {
  "name": "澳门特别行政区",
  "id": "820000"
}];
const zoHadChildArr = ["有", "无", "不在意", "另外"];
const zoBodyStatusArr = ['健康', '一般', '较差'];
const zoAcceptFamilyCohabitationArr = ['接受', '不接受'];
export {
  getIndex,
  getHeightIndex,
  getWeightIndex,
  getIncomeIndex,
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
  whenMarriageArr,
  zoHadChildArr,
  zoBodyStatusArr,
  zoAcceptFamilyCohabitationArr,
  provinces,
  professionArr
}