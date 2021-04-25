<template>
  <div class="stayhomeAdd">
    <loading :isshow="showloading"></loading>
     <el-form :model="stayhomeform" ref="stayhomeform" label-width="86px" style="display:flex;flex-wrap:wrap">
        <el-form-item label="所属分类:" style="width:46%">
          <el-select v-model="stayhomeform.cid" placeholder="请选择" style="width:100%">
            <el-option
              v-for="item in category"
              :key="item.cid"
              :label="item.cname"
              :value="item.cid">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客房名称:" style="margin-left:60px">
          <el-input v-model="stayhomeform.sname"></el-input>
        </el-form-item>
        <el-form-item label="客房描述:">
          <el-input v-model="stayhomeform.sdesc"></el-input>
        </el-form-item>
        <el-form-item label="客房评分:" style="margin-left:60px">
          <el-input v-model="stayhomeform.score"></el-input>
        </el-form-item>
        <el-form-item label="客房价格:" >
          <el-input v-model="stayhomeform.sprice"></el-input>
        </el-form-item>
        <el-form-item label="客房省份:" style="margin-left:60px">
          <el-select v-model="stayhomeform.sprovince" style="width:100%">
            <el-option v-for="(item,index) in province" :value="item" :key="index">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客房城市:">
          <el-select v-model="stayhomeform.scity" style="width:100%">
            <el-option v-for="(item,index) in cityList" :value="item" :key="index">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客房区域:" style="margin-left:60px">
          <el-select v-model="stayhomeform.sarea" style="width:100%">
            <el-option v-for="(item,index) in areaList" :value="item" :key="index">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客房地址:" st>
          <el-input v-model="stayhomeform.saddress"></el-input>
        </el-form-item>
        <el-form-item></el-form-item>
        <el-form-item label="轮播图:">
          <el-upload
            class="avatar-uploader"
            :action="uploadurl"
            list-type="picture-card"
            :file-list="bannerFilelist                                                                                                           "
            multiple
            :limit="3"
            :on-success="handleBannerSuccess"
            :on-remove="handleBannerRemove"
            :on-exceed="handleExceed"
            :on-preview="handleBannerPreview"
            :before-upload="beforeThumbUpload">
            <i class="el-icon-plus"></i>
            <div slot="tip" style="color:#606266;font-size:12px">只能上传jpg/png/jpeg/webp文件，且不超过200kb,最多上传3张</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="客房缩略图:" style="margin-left:60px">
          <el-upload
            class="avatar-uploader"
            :action="uploadurl"
            :show-file-list="false"
            :on-success="handleThumbSuccess"
            :before-upload="beforeThumbUpload">
            <img v-if="stayhomeform.sthumb" :src="IMGURL + stayhomeform.sthumb" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" style="color:#606266;font-size:12px">只能上传jpg/png/jpeg/webp文件，且不超过200kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="客房详情:" style="width:96%">
          <rich-text formfield="sdetail" :value="stayhomeform.sdetail" @rich-change="setSnotice" v-if="stayhomeform.sdetail"></rich-text>
        </el-form-item>
        <el-form-item label="入住须知:" style="width:96%">
          <rich-text formfield="snotice" @rich-change="setSnotice" :value="stayhomeform.snotice" v-if="stayhomeform.snotice"></rich-text>
        </el-form-item>
        <el-form-item style="text-align:center;width:90%">
          <el-button type="primary" @click="submit">提 交</el-button>
        </el-form-item>
     </el-form>
     <el-dialog :visible.sync="dialogVisible" width="30%">
        <img width="100%" :src="dialogImageUrl" alt="">
     </el-dialog>
  </div>
