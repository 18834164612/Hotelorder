<template>
  <div>
    <el-form :inline="true">
      <el-form-item label="分类名称">
        <el-input v-model="search.cname" placeholder="请输入分类名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table 
      :data="categories" border  stripe 
      :cell-style="{'text-align':'center'}"
      :header-cell-style="{'text-align':'center'}"
    >
      <el-table-column min-width="25%" prop="cid" label="序号">
         <template slot-scope="scope">
           {{scope.$index+1}}
         </template>
      </el-table-column> 
      <el-table-column min-width="25%" prop="cname" label="分类名称"></el-table-column>
      <el-table-column min-width="35%" prop="cdesc" label="分类描述"></el-table-column>
      <el-table-column min-width="15%" label="操作">
        <template slot-scope="scope">
          <el-button size="small" type="danger" @click="handleDelete(scope.row.cid)">删除</el-button>
          <el-button size="small" type="success" @click="handleEdit(scope.row.cid)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align:center;margin-top:15px">
      <el-pagination
        background
        layout="total,prev, pager, next"
        :page-size.sync="paginate.limit"
        :current-page.sync="paginate.page"
        @current-change="handleCurrentChange"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import {URL} from '@/lib/base'
export default {
  name:'categoryIndex',
  data() {
    return {
      search:{cname:''},
      paginate: {
        page: 1,
        limit:8
      },
      categories: [],
      total: 0
    }
  },
  methods: {
    getCategories () {
       let url = URL+'/admin/category/index'
       let token = sessionStorage.getItem('token')
       let params = Object.assign({},this.paginate,this.search);
       axios({
         method:'GET',params,url,headers:{ token }
       }).then(res=>{
          if(res.status == 200 && res.data.code == 200){
            if(res.data.data) {
              this.categories = res.data.data
              this.total = res.data.total
            }else {
              this.$message.error(res.data.msg)
            }
          }
       }).catch((error)=>{
          console.log(error)
       })
    },
    handleSearch () {
       this.paginate.page = 1
       this.getCategories()
    },
    handleCurrentChange(val) {
      this.paginate.page = val
      this.getCategories()
    },
    handleEdit(cid) {
      console.log(cid)
      this.$router.push({
        path: '/categoryEdit',
        query: { cid: cid }
      })
    },
    handleDelete(cid) {
      let url = URL + '/admin/category/delete'
      let token = sessionStorage.getItem('token')
      axios({
        method:'POST',
        url,
        headers:{token},
        data:{cid}
      }).then(res=>{
         if(res.data.code == 200 && res.status == 200) {
           this.$message.success(res.data.msg)
         }else if(res.data.code == 404 && res.status == 200){
           this.$message.success(res.data.msg)
         }
         this.getCategories()
      }).catch(()=>{
        this.$message.error('分类删除失败')
      })
    }
  },
  mounted () {
    this.paginate.page = 1
    this.getCategories()
  }
} 
</script>
<style scoped>
.el-form-item {
  margin-bottom: 10px;
}
</style>