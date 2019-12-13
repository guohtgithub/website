import {toolMethod} from '@/utils/index'
import serviceManger from '@/api/index'
let language = window.navigator.language
let lang = language.indexOf('-') > -1 ? 'cn':language
const app = {
  state:{
    isPC:toolMethod.any(),
    solutionList:null,
    productList:null,
    language:lang,
    routerType:1
  },
  mutations:{
    SetSolution(state,list){
      state.solutionList = list
    },
    SetProduct(state,list){
      state.productList = list
    },
    SetLanguage(state,language){
      state.language = language
    },
    SetRouterType(state,index){
      state.routerType = index
    }
  },
  actions:{
    GetInfo({commit},param){
      return new Promise((resolve,reject) => {
        serviceManger.menuInfo(param).then(res => {
          if(res){
            const data = res.data
            let solution = {
              title:'创新技术解决方案',
              list:[]
            }
            
            data.service.forEach((item,index) => {
              solution.list.push({title:item.title,url:`solution?type=${index+1}`})
            })

            let product = {
              title:'产品',
              list:[]
            }
            data.product.forEach((item,index) => {
              product.list.push({title:item.title,url:`product?type=${index+1}`})
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
    },
    SetingLanguage({commit},language){
      commit('SetLanguage',language)
    },
    SetIngRouter({commit},index){
      commit('SetRouterType',index)
    }
  }
}

export default app