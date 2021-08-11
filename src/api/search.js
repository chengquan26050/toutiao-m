import axios from '@/utils/request'

// 自动联想
export const getSearchList = (q)=>axios({
    url:'/v1_0/suggestion',
    method:'GET',
    params:{
        q,
    }
})

export const getSearchResult = (params)=>axios({
    url:'/v1_0/search',
    method:'GET',
    params,
})