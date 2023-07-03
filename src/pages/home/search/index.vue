<template>
  <div class="search">
    <el-autocomplete clearable placeholder="请输入医院名称" />
    <el-button type="primary" size="default" :icon="Search">搜索</el-button>
  </div>
</template>

<script setup lang="ts">
import {
  Search,
} from '@element-plus/icons-vue'
import { } from "vue"
</script>

<style lang="scss" scoped>
/* scoped添加上是局部样式，只在当前组件生效的
   如果想修改第三方的样式，需要用到深度选择器
   深度选择器有三种:>>>原生的css选择器，less选择器经常用到的/deep/， scss经常用到的::v-deep
 */
.search {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  margin: 10px 0;
  ::v-deep(.el-input__wrapper) {
    width: 300px;
    margin-right:10px;
  }


}
</style>
