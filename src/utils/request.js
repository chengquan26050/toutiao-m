import axios from "axios"

const request = axios.create({
    baseURL: "http://ttapi.research.itcast.cn/", // 基础路径
    // baseURL: "http://192.168.17.40:8000/" // 基础路径

})

// 拦截器

// 判断状态码
0
export default request