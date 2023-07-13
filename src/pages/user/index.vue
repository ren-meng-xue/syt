<template>
  <div class="user">
    <!-- 左侧显示导航区域 -->
    <div class="menu">
       <div class="top">
        <el-icon>
          <HomeFilled />
        </el-icon>
        <span> / 会员中心</span>
      </div>
      <el-menu
        class="el-menu-vertical-demo"
        :default-active="$route.path"
      >
         <el-menu-item index="/user/authentication" @click="goUser('/user/authentication')">
          <el-icon><document /></el-icon>
          <span>实名认证</span>
        </el-menu-item>
       
        <el-menu-item index="/user/order" @click="goUser('/user/order')">
          <el-icon><icon-menu /></el-icon>
          <span>挂号订单</span>
        </el-menu-item>
        <el-menu-item index="/user/patient" @click="goUser('/user/patient')">
          <el-icon><document /></el-icon>
          <span>就诊人管理</span>
        </el-menu-item>
        <el-menu-item index="/user/profile" @click="goUser('/user/profile')">
          <el-icon><setting /></el-icon>
          <span>账号信息</span>
        </el-menu-item>
        <el-menu-item index="/user/feedback" @click="goUser('/user/feedback')">
          <el-icon><Location /></el-icon>
          <span>意见反馈</span>
        </el-menu-item>
      </el-menu>



    </div>
    <!-- 右侧展示会员中心二级路由组件区域 -->
    <div class="content"><router-view ></router-view></div>
  </div>
</template>

<script setup lang="ts">
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
  HomeFilled
} from '@element-plus/icons-vue'
import {} from "vue"
import {useRouter,useRoute} from 'vue-router'
let $router = useRouter()//操作跳转路由
let $route = useRoute()
const goUser = (path:string)=>{
$router.push({path})
}
</script>

<style lang="scss" scoped>
.user{
  display: flex;
  .menu{
    flex: 2;
    display: flex;
    flex-direction: column;
    align-items: center;

  }
  .content{
    flex: 8;
  }
}

</style>
