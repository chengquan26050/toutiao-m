import axios from '@/utils/request'

export const getArticle=(params)=>axios({
    url:'/v1_1/articles',
    method:'GET',
    params,
})