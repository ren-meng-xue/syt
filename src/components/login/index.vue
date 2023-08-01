<template>
  <div class="login_container">
    <el-dialog v-model="userStore.visiable" title="用户登陆" :close-on-click-modal="false">
      <!-- 对话框身体结构 -->
      <div class="content">
        <el-row>
          <!-- 左侧结构：手机号码，微信扫一扫登陆 -->
          <el-col :span="12">
            <div class="login">
              <div v-show="scene == 0">
                <el-form :model="loginParams" :rules="rules" ref="loginForm">
                  <el-form-item prop="phone">
                    <el-input placeholder="请输入手机号码" :prefix-icon="User" v-model="loginParams.phone"></el-input>
                  </el-form-item>
                  <el-form-item prop="code">
                    <el-input placeholder="请输入手机验证码" :prefix-icon="Lock" v-model="loginParams.code"
                      :disabled="!isPhone || flag ? true : false"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button :disabled="!isPhone || flag ? true : false">
                      <countdown v-if="flag" :flag="flag" @getFlag="getFlag" />
                      <span v-else @click="getCode">
                        获取验证码
                      </span>
                    </el-button>
                  </el-form-item>
                </el-form>
                <!-- 用户登陆 -->
                <el-button type="primary" style="width:100%" :disabled="!isPhone || loginParams.code?.length < 6"
                  @click="login">用户登陆</el-button>
                <div class="bottom" @click="changeScene">
                  <p>微信扫码登陆</p>
                  <svg t="1685263287521" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="2450" width="32" height="32">
                    <path
                      d="M337.387283 341.82659c-17.757225 0-35.514451 11.83815-35.514451 29.595375s17.757225 29.595376 35.514451 29.595376 29.595376-11.83815 29.595376-29.595376c0-18.49711-11.83815-29.595376-29.595376-29.595375zM577.849711 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763zM501.641618 401.017341c17.757225 0 29.595376-12.578035 29.595376-29.595376 0-17.757225-11.83815-29.595376-29.595376-29.595375s-35.514451 11.83815-35.51445 29.595375 17.757225 29.595376 35.51445 29.595376zM706.589595 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763z"
                      fill="#28C445" p-id="2451"></path>
                    <path
                      d="M510.520231 2.959538C228.624277 2.959538 0 231.583815 0 513.479769s228.624277 510.520231 510.520231 510.520231 510.520231-228.624277 510.520231-510.520231-228.624277-510.520231-510.520231-510.520231zM413.595376 644.439306c-29.595376 0-53.271676-5.919075-81.387284-12.578034l-81.387283 41.433526 22.936416-71.768786c-58.450867-41.433526-93.965318-95.445087-93.965317-159.815029 0-113.202312 105.803468-201.988439 233.803468-201.98844 114.682081 0 216.046243 71.028902 236.023121 166.473989-7.398844-0.739884-14.797688-1.479769-22.196532-1.479769-110.982659 1.479769-198.289017 85.086705-198.289017 188.67052 0 17.017341 2.959538 33.294798 7.398844 49.572255-7.398844 0.739884-15.537572 1.479769-22.936416 1.479768z m346.265896 82.867052l17.757225 59.190752-63.630058-35.514451c-22.936416 5.919075-46.612717 11.83815-70.289017 11.83815-111.722543 0-199.768786-76.947977-199.768786-172.393063-0.739884-94.705202 87.306358-171.653179 198.289017-171.65318 105.803468 0 199.028902 77.687861 199.028902 172.393064 0 53.271676-34.774566 100.624277-81.387283 136.138728z"
                      fill="#28C445" p-id="2452"></path>
                  </svg>
                </div>
              </div>
              <div class="webchat" v-show="scene == 1">
                <!-- 在这个容器当中显示微信扫码登陆页面 -->
                <div id="login_container">
                </div>
                <div class="phone" @click="handler">
                  <p>手机短信验证码登录</p>
                  <svg t="1685676069573" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="2476" width="16" height="16">
                    <path
                      d="M820.409449 797.228346q0 25.19685-10.07874 46.866142t-27.716535 38.299213-41.322835 26.204724-50.897638 9.574803l-357.795276 0q-27.212598 0-50.897638-9.574803t-41.322835-26.204724-27.716535-38.299213-10.07874-46.866142l0-675.275591q0-25.19685 10.07874-47.370079t27.716535-38.80315 41.322835-26.204724 50.897638-9.574803l357.795276 0q27.212598 0 50.897638 9.574803t41.322835 26.204724 27.716535 38.80315 10.07874 47.370079l0 675.275591zM738.771654 170.330709l-455.559055 0 0 577.511811 455.559055 0 0-577.511811zM510.992126 776.062992q-21.165354 0-36.787402 15.11811t-15.622047 37.291339q0 21.165354 15.622047 36.787402t36.787402 15.622047q22.173228 0 37.291339-15.622047t15.11811-36.787402q0-22.173228-15.11811-37.291339t-37.291339-15.11811zM591.622047 84.661417q0-8.062992-5.03937-12.598425t-11.086614-4.535433l-128 0q-5.03937 0-10.582677 4.535433t-5.543307 12.598425 5.03937 12.598425 11.086614 4.535433l128 0q6.047244 0 11.086614-4.535433t5.03937-12.598425z"
                      p-id="2477"></path>
                  </svg>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="leftContent">
              <div class="top">
                <div class="item">
                  <img src="../../assets//images/code_app.png" alt="">
                  <svg t="1685263287521" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="2450" width="16" height="16">
                    <path
                      d="M337.387283 341.82659c-17.757225 0-35.514451 11.83815-35.514451 29.595375s17.757225 29.595376 35.514451 29.595376 29.595376-11.83815 29.595376-29.595376c0-18.49711-11.83815-29.595376-29.595376-29.595375zM577.849711 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763zM501.641618 401.017341c17.757225 0 29.595376-12.578035 29.595376-29.595376 0-17.757225-11.83815-29.595376-29.595376-29.595375s-35.514451 11.83815-35.51445 29.595375 17.757225 29.595376 35.51445 29.595376zM706.589595 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763z"
                      fill="#cdcdcd" p-id="2451"></path>
                    <path
                      d="M510.520231 2.959538C228.624277 2.959538 0 231.583815 0 513.479769s228.624277 510.520231 510.520231 510.520231 510.520231-228.624277 510.520231-510.520231-228.624277-510.520231-510.520231-510.520231zM413.595376 644.439306c-29.595376 0-53.271676-5.919075-81.387284-12.578034l-81.387283 41.433526 22.936416-71.768786c-58.450867-41.433526-93.965318-95.445087-93.965317-159.815029 0-113.202312 105.803468-201.988439 233.803468-201.98844 114.682081 0 216.046243 71.028902 236.023121 166.473989-7.398844-0.739884-14.797688-1.479769-22.196532-1.479769-110.982659 1.479769-198.289017 85.086705-198.289017 188.67052 0 17.017341 2.959538 33.294798 7.398844 49.572255-7.398844 0.739884-15.537572 1.479769-22.936416 1.479768z m346.265896 82.867052l17.757225 59.190752-63.630058-35.514451c-22.936416 5.919075-46.612717 11.83815-70.289017 11.83815-111.722543 0-199.768786-76.947977-199.768786-172.393063-0.739884-94.705202 87.306358-171.653179 198.289017-171.65318 105.803468 0 199.028902 77.687861 199.028902 172.393064 0 53.271676-34.774566 100.624277-81.387283 136.138728z"
                      fill="#cdcdcd" p-id="2452"></path>
                  </svg>
                  <p>微信扫一扫关注</p>
                  <p>“快速预约挂号”</p>
                </div>
                <div class="item">
                  <img src="../../assets/images/code_login_wechat.png" alt="">
                  <svg t="1685263518283" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="3668" width="16" height="16">
                    <path
                      d="M256 85.333333h512c64.8 0 117.333333 52.533333 117.333333 117.333334v618.666666c0 64.8-52.533333 117.333333-117.333333 117.333334H256c-64.8 0-117.333333-52.533333-117.333333-117.333334V202.666667c0-64.8 52.533333-117.333333 117.333333-117.333334z m0 64a53.333333 53.333333 0 0 0-53.333333 53.333334v618.666666a53.333333 53.333333 0 0 0 53.333333 53.333334h512a53.333333 53.333333 0 0 0 53.333333-53.333334V202.666667a53.333333 53.333333 0 0 0-53.333333-53.333334H256z m170.666667 618.666667a32 32 0 0 1 0-64h170.666666a32 32 0 0 1 0 64H426.666667z"
                      fill="#000000" p-id="3669"></path>
                  </svg>
                  <p>扫一扫下载</p>
                  <p>“预约挂号”APP</p>
                </div>
              </div>
              <p class="tip">尚医通官方指定平台</p>
              <p class="tip">快速挂号 安全放心</p>
            </div>
          </el-col>
        </el-row>
      </div>
      <template #footer>
        <el-button type="primary" @click="closeDialog">关闭窗口</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
