<template>
  <div class="regin">
    <div class="content">
      <div class="left">
        地区
      </div>
      <ul class="hospital">
        <li class="active">全部</li>
        <li>昌平区</li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { } from "vue"
</script>

<style lang="scss" scoped>
.regin{
   color: #7f7f7f;
   margin-top:10px;
   .content{
    display:flex;
    .left{
        margin-right: 10px;
    }
    .hospital{
      display:flex;
       li {
        margin-right: 10px;
        &.active {
          color: #55a6fe;
        }
      }
      li:hover{
      color: #55a6fe;
      cursor: pointer;
      }
    }
   }
}
</style>
