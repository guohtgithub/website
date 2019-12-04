import Vue from 'vue'
import App from './App.vue'
import animated from 'animate.css'
Vue.use(animated)

import store from './store'

import {Menu, Row, Col, Button, Card, Icon, Carousel, Input, Anchor, BackTop, Drawer, Affix} from 'ant-design-vue'
Vue.use(Menu).use(Row).use(Col).use(Button).use(Card)
  .use(Icon).use(Carousel).use(Input).use(Anchor)
  .use(BackTop).use(Drawer).use(Affix)

import router from '@/router/index'

import '@/assets/css/index.css'


Vue.config.productionTip = false


// 更新menu的数据
router.beforeEach((to,from,next) =>{
  if(store.getters.solution || store.getters.product){
    store.dispatch('GetInfo').then(res =>{
      next({...to,replace:true})
    })
  }else{
    next()
  }
})


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