//获取user仓库的数据
import useUserStore from '@/store/modules/user'
import { User, Lock } from '@element-plus/icons-vue'
import { ref, reactive, computed, watch } from 'vue'
import countdown from '../countdown/index.vue'
import { reqWxLogin } from '@/api/hospital'
import type { WxLoginRespnsetData } from '@/api/hospital/type'
// @ts-ignore
import { ElMessage } from 'element-plus';
import { GET_TOKEN } from '@/utils/user'
let userStore = useUserStore()
let scene = ref<number>(0)//0 代表手机号码登录，1代表微信扫码登陆
let loginForm = ref()
//定义一个响应式数据控制倒计时组件显示与隐藏
let flag = ref<boolean>(false)//flag 为真开始倒计时 为假并非倒计时 二选一
let loginParams = reactive({
  phone: '',
  code: ''
})

//计算出当前表单元素收集的内容是否是手机格式
let isPhone = computed(() => {
  //手机号码的正则表达式
  const reg = /^1((34[0-8])|(8\d{2})|(([35][0-35-9]|4[579]|66|7[35678]|9[1389])\d{1}))\d{7}$/;
  //返回bool值，真代表的是手机号码
  return reg.test(loginParams.phone)
})
//点击微信扫码登陆｜微信小图标 切换为微信扫码
const changeScene = async () => {
  scene.value = 1
  //生成微信扫码登陆的二维码页面
  //发请求获取微信扫码需要的二维码参数
  // 需要向服务器发请求，获取微信扫码登陆页面的参数
  //还需要携带一个参数，告诉服务器用户授权成功以后重定向到项目的某一个页面
  let redirect_Url = encodeURIComponent(window.location.origin + `/wxlogin`)//http%3A%2F%2Flocalhost%3A5173 redirect_Url
  // decodeURIComponent("http%3A%2F%2Flocalhost%3A5173") //'http://localhost:5173'
  // console.log(redirect_Url,'redirect_Url');

  let result: WxLoginRespnsetData = await reqWxLogin(redirect_Url)
  console.log(result, 'resultresult');
  // @ts-ignore
  new WxLogin({
    self_redirect: true,//手机点击确认登陆后可以在iframe内跳转到redirect_uri
    id: "login_container", //显示二维码容器的设置
    appid: result.data.appid, //应用的唯一标识appid，需要向服务端发请求获取
    scope: "snsapi_login", //当前微信扫码登陆页面已经授权了
    redirect_uri: result.data.redirectUri,//填写授权回调域路径，就是用户授权成功以后，微信服务器向公司后台推送code地址
    state: result.data.state,//公司的服务器重定向的地址携带用户信息
    style: "black",//提供"black"、"white"可选，默认为黑色文字描述。详见文档底部FAQ
  });
}


