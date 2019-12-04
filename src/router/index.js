import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = [
  { // 首页
    path:'/home',
    name:'Home',
    component: () => import('@/views/home')
  },{ // 产品
    path:'/product',
    name:'Product',
    component: () => import('@/views/product')
  },{ // 解决方案
    path:'/solution',
    name:'Solution',
    component:() => import('@/views/solution')
  },{
    path:'/',
    redirect:'/home'
  },{
    path:'/404',
    name:'404',
    component:() => import('@/views/404')
  },{
    path:'*',redirect:'/404'
  }
]

export default new VueRouter({
  mode:'hash',
  routes:router
})