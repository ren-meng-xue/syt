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
        <p class="login">登陆/注册</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
let $router = useRouter()
const goHome = ()=>{
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
