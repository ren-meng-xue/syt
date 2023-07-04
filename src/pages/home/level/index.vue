<template>
  <div class="level">
    <h1>医院</h1>
    <div class="content">
      <div class="left">等级</div>
      <ul class="hospital">
        <li :class="{active:activeFlag===''}" @click="changeLevel('')">全部</li>
        <li v-for="level in levelArr" :key="level.value" @click="changeLevel(level.value)" :class="{active:activeFlag==level.value}">{{ level.name }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import { reqHospitalLevelAndRegin } from '@/api/home'
import type { HospitalLevelAndReginResponseData, HospitalLevelAndReginArr } from '@/api/home/type'

//定义一个数组存储医院等级数据
let levelArr = ref<HospitalLevelAndReginArr>([])
//控制医院等级高亮的响应式数据
let activeFlag = ref<string>('')
//组件挂载完毕
onMounted(() => {
  getLevel()
})
//获取医院等级的数据
const getLevel = async () => {
  let result: HospitalLevelAndReginResponseData = await reqHospitalLevelAndRegin('HosType')
  if (result.code == 200) {
    levelArr.value = result.data
  }

}
//切换高亮
const changeLevel =(level:string)=>{
  //高亮响应式数据存储level数值
activeFlag.value=level
//触发自定义事件：将医院等级参数回传给父组件
$emits('getLevel',activeFlag.value)
}
let $emits =defineEmits(['getLevel'])
</script>
<script lang="ts">
export default {
  name:"Level"
}
</script>
<style lang="scss" scoped>
.level {
  color: #7f7f7f;

  h1 {
    font-weight: 900;
    margin: 10px 0;
  }

  .content {
    display: flex;

    .left {
      margin-right: 10px;
    }

    .hospital {
      display: flex;

      li {
        margin-right: 10px;

        &.active {
          color: #55a6fe;
        }
      }

      li:hover {
        color: #55a6fe;
        cursor: pointer;
      }
    }
  }
}</style>
