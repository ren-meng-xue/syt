<template>
  <div class="container">
    <!-- 顶部 -->
    <HospitalTop />
    <!-- 展示路由组件的区域 -->
    <div class="content">
     <router-view></router-view>
    </div>
    <!-- 底部 -->
    <HosiptalBottom  />
    <!-- 登陆组件 -->
    <Login v-if="userStore.visiable"/>
  </div>
</template>

<script lang="ts" setup>
import useUserStore from './store/modules/user'
let userStore = useUserStore()
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: center;
  /* 设置容器高度为视窗高度 */
  .content {
    flex: 1;
    overflow: auto;/* 添加滚动效果 */
    width: 1200px;
  }
}
</style>
