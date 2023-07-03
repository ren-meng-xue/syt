<template>
  <div class="regin">
    <div class="content">
      <div class="left">
        地区
      </div>
      <ul class="hospital">
        <li class="active">全部</li>
        <li>昌平区</li>
        <li v-for="item in 20" :key="item">昌平区</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { } from "vue"
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
}</style>
