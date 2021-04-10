<template>
  <div class="main">
    <el-container class="main-box">
      <el-header>
        <div class="header_left">
          <img style="padding-top:5px;width:150px;height:50px" src="../../assets/logo.png" alt="">
        </div>
        <div class="header_right">
          <div style="padding:17px 0">
            <iframe width="260" height="60" frameborder="0" scrolling="no" hspace="0" src="https://i.tianqi.com/?c=code&a=getcode&id=34&py=taiyuan&icon=1"></iframe>
          </div>       
          <div>
            <el-menu mode="horizontal">
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-user-solid" style="color:#39aeff"></i>
                  用户管理
                </template>
                <el-menu-item index="1-1">
                  <router-link to="/changePass">修改密码</router-link>
                </el-menu-item>
                <el-menu-item index="1-2" @click="back">退出登录</el-menu-item>
              </el-submenu>
            </el-menu>
          </div>
        </div>
      </el-header>
      <el-container style="height:90%">
        <el-aside class="aside" width="200px">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            background-color="rgb(255,255,255,0)"
            text-color="#fff"
            active-text-color="#fff">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-house" style="color:#fff;margin-right:10px"></i>
                <span>分 类 管 理</span>
              </template>          
              <el-menu-item index="1-1">
                <router-link to="/categoryAdd">分 类 添 加</router-link>  
              </el-menu-item>
              <el-menu-item index="1-2">
                <router-link to="/categoryIndex">分 类 查 看</router-link>  
              </el-menu-item>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-menu" style="color:#fff;margin-right:10px"></i>
                  <span>客 房 管 理</span>
                </template>
                <el-menu-item index="2-1">
                  <router-link to="/StayhomeAdd">客 房 添 加</router-link>
                </el-menu-item>
                <el-menu-item index="2-2">
                  <router-link to="/StayhomeIndex">客 房 查 看</router-link>
                </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-container>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  name:"Main",
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    back() {
      this.$router.push('/login')
      sessionStorage.clear()
    }
  }
}
</script>
<style scoped>
.main-box {
  position: absolute;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
}
.el-header {
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  padding: 0;
  color: #fff;
}
.header_left {
  background:#4267e1;
  width:199px;
  height:100%;
  overflow: hidden;
  letter-spacing:2px;
  line-height:60px;
  font-size:20px;
  text-align: center;
}
.header_right {
  display: flex;
}
.el-aside {
  background:url(../../assets/banckground.png);
  background-size: 200px 100%;
  color: #fff;
}
.el-main {
  background-color: #f1f2f6;
  color: #333;
}
body > .el-container {
  margin-bottom: 40px;
}
.el-submenu .el-menu-item {
  height: 40px;
  line-height: 40px;
  padding-left: 55px!important;
}
.aside .el-submenu .el-menu-item a{
  color: #fff;
}
.aside .el-menu-item.is-active {
  background-color: #40a0ffb9 !important;
}
.aside .el-menu-item:hover {
  background-color: #40a0ffb9 !important;
}
.el-menu-item-group__title {
    padding: 0;
}
.el-menu--horizontal a{
  color: #909399!important;
}
</style>
<style>
.main .aside .el-submenu__title:hover{
   background-color:#40a0ffb9 !important; 
}
.main .aside .el-submenu__title i {
    color: #fff!important;
}
.header_right .el-submenu.is-active .el-submenu__title {
    border-bottom-color: #fff;
}

</style>