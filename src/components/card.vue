<template>
<div class="commodity">
  <div class="container">
    <swiper class='swiImgs' :options="swiperOption" v-if="imgList.length!=0">
      <swiper-slide v-for="(item, index) in imgList" 
        data-index="index" 
        :key="index" class="item">
        <img class='swiImg' :src='`${item.image}`' 
        @click="toRouter(index)"
      />
        <h2 class="font-18">{{item.title}}</h2>
        <a-row>
          <a-col :xs=12 class="p-16 font-color-gray"
            style="font-size:12px;text-align:left;"
            v-for="(name,ind) in item.solution[0].list" 
            :key="name.title"
            :class="(ind+1)%2?'pd-l-20':'pd-r-20'"
          >{{name.title}}</a-col>
        </a-row>
      </swiper-slide>
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
  props:['imgList'],
  data() {
    const that = this;
    let pc = toolMethod.any() // true wap
    return {
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
    toRouter(index){
      this.$router.push(`/product?type=${(index+1)}`)
    }
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
          height: 200px;
        }
      }
      .item:hover{
        cursor: pointer;
      }
    }
  }
}
.pd-l-20{
  padding-left: 65px;
}
.pd-r-20{
  padding-right: 35px;
}
</style>