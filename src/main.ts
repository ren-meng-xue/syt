// vue3框架提供的方法createApp方法，可以用来创建应用实例方法
import { createApp } from 'vue'
//引入根组件App
import App from './App.vue'
//引入清楚默认样式
import './style/reset.scss'
//引入vue-router
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 引入全局组件--顶部、底部都是全局组件
import HospitalTop from '@/components/hospital_top/index.vue'
import HosiptalBottom from '@/components/hospital_bottom/index.vue'
import Login from '@/components/login/index.vue'
//引入就诊人组件
import visitorVue from './components/visitor/visitor.vue'
//@ts-ignore 忽略ts的校验文件
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
//引入大仓库
import pinia from '@/store'
//利用createApp方法创建应用实例，且将应用实例挂载到挂载点上
const app =createApp(App)
app.component('HospitalTop', HospitalTop);
app.component('HosiptalBottom', HosiptalBottom);
app.component('Login',Login)
//就诊人组件
app.component('visitorVue',visitorVue)
//安装vue-router
app.use(router)

app.use(ElementPlus,{
  locale: zhCn,
})
app.use(pinia)

app.mount('#app')
