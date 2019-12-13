let u = navigator.userAgent;
let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
export const toolMethod = { // 手机 PC 判断
  Android: function () {
      return isAndroid ? true : false;
  },
  BlackBerry: function () {
      return u.match(/BlackBerry/i) ? true : false;
  },
  iOS: function () {
      return u.match(/iPhone|iPad|iPod|iOS/i) ? true : false;
  },
  Windows: function () {
      return u.match(/IEMobile/i) ? true : false;
  },
  any: function () {
      return (toolMethod.Android() || toolMethod.BlackBerry() || toolMethod.iOS() || toolMethod.Windows());
  },
  AppClient: function () {
      return toolMethod.AppAndroid() || toolMethod.AppIOS()
  },
  Electron: function () {
      return !!u.match(/Electron/i);
  },
  Weixin: function () {
      var ua = u.toLowerCase(); //获取判断用的对象
      return ua.match(/MicroMessenger/i) == "micromessenger" ? true : false;
  }
}

export const scrollFn = (id) =>{
    var toolbar=document.getElementById(id) 
    window.addEventListener('scroll',()=>{
      let offsetTop = window.pageYOffset || 
        document.documentElement.scrollTop || 
        document.body.scrollTop
      if (offsetTop>150) {
        toolbar.style.background="#313131"
      }else{
        toolbar.style.background='none'
      }
    },true);
}