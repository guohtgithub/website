<template>
<div class="row-max">
  <a-row v-show="!isPC" class="ptb-48-92 font-color-gray" :gutter='24'>
    <a-col :span='5'>
      <h3>{{product.title}}</h3>
      <ul>
        <li class="li-div" @click="toRouter('product',index)" v-for="(item,index) in product.list" :key="item.title">
          {{item.title}}
        </li>
      </ul>
    </a-col>
    <a-col :span='5'>
      <h3>{{solution.title}}</h3>
      <ul >
        <li class="li-div" @click="toRouter('solution',index)" v-for="(item,index) in solution.list" :key="item.title">
          {{item.title}}
        </li>
      </ul>
    </a-col>
    <a-col :span='4'>
      <h3>联系我们</h3>
      <ul>
        <li>1590000****</li>
        <li>****@***.com</li>
      </ul>
    </a-col>
    <a-col :span='4'>
      <!-- <h3>微信咨询</h3>
      <img src="../views/home.jpg" alt="" width="100%"> -->
    </a-col>
    <a-col :span='6'>
      <img src="./fter_logo.png" alt="" width="45%">
    </a-col>
  </a-row>
  <a-col :xs=24 class="center font-color-gray">Copyright © {{nowYear}} Newone 深圳市牛一科技发展有限公司 版权所有 粤ICP备05028606号-1</a-col>
</div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    data(){
      let nowYear = new Date()
      let year = nowYear.getFullYear()
      return{
        nowYear:year
      }
    },
    computed:{
      ...mapGetters(['isPC','solution','product'])
    },
    methods:{
      toRouter(router,index){
        this.$router.push(`./${router}?type=${(index+1)}`)
        this.toTop()
        this.$store.dispatch('SetIngRouter',(index+1))
      },
      toTop(){
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
      }
    }
  }
</script>

<style scoped>
  .li-div:hover{
    cursor: pointer;
    color: #ffffff;
  }
  li{
    line-height: 2;
    font-size: 12px;
  }
  h3{
    font-size: 15px;
  }
</style>