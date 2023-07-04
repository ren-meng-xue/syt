<template>
  <div class="search"> 
    <el-autocomplete clearable placeholder="请输入医院名称"    v-model="hosname" :fetch-suggestions="fetchData" :trigger-on-focus="false" @select="goDetail"/>
    <el-button type="primary" size="default" :icon="Search">搜索</el-button>
  </div>
</template>

<script setup lang="ts">
import {Search,} from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { ref } from "vue"
import { reqHospitalInfo } from '@/api/home'
import type { HospitalInfo,Content } from '@/api/home/type'
//创建路由器对象
let $router = useRouter()
//收集搜索的关键字
let hosname = ref<string>('')
//顶部组件的回调
const fetchData = async(keyword:string,cb:any)=>{
  //当用户输入完关键字次函数会被执行一次，发请求获取需要展示的数据即可
  //帮我门做了防抖截流
  let result :HospitalInfo= await reqHospitalInfo(keyword)
  //整理数据，变成组件需要的数据格式
  let showData = result.data.map((item)=>{
    return {
      value:item.hosname,//展示医院的名字
      hoscode:item.hoscode,//存储医院的编码
    }
  })
  console.log(showData,'showData');
  
  //给组件提供展示的数据
  cb(showData)
  
}
//点击推荐项
const goDetail = (item)=>{
  //item即为选择的那一项 
  //点击推荐项，进入到页面的详情页，需要携带query
  $router.push({
    path:'/hospital'
  })
  // $router.push('/hospital')
  console.log(123,'123');
  
}
</script>
<script lang="ts">
export default {
  name:'search'
}
</script>
<style lang="scss" scoped>
/* scoped添加上是局部样式，只在当前组件生效的
   如果想修改第三方的样式，需要用到深度选择器
   深度选择器有三种:>>>原生的css选择器，less选择器经常用到的/deep/， scss经常用到的::v-deep
 */
.search {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  margin: 10px 0;
  ::v-deep(.el-input__wrapper) {
    width: 300px;
    margin-right:10px;
  }


}
</style>
