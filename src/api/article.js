import axios from '@/utils/request'
// 获取频道的文章列表
export const getArticle=(params)=>axios({
    url:'/v1_1/articles',
    method:'GET',
    params,
})
// 获取文章详情
export const getArticleById=(article_id)=>axios({
    url:`/v1_0/articles/${article_id}`,
    method:'GET',
})