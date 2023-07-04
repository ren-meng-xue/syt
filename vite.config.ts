import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

//引入node提供内置模块path：可以获取绝对路径
import path from 'path';
export default defineConfig({
  plugins: [vue()],
  //src 文件夹配置别名
    resolve: {
      alias: {
        "@": path.resolve("./src"),
      },
    },
    //配置代理跨域
    server:{
        proxy:{
          '/api': {
            //必须得带上/api,否则代理服务器不工作
          target: 'http://syt.atguigu.cn',
          changeOrigin: true,
          // rewrite: (path) => path.replace(/^\/api/, ''),//路径重血
        },
      }
    }
})
