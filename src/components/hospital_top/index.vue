<template>
  <div class="top">
    <div class="content">
      <!-- 左侧 -->
      <div class="left" @click="goHome">
        <img src="../../assets/images/logo.png" alt="">
        <p>尚医通 预约挂号统一平台</p>
      </div>
      <div class="right">
        <p class="help">帮助中心</p>
        <p class="login" @click="login" v-if="!userStore.userInfo.name">登陆/注册</p>
       <el-dropdown v-else>
    <span class="el-dropdown-link">
    {{ userStore.userInfo.name }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="goUser('/user/authentication')">实名认证</el-dropdown-item>
        <el-dropdown-item @click="goUser('/user/order')">挂号订单</el-dropdown-item>
        <el-dropdown-item @click="goUser('/user/patient')">就诊人</el-dropdown-item>
        
        <el-dropdown-item  @click="logout">退出登陆</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowDown } from '@element-plus/icons-vue'

import { useRouter } from "vue-router";
//获取user仓库的数据
import useUserStore from '@/store/modules/user'
let userStore = useUserStore()
let $router = useRouter()
const goHome = ()=>{
  $router.push({
    path:'/home'
  })
}
//点击顶部下拉菜单进行路由跳转
const goUser = (path:string)=>{
 $router.push({
    path
  })
}
const login = ()=>{
    userStore.visiable=true
}
//退出登陆
const logout = ()=>{
  //通知pinia仓库清楚用户相关信息
  userStore.logout()
  

    $router.push({
    path:'/home'
  })
}
</script>

<style lang="scss" scoped>
.top {
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: center;
  .content {
    width: 1200px;
    background-color: white;
    display: flex;
    justify-content: space-between;
    .left{
      display: flex;
      justify-content: center;
      align-items: center;
      p{
        font-size: 20px;
        color: skyblue;
      }
      img{
        width: 50px;
        height: 50px;
        margin-right: 10px;
      }
    }
    .right{
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      .help{
        margin-right: 10px;
      }
    }

  }
}

</style>
