<template>
  <div class="">
    <span>倒计时({{ time }}s)</span>
  </div>
</template>

<script setup lang="ts">
import {ref,watch} from "vue"
//倒计时的时间
let time =ref<number>(5)

//监听父组件传递过来的props数据变化
watch(()=>props.flag,()=>{

  //开启定时器
let timer = setInterval(()=>{
    time.value--;
    if(time.value==0){
        //通知父组件倒计时模式结束
      $emits('getFlag',false)
      //清楚定时器
      clearInterval(timer)
    
    }
  },1000)
},{
  immediate:true,//上来立马监听一次
})
//接收父组件传递过来的props->flag 用于控制计数器显示与隐藏
let props = defineProps(['flag'])
let $emits =defineEmits(['getFlag'])
</script>

<style lang="scss" scoped></style>
