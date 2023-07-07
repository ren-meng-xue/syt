//定义用户相关的仓库
import { defineStore } from 'pinia'
import { reqCode, reqUserLogin } from '@/api/hospital';
import type { UserLoginResponseData, LoginData } from '@/api/hospital/type';
import type { UserState } from './interface';
import { SET_TOKEN,GET_TOKEN ,REMOVE_TOKEN} from '@/utils/user';

const useUserStore = defineStore('User', {
  state: ():UserState => {
    return {
      visiable: false,//用于控制登陆组件的dialog的显示与隐藏
      code: '',//存储用户的验证码
      userInfo:JSON.parse(GET_TOKEN() as string)||{}
    }
  },
  actions: {
    //获取验证码的方法
    async getCode(phone: string) {
      let result: any = await reqCode(phone)
      if (result.code == 200) {
        this.code = result.data
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    //用户手机号登陆方法
    async userLogin(loginData: LoginData) {
      let result: UserLoginResponseData = await reqUserLogin(loginData)
      if(result.code==200){
      this.userInfo = result.data
      //本地存储持久化存储用户信息
      // localStorage.setItem('userInfo', JSON.stringify(this.userInfo))
      SET_TOKEN(JSON.stringify(this.userInfo))
      //返回一个成功的promise
      return 'ok'
      }else{
        return Promise.reject(new Error(result.message))
      }
    },
    //退出登陆
    logout(){
      console.log('logout');
      this.userInfo={name:'',token:''}
      REMOVE_TOKEN()
    },
    //查询微信扫码的接口（查看本地存储是否存储数据）
    queryState(){
      //只要变为场景一，就会触发这个方法
      console.log(111);
      //开启定时器每隔一段时间：本地
      
    }

  },
  getters: {

  }
})

export default useUserStore