<template>
  <div>
    <header-nav style="position:fixed;"></header-nav>
    <div class='solution-div row-max'>
      <a-row :gutter='24' class="ptb-48 mg0">
        <a-col :xs='12' :sm=6 style='padding-top:0;' 
          class="wow slideInLeft">
          <a-menu mode='vertical' @click="handlClick" class="menu-bg" theme="dark" :defaultSelectedKeys="selectKey">
            <a-menu-item v-for="item in solutionData" :key="item.name">
              {{item.name}}
            </a-menu-item>
          </a-menu>
        </a-col>
        <a-col :xs='12' :sm='9' 
          class="wow slideInRight">
          <h2>{{solutionTitle}}</h2>
          <p class="font-color-gray">{{solutionDesc}}</p>
        </a-col>
        <a-col :xs='24' :sm=9 
          class="center wow slideInLeft">
          <img src="./block-01-back.png" alt="" style="width:80%;">
        </a-col>
      </a-row>
      <!-- 解决方案 Tab -->
      <a-row>
        <a-col :xs="!isPC?'20':'24'" :offset="!isPC?'4':'0'">
          <a-menu @click="selectTabEvent" 
            mode='horizontal' theme="dark" 
            :defaultSelectedKeys='selectTab'>
            <a-menu-item v-for="item in descData" 
              :key="item.name" :class="!isPC?'width-160':''">
              {{item.name}}
            </a-menu-item>
          </a-menu>
        </a-col>
      </a-row>
      <!-- 解决方案 -->
      <a-row :gutter='24' class="pd-48 solution mg0">
        <h2 class="font-color-blue center ptb-48">{{solutionAction.title}}</h2>
        <a-col :xs=24 :sm='10' 
          :offset='!isPC?"2":"0"'
          v-for="(item,index) in solutionAction.list" 
          :key="item.name"
          class="bg-gray wow"
          :class="index%2?'slideInRight':'slideInLeft'"
          >
          <h2 class="font-color-orgine">{{item.title}}</h2>
          <p class="lh-2 font-color-gray">{{item.desc}}</p>
        </a-col>
      </a-row>
      <!-- 功能介绍 -->
      <a-row :gutter='24' 
      class="pd-48 solution mg0">
        <h2 class="font-color-blue center ptb-48">{{actionData.title}}</h2>
        <a-col :xs='24' :sm='6' 
          v-for="item in actionData.list" 
            :key="item.name" class="p-24-36 wow slideInRight">
          <div class="bg-gray">
            <a-icon type='edit' class="img-icon"></a-icon>
            <h2 class="font-color-gray center">{{item.title}}</h2>
            <p class="font-color-gray ptb-48">{{item.desc}}</p>
          </div>
        </a-col>
      </a-row>
      <a-row :gutter=24 
      class="pd-48 solution center mg0 wow slideInLeft">
        <h2 class="font-color-blue ptb-48">{{service.title}}</h2>
        <img :src="service.img" alt="">
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
import {mapGetters} from 'vuex'
import {scrollFn} from '@/utils/index'
import {WOW} from 'wowjs'
export default {
  data(){
    return{
      solutionData:[
        {name:'公链基础设施',path:'/solution?type=1',desc:'Newone自主研发的一体化交易研究框架。包括且不限于严谨而灵活的人工智能交易策略订阅模式、币种价格实时监控与推送、跨交易所交易集成与托管、交易跟随明星交易员或人工智能机器人、数字货币舆情与市场情绪分析订阅、数字货币项目宣发、精确同步数字货币领域的实盘交易的模拟环境。'},
        {name:'物联网服务',path:'/solution?type=2',desc:'Newone自主研发的一体化交易研究框架。包括且不限于严谨而灵活的人工智能交易策略订阅模式、币种价格实时监控与推送、跨交易所交易集成与托管、交易跟随明星交易员或人工智能机器人、数字货币舆情与市场情绪分析订阅、数字货币项目宣发、精确同步数字货币领域的实盘交易的模拟环境。'},
        {name:'人工智能策略服务',path:'/solution?type=3',desc:'Newone自主研发的一体化交易研究框架。包括且不限于严谨而灵活的人工智能交易策略订阅模式、币种价格实时监控与推送、跨交易所交易集成与托管、交易跟随明星交易员或人工智能机器人、数字货币舆情与市场情绪分析订阅、数字货币项目宣发、精确同步数字货币领域的实盘交易的模拟环境。'},
        {name:'区块链行为溯源服务',path:'/solution?type=4',desc:'Newone自主研发的一体化交易研究框架。包括且不限于严谨而灵活的人工智能交易策略订阅模式、币种价格实时监控与推送、跨交易所交易集成与托管、交易跟随明星交易员或人工智能机器人、数字货币舆情与市场情绪分析订阅、数字货币项目宣发、精确同步数字货币领域的实盘交易的模拟环境。'}
      ],
      solutionDesc:'',
      solutionTitle:'',
      selectKey:[],
      descData:[{name:'解决方案'},{name:'功能介绍'},{name:'系统框架'}],
      selectTab:[],
      solutionAction:{
        title:'解决方案',
        list:[
          {title:'偏主观意识，缺乏理性',desc:'由理性逻辑思维主导的AI机器人，以大数据为依托客观抉择，严格控制夏普比率同比银行信托基金。增加理性投资决策，利用现代统计学和数学的方法，提高决策科学性，以及结合众多客观参考指标，大概率的获得超出评价的收益。'},
          {title:'缺乏专业投资平台',desc:'由理性逻辑思维主导的AI机器人，以大数据为依托客观抉择，严格控制夏普比率同比银行信托基金。增加理性投资决策，利用现代统计学和数学的方法，提高决策科学性，以及结合众多客观参考指标，大概率的获得超出评价的收益。'}
        ]
      },
      actionData:{
        title:'功能介绍',
        list:[
          {title:'全程追溯、追溯到人',desc:'从生产到流通全程追溯，落实到人，记录生产工序流通行为，监控流程节点的每个行为。'},
          {title:'精细管理，精准定位',desc:'从生产到流通全程追溯，落实到人，记录生产工序流通行为，监控流程节点的每个行为。'},
          {title:'精细管理，精准定位',desc:'从生产到流通全程追溯，落实到人，记录生产工序流通行为，监控流程节点的每个行为。'},
          {title:'行为记录，透明生产',desc:'从生产到流通全程追溯，落实到人，记录生产工序流通行为，监控流程节点的每个行为。'},
          {title:'溯源防伪，控制风险',desc:'从生产到流通全程追溯，落实到人，记录生产工序流通行为，监控流程节点的每个行为。'},
          {title:'精准数据收集',desc:'从生产到流通全程追溯，落实到人，记录生产工序流通行为，监控流程节点的每个行为。'},
          {title:'精准数据收集',desc:'从生产到流通全程追溯，落实到人，记录生产工序流通行为，监控流程节点的每个行为。'},
          {title:'满足国家监管',desc:'从生产到流通全程追溯，落实到人，记录生产工序流通行为，监控流程节点的每个行为。'},
        ]
      },
      service:{
        title:'系统框架',
        img:require('@/views/home.jpg')
      }
    }
  },
  created(){
    this.solutionTitle = this.solutionData[0].name
    this.solutionDesc = this.solutionData[0].desc
    this.selectKey = [this.solutionTitle]
    this.selectTab = [this.descData[0].name]
  },
  components:{
    headerNav,
    footerNav
  },
  methods:{
    handlClick({key}){
      console.log(key)
      let filter = this.solutionData.filter(item => {
        return item.name == key
      })
      this.solutionTitle = filter[0].name
      this.solutionDesc = filter[0].desc
      this.selectKey = [this.solutionTitle]
    },
    selectTabEvent({key}){
      let index = this.descData.findIndex(item => {
        console.log(key,item)
        return item.name == key
      })

      let jump = document.querySelectorAll('.solution')
      console.log(jump[index],'---',index)
      let total = jump[index].offsetTop
      console.log(total,'total')
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
    }
  },
  computed:{
    ...mapGetters(['isPC','solution'])
  },
  mounted(){
    new WOW().init()
    scrollFn('header')
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
    padding: 24px 0;
  }
</style>