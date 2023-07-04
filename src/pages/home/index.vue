<template>
  <div class="">
    <!-- 首页轮播图的结构 -->
    <carousel />
    <!-- 首页搜索医院的表单 区域 -->
    <search />
    <!-- 底部展示医院的结构-->
    <el-row :gutter="20">
      <el-col :span="20">
        <!-- 等级子组件 -->
        <level @getLevel="getLevel" />
        <!-- 区域 -->
        <regin @getRegin="getRegin" />
        <!-- 卡片 -->
        <div class="hospital" v-if="hasHospitalArr.length !== 0">
          <card v-for="(item, index) in hasHospitalArr " :key="index" class="item" :hospitalInfo="item" />
        </div>
        <el-empty v-else description="暂无数据" />
        <!-- 分页器 -->
        <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[10, 20, 30, 40]"
          :background="true" layout="prev, pager, next, jumper,->,total, sizes," :total="total"
          @current-change="handleCurrentChange" @size-change="handleSizeChange" />
      </el-col>
      <el-col :span="4">456</el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
//引入首页轮播图组件
import carousel from './carousel/index.vue'
//引入首页搜索组件
import search from './search/index.vue'
//引入首页等级组件
import level from './level/index.vue';
//引入首页地区组件
import regin from './regin/index.vue';
//引入首页卡片
import card from './card/index.vue';
import { ref, onMounted } from 'vue'
import { reqHospital } from '@/api/home/index.ts'
import type { HospitalResponseData, Content } from '@/api/home/type.ts'
let pageNo = ref<number>(1)
let pageSize = ref<number>(10)
//存储已有医院的数组
let hasHospitalArr = ref<Content>([])
//存储医院的等级相应数据
let hostype = ref<string>('')
// 存储医院的地区相应数据
let districtCode = ref<string>('')
//存储已有医院的总个数
let total = ref<number>(0)
//组件挂载完毕，发一次请求
onMounted(() => {
  getHospitalInfo()
})
//获取已有医院的数据
const getHospitalInfo = async () => {
  const result: HospitalResponseData = await reqHospital(pageNo.value, pageSize.value, hostype.value, districtCode.value)
  if (result.code == 200) {
    hasHospitalArr.value = result.data.content
    //存储医院的总个数
    total.value = result.data.totalElements;
  }

}
//页码发生变化
const handleCurrentChange = () => {
  getHospitalInfo()
}
//分页器下拉菜单发生变化
const handleSizeChange = () => {
  getHospitalInfo()
}

//子组件的自定义事件 ：获取儿子给父组件传递过来的参数
const getLevel = (level: string) => {
  //收集等级的参数
  hostype.value = level;
  //再次发起请求
  getHospitalInfo()
}
//子组件的自定义事件：获取儿子给父组件传递的区域的参数
const getRegin = (regin: string) => {
  console.log(regin, 'regin');
  districtCode.value = regin
  //再次发起请求
  getHospitalInfo()
}
</script>

<style lang="scss" scoped>
.hospital {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .item {
    width: 48%;
    margin: 10px 0;
  }
}

.data {
  height: 500px;
}
</style>
