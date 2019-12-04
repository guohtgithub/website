<template>
  <div>
    <!-- session 1 -->
    <div class="bg-img">
      <header-nav style="position: fixed;"></header-nav>
        <a-row class="center-row" :class="!isPC?'ptb-190 row-max':'ptb-92-48 mg0'" :gutter="24">
          <a-carousel autoplay effect='fade'>
            <div>
              <a-col :xs='24' :sm='12' class="mobile-top48 wow slideInRight">
                <img src="./block-01-back.png" alt="" class="img">
              </a-col>
              <a-col :xs='24' :sm='12' class="wow slideInLeft">
                <div>
                  <h2>{{session1.title}}</h2>
                  <span class="font-color-gray lh-2">{{session1.content}}</span>
                  <a-button type="primary" class="mt-24">{{session1.more}}</a-button>
                </div>
              </a-col>
            </div>
            <div>
              <a-col :xs='24' :sm='12' class="mobile-top48 wow slideInRight">
                <img src="./block-01-back.png" alt="" class="img">
              </a-col>
              <a-col :xs='24' :sm='12' class="wow slideInLeft">
                <div>
                  <h2>{{session1.title}}</h2>
                  <span class="font-color-gray lh-2">{{session1.content}}</span>
                  <a-button type="primary" class="mt-24">{{session1.more}}</a-button>
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
          <h2 class="font-color-blue">{{session2.title}}</h2>
          <span class="font-color-gray lh-2">{{session2.content}}</span>
        </a-col>
        <card-nav></card-nav>
      </a-row>
      <a-row class="center " :class="!isPC?'pt-200':'mg0'" :gutter='24'>
        <a-col :xs=24 :sm=22 :offset='!isPC?2:0' 
          class='pd-48 wow slideInLeft'>
          <h2 class="font-color-blue">{{session3.title}}</h2>
          <span class="font-color-gray lh-2">{{session3.content}}</span>
        </a-col>
      </a-row>
    </div>
    <div class="bg-imgs row-max">
      <a-row :gutter='24'>
        <a-col :xs="!isPC?6:12" class="ptb-48 wow slideInLeft">
          <a-menu mode='vertical' @click="handlClick" class="menu-bg" theme="dark" :defaultSelectedKeys="selectKey">
            <a-menu-item v-for="item in solutionData" :key="item.name">
              {{item.name}}
            </a-menu-item>
          </a-menu>
        </a-col>
        <a-col :xs='!isPC?14:12' class="ptb-48 wow slideInRight">
          <h2>{{solutionDataDesc.name}}</h2>
          <p class="font-color-gray lh-2 left">{{solutionDataDesc.desc}}</p>
        </a-col>
        <a-col :xs="!isPC?'4':'0'" class="ptb-48"></a-col>
      </a-row>
    </div>
    <div class='row-max'>
      <!-- session 4 -->
      <a-row class="ptb-48 center wow slideInLeft">
        <a-col :xs=24 :sm=22 :offset='!isPC?2:0' class='pd-48'>
          <h2 class="font-color-blue">{{session4.title}}</h2>
          <span v-for="item in session4.friends" :key="item" class="pr-24">{{item}}</span>
        </a-col>
      </a-row>
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
import cardNav from '@/components/card'
import {mapGetters} from 'vuex'
import {scrollFn} from '@/utils/index'
import {WOW} from 'wowjs'
export default {
  data(){
    return{
      solutionDataDesc:{
        name:'',
        desc:'',
      },
      selectKey:[],
      session1:{
        title:'Nenone - 区块链技术创新与研发',
        content:'Newone本着“科技让世界变得有趣”的宗旨，发现市场上未被满足的需求，技术上走别人没走过的路。探索和创新是集腋成裘的过程，我们不知会走向何方，关键是我们在持续不断的前进。',
        more:'了解更多',
        link:'http://111.com'
      },
      session2:{
        title:'了解我们的产品',
        content:'Newone利用科技的力量置身于金融行业、传统行业数据溯源、AI算法服务、区块链底层技术等信息化。推出了系统解决方案：数字货币交易系统、OTC场外交易系统、数字货币金融系统、云矿机&云钱包、聚合区块链+，以及媒体服务业务、物联网硬件设备服务业务。'
      },
      session3:{
        title:'Newone解决方案',
        content:'我们将利用数据溯源、AI算法服务、区块链底层技术等、通过解决企业内部与外部的信息化基础平台，以解决企业、政府单位在信息化不断扩展的业务需求，同时Newone与细分行业内的咨询公司展开深入的合作，以帮助更多的企业与机构进行产业升级与转型。'
      },
      solutionData:[
        {name:'公链基础设施',desc:'Newone本着“科技让世界变得有趣”的宗旨，发现市场上未被满足的需求，技术上走别人没走过的路。探索和创新是集腋成裘的过程，我们不知会走向何方，关键是我们在持续不断的前进。'},
        {name:'物联网服务',desc:'Newone本着“科技让世界变得有趣”的宗旨，发现市场上未被满足的需求，技术上走别人没走过的路。探索和创新是集腋成裘的过程，我们不知会走向何方，关键是我们在持续不断的前进。'},
        {name:'人工智能策略服务',desc:'Newone本着“科技让世界变得有趣”的宗旨，发现市场上未被满足的需求，技术上走别人没走过的路。探索和创新是集腋成裘的过程，我们不知会走向何方，关键是我们在持续不断的前进。'},
        {name:'区块链行为溯源服务',desc:'Newone本着“科技让世界变得有趣”的宗旨，发现市场上未被满足的需求，技术上走别人没走过的路。探索和创新是集腋成裘的过程，我们不知会走向何方，关键是我们在持续不断的前进。'}
      ],
      session4:{
        title:'合作伙伴',
        friends:['抵扣税款','sajdsfj','akfdjklfie','asdkjfkdlf']
      }
    }
  },
  created(){
    this.solutionDataDesc.name = this.solutionData[0].name
    this.solutionDataDesc.desc = this.solutionData[0].desc
    this.selectKey.push(this.solutionDataDesc.name)
    this.$store.dispatch('GetInfo').then(res => {
      console.log(res,'res')
    })
  },
  components:{
    headerNav,
    footerNav,
    cardNav
  },
  methods:{
    handlClick({key}){
      let filterArr = this.solutionData.filter(item => {
        return item.name == key
      })
      
      this.solutionDataDesc.name = filterArr[0].name
      this.solutionDataDesc.desc = filterArr[0].desc
    }
  },
  computed:{
    ...mapGetters(['isPC'])
  },
  mounted(){
    new WOW().init()
    scrollFn('header')
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