<template>
  <div>
    <div style="background:#191B31">
      <header-nav style="position:fixed;"></header-nav>
      <a-row :gutter='24' class="ptb-48 mg0 row-max" :class="!isPC?'pd-t-80':''">
        <a-col :xs='12' :sm=6 style='padding-top:0;' 
          class="wow slideInLeft">
          <a-menu mode='vertical' 
            @click="handlClick" class="menu-bg" theme="dark" 
            :class="!isPC?'posi-fixed':''"
            :defaultSelectedKeys="selectKey"
            :selectedKeys='selectKey'
          >
            <a-menu-item v-for="item in solutionData" :key="item.name" style="font-size: initial;">
              {{item.name}}
            </a-menu-item>
          </a-menu>
        </a-col>
        <a-col :xs='12' :sm='9' 
          class="wow slideInRight" style="padding-top: 10px;">
          <h2>{{solutionTitle}}</h2>
          <p class="font-color-gray">{{solutionDesc}}</p>
        </a-col>
        <a-col :xs='24' :sm=9 
          class="center wow slideInLeft">
          <img :src="solutionImg" alt="" style="width:80%;">
        </a-col>
      </a-row>
      <!-- 解决方案 Tab -->
      <a-row>
        <a-col :xs="!isPC?'18':'24'" :offset="!isPC?'6':'0'">
          <a-menu @click="selectTabEvent" 
            mode='horizontal' theme="dark" 
            :defaultSelectedKeys='selectTab'
            :selectedKeys='selectTab'
            style="background:rgba(255, 255, 255, 0);"
          >
            <a-menu-item v-for="item in descData" 
              :key="item.name" :class="!isPC?'width-160':''">
              {{item.name}}
            </a-menu-item>
          </a-menu>
        </a-col>
      </a-row>
    </div>
    
    <div class='solution-div row-max'>
      <div v-for="(item,index) in viewData" :key="item.title">
        <!-- 解决方案 -->
        <a-row :gutter='24' class="pd-48 solution mg0" v-if="(index+1)%2 === 1">
          <h2 class="font-color-blue center ptb-48">{{item.title}}</h2>
          <a-col :xs=24 :sm='10' 
            :offset='!isPC?"2":"0"'
            v-for="(list,index) in item.list" 
            :key="list.title"
            class="mb-24"
            :class="index%2?'slideInRight':'slideInLeft'"
            v-show="!item.list[0].link"
          > 
            <div class="bg-gray wow slideInLeft heigh-200 pd-30-50">
              <h2 class="font-18 font-color-orgine">{{list.title}}</h2>
              <p class="font-14 lh-2 font-color-gray">{{list.desc}}</p>
            </div>
          </a-col>
          <a-col v-show="item.list[0].link" 
            v-for="(img,index) in item.list" 
            :key="index"
            :xs=24 :sm='12'
          >
            <div>
              <a :href="img.link" target="_blank">
                <img :src="img.image" alt="" class="img-icon" width="50%">
              </a>
            </div>
          </a-col>
          <a-col v-show="item.image">
            <div>
              <img :src="item.image" alt="" width="100%">
            </div>
          </a-col>
        </a-row>
        <!-- 功能介绍 -->
        <a-row :gutter='24' v-if="(index+1)%2 === 0" class="pd-48 solution mg0">
          <h2 class="font-color-blue center ptb-48">{{item.title}}</h2>
          <a-col :xs='24' :sm='6' 
            v-for="list in item.list" 
            :key="list.title" class="p-24-36"
            v-show="!item.list[0].link"
          >
            <div class="bg-gray wow slideInRight height-350">
              <img src='./ic_nomal.png' :class="!isPC?'':'width-35'" class="img-icon" v-show="!list.image" />
              <img :src='list.image' :class="!isPC?'':'width-35'" class="img-icon" v-show="list.image" />
              <h2 class="font-18 font-color-gray center">{{list.title}}</h2>
              <p class="font-14 font-color-gray ptb-48">{{list.desc}}</p>
            </div>
          </a-col>
          <a-col v-show="item.list[0].link"
            :xs='24' :sm='12'
            v-for="(img,index) in item.list" 
            :key="index">
            <div>
              <a :href="img.link" target="_blank">
                <img :src="img.image" alt="" class="img-icon" width="50%">
              </a>
            </div>
          </a-col>
          <a-col v-show="item.image">
            <div>
              <img :src="item.image" alt="" width="100%">
            </div>
          </a-col>
        </a-row>
      </div>
    </div>
    <a-back-top>
      <div class="ant-back-top-inner">UP</div>
    </a-back-top>
    <footer-nav></footer-nav>
  </div>
