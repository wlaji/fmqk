export const isPhone = (value)=>{
  if (!/^1(3|4|5|7|8)\d{9}$/.test(value)) {
    return false
  } else {
     return true
  }
}

export const isEmpty = (value)=>{
  if(value.replace(/\s+/g, '').length ==0){
    return false
  }else{
    return true
  }
}