</template>
<script>
import {URL,IMGURL} from '@/lib/base'
import city from '@/lib/city.json'
import loading from '../../components/loading/loading.vue'
import E from 'wangeditor'
import RichText from '../../components/rich-text/RichText.vue'
import instance from '@/http/http'
import {stayhomeRead} from "@/http/stayhome"
export default {
  data () {
    return {
      uploadurl: URL + '/admin/upload/index',
      IMGURL,
      showloading:false,
      category: [],
      stayhomeform: {
        sname: '',
        sdesc: '',
        sthumb: '',
        sprice: '',
        stag: '',
        scity: '',
        sarea: '',
        saddress: '',
        sbanner: '',
        snotice: '',
        cid: '',
        score: '',
        sdetail: '',
        sprovince: ''
      },
      bannerArr:[],
      bannerFilelist:[],
      dialogImageUrl:'',
      dialogVisible: false,
      city,
      province:[],
    }
  },
  computed: {
    cityList(){
      let cityLists = [];
      let current = this.city.find(ele => ele.name === this.stayhomeform.sprovince)
      if(current) {
        cityLists = current.city.map(ele=>ele.name)
      }
      return cityLists;
    },
    areaList() {
      let areaLists = []
      let current = this.city.find(ele => ele.name === this.stayhomeform.sprovince)
      if(current) {
        let index = current.city.find(ele=>ele.name === this.stayhomeform.scity)
        if(index) {
          areaLists = index.area
          console.log(areaLists)
        }
      }
      return areaLists
    }
  },
  components: {
    loading,
    RichText
  },
  methods: {
    initStayhome(sid) {
      stayhomeRead(sid).then((res)=>{
        this.stayhomeform = res.data
        let sbanner1 = res.data.sbanner.split(/,|，/)
        this.bannerArr = sbanner1
        this.bannerFilelist = sbanner1.map(ele=>({
          name:res.data.sname,url:this.IMGURL+ele
        }))
      }).catch((error)=>{
        console.log(error)
      })
    },
    submit() {
      instance.post('/api/stayhome',this.stayhomeform).then((res)=>{
        if(res.code == 200) {
           this.$message.success(res.msg)
        }
      }).catch((res)=>{
        console.log(res)
        this.$message.error("数据添加失败");
      })
    },
    getCategory () {
      this.showloading = true
      let url = URL + '/admin/category/indexAll'
      let token = sessionStorage.getItem('token')
      this.$http({
        url,
        headers:{token}
      }).then((res)=>{
        if(res.data.code == 200 && res.status == 200) {
          this.showloading = false
          this.category = res.data.data
        }else {
          this.$message.error('分类获取失败');
        }
      }).catch(()=>{

      })
    },
    handleThumbSuccess(res) {
      if(res.code === 200) {
        this.stayhomeform.sthumb = res.imgpath
      }
    },
    beforeThumbUpload(file) {
      let {size,type} = file
      let uploadMaxSize = 600 * 1024
      let upoladType = ['image/jpg','image/png','image/webp','image/jpeg']
      var sizeflag = true , typeflage = true
      sizeflag = size < uploadMaxSize
      typeflage = upoladType.some(ele=>ele==type)
      if(!sizeflag) {
        this.$message.error('上传图片不能超过600kb')
      }
      if(!typeflage) {
        this.$message.error('上传图片类型为jpg/png/jpeg/webp')
      }
      return sizeflag && typeflage
    },
    handleBannerSuccess(file) {
      this.bannerArr.push(file.imgpath)
      this.stayhomeform.sbanner = this.bannerArr.join(',')
    },
    handleBannerRemove(file) {
      let url =file.response?file.response.imgpath:file.url
      this.bannerArr =  this.bannerArr.filter(ele=>!url.includes(ele))
      this.stayhomeform.sbanner = this.bannerArr.join(',')
    },
    handleExceed() {
      this.$message.warning('当前限制选择 3 个文件')
    },
    handleBannerPreview(file) {
      if(file.response){
        this.dialogImageUrl =this.IMGURL + file.response.imgpath;
      }else{
        this.dialogImageUrl = file.url
      }
      
      this.dialogVisible = true;
    },
    initRichText() {
      var editor1 = new E('#sdetail1','#sdetail2')
      editor1.customConfig.onchange = (html) => {
        this.stayhomeform.sdetail = html
      }
      editor1.create()
    },
    setSnotice(field,html) {
      this.stayhomeform[field] = html
      console.log(html)
    },
    setProvince() {
      this.province = this.city.map(ele=>ele.name)
    }
  },
  mounted () {
    let sid = this.$route.params.id
    this.initStayhome(sid)
    this.setProvince()
    this.getCategory()
    //this.initRichText()
  }
}
</script>
<style scoped>
.stayhomeAdd .el-form-item {
  width: 46%;
}
.avatar-uploader-icon {
  font-size: 20px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>
<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader .el-upload--picture-card {
  width: 100px;
  height: 100px;
  line-height:100px;
  font-size: 20px;
  color: #8c939d;
}
.avatar-uploader .el-upload--picture-card i {
  font-size: 20px!important;
}
.avatar-uploader .el-upload-list__item{
  width: 100px!important;
  height: 100px!important;
}
.toolbar {
            border: 1px solid #ccc;
        }
.text {
    border: 1px solid #ccc;
    height: 200px;
}
.w-e-menu {
  z-index: 2 !important;
}
.w-e-text-container {
  z-index: 1 !important;
}
</style>