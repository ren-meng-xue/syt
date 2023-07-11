//对于axios函数库进行二次封装
//二次封装的目的：
// 1.利用axios请求，响应拦截器的功能
// 2.请求拦截器可以在请求头当中携带公共的参数token
// 3.响应拦截器：简化服务器返回的数据，处理http网络错误 404 ，500 ，503
import axios from 'axios';
//引入用户相关的仓库
import  useUserStore from '../store/modules/user'
// @ts-ignore
import { ElMessage } from 'element-plus';
import { log } from 'console';
/***
 * axios是axios提供的对象
 * request也是一个请求，但是request上配置了请求的地址和请求的超时的时间
 */
//利用axios.create方法创建一个axios实例，可以设置基础路径 、超时的时间的设置
const request = axios.create({
  baseURL: '/api',//请求的基础路径设置
  timeout: 5000,//超时的时间的设置，超出5s请求就是失败
})

//请求拦截器interceptors
request.interceptors.request.use((config) => {
  //config：请求拦截器回调注入的对象（配置对象）如果不return连请求都发不了，配置对象的身上最重要的一件事情有header属性
  //可以通过请求头携带公共的参数token
  let userStore  = useUserStore()
  if(userStore.userInfo.token){
    config.headers.token = userStore.userInfo.token
  }
  
  return config;
})

//响应拦截器 有两个回调，一个是成功的回调，一个是失败的回调
request.interceptors.response.use((response) => {
  //响应拦截器 成功的回调一般用于简化数据
  return response.data

}, (error) => {
  //处理http网络错误
  // 但是要返回一个失败的promise请求对象
  let status = error.response.status;
  let message = ''
  switch (status) {
    case 401:
      message = "TOKEN过期";
      break;
    case 403:
      message = "无权访问";
      break;
    case 404:
      message = "请求地址错误";
      break;
    case 500:
      message = "服务器出现问题";
      break;
    default:
      message = "网络出现问题";
      break;
  }
  //提示错误信息
  ElMessage({
    type: "error",
    message,
  });


  return Promise.reject(new Error(error.message));

})

//对外暴露axios
export default request