</template>

<script>
import headerNav from '@/components/headerNav'
import footerNav from '@/components/footerNav'
import {mapGetters} from 'vuex'
import {scrollFn} from '@/utils/index'
import {WOW} from 'wowjs'
import serviceManger from '@/api/index'
export default {
  data(){
    return{
      solutionData:[],
      solutionDesc:'',
      solutionTitle:'',
      solutionImg:'',
      selectKey:[],
      descData:[],
      selectTab:[],
      productList:[],
      viewData:[]
    }
  },
  created(){
    this.getSoluInfo()
  },
  components:{
    headerNav,
    footerNav
  },
  methods:{
    getSoluInfo(){
      let inds = window.location.href.split('=')[1] -1
      serviceManger.getService(this.language).then(res => {
        this.productList = res.data.service
        this.productList.forEach((item,index) =>{
          let obj = {}
          obj.name = item.title
          obj.desc = item.content
          obj.image = item.image
          obj.path = `/solution?type=${index+1}`
          this.solutionData.push(obj)
        })
        this.solutionTitle = this.solutionData[inds].name
        this.solutionDesc = this.solutionData[inds].desc
        this.solutionImg = this.solutionData[inds].image
        this.selectKey = [this.solutionTitle]

        this.productList[inds].solution.forEach(item => {
          let tabObj = {}
          tabObj.name = item.title
          this.descData.push(tabObj)
        })
        this.selectTab = [this.descData[0].name]
        this.viewData = this.productList[inds].solution
      })
    },
    handlClick({key}){
      this.setData(this.productList,key)

      if(!this.isPC){
        let id = setInterval(() =>{
          let current = document.documentElement.scrollTop?
            document.documentElement.scrollTop:document.body.scrollTop
          if(current === 0){
            clearInterval(id)
          }
          document.documentElement.scrollTop = current - 100
          document.body.scrollTop = current -100
        },16)
      }
    },
    selectTabEvent({key}){
      let index = this.descData.findIndex(item => {
        return item.name == key
      })

      let jump = document.querySelectorAll('.solution')
      let total = jump[index].offsetTop
      let distance = document.documentElement.scrollTop || document.body.scrollTop;
      let step = total / 50
      if(total > distance){
        smoothDown();
      }else{
        let newTotal = distance - total
        step = newTotal / 50
        smoothUp()
      }
      function smoothDown () {
        if (distance < total) {
          distance += step;
          document.body.scrollTop = distance;
          document.documentElement.scrollTop = distance;
          setTimeout(smoothDown, 10);
        } else {
          document.body.scrollTop = total;
          document.documentElement.scrollTop = total;
        }
      }
      function smoothUp () {
        if (distance > total) {
          distance -= step;
          document.body.scrollTop = distance;
          document.documentElement.scrollTop = distance;
          setTimeout(smoothUp, 10);
        } else {
          document.body.scrollTop = total;
          document.documentElement.scrollTop = total;
        }
      } 
    },
    setData(arr,str){
      this.descData = []
      this.viewData = []
      let filter =  []
      filter = typeof str === 'string' ? 
      arr.filter(item => {
        return item.title == str
      }):
      filter = [arr[str-1]]

      filter[0].solution.forEach(item => {
        let tabObj = {}
        tabObj.name = item.title
        this.descData.push(tabObj)
      })

      this.solutionTitle = filter[0].title
      this.solutionDesc = filter[0].content
      this.solutionImg = filter[0].image
      this.selectKey = [this.solutionTitle]
      this.selectTab = [this.descData[0].name]
      this.viewData = filter[0].solution
    }
  },
  computed:{
    ...mapGetters(['isPC','solution','language','routerType'])
  },
  mounted(){
    new WOW().init()
    scrollFn('header')
  },
  watch:{
    language(old){
      this.solutionData = []
      this.descData = []
      this.getSoluInfo()
    },
    routerType(index){
      this.setData(this.productList,index)
    }
  }
}
</script>

<style scoped lang='less'>
  .solution-div{
    min-height: 80vh;
    padding-top: 60px;
  }
  .img-icon{
    display: block;
    position: relative;
    left: 50%;
    transform: translate(-50%);
  }
</style>