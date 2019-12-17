<template>
  <div>
    <!-- session 1 -->
    <div class="bg-img">
      <header-nav style="position: fixed;"></header-nav>
      <a-row class="center-row" :class="!isPC?'ptb-190 row-max':'ptb-92-48 mg0'" :gutter="24">
        <a-carousel autoplay effect='fade'>
          <div>
            <a-col :xs='24' :sm='12' class="mobile-top48 wow slideInRight">
              <img :src="session1.image" alt="" class="img">
            </a-col>
            <a-col :xs='24' :sm='12' class="wow slideInLeft">
              <div>
                <h2>{{session1.title}}</h2>
                <span class="font-color-gray lh-2">{{session1.content}}</span>
                <a :href="session1.link" v-show='session1.link' target="_blank">
                  <a-button type="primary" class="mt-24">{{session1.more}}</a-button>
                </a>
              </div>
            </a-col>
          </div>
        </a-carousel>
      </a-row>
    </div>
    <div class="row-max">
      <!-- session 2 -->
      <a-row class="center">
        <a-col :xs=24 :sm=22 :offset='!isPC?2:0' 
          class='pd-48 wow slideInLeft'>
          <h2 class="font-color-blue" style="padding-bottom: 30px;">{{session2.title}}</h2>
          <span class="font-color-gray lh-2">{{session2.content}}</span>
        </a-col>
        <card-nav :imgList='productList'></card-nav>
      </a-row>
      <a-row class="center " :class="!isPC?'pt-200':'mg0'" :gutter='24'>
        <a-col :xs=24 :sm=22 :offset='!isPC?2:0' 
          class='pd-48 wow slideInLeft'>
          <h2 class="font-color-blue" style="padding-bottom: 30px;">{{session3.title}}</h2>
          <span class="font-color-gray lh-2">{{session3.content}}</span>
        </a-col>
      </a-row>
    </div>
    <div class="bg-imgs">
      <a-row :gutter='24' class='row-max'>
        <a-col :xs="!isPC?6:12" class="ptb-48 wow slideInLeft" style="padding-right:30px;">
          <a-menu mode='vertical' @click="handlClick" class="menu-bg" theme="dark" :defaultSelectedKeys="selectKey">
            <a-menu-item v-for="item in solutionData" :key="item.title" style="font-size:initial;">
              {{item.title}}
            </a-menu-item>
          </a-menu>
        </a-col>
        <a-col :xs='!isPC?14:12' class="ptb-48 wow slideInRight">
          <h2>{{solutionDataDesc.title}}</h2>
          <p class="font-color-gray lh-2 left">{{solutionDataDesc.content}}</p>
        </a-col>
        <a-col :xs="!isPC?'4':'0'" class="ptb-48"></a-col>
      </a-row>
    </div>
    <div class='row-max'>
      <!-- session 4 -->
      <a-row class="center wow slideInLeft" style="padding-top:48px;">
        <a-col :xs=24 class='pd-48'>
          <h2 class="font-color-blue">{{session4.title}}</h2>
        </a-col>
      </a-row>
    </div>
    <img :src="session4.image" alt="" width="100%" style="padding-bottom:48px;" />
    <a-back-top>
      <div class="ant-back-top-inner">UP</div>
    </a-back-top>
    <footer-nav></footer-nav>
  </div>
</template>

<script>
import headerNav from '@/components/headerNav'
import footerNav from '@/components/footerNav'
import cardNav from '@/components/card'
import {mapGetters} from 'vuex'
import {scrollFn} from '@/utils/index'
import {WOW} from 'wowjs'
import serviceManger from '@/api/index'
export default {
  data(){
    return{
      solutionDataDesc:{
        title:'',
        content:'',
      },
      selectKey:[],
      session1:{},
      session2:{},
      session3:{},
      session4:{},
      solutionData:[],
      session4:{
        title:'合作伙伴',
        friends:['抵扣税款','sajdsfj','akfdjklfie','asdkjfkdlf']
      },
      productList:[]
    }
  },
  created(){
    this.getHomeInfo()
  },
  components:{
    headerNav,
    footerNav,
    cardNav
  },
  methods:{
    getHomeInfo(){
      serviceManger.menuInfo(this.language).then(res => {
        let data =res.data

        this.session1 = data.section0[0]
        this.session2 = data.section1[0]
        this.session3 = data.section2[0]
        this.session4 = data.section3[0]

        this.solutionData=data.service

        this.productList=data.product

        this.solutionDataDesc.title = this.solutionData[0].title
        this.solutionDataDesc.content = this.solutionData[0].content
        this.selectKey.push(this.solutionDataDesc.title)
      })
    },
    handlClick({key}){
      let filterArr = this.solutionData.filter(item => {
        return item.title == key
      })
      
      this.solutionDataDesc.title = filterArr[0].title
      this.solutionDataDesc.content = filterArr[0].content
    }
  },
  computed:{
    ...mapGetters(['isPC','language'])
  },
  mounted(){
    new WOW().init()
    scrollFn('header')
  },
  watch:{
    language(old){
      this.getHomeInfo()
    }
  }
}
</script>

<style scoped lang='less'>
  .bg-img{
    background: url('./big_bg.png') no-repeat;
    background-size: cover;
  }
  .bg-imgs{
    background: url('./banner01.png') no-repeat;
    background-size: cover;
  }
  .center-row{  
    min-height: 90vh;
    .img{
      float: right;
    }
  }
  .swiper-container {
    width: 100%;
    height: auto;
    padding:90px 0;
    margin-left: auto;
    margin-right: auto;
  }
  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;
    height: 200px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
    transition-property:all;
  }
</style>