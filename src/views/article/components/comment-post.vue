<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button
      @click="onPost"
      class="post-btn"
      :disabled="message.length===0"
    >发布</van-button>
  </div>
</template>

<script>
import {addPost} from '@/api/comment'
export default {
  name: 'CommentPost',
  data () {
    return {
      message: ''
    }
  },
  // inject:['articleId'],
  inject:{
    articleId:{
      type:String,
      default:null
    }
  },
  computed: {},
  watch: {},
  props: {
    target:{
        required:true,
        type:String
    },
    type:{
      type:String,
      default:'a',
      // 只能传入a或c
      validator(value){
        return ['a','c'].includes(value)
      },
    }
  },    
  created () {},
  mounted () {},
  methods: {
     async onPost(){
        this.$toast.loading({
          message: '发布中...',
          forbidClick: true,
          duration:0
        })

         try{
             const {data} = await addPost({
                 target:this.target,//评论的目标id（评论文章即为文章id，对评论进行回复则为评论id
                 content:this.message,//评论内容
                 art_id:this.type==='c'?this.articleId:null,//文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
             })
            //  console.log(data);
             this.message=''
             this.$emit('post-success',data.data.new_obj)
             this.$toast.success('发布成功')
         }catch(err){
             this.$toast.fail('评论失败')
         }
      }
  }
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
