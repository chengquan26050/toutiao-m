// 评论相关的接口
import axios from '@/utils/request'

// 获取评论列表或评论回复
export const getComments=(params)=>axios({
    url:'/v1_0/comments',
    method:'GET',
    params,
})

// 对评论点赞
export const addLike=(target)=>axios({
    url:'/v1_0/comment/likings',
    method:'POST',
    data:{
        target
    }
})

// 对评论取消点赞
export const delLike=(target)=>axios({
    url:`/v1_0/comment/likings/${target}`,
    method:'DELETE',
})

// 添加评论或评论回复
export const addPost=(data)=>axios({
    url:'/v1_0/comments',
    method:'POST',
    data,
})