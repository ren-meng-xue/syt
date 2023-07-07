<template>
  <div class="wrap">
    <!-- 顶部结构 -->
    <div class="top">
      <div class="hosname">北京xx医院</div>
      <div class="line"></div>
      <div>专科</div>
      <div class="dot">.</div>
      <div class="hosdepartment">xxx专科门诊</div>
    </div>
    <div class="center">
      <h1 class="time">2023年6月3日</h1>
      <div class="container">
        <div class="item" v-for="item in 6 " :key="item">
          <div class="top1">123</div>
          <div class="bottom">456</div>
        </div>
      </div>
      <el-pagination layout="prev, pager, next" :total="50" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reqHospitalWork } from '@/api/hospital'
import { useRoute } from 'vue-router'
import { ref, onMounted } from "vue"
let $route = useRoute()
let pageNo = ref<number>(1)
let limit = ref<number>(6)
onMounted(() => {
  fetchWorkData()
})
//获取挂号资源
const fetchWorkData = async () => {
  let result: any = await reqHospitalWork(pageNo.value, limit.value, $route.query.hoscode, $route.query.depcode)
  console.log(result, 'resultresultresult');

}
</script>

<style lang="scss" scoped>
.wrap {
  .top {
    display: flex;
    color: #7f7f7f;

    .line {
      width: 2px;
      height: 15px;
      background: #7f7f7f;
      margin: 0 5px;
    }

    .dot {
      margin: 0 5px;
    }
  }

  .center {
    margin: 20px 0;
    display: flex;
    flex-direction: column;
    align-items: center;

    .time {
      font-size: 900;
      color: #7f7f7f;
    }

    .container {
      width: 100%;
      display: flex;
      margin: 30px 0;

      .item {
        flex: 1;
        border: 1px solid skyblue;
        margin: 0 5px;
        width: 100%;

        .top1 {
          width: 100%;
          height: 30px;
          background: #e8f2ff;
          text-align: center;
          line-height: 30px;
        }

        .bottom {
          width: 100%;
          height: 60px;
          text-align: center;
          line-height: 60px;
        }
      }
    }
  }
}</style>
