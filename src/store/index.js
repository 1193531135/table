import Vue from 'vue'
import Vuex from 'vuex'
// import base from './base'

Vue.use(Vuex)

export default new Vuex.Store({
    strict: true,
    state:{
        username:'ddd',
        token:null,                //存放token
        defineNowPath:'/table',    //基础页面路由
        nowPath:'/table',          //当前页面路由
        showDom:[],         //给Tab的数据
        allDom:[],    //全部的dom
        wid:null,      //页面宽度
        hei:null,      //页面高度
        randerStyle:null,
        publicAddress:null,
        tableAllData:'',
        selectOptions:{}
    },
    mutations:{
        modifyData(state,data){
            state[data.name] = data.newdata
        },
        watchForMD(state,data){
            if(data.constructor === Array){
                state.moveDialogState[data[0]] = data[1]
            }
            state.moveDialogState[data.name] = data.newdata
        },
        showDomConfig(state,obj){
            if(obj['type'] === 'add'){
                state.showDom.push(obj.data)
            }
        }
    }    
})