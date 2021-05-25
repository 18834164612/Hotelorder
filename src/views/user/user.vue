<template>
  <div>
    <el-table 
      :data="tableData" border  stripe 
      :cell-style="{'text-align':'center'}"
      :header-cell-style="{'text-align':'center'}"
    >
      <el-table-column width="100"  label="序号">
         <template slot-scope="scope">
           {{scope.$index+1}}
         </template>
      </el-table-column> 
      <el-table-column  prop="nickname" label="昵 称"></el-table-column>
      <el-table-column  prop="phone" label="电 话"></el-table-column>
      <el-table-column  prop="nickname" label="性 别">
         <template slot-scope="scope">
           {{scope.row.sex==1?'男':'女'}}
         </template>
      </el-table-column>
      <el-table-column  prop="create_time" label="创建时间"></el-table-column>
      <el-table-column label="头 像">
         <template slot-scope="scope">
           <img style="width:60px" :src="IMGURL + scope.row.avatar">
         </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.uid)">删除</el-button>
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
import { getuserData,userDelete } from "@/http/stayhome"
import {IMGURL} from '@/lib/base'
export default {
  data(){
    return{
      paginate:{
        page: 1,
        limit: 8
      },
      IMGURL,
      tableData:[],
      total:0
    }
  },
  methods:{
    initData(){
      getuserData(this.paginate).then(res=>{
        if(res.code == 200) {
          let Data = res.data
          Data.map(ele=>{
            let date = new Date(ele.create_time * 1000);
            ele.create_time = [
              date.getFullYear(),
              date.getMonth() + 1,
              date.getDate(),
            ].join("-");
            return ele;
          })
          this.tableData = Data
          this.total = res.total
        }else{
          this.$message.error('数据获取失败')
        }
      }).catch(()=>{
        this.$message.error('数据获取失败')
      }) 
    },
    handleCurrentChange(val) {
      this.paginate.page = val
      this.initData()
    },
    handleDelete(uid) {
      userDelete(uid).then(res=>{ 
        if(res.code === 200){
          this.$message.success('删除成功')
          this.paginate.page = 1
           this.tableData = []
          this.initData()
        }else{
          this.$message.error('删除失败')
        }
      }).catch(error=>{
        console.log(error)
        this.$message.error('删除失败')
      })
    },
  },
  mounted(){
    this.initData()
  }
}
</script>
<style scoped>

</style>