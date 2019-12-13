const getters = {
  isPC:state => state.app.isPC,
  solution:state => state.app.solutionList,
  product:state => state.app.productList,
  language:state => state.app.language,
  routerType:state => state.app.routerType
}

export default getters