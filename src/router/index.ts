import {createRouter,createWebHistory} from 'vue-router'
import {constantRoute} from './routes'
// createRouter 用于创建路由器实例，可以管理多个路由
export default createRouter({
  //路由模式的设置 history
  history: createWebHistory(),
  //管理路由
  routes:constantRoute,
//滚动行为:控制滚动条的位置
scrollBehavior(){
  return {
    left: 0,
    top:0
  }
}
})
