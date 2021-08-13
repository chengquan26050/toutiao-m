import axios from "axios"
import store from '@/store'

import JSONBig from 'json-bigint'
// const jsonStr='{"art_id":1245953273786007552}'
// console.log(jsonStr);
// console.log(JSON.parse(jsonStr));//会丢失精度
// console.log(JSONBig.parse(jsonStr));//不会丢失精度，适用对象来表示大整数数字
// console.log(JSONBig.parse(jsonStr).art_id.toString());//解决大数据问题

const request = axios.create({
    baseURL: "http://toutiao.itheima.net", // 基础路径
    // baseURL: "http://192.168.17.40:8000/" // 基础路径
    // baseURL: "http://192.168.17.27:8000" // 基础路径
    transformResponse: [function (data) {
      try{
        return JSONBig.parse(data)
      }catch(err){
        return data
      }
    }]
})

// 拦截器
request.interceptors.request.use(function (config) {
  // config ：本次请求的配置对象
  // config 里面有一个属性：headers
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// 判断状态码

export default request