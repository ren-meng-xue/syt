<template>
  <div class="visitor">
    <div class="top">
      <div class="left">
        <span class="free">{{ user.isInsure == 1 ? '医保' : '自费' }}</span>
        <span class="username"> {{ user.name }}</span>
      </div>
      <div class="right">
        <el-button type="primary" circle :icon="Edit"></el-button>
        <el-button type="danger" circle :icon="Delete"></el-button>
      </div>
    </div>
    <div class="bottom">
      <p>证件类型：{{ user.param.certificatesTypeString }}</p>
      <p>证件号码：{{ user.certificatesNo }}</p>
      <p>用户性别：{{ user.sex == 0 ? '女生' : '男生' }}</p>
      <p>出生日期：{{ user.birthdate }}</p>
      <p>手机号码：{{ user.phone }}</p>
      <p>婚姻状况：{{ user.isMarry == 0 ? '未婚' : '已婚' }}</p>
      <p>当前住址：{{ user.param.cityString }}</p>
      <p>详细地址：{{ user.param.fullAddress }}</p>
    <!-- 红色的已经选择的盒子 -->
  <transition name="confirm" mode="">
      <div class="confirm" v-if="index===currentIndex">
      已选择
    </div>
  </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { Edit,Delete } from "@element-plus/icons-vue";
import { } from "vue"
let $route = useRoute()

//接收父组件传递过来的就诊人信息展示
defineProps(['user','index','currentIndex'])
let $emits =defineEmits([])
</script>

<script lang="ts">

export default {
  name: 'visitor'
}
</script>
<style lang="scss" scoped>
.visitor {
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.12);

  .top {
    height: 60px;
    background: #e5e5e5;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .left {
      .free {
        background: white;
        padding: 5px;
        font-size: 12px;
        margin-right: 5px;
        border-radius: 5px;
      }

      .username {
        color: #7f7f7f;
      }
    }

  }

  .bottom {
    position: relative;
    padding-left: 50px;

    p {
      line-height: 40px;
    }
    .confirm{
      width: 200px;
      height: 200px;
      color: red;
      border-radius: 50%;
      border: 1px dashed red;
      text-align: center;
      line-height: 200px;
      position: absolute;
      left:20%;
      top: 20%;
      opacity: .5;
      transform: rotate(35deg);
      font-weight: 900;
    }
    .confirm-enter-from{
      //缩放效果
transform: scale(1);
    }
    .confirm-enter-active{

      transition: all .3s;
    }
    .confirm-enter-to{
transform: scale(1.2);

    }
  }
}
</style>
