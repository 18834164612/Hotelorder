import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Login from "@/views/Login"
import Main from "@/views/main/Main"
import changePass from "@/views/pass/changePass"
import categoryAdd from "@/views/category/categoryAdd"
import categoryIndex from "@/views/category/categoryIndex"
import categoryEdit from "@/views/category/categoryEdit"
import StayhomeAdd from "@/views/stayhome/StayhomeAdd"
import StayhomeIndex from "@/views/stayhome/StayhomeIndex"
let router = new VueRouter({
  routes: [
    {
      path:'/', component:Main,name:'index',
      meta:{
        auth: true,
        title: '首页'
      },
      children: [
        {
          path:'changePass',component:changePass,
          name:'changePass',
          meta: {
            title:'修改密码',
            auth:true
          }
        },
        {
          path:'categoryAdd',component:categoryAdd,
          name:'categoryAdd',
          meta: {
            title:'分类添加',
            auth:true
          }
        },
        {
          path:'categoryIndex',component:categoryIndex,
          name:'categoryIndex',
          meta: {
            title:'分类查看',
            auth:true
          }
        },
        {
          path:'categoryEdit',component:categoryEdit,
          name:'categoryEdit',
          meta: {
            title:'分类编辑',
            auth:true
          }
        },
        {
          path:'StayhomeAdd',component:StayhomeAdd,
          name:'StayhomeAdd',
          meta: {
            title:'客房添加',
            auth:true
          }
        },
        {
          path:'StayhomeIndex',component:StayhomeIndex,
          name:'StayhomeIndex',
          meta: {
            title:'客房查看',
            auth:true
          }
        }
      ]
    },
    {
      path:'/login', component:Login,name:'login',
      meta:{
        auth: false,
        title: '登录'
      }
    },
    // {path:'/list', component:List,name:'list'}
  ]
})
  router.beforeEach( (to,from,next) => {
    let title = to.meta.title || '首页'
    document.title = title
    if(to.meta.auth) {
      let token = sessionStorage.getItem('token');
      token = token && token.trim();
      if (token) {
        next();
      } else {
        next({
          name: 'login',
          query: {redirect: to.name}
        })
      }
    } else {
      next()
    }
  })
export default router