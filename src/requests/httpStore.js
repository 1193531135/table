import axios from 'axios'
let path = '/api'
let baseUrl = 'http://localhost:8000' + path //HAS
if(process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'publish'){
    baseUrl = path
}
if(process.env.NODE_ENV === 'test'){
    baseUrl = 'http://laien.test' + path
}
// const baseUrl = 'http://192.168.50.164/oog202/' //5GHz
export default {
    axios_1:axios.create({
        baseURL:baseUrl, //location
        timeout:10000,
    }),
    axios_2:axios.create({
        baseURL:baseUrl, //location
        timeout:0,
    }),
    default_img_url:'',
    imgUploadUrl:baseUrl,
}