<template>
  <div class="login">
    <div class="login-content">
      <div style="margin-bottom:20px;text-align:center;color:#fff;font-size:25px">用户登录</div>
      <el-form :model="loginForm" :rules="rules" ref="loginForm">
        <el-form-item prop="username">
          <el-input 
            prefix-icon="el-icon-user-solid"
            placeholder="用户名" 
            v-model="loginForm.username">
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input 
            prefix-icon="el-icon-lock"
            show-password
            placeholder="密 码"
            v-model="loginForm.password">
          </el-input>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" size="medium" @click="handleLogin('loginForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name:"Login",
  data () {
    return {
       loginForm:{
         username:'',
         password:''
       },
       rules: {
         username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          },
          {
            min: 3, max: 10,
            message: '长度在3到10个字符之间',
            trigger: 'blur'
          }
         ],
         password: [
           {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            min: 3, max: 10,
            message: '长度在3到10个字符之间',
            trigger: 'blur'
          }
         ]
       }
    }
  },
  methods: {
    handleLogin (formName) {
      this.$refs[formName].validate((valid)=>{
        if (valid) {
          let url = 'http://localhost/hotel_admin_BiShe/public/index.php'
          axios.post(url+'/admin/login/check',this.loginForm).then(res=>{
            if(res.status == 200 && res.data.code == 200) {
              sessionStorage.setItem('token',res.data.token)
              sessionStorage.setItem('user',JSON.stringify(res.data.user))
              let redirect = this.$route.query.redirect || 'index'
              this.$router.push({
                name: redirect
              })
            }else {
              this.$message.error(res.data.message)
            }
          }).catch((error)=>{
            console.log(error)
          })
        }
      })
    }
  }
}
</script>
<style scoped>
.login {
  position: absolute;
  left:0;
  top:0;
  right:0;
  bottom:0;
  background-image: url(../assets/kjdly.png);
  background-size: 100% 105%;
}
.login>.login-content {
  width: 300px;
  height: auto;
  position: absolute;
  left: 65%;
  top: 25%;
  border-radius: 5px;
  padding: 30px;
  background: rgba(20, 25, 76, 0.5);
  border: 1px solid rgba(0, 184, 255, 0.5); 
}
.login .el-input {
  font-size: 16px;
  color: #fff;
}
.login .el-input__icon {
  color: #d1d2dc
}
.login .el-button {
  width: 300px;
}
</style>
<style>
.login .login-content .el-input__inner {
  background-color: rgba(255,255,255,0.05)!important;
  border: 1px solid #144f80!important;
  color: #fff;
}
</style>