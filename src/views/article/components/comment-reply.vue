// 评论回复
<template>
  <div class="comment-reply">
    <van-nav-bar
      :title="comment.reply_count > 0 ? `${comment.reply_count}条回复` : '暂无回复'"
    >
      <van-icon
        slot="left"
        name="cross"
        @click="$emit('close')"
      />
    </van-nav-bar>

    <div class="scroll-wrap">
      <!-- 当前评论项 -->
      <comment-item :comment="comment" />
      <!-- /当前评论项 -->

      <van-cell>全部回复</van-cell>

      <!-------------------------- 评论的回复列表 -------------------------->
      
      <comment-list :source="comment.com_id" type="c"></comment-list>
      
      <!-------------------------- /评论的回复列表 -------------------------->
    </div>

    <!-- 底部区域 -->
    <div class="reply-bottom">
      <van-button
        @click="isPostShow=true"
        class="write-btn"
        size="small"
        round
      >写评论</van-button>
    </div>
    <!-- /底部区域 -->

    <!---------------------------------- 发布评论 -------------------------------------->
       <van-popup 
       v-model="isPostShow" 
       position="bottom" 
       >
       <comment-post :target="comment.com_id" type="c" @post-success="onPostSuccess"></comment-post>
       </van-popup>
    <!---------------------------------- /发布评论 -------------------------------------->
  </div>
</template>

<script>
// 每次打开评论回复弹层，内容不更新，都是同一个内容
// 弹层组件不会销毁只会display显示和隐藏
// 给弹层添加v-if指令，强制内容刷新
import CommentItem from './comment-item'
import CommentList from './comment-list'
import CommentPost from './comment-post.vue'

export default {
  name: 'CommentReply',
  components: {
    CommentItem,
    CommentList,
    CommentPost,
  },
  props: {
    // 点击回复的那行评论信息  
    comment: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
        isPostShow:false
    }
  },
  methods: {
      onPostSuccess(comment){
          console.log(comment);
      }
  }
}
</script>

<style scoped lang="less">
.scroll-wrap {
  position: fixed;
  top: 92px;
  left: 0;
  right: 0;
  bottom: 88px;
  overflow-y: auto;
}

.reply-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-top: 1px solid #d8d8d8;
  .write-btn {
    width: 60%;
  }
}
</style>