//获取验证码按钮
const getCode = async () => {
  //解决element-plus按钮禁用还能点击
  if (!isPhone.value || flag.value) return
  //开启倒计时模式
  flag.value = true
  //通知pinia仓库存储验证码
  try {
    //代表获取验证码成功
    await userStore.getCode(loginParams.phone)
    loginParams.code = userStore.code

  } catch (error) {
    //获取验证码失败
    ElMessage({
      type: "error",
      message: (error as Error).message,
    });
  }
}

//计数器子组件绑定的自定义事件
const getFlag = (val: boolean) => {
  //当倒计时为0的时候，通知父组件，倒计时是0 flag应该隐藏
  flag.value = val
}
//点击用户登陆按钮
const login = async () => {
  //发起仓库去仓库
  //登陆请求成功：顶部组件需要展示用户名字，对话框关闭
  // 登陆请求失败：弹出对应登陆失败的错误信息


  try {
    //添加await的目的是必须等待用户登陆成功
    //用户登陆成功
    await userStore.userLogin(loginParams)
    //关闭loginDialog
    userStore.visiable = false
    //获取url的query参数
    let redirect = $route.query.redirect;
    if(redirect){
      $router.push(redirect as string);
    }else{
      $router.push('/home');
    }

  } catch (error) {
    ElMessage({
      type: "error",
      error: (error as Error).message
    })
  }
}

