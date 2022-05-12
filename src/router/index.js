import Vue from 'vue'
import Router from 'vue-router'
// import state from '../store'
// console.log(state.state.IosWebView)
Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/login',
            component: re => require(['../components/main/common/Login.vue'], re)
        },
        {
            path: '/register',
            component: re => require(['../components/main/common/Register.vue'], re)
        },
        // {
        //     path: '/webview',
        //     component: re => require(['../components/IosWebview/WebViewPage.vue'], re)
        // },
        // {
        //     path: '/webview2',
        //     component: re => require(['../components/IosWebview/WebViewPage2.vue'], re)
        // },
        {
            path: '/',
            redirect: '/login'
        },
        {
            meta: 'start',
            path: '/',
            component: re => require(['../components/main/common/Home.vue'], re),
            children: [
                {
                    meta: 'table',
                    icon: 'el-icon-coin',
                    path: '/table',
                    component: re => require(['../components/table.vue'], re),
                },               
            ]
        }
    ]
})