import https from './httpStore'
import { Loading } from 'element-ui'
import { Message } from 'element-ui'
import qs from 'querystring'
import router from '../router'
const axios_1 = https.axios_1
const axios_2 = https.axios_2
const showImg = https.default_img_url
const imgUploadUrl = https.imgUploadUrl


let request = (url,data,func,method,load,message = 2) => {
    let loading;
    if(!load){
        loading = Loading.service()
    }
    axios_1({
        method: method || 'post',
        url,
        params: method === 'get'? data:null,
        data: method === 'get'? null:data,
    }).then((res) => {
        if(!load){
            loading.close()
        }
        // 超时
        if(res.data.code != 200 && message === 2){
            Message({message:`${res.data.message}`,type:'error'})
        }
        if(res.data.code === 1001 && 1 != 1){
            router.push('/login')
        }
        func(res)
    }).catch((res) => {
        if(!load){
            loading.close()
        }
        Message({message:"服务器错误"+res,type:'error'})
        throw res
    })
}
let request2 = (url,data,func,method) => {
    axios_2({
        method: method || 'post',
        url,
        params: method === 'get'? data:null,
        data: method === 'get'? null:data,
    }).then((data) => {
        func(data)
    }).catch((data) => {
        Message({message:"服务器错误"+data,type:'error'})
        func(data,'error')
        throw data
    })
}

axios_1.interceptors.request.use(config => {
    config.headers['token'] = localStorage.getItem('token')
    if(config.data && config.data.formData){
        config.data.formData = ''
        config.data = qs.stringify(config.data)
    }
    return config
})
export default {
    request,showImg,imgUploadUrl,request2
}