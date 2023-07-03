<template>
  <div class="">
    <!-- 首页轮播图的结构 -->
    <carousel/>
    <!-- 首页搜索医院的表单 区域 -->
    <search/>
    <!-- 底部展示医院的结构-->
    <el-row gutter="20">
      <el-col :span="20">
        <!-- 等级子组件 -->
        <level/>
        <regin/>
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
//引入地区组件
import regin from './regin/index.vue';
import {} from "vue"
</script>

<style lang="scss" scoped></style>
