export const constantRoute =[
    {
    path:'/home',
    component:()=>import('@/pages/home/index.vue')
  },
    {
    path:'/hospital',
    component:()=>import('@/pages/hospital/index.vue')
  },
  {
    path:'/',
    redirect:'/home'
  }
]