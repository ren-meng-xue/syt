<template>
  <div class="hospital">
    <!-- 左侧导航区域 -->
    <div class="menu">
      <div class="top">
        <el-icon>
          <HomeFilled />
        </el-icon>
        <span> / 医院信息</span>
      </div>
      <el-menu :default-active="$route.path" class="el-menu-vertical-demo">
        <el-menu-item index="/hospital/register" @click="changeAcitve('/hospital/register')">
          <el-icon><icon-menu /></el-icon>
          <span>预约挂号</span>
        </el-menu-item>
        <el-menu-item index="/hospital/detail" @click="changeAcitve('/hospital/detail')">
          <el-icon>
            <document />
          </el-icon>
          <span>医院详情</span>
        </el-menu-item>
        <el-menu-item index="/hospital/notice" @click="changeAcitve('/hospital/notice')">
          <el-icon>
            <setting />
          </el-icon>
          <span>预约通知</span>
        </el-menu-item>
        <el-menu-item index="/hospital/close" @click="changeAcitve('/hospital/close')">
          <el-icon>
            <setting />
          </el-icon>
          <span>停诊信息</span>
        </el-menu-item>
        <el-menu-item index="/hospital/search" @click="changeAcitve('/hospital/search')">
          <el-icon>
            <Search />
          </el-icon>
          <span>查询/取消</span>
        </el-menu-item>
      </el-menu>
    </div>
    <!-- 右侧内容展示区域：路由组件展示位置 -->
    <div class="content">
      <!-- 子组件展示 -->
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script setup lang="ts">
//左侧菜单需要用到的菜单
import {
  Document,
  Menu as IconMenu,
  Setting,
  InfoFilled,
  Search,
  HomeFilled,
} from "@element-plus/icons-vue";
import { useRouter,useRoute } from "vue-router";
//获取路由器
let $router= useRouter()
//获取路由信息
let $route = useRoute()
console.log($route.path);

//左侧菜单点击事件的回调
const changeAcitve = (path:string)=>{
  console.log(path,'path');
  //跳转到对应的二级路由 key value一致省略key
  $router.push({path})
  
}
</script>

<style lang="scss" scoped>
.hospital {
  display: flex;

  .menu {
    flex: 2;
    display: flex;
    flex-direction: column;
    align-items: center;

    .top {
      color: #7f7f7f;
    }
  }

  .content {
    flex: 8;
  }
}</style>
