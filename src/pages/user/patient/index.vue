<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>就诊人管理</span>
        <el-button class="button" type="primary" size="small" :icon="User" @click="addUser">添加就诊人</el-button>
      </div>
    </template>
    <!-- 就诊人管理模块展示就诊人信息的结构 -->
    <div class="VisitorVue" v-if="scene == 0">
      <visitorVue class="item" @changeScene="changeScene" v-for="(item, index) in userArr" :key="item.id" :user="item"
        :index="index" />
    </div>
    <!-- 添加就诊人｜修改已有就诊人信息的接口 -->
    <div class="form" v-if="scene == 1">
      <el-divider content-position="left">就诊人信息</el-divider>
      <el-form style="width: 60%;margin: 10px auto;">
        <el-form-item label="用户姓名">
          <el-input placeholder="输入用户姓名" v-model="userParams.name"></el-input>
        </el-form-item>
        <el-form-item label="证件类型">
          <el-select placeholder="请你选择证件类型" style="width: 100%;" v-model="userParams.certificatesType">
            <el-option v-for="item in certationArr" :key="item.id" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件号码">
          <el-input placeholder="输入证件号码" v-model="userParams.certificatesNo"></el-input>
        </el-form-item>
        <el-form-item label="用户性别">
          <el-radio-group v-model="userParams.sex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-date-picker placeholder="出生日期" type="date" size="default"  v-model="userParams.birthdate" value-format="YYYY-MM-DD"/>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input placeholder="输入手机号码" v-model="userParams.phone"></el-input>
        </el-form-item>
      </el-form>
      <el-divider content-position="left">建档信息（完善后部分医院首次就诊不排队建档）</el-divider>
      <el-form style="width: 60%;margin: 10px auto;">

        <el-form-item label="婚姻状况">
          <el-radio-group v-model="userParams.isMarry">
            <el-radio :label="1">已婚</el-radio>
            <el-radio :label="0">未婚</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="自费/医保" >
          <el-radio-group v-model="userParams.isInsure">
            <el-radio :label="1">自费</el-radio>
            <el-radio :label="0">医保</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="当前住址">
        <el-cascader  :props="props" v-model="userParams.addressSelected"/>
        </el-form-item>
         <el-form-item label="详细地址">
          <el-input placeholder="输入详细地址" v-model="userParams.address"></el-input>
        </el-form-item>
      </el-form>
   <el-divider content-position="left">紧急联系人信息（选填）</el-divider>
   <el-form style="width: 60%;margin: 10px auto;" label-width="80">
        <el-form-item label="用户姓名">
          <el-input placeholder="输入用户姓名" v-model="userParams.contactsName"></el-input>
        </el-form-item>
        <el-form-item label="证件类型">
           <el-select placeholder="请你选择证件类型" style="width: 100%;"  v-model="userParams.contactsCertificatesType">
            <el-option v-for="item in certationArr" :key="item.id" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件号码">
          <el-input placeholder="输入证件号码" v-model="userParams.contactsCertificatesNo"></el-input>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input placeholder="输入手机号码" v-model="userParams.contactsPhone"></el-input>
        </el-form-item>
         <el-form-item >

          <el-button type="primary" size="default" @click="submit">提交</el-button>
          <el-button type="primary" size="default" @click="reset">重写</el-button>
         </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script setup lang="ts">
//@ts-ignore
import type { CascaderProps } from "element-plus";
import { User } from "@element-plus/icons-vue";
import { reqGetUser } from "@/api/hospital";
import { reqCertationType, reqCity, reqAddOrUpdateUser } from "@/api/user";
import { onMounted, ref, reactive, watch } from "vue";
import type { UserResponseData, UserArr } from "@/api/hospital/type";
import type {
  CertationTypeResponseData,
  CertationArr,
  AddOrUpdateUser,
} from "@/api/user/type";
//@ts-ignore
import { ElMessage } from "element-plus";
import { useRoute,useRouter } from "vue-router";
let $route =useRoute()
let $router =useRouter()
//存储全部就诊人信息
let userArr = ref<UserArr>([])
//定义一个响应式数据：决定卡片的身体部分的展示
let scene = ref<number>(0)
let certationArr = ref<CertationArr>([])
//收集新增就诊人数据
let userParams =reactive<AddOrUpdateUser>({
  name: "",
  certificatesType: "",
  certificatesNo: "",
  sex: 0,
  birthdate: "",
  phone: "",
  isMarry: 0,
  isInsure: 0,
  addressSelected: [],
  address: "",
  contactsName: "",
  contactsCertificatesType: "",
  contactsCertificatesNo: "",
  contactsPhone: "",

})
//组件挂载完毕获取一次就诊人的信息
onMounted(() => {
  //获取就诊人信息
  getAllUser()
  //获取证件类型的数据
  getCertation()
  //判断当前路由组件是不是挂号组件而来，路径上携带了query参数
  if($route.query.type=='add'){
    scene.value=1
  }

})
//获取全部就诊人信息
const getAllUser = async () => {
  let result: any = await reqGetUser()
  if (result.code == 200) {
    userArr.value = result.data
  }
}
//添加就诊人按钮的回调
const addUser = () => {
  //清空上一次的数据
  reset()
  scene.value = 1

}
const reset = () => {
  Object.assign(userParams, {
    id:null,
    name: "",
    certificatesType: "",
    certificatesNo: "",
    sex: 0,
    birthdate: "",
    phone: "",
    isMarry: 0,
    isInsure: 0,
    addressSelected: [],
    address: "",
    contactsName: "",
    contactsCertificatesType: "",
    contactsCertificatesNo: "",
    contactsPhone: "",
  });
};
//就诊人子组件自定义事件的回调
const changeScene = (user:AddOrUpdateUser) => {
  scene.value = 1
  console.log(user,'87');
  Object.assign(userParams,user)
  
}
//获取证件类型的方法
const  getCertation= async()=>{
  let result:CertationTypeResponseData = await reqCertationType()

  console.log(result,'result');
  
  if(result.code==200){
    certationArr.value =result.data
  }
}


//级联选择器数据
const props:CascaderProps  ={
  lazy:true,//懒加载数据
  //加载级联选择器数据方法
 async lazyLoad (node, resolve) {
  
 let result:any=await reqCity(node.data.id||'86')
 //整理数据
 let showData = result.data.map((item:any)=>{
  return {
    id:item.id,
    label:item.name,
    value:item.value,
    leaf:!item.hasChildren//true,//false,有没有右侧相应的二级和三级
  }
 })
 
 //注入组件需要展示的数据
 resolve(showData)
  },
}
//提交数据
const submit = async()=>{
  //要不新增就诊人 要不更新一个已有的就诊人
try {
  //新增成功｜更新成功
await reqAddOrUpdateUser(userParams)
  ElMessage({
    type:'success',
    message:userParams.id?'更新成功':'新增成功'
  })
  if($route.query.type){
    $router.back()
  }else{
    scene.value=0
  }
  //获取全部就诊人信息
  getAllUser()
} catch (error) {
    ElMessage({
    type:'error',
    message:userParams.id?'更新失败':'新增失败'
  })
}
}
</script>

<style lang="scss" scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.VisitorVue {
  display: flex;
  flex-wrap: wrap;

  .item {
    width: 32%;
    margin: 5px;
  }
}
</style>
