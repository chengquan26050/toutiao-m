import axios from '@/utils/request'
// 获取频道的文章列表
export const getArticle=(params)=>axios({
    url:'/v1_0/articles',
    method:'GET',
    params,
})
// 获取文章详情
export const getArticleById=(article_id)=>axios({
    url:`/v1_0/articles/${article_id}`,
    method:'GET',
})
// 收藏文章
export const addCollect=(target)=>axios({
    url:'/v1_0/article/collections',
    method:'POST',
    data:{
        target,
    }
})

// 取消收藏文章
export const deleteCollect=(target)=>axios({
    url:`/v1_0/article/collections/${target}`,
    method:'DELETE',

})

// 点赞
export const addLike=(target)=>axios({
    url:'/v1_0/article/likings',
    method:'POST',
    data:{
       target,
    }
})
// 取消点赞
export const delLike=(target)=>axios({
    url:'/v1_0/article/likings/'+target,
    method:'DELETE',
  
})