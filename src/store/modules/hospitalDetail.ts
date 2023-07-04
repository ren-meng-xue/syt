
import { defineStore } from 'pinia';
//pinia仓库的写法一种是组合式API写法，一种是选择式API
import { reqHospitalDetail } from '@/api/hospital';
//引入详情ts类型
import type { HospitalDetail, HosPitalDetail } from '@/api/hospital/type';
import type {DetailState} from './interface'
const useDetailStore = defineStore('Detail', {
  state: ():DetailState => {
    return {
      //医院详情的数据
      // hospitalInfo:{}
      hospitalInfo: ({} as HosPitalDetail),
    }
  },
  actions: {
    //获取医院详情的方法
    async getHospital(param: string) {
      let result: HospitalDetail = await reqHospitalDetail(param)
      if (result.code == 200) {
        this.hospitalInfo = result.data
      }

    }
  },
  getters: {

  }
})

//获取仓库的方法对外暴露
export default useDetailStore