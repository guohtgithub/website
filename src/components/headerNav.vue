<template>
  <header class="header" id='header'>
    <a-affix :offsetTop=0 class="container">
      <h1 :class="isPC?'center':''">
        <router-link tag="a" to="/home">
          <img src="./logo.png" alt="">
        </router-link>
      </h1>
      <a-menu v-show="!isPC" 
        :defaultSelectedKeys='current'
        :selectedKeys='current'
        mode="horizontal" 
        class="nav" theme="dark" @click="handleSelect">
        <template v-for="item in navData">
          <a-menu-item v-if="!item.content.length" 
            :key="item.path?item.path:item.sort">{{item.sort}}</a-menu-item>
          <a-sub-menu v-else :key='item.path' :title="item.sort">
            <a-menu-item v-for="subItem in item.content" 
            :key="subItem.url?subItem.url:subItem.name">
              {{subItem.name}}
            </a-menu-item>
          </a-sub-menu>
        </template>
      </a-menu>
      <a-icon v-show="isPC" 
        @click="showDrawer"
        type="menu-fold" class="nav" style="padding-right:36px;"/>
    </a-affix>
    <!-- title='信息选择' -->
    <a-drawer 
      placement='left'
      :closable='false'
      @close='onClose'
      :visible='visible'
      v-show="isPC"
    >
      <a-menu v-show="isPC" 
        :defaultSelectedKeys='current'
        :selectedKeys='current'
        mode="inline" class="nav" @click="handleSelect">
        <template v-for="item in navData">
          <a-menu-item v-if="!item.content.length"
            :key="item.path?item.path:item.sort">{{item.sort}}</a-menu-item>
          <a-sub-menu v-else-if="item.content.length" :key='item.path' :title="item.sort">
            <a-menu-item v-for="subItem in item.content" 
            :key="subItem.url?subItem.url:subItem.name">
              {{subItem.name}}
            </a-menu-item>
          </a-sub-menu>
        </template>
      </a-menu>
    </a-drawer>
  </header>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data(){
    return{
      navData:[
        {sort:'首页',path:'/home',content:[]},
        {sort:'产品',path:'/product?type=1',content:[
          // {name:'产品1',url:'/product?type=1'},
          // {name:'产品2',url:'/product?type=2'},
          // {name:'产品3',url:'/product?type=3'},
          // {name:'产品4',url:'/product?type=4'},
        ]},
        {sort:'解决方案',path:'/solution?type=1',content:[
          // {name:'解决方案1',url:'/solution?type=1'},
          // {name:'解决方案2',url:'/solution?type=2'},
          // {name:'解决方案3',url:'/solution?type=3'},
          // {name:'解决方案4',url:'/solution?type=4'},
        ]},
        {sort:'语言切换',path:'',content:[
          {name:'中文',url:''},
          {name:'English',url:''},
        ]},
      ],
      current: [],
      visible:false
    }
  },
  created(){
    let path = (window.location.href.split('/#'))[1]
    this.current = [path]
  },
  methods:{
    handleSelect({item,key}){
      if(key.indexOf('/') > -1){
        this.$router.push({
          path:key
        })
      }else if(key ==='中文'){
        this.$store.dispatch('SetingLanguage',"cn")
        this.navData=[
          {sort:'首页',path:'/home',content:[]},
          {sort:'产品',path:'/product?type=1',content:[]},
          {sort:'解决方案',path:'/solution?type=1',content:[]},
          {sort:'语言切换',path:'',content:[
            {name:'中文',url:''},
            {name:'English',url:''},
          ]},
        ]
      }else if(key=== 'English'){
        this.$store.dispatch('SetingLanguage','en')
        this.navData = [
          {sort:'Home',path:'/home',content:[]},
          {sort:'Product',path:'/product?type=1',content:[]},
          {sort:'Server',path:'/solution?type=1',content:[]},
          {sort:'Language',path:'',content:[
            {name:'中文',url:''},
            {name:'English',url:''},
          ]},
        ]
      }
      this.current = [key]
      this.onClose()
    },
    showDrawer(){
      this.visible = true
    },
    onClose(){
      this.visible = false
    }
  },
  computed:{
    ...mapGetters(['isPC'])
  }
}
</script>

<style scoped lang='less'>
  .header{
    height: 60px;
    color: #fff;
    top: 0;
    left: 0;
    width: 100%;
    line-height: 60px;
    z-index: 999;
    position: relative;
    .container{
      height: 100%;
      max-width: 1190px;
      margin: 0 auto;
    }
    h1{
      margin: 0;
      float: left;
      font-size: 32px;
      font-weight: 400;
      a{
        color: #333fff;
        text-decoration: none;
        display: block
      }
    }
    .nav{
      float: right;
      height: 100%;
      line-height: 60px;
      background: transparent;
      padding:0;
      margin:0;
      .nav-item{
        cursor: default;
        margin: 0;
        float: left;
        list-style: none;
        position: relative;
        a{
          text-decoration: none;
          color:#fff;
          display: block;
          padding: 0 22px;
        }
        a:hover{
          background: #333fff;
        }
      }
    }
  }

</style>