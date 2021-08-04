import axios from "axios"

const request = axios.create({
    baseURL: "http://toutiao-app.itheima.net", // 基础路径
    // baseURL: "http://192.168.17.40:8000/" // 基础路径
})

// 拦截器

// 判断状态码

export default request