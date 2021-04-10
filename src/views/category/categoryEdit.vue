<template>
  <div>
    <div v-if="category">
      <el-form :model="category" :rules="categoryRules" ref="categoryForm">
        <el-form-item label="分类名称" prop="cname">
          <el-input  v-model="category.cname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类描述" prop="cdesc">
          <el-input  v-model="category.cdesc" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item style="text-align:center">
          <el-button type="primary" @click="handleSubmit('categoryForm')">提 交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import {URL} from '@/lib/base'
export default {
  data () {
    let validateCname = (rule,value,callback)=>{
      if(value === '') {
        callback(new Error('分类名称不能为空'))
      }else if (!(/[\u4e00-\u9fa5a-z]{2,10}/.test(value))){
        callback(new Error('分类名称只能为汉字'))
      }else {
        callback()
      }
    }
    return{
      category: {
        cid:'',
        cname:'',
        cdesc:''
      },
      categoryRules:{
        cname:[
          {required:true,message:'分类名称为必填',trigger:'blur'},
          { validator:validateCname,trigger:'blur' }],
        cdesc:[
          {required:true,message:'分类描述为必填',trigger:'blur'},
          {min:3, max:200, message:'长度在3-200字符之间',trigger:'blur'}
        ]
      }
    }
  },
  methods: {
    handleSubmit(formName) {
      this.$refs[formName].validate((valid)=>{
        if(valid) {
          let url = URL+'/admin/category/edit'
          let token = sessionStorage.getItem('token')
          axios({
            url,
            method:'POST',
            data:this.category,
            headers:{ token }
          }).then(res=>{
             if(res.data.code == 200 && res.status == 200) {
               this.$message.success(res.data.msg)
               this.$router.push({path:'/categoryIndex'})
             }
          }).catch(()=>{
            this.$message.error('分类添加失败')
          })
        }
      })
    },
    initCategory(cid) {
      let url = URL+'/admin/category/read';
      let token = sessionStorage.getItem('token')
      axios({
        method:'GET',url,
        params:{cid},
        headers:{token}
      }).then(res=>{
        if(res.data.code == 200 && res.status == 200) {
          if(res.data.data) {
            this.category = res.data.data
          }else {
            this.$message.error(res.data.msg)
          }
        }
      }).catch(()=>{

      })
    }

  },
  mounted () {
    let cid = this.$route.query.cid
    this.category.cid = cid
    this.initCategory(cid)
  }
}
</script>
<style scoped>

</style>