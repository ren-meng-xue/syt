//本地存储操作用户信息的方法
export const SET_TOKEN = (userInfo:string)=>{
  localStorage.setItem('userInfo',userInfo)
}

//获取
export const GET_TOKEN = ()=>{
return localStorage.getItem('userInfo')  
}
//清楚

export const REMOVE_TOKEN = ()=>{
  localStorage.removeItem('userInfo')
}