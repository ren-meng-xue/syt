//定义用户相关的仓库
import { defineStore } from 'pinia'
import { reqCode } from '@/api/hospital';
const useUserStore = defineStore('User', {
  state: () => {
    return {
      visiable: false,//用于控制登陆组件的dialog的显示与隐藏
      code:'',//存储用户的验证码
    }
  },
  actions: {
    async getCode(phone:string) {
      let result: any = await reqCode(phone)
      console.log(result,'88');
      if(result.code==200){
         this.code=result.data
         return 'ok'
      }else{
        return Promise.reject(new Error(result.message))
      }

    }
  },
  getters: {

  }
})

export default useUserStore