//自定义校验规则手机号
const validatorPhone = (rule: any, value: any, callback: any) => {
  //rule即为表单校验规则对象
  // value 当前文本的内容
  // callback  回调函数  

  //手机号码的正则表达式
  const reg = /^1((34[0-8])|(8\d{2})|(([35][0-35-9]|4[579]|66|7[35678]|9[1389])\d{1}))\d{7}$/;
  if (reg.test(value)) {
    callback()
  } else {
    callback(new Error('请输入正确的的手机号码格式'))
  }
}
// 验证码自定义校验规则
const validatorCode = (rule: any, value: any, callBack: any) => {
  //rule:即为表单校验规则对象
  //value:即为当前文本的内容
  //callBack:回调函数
  if (/^\d{6}$/.test(value)) {
    callBack();
  } else {
    callBack(new Error("请输入正确的验证码格式"));
  }
};
const rules = {
  // trigger 代表的是表单校验触发的时机：change文本发生变化的时候 blur失去焦点
  // phone: [
  //   { required: true, message: '输入手机号十一位', trigger: 'change', min: 11 },
  // ],
  // code: [
  //   { required: true, message: '验证码无比6位', trigger: 'blur', min: 6 },
  // ]
  phone: [
    {
      trigger: 'change', validator: validatorPhone
    }
  ],
  code: [
    {
      trigger: 'change', validator: validatorCode
    }
  ]
}
//关闭窗口按钮的回调
const closeDialog = () => {
  userStore.visiable = false
}

//点击手机短信验证码盒子的回调
const handler = () => {
  scene.value = 0
}

//监听场景的数据
watch(() => scene.value, (val: number) => {
  if (val == 1) {
    //说明是扫码
    // userStore.queryState()
    let timer = setInterval(() => {
      if (GET_TOKEN()) {
        userStore.visiable = false
        userStore.userInfo = JSON.parse(GET_TOKEN() as string)
        clearInterval(timer)
      }
    })
  }
})

</script>


<script lang="ts">
export default {
  name: "Login"
}
</script>

<style lang="scss" scoped>
.login_container {
  ::v-deep(.el-dialog__body) {
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
  }

  .login {
    border: 1px solid #ccc;
    padding: 20px;

    .webchat {
      display: flex;
      flex-direction: column;
      align-items: center;

      .phone {
        display: flex;
        flex-direction: column;
        align-items: center;

        p {
          margin: 10px 0;
        }

      }
    }

    .bottom {
      display: flex;
      flex-direction: column;
      align-items: center;

      p {
        margin: 10px 0;
      }
    }

  }

  .leftContent {
    .top {
      display: flex;
      justify-content: space-around;

      .item {
        display: flex;
        flex-direction: column;
        align-items: center;

        img {
          width: 130px;
          height: 130px;
        }

        p {
          margin: 5px 0;
        }
      }
    }
  }

  .tip {
    text-align: center;
    margin: 20px 0px;
    font-size: 20px;
    font-weight: 900;
  }
}</style>
