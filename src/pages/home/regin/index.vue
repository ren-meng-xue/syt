<template>
  <div class="regin">
    <div class="content">
      <div class="left">
        地区
      </div>
      <ul class="hospital">
        <li :class="{ active: RegionFlag == '' }" @click="changeRegion('')">全部</li>
        <li v-for="item in RegionArr" :key="item.value" :class="{ active: RegionFlag == item.value }"
          @click="changeRegion(item.value)">{{ item.name }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { reqHospitalLevelAndRegin } from "@/api/home";
import type { HospitalLevelAndReginArr, HospitalLevelAndReginResponseData } from "@/api/home/type";
let RegionArr = ref<HospitalLevelAndReginArr>([])
let RegionFlag = ref<string>('')
onMounted(() => {
  getRegin()
})
//获取地区的数据
const getRegin = async () => {
  let result: HospitalLevelAndReginResponseData = await reqHospitalLevelAndRegin('Beijin')
  if (result.code == 200) {
    RegionArr.value = result.data
  }
}
const changeRegion = (level: string) => {
  RegionFlag.value = level
  $emits('getRegin', RegionFlag.value)
}


let $emits = defineEmits(['getRegin'])
</script>

<script lang="ts">
export default {
  name: "Region",
};
</script>
<style lang="scss" scoped>
.regin {
  color: #7f7f7f;
  margin-top: 10px;

  .content {
    display: flex;

    .left {
      margin-right: 10px;
      width: 39px;
    }

    .hospital {
      display: flex;
      flex-wrap: wrap;

      li {
        margin-right: 5px;
        margin-bottom: 10px;

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
}
</style>
