import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router';
import './assets/all.css'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'  //英文包
import 'element-ui/lib/theme-chalk/index.css'
import './assets/cross-icon/iconfont.css'
import axios from './requests/index.js'
import md5 from 'md5'
import qs from 'querystring'
import sortable from 'sortablejs'

Vue.use(ElementUI, { locale })

Object.keys(axios).some((item) => { Vue.prototype['$' + item] = axios[item] })
// Vue.prototype.$loading = ElementUI.Loading.service                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
Vue.use(ElementUI)

function $deepCopy(data) {
  if (!data && (data != false) && (data != 0)) { throw `数据为空 => ${data}` }
  let container = null;
  if (data.constructor === Array) {
    container = []
    data.some((item, index) => {
      if (typeof item === 'object') {
        container[index] = $deepCopy(item)
      } else {
        container[index] = item
      }
    })
  }
  if (data.constructor === Object) {
    container = {}
    Object.keys(data).some((item) => {
      if (typeof data[item] === 'object' && data[item] != null) {
        container[item] = $deepCopy(data[item])
      } else {
        container[item] = data[item]
      }
    })
  }
  if (data.constructor != Object && data.constructor != Array) {
    container = data
  }
  return container
}
// Object.prototype.length = function(){ return Object.keys(this).length }
Vue.prototype.$md5 = md5
Vue.prototype.$qs = qs
Vue.prototype.$loading = ElementUI.Loading
Vue.prototype.$sortable = sortable
Vue.prototype.$deepCopy = $deepCopy
Vue.prototype.$cutArray = (array, name) => {
  const newData = []
  array.some((item) => {
    if (item === name) { return false }
    newData.push(item)
  })
  return newData
}
Vue.prototype.$IdMapValue = (name,id) => {
  let option = store.state.selectOptions[name]
  let value = {}
  for(let item in option){
    if(id == option[item].id){
      value = {...option[item]};
      !value.bgc &&( value.bgc = 'rgba(0, 0, 0, 0.2)' )
      break;
    }
  }
  return value
}
Vue.config.productionTip = false

// 自动化注册iosWebview
let IosWebViewRouter = []
// {
//   // 引用axios之前先 注入iosRouter
//   // require.context(directory, useSubdirectories, regExp, mode = 'sync')
//   const files = require.context('./components/IosWebview', true, /.vue$/).keys()
//   // let iosRouter = files.map(item => item.slice(item.search(/\/[^/]{1,}.vue$/)))
//   // console.log(store.state.IosWebView)
//   files && files.map(i => i.slice(0,i.length - 4)).some(item => {
//     IosWebViewRouter.push({
//       path:item.slice(item.search(/\/[^/]{1,}$/)),
//       component:re => require(['./components/IosWebview' + item.slice(1,) + '.vue'],re)
//     })
//   })
//   router.addRoutes(IosWebViewRouter)
// }


router.beforeEach((to, from, next) => {
  // 刷新manage清缓存
  if (to.path === '/project-manage' || to.path === '/template-manage') {
    if (from.path.indexOf(to.path) === -1) {
      let head = to.path.slice(1, to.path.indexOf('-'))
      localStorage.removeItem(`pageSearchData_${head}`)
      let head2 = head[0].toUpperCase() + head.slice(1, head.length)
      localStorage.removeItem(`pageNum${head2}`)
    }
  }
  // main
  let localStorageToken = localStorage.getItem('token')
  let allowArray = ['/login', '/register', '/webview', '/webview2',...IosWebViewRouter.map(item => item.path)]
  let a = false
  allowArray.some(item => {
    if (to.path === item) {
      a = true
      return true
    }
  })
  if (a) { return next() }
  if (store.state.token || localStorageToken) {
    return next()
  } else {
    next('/login')
  }
})

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
