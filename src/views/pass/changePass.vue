<template>
  <el-form :rules="rules" :model="passform" ref="passform">
    <el-form-item label="旧密码" prop="oldpass">
      <el-input v-model="passform.oldpass" placeholder="请输入旧密码" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="新密码" prop="newpass">
      <el-input show-password v-model="passform.newpass" placeholder="请输入新密码" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="newpassagain">
      <el-input show-password v-model="passform.newpassagain" placeholder="请输入新密码" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item style="text-align:center">
      <el-button type="primary" @click="handlerSubmit('passform')">提 交</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { URL } from '@/lib/base'
export default {
  name:'changePass',
  data () {
    return {
      passform: {
        oldpass: '',
        newpass: '',
        newpassagain:''
      },
      rules:{
        oldpass:[
          {
            required: true,
            message: '请输入旧密码',
            trigger: 'blur'
          },
          {
            min: 3, max: 10,
            message: '长度在3到10个字符之间',
            trigger: 'blur'
          }
        ],
        newpass:[
          {
            required: true,
            message: '请输入新密码',
            trigger: 'blur'
          },
          {
            min: 3, max: 10,
            message: '长度在3到10个字符之间',
            trigger: 'blur'
          }
        ],
        newpassagain:[
          {
            required: true,
            message: '请再次输入新密码',
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
    handlerSubmit (passform) {
      this.$refs[passform].validate((valid)=>{
        if(valid){
          if (this.passform.newpass != this.passform.newpassagain){
            this.$message.error('两次密码输入不一致');
            return
          }
          let url = URL + '/admin/login/updatepass'
          let token = sessionStorage.getItem('token')
          this.$http({
              method:'POST',
              url,
              data:this.passform,
              headers:{token}
            }).then((res)=>{
              if(res.data.code == 200 && res.status == 200) {
                this.$message.success(res.data.msg)
                sessionStorage.clear();
                this.$router.push({
                  path:'/login'
                })
              }
            }).catch(()=>{})
        }
      })
    }
  }
}
</script>
<style scoped>

</style>