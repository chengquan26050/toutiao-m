// 用户相关请求模块
import axios from '@/utils/request'
// import store from '@/store'

export const login = data=>axios({
    url:'/v1_0/authorizations',
    method:'POST',
    data,
})
export const sendSms=mobile=>axios({
    url:`/v1_0/sms/codes/${mobile}`,
    method:'GET'
})
export const getUserInfo=()=>axios({
    url:'/v1_0/user',
    method:'GET'
    // headers:{
    //     Authorization:`Bearer ${store.state.user.token}`
    // }
})
export const getUserChannel=()=>axios({
    url:'/v1_0/user/channels',
    method:'GET'
})

// 关注用户
export const addFollow=(target)=>axios({
    url:'/v1_0/user/followings',
    method:'POST',
    data:{
        target
    }
})

// 取消关注
export const deleteFollow=(target)=>axios({
    url:`/v1_0/user/followings/${target}`,
    method:'DELETE',
})