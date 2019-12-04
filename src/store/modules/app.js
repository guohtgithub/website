import {toolMethod} from '@/utils/index'
import serviceManger from '@/api/index'

const app = {
  state:{
    isPC:toolMethod.any(),
    solutionList:null,
    productList:null,
  },
  mutations:{
    SetSolution(state,list){
      state.solutionList = list
    },
    SetProduct(state,list){
      state.productList = list
    }
  },
  actions:{
    GetInfo({commit}){
      return new Promise((resolve,reject) => {
        serviceManger.menuInfo().then(res => {
          if(res){
            const data = res.data
            let solution = data.filter(item => {
              return item.name = '解决方案'
            })
            let product = data.filter(item => {
              return item.name = '产品'
            })
            commit('SetSolution',solution)
            commit('SetProduct',product)
            resolve(res)
          }else{
            reject(res)
          }
        }).catch(err => {
          console.log(err,'error')
        })
      })
    }
  }
}

export default app