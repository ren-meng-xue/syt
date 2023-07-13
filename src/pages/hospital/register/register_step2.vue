<template>
  <div class="container">
    <h1 class="tip">确认挂号信息</h1>
    <!-- 卡片展示就诊人信息的 -->
    <el-card class="box-card">
      <!-- 卡片的 头部，分为一左一右 -->
      <template #header>
        <div class="card-header">
          <span>请选择就诊人</span>
          <el-button type="primary" size="default" :icon="User">添加就诊人</el-button>
        </div>
      </template>
      <!-- 卡片的身体部分展示就诊人信息 -->
      <div class="user">
        <visitor v-for="(user, index) in userArr" :key="user.id" class="item" :user="user" @click="changeIndex(index)" :index="index" :currentIndex="currentIndex" />
      </div>
    </el-card>
    <!-- 展示医生的信息 -->
    <el-card class="box-card">
      <!-- 卡片的头部 -->
      <template #header>
        <div class="card-header">
          <span>挂号信息</span>
        </div>
      </template>
      <!-- 身体部分 -->
      <el-descriptions class="margin-top" :column="2" border>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              就诊日期：
            </div>
          </template>
          {{ doctorInfo.workDate }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              就诊医院：
            </div>
          </template>
          {{ doctorInfo.param?.hosname }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              就诊科室：
            </div>
          </template>
          {{ doctorInfo.param?.depname }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              医生姓名：
            </div>
          </template>
          {{ doctorInfo.docname }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              医生职称：
            </div>
          </template>
          {{ doctorInfo.title }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              医生专长：
            </div>
          </template>
          {{ doctorInfo.skill }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              医生服务费：
            </div>
          </template>
          <span style="color: red;">{{ doctorInfo.amount }}</span>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
    <!-- 确定挂号按钮 -->
    <div class="btn">
      <el-button type="primary" :disabled="currentIndex==-1?true:false">确认挂号</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import { User } from "@element-plus/icons-vue";
import { useRoute } from 'vue-router'
import visitor from './visitor.vue'
import { reqGetUser, reqDoctorInfo } from "@/api/hospital";
import type { UserArr, DoctorInfoData, Doctor } from '@/api/hospital/type';
let $route = useRoute()
//存储全部就诊人信息
let userArr = ref<UserArr>([])
let doctorInfo = ref<any>({})
//存储用户就诊人的索引值
let currentIndex = ref<number>(-1)
onMounted(() => {
  //获取就诊人信息
  fetchUserData()
  //获取医生信息
  reqDoctorInfos()
})

const fetchUserData = async () => {
  //获取就诊人信息：当前老师的这个账号下曾经已有四个就诊人信息
  // 如果你是新的账号切记在已经写好的项目中先注册几个就诊人信息
  let result: any = await reqGetUser()
  if (result.code == 200) {
    userArr.value = result.data
  }
}
//获取医生信息
const reqDoctorInfos = async () => {
  let result: DoctorInfoData = await reqDoctorInfo($route.query.docId as string)
  if (result.code == 200) {
    doctorInfo.value = result.data
  }
}
//点击就诊人子组件的回调
const changeIndex =(index:number)=>{
  //存储当前用户选中的就诊人的索引值
  currentIndex.value=index
}
</script>

<style lang="scss" scoped>
.container {
  .tip {
    font-weight: 900;
    color: #7f7f7f;
    font-size: 20px;
  }

  .box-card {
    margin: 20px 0px;

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .user {

      display: flex;
      flex-wrap: wrap;

      .item {
        margin: 5px;
        width: 32%;
      }
    }
  }

  .btn {
    display: flex;
    justify-content: center;
    margin: 10px 0;
  }
}
</style>
