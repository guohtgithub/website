import request from './network'

class serviceManger{
  menuInfo(param){
    return request({
      method:'get',
      url:`/home?language=${param}`
    })
  }
  getProduct(param){
    return request({
      method:'get',
      url:`/product?language=${param}`
    })
  }
  getService(param){
    return request({
      method:'get',
      url:`/service?language=${param}`
    })
  }
}

export default new serviceManger()