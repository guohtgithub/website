<template>
<div class="commodity">
  <div class="container">
    <swiper class='swiImgs' :options="swiperOption" v-if="imgList.length!=0">
      <swiper-slide v-for="(item, index) in imgList" data-index="index" :key="index" class="item">
        <img class='swiImg' :src='item.url' />
        <p v-for="name in item.list" :key="name.name">{{name.name}}</p>
      </swiper-slide>
      <!-- <div class="swiper-pagination" slot="pagination"></div> -->
    </swiper>
    <div v-show="!isPC" class="swiper-button-prev outline"></div><!--左箭头。如果放置在swiper-container外面，需要自定义样式。-->
    <div v-show="!isPC" class="swiper-button-next outline"></div><!--右箭头。如果放置在swiper-container外面，需要自定义样式。-->
  </div>
</div>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
require("swiper/dist/css/swiper.css");
import {mapGetters} from 'vuex'
import {toolMethod} from '@/utils/index'
export default {
  data() {
    const that = this;
    let pc = toolMethod.any() // true wap
    return {
      imgList: [
        {
          url:'https://boweisou.oss-cn-shenzhen.aliyuncs.com/yy/images/911a7002e11608fb581fffcde05d5257.jpg',
          list:[
            {name:'name1',desc:'desc'},
            {name:'name2',desc:'desc'},
            {name:'name3',desc:'desc'},
          ]
        },{
          url:'https://boweisou.oss-cn-shenzhen.aliyuncs.com/yy/images/2_1536049430.jpg',
          list:[
            {name:'name4',desc:'desc'},
            {name:'name5',desc:'desc'},
            {name:'name6',desc:'desc'},
          ]
        },{
          url:'https://boweisou.oss-cn-shenzhen.aliyuncs.com/yy/images/2_1536049430.jpg',
          list:[
            {name:'name7',desc:'desc'},
            {name:'name8',desc:'desc'},
            {name:'name9',desc:'desc'},
          ]
        },{
          url:"https://boweisou.oss-cn-shenzhen.aliyuncs.com/yy/images/911a7002e11608fb581fffcde05d5257.jpg",
          list:[
            {name:'name0',desc:'desc'},
            {name:'name01',desc:'desc'},
            {name:'name02',desc:'desc'},
          ]
        }
      ], //这里就使用假数据了
      imgIndex: 1,
      swiperOption: {
        //是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
        notNextTick: true,
        //循环
        loop: true,
        //设定初始化时slide的索引
        initialSlide: 0,
        //自动播放
        autoplay: {
          delay: 2500,
          stopOnLastSlide: true,
          disableOnInteraction: true,
        },
        //滑动速度
        speed: 800,
        //滑动方向
        direction: "horizontal",
        // view 里面显示三个 相隔20px
        slidesPerView:pc?1:3,
        spaceBetween:pc?0:0,
        //小手掌抓取滑动
        grabCursor: true,
        //滑动之后回调函数
        on: {
          slideChangeTransitionStart: function() {
            that.imgIndex = this.realIndex + 1;  //获取轮播图片下标索引；这里有一个坑，之前网上找到的是用activeIndex，但后来网上说的是这个realIndex，原来activeIndex是swiper2.0的；而realIndex是swiper3.0的，（使用realIndex才实现了下标索引）
          },
        },
        // 显示左右箭头
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      }
    }
  },
  components:{
    swiper,
    swiperSlide
  },
  created() {
    this.swiperOption.autoplay = this.imgList.length != 1 ? { //控制只有一张图片的时候不自动轮播
      delay: 1500,
      stopOnLastSlide: false,
      disableOnInteraction: false
    } : false;
  },
  methods: {
  },
  computed:{
    ...mapGetters(['isPC'])
  },
}
</script>
<style lang="less" rel="stylesheet/less">
.commodity{
  .container{
    position: relative;
    .outline{
      outline: none
    }
    .swiImgs {
      width: 80%;
      margin: 0 auto;
      .item{
        height: 19rem;
        .swiImg {
          width: 80%;
        }
      }
    }
  }
}
</style>