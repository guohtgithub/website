<template>
<div class="row-max">
  <a-row v-show="!isPC" class="ptb-48-92 font-color-gray" :gutter='24'>
    <a-col :span='4'>
      <h3>关于我们</h3>
      <ul>
        <li>联系我们</li>
        <li>1590000****</li>
        <li>****@***.com</li>
      </ul>
    </a-col>
    <a-col :span='4'>
      <h3>关于我们</h3>
      <ul>
        <li>联系我们</li>
        <li>1590000****</li>
        <li>****@***.com</li>
      </ul>
    </a-col>
    <a-col :span='4'>
      <h3>关于我们</h3>
      <ul>
        <li>联系我们</li>
        <li>1590000****</li>
        <li>****@***.com</li>
      </ul>
    </a-col>
    <a-col :span='4'>
      <h3>微信咨询</h3>
      <img src="../views/home.jpg" alt="" width="100%">
    </a-col>
    <a-col :span='8'>
      <img src="../views/home.jpg" alt="" width="100%">
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
  }
</script>

<style>

</style>