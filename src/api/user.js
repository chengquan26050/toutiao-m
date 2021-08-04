// 用户相关请求模块
import axios from '@/utils/request'

export const login = data=>axios({
    url:'/v1_0/authorizations',
    method:'POST',
    data,
})
export const sendSms=mobile=>axios({
    url:`/v1_0/sms/codes/${mobile}`,
    method:'GET'
})