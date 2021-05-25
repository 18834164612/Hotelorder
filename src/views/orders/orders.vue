<template>
  <div>
    <el-table 
      :data="tableData" border  stripe 
      :cell-style="{'text-align':'center'}"
      :header-cell-style="{'text-align':'center'}"
    >
      <el-table-column width="70"  label="序号">
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
      <el-table-column  prop="sname" label="客房名称"></el-table-column>
      <el-table-column  prop="sprice" label="价格"></el-table-column>
      <el-table-column  prop="user_number" label="入住人数"></el-table-column>
      <el-table-column  prop="enter_time" label="入住时间"></el-table-column>
      <el-table-column  prop="leave_time" label="离开时间"></el-table-column>
      <el-table-column  prop="ostatus" label="订单状态"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.oid)">删除</el-button>
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
import { orderList,orderDelete } from "@/http/stayhome"
export default {
  data(){
    return{
      paginate:{
        page: 1,
        limit: 8
      },
      tableData:[],
      total:0
    }
  },
  methods:{
     orderInit(){
      orderList(this.paginate).then(res=>{
          if(res.code == 200){
           let data = res.data
           let array = ['未付款','已付款','已完成']
           data.map(ele=>{
             ele.ostatus = array[ele.ostatus-1]
           })
           this.tableData = data
           this.total = res.total
           this.$message.success('数据获取成功')
          }else{
            this.$message.error('数据获取失败')
          }
      }).catch(()=>{
        this.$message.error('数据获取失败')
      })
    },
    handleCurrentChange(val) {
      this.paginate.page = val
      this.orderInit()
    },
    handleDelete(oid) {
      orderDelete(oid).then(res=>{ 
        if(res.code === 200){
          this.$message.success('删除成功')
          this.paginate.page = 1
          this.tableData = []
          this.orderInit()
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
    this.orderInit()
  }
}
</script>
<style scoped>

</style>