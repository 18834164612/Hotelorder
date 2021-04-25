<template>
  <div class="stayhomeindex">
    <loading :isshow="showloading"></loading>
    <el-form :inline="true">
      <el-form-item label="所属分类">
        <el-select v-model="search.cid" placeholder="请选择" style="width:100%">
            <el-option
              v-for="item in category"
              :key="item.cid"
              :label="item.cname"
              :value="item.cid">
            </el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="民宿名称">
        <el-input v-model="search.sname" placeholder="请输入民宿名称"></el-input>
      </el-form-item>
      <el-form-item label="民宿城市">
        <el-input v-model="search.scity" placeholder="请输入民宿城市"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table 
      :data="tableData" border  stripe 
      :cell-style="{'text-align':'center'}"
      :header-cell-style="{'text-align':'center'}"
    >
      <el-table-column width="50" label="序号">
         <template slot-scope="scope">
           {{scope.$index+1}}
         </template>
      </el-table-column> 
      <el-table-column width="150" prop="sname" label="客房名称"></el-table-column>
      <el-table-column width="170" prop="sprovince" label="所属区域">
        <template slot-scope="scope">
          {{scope.row.sprovince}}-{{scope.row.scity}}-{{scope.row.sarea}}
        </template>
      </el-table-column>
      <el-table-column width="100" prop="sprice" label="价 格"></el-table-column>
      <el-table-column width="150" label="特 色">
        <template slot-scope="scope">
          <el-tag type="success" v-for="(item,index) in scope.row.stag" :key="index">
            {{ item }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column width="100" label="客房缩略图">
         <template slot-scope="scope">
           <img style="width:80px" :src="IMGURL + scope.row.sthumb">
         </template>
      </el-table-column>
      <el-table-column prop="sdesc" label="客房描述"></el-table-column>
      <el-table-column width="100" prop="ctime" label="是否可预约">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.status == 1">
            {{ '是' }}
          </el-tag>
          <el-tag type="danger" v-if="scope.row.status == 0">
            {{ '否' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column width="100" prop="ctime" label="创建时间"></el-table-column>
      <el-table-column width="150" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.cid)">删除</el-button>
          <el-button size="mini" type="success" >
            <router-link style="color:#fff" :to="{name:'StayhomeEdit',params:{id:scope.row.sid}}">编辑</router-link>
          </el-button>
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
import {IMGURL} from '@/lib/base'
import instance from '@/http/http'
import loading from '../../components/loading/loading.vue'
export default {
  data() {
    return{
      IMGURL,
      showloading:false,
      search: {
        sname: '',
        scity: '',
        cid: ''
      },
      paginate:{
        page: 1,
        limit: 8
      },
      category:[],
      tableData:[],
      total:0
    }
  },
  components:{
    loading
  },
  methods: {
    getCategory () {
      instance.get('/admin/category/indexAll').then((res)=>{
        if(res.code == 200) {
          this.category = res.data
          this.category.push({cid:'',cname:'全部'})
        }else {
          this.$message.error('分类获取失败')
        }
      }).catch(()=>{
        this.$message.error('分类获取失败')
      })
    },
    getTableList() {
      this.showloading = true
      let params = Object.assign({},this.paginate,this.search);
      instance.get('api/stayhome',{ params }).then(res=>{
        if(res.code == 200) {
          this.showloading = false
          let Data = res.data
          Data.map(ele=>{
            let date = new Date(ele.ctime * 1000);
            ele.stag = ele.stag.split(/,|，/);
            ele.ctime = [
              date.getFullYear(),
              date.getMonth() + 1,
              date.getDate(),
            ].join("-");
            return ele;
          })
          this.tableData = Data
          this.total = res.total
        }else {
          this.showloading = false
          this.$message.success('暂无数据')
        }
      }).catch((res)=>{
        console.log(res)
        this.showloading = false
        this.$message.error('数据获取失败')
      })
    },
    handleSearch() {
      this.paginate.page = 1
      this.getTableList()
    },
    handleCurrentChange(val) {
      this.paginate.page = val
      this.getTableList()
    },
    handleDelete() {

    },
    handleEdit() {

    }
  },
  mounted() {
    this.getCategory()
    this.getTableList()
  }
}
</script>
<style scoped>

</style>
<style>
body .el-table th.gutter{
  display: table-cell!important;
}
</style>