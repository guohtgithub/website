const path = require('path')

function resolve(dir){
  return path.join(__dirname,dir)
}

module.exports = {
  lintOnSave:false,
  chainWebpack:config => {
    config.resolve.alias.set('@',resolve('src'))
  },
  publicPath:process.env.NODE_ENV === 'production'?'./':'./',
  productionSourceMap: false,
  devServer:{
    port:8080,
    host:'0.0.0.0',
    https:false,
    open:true,
    proxy:{
      '/':{
        target:'http://192.168.0.12:83',
        ws:false,
      }
    }
  }
}