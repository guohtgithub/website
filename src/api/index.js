import request from './network'

class serviceManger{
  menuInfo(){
    return request({
      method:'post',
      url:'/'
    })
  }
  getProduct(){
    return request({
      method:'get',
      url:'/product'
    })
  }
  getService(){
    return request({
      method:'get',
      url:'/service'
    })
  }
}

export default new serviceManger()