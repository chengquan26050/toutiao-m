import axios from '@/utils/request'
// 获取所有频道
export const getAllChannels = ()=>axios({
    url:'/v1_0/channels',
    method:'GET'
})
// 在线添加频道
export const addUserChannels=(data)=>axios({
    url:'/v1_0/user/channels',
    method:'PATCH',
    data:{
        channels:[data]
    }
})
// 删除频道
export const delUserChannel=id=>axios({
    url:'/v1_0/user/channels/'+id,
    method:'DELETE'
})