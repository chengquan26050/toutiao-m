//文章详情
<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading
          color="#3296fa"
          vertical
        >加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="article.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{article.title}}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{article.aut_name}}</div>
          <div slot="label" class="publish-date">{{article.pubdatee|relativeTime}}</div>
          
          <!-- 关注用户组件 -->
          <!-- 如果我们在模板中要获取子组件传递过来的参数
          使用$event -->
          <!-- <FollowUser 
          @update_follow="article.is_followed=$event"
          :is_followed="article.is_followed"
          :aut_id="article.aut_id"
          ></FollowUser> -->
          <!-- 如果父组件传给子组件的值，子组件也同步需要修改使用v-model -->
          
          <!-- <FollowUser 
          :value="article.is_followed"
          @input="article.is_followed=$event"
          :aut_id="article.aut_id"
          ></FollowUser> -->

          <FollowUser 
          v-model="article.is_followed"
          :aut_id="article.aut_id"
          ></FollowUser>
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div 
        ref="article-content"
        class="article-content markdown-body" 
        v-html="article.content"></div>
        <van-divider>正文结束</van-divider>


        <!-- ========================文章评论列表==================== -->

        <comment-list 
        @reply-click="onReply"
        v-if="article.comm_count" 
        :source="article.art_id"
        :list="commentList"></comment-list>
        
        <!-- ========================/ 文章评论列表==================== -->



        <!-- 底部区域 -->
        <div class="article-bottom">
            <van-button
                @click="isPostShow=true"
                class="comment-btn"
                type="default"
                round
                size="small"
            >写评论</van-button>
              
            <van-icon
                v-if="article.comm_count"
                name="comment-o"
                :info="article.comm_count"
                color="#777"
            />
            <!-- <van-icon
                color="#777"
                name="star-o"
              /> -->
              
            <!-- 收藏 -->
              <CollextArticle v-model="article.is_collected" :art_id="article.art_id"></CollextArticle>
            <!-- 点赞 -->
            <!-- <van-icon
                color="#777"
                name="good-job-o"
            /> -->
            <!-- 点赞 -->
            <LikeArticle v-model="article.attitude" :art_id="article.art_id" />
            <!-- 转发 -->
            <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->   


        <!-- ===================================发布评论============================= -->
       <van-popup 
       v-model="isPostShow" 
       position="bottom" 
       >
       <comment-post :target="article.art_id" @post-success="onPostSuccess"></comment-post>
       </van-popup>
       
        <!-- ===================================发布评论============================= -->
      
      
      
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="errStatus===404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="loadArticle">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） --> 
    </div>    
    <!-- =================================评论回复================================= -->

    <van-popup 
       v-model="isReplyShow" 
       position="bottom" 
       style="height:100%"
       >
       <comment-reply 
       v-if="isReplyShow"
       :comment="currentComment" 
       @close="isReplyShow=false"></comment-reply>
    </van-popup>

    <!-- ==================================评论回复================================ -->




  </div>
</template>

<script>
import {getArticleById} from '@/api/article'
import { ImagePreview } from 'vant'
import FollowUser from '@/components/follow-user'
import CollextArticle from '@/components/collect-article'
import LikeArticle from '@/components/like-article'
import CommentList from './components/comment-list.vue'
import CommentPost from './components/comment-post.vue'
import CommentReply from './components/comment-reply.vue'
export default {
  name: '',
  components: {FollowUser,CollextArticle,LikeArticle,CommentList, CommentPost, CommentReply},
  props: {
    //   接收路由上传来的动态参数
      articleId: {
          type:[String,Number,Object],
          required:true,
      }
  },
  provide:function(){
    return{
      articleId:this.articleId,
    }
  },
  data() {
    return {
        article:{},
        loading:true,//控制文章加载状态，默认是true
        errStatus:0,//错误的状态码
        isPostShow:false,//弹出层
        commentList:[],//评论列表数组
        isReplyShow:false,//评论回复弹出层
        currentComment:[],//储存每次点击回复的对象
    }
  },
  computed: {},
  watch: {},
  created() {
      this.loadArticle()
  },
  mounted() {},
  methods: {
    //   获取文章详情
      async loadArticle(){
          try{
              const {data} = await getArticleById(this.articleId)
              console.log(data);
              this.article=data.data

              // 关闭加载中状态
              this.loading=false
              
              // 数据更新视图是异步流程
              // 获取异步更新后的Dom内容
              // 1、this.$nextTick(()=>{})
              // 2、setTimeout(()=>{},0)
              // this.$nextTick(()=>{
              //   console.log(this.$refs['article-content']);
              // })
              setTimeout(() => {
                this.previewImage()
                // console.log(this.$refs['article-content']);
              }, 0);
          }catch(err){
              console.log('请求失败',err);
            //   更新状态码
              if(err.response&&err.response.status==404){
                  this.errStatus=404
              }
            //   关闭加载中状态
              this.loading=false

          }
      },
      // 处理图片预览
      previewImage(){
        // 获取所有图片
        const imgs=this.$refs['article-content'].querySelectorAll('img')
        // 把图片地址存放在一个数组中
        const images=[]
        imgs.forEach((item,index)=>{
          images.push(item.src)
          item.onclick=()=>{
             ImagePreview({
               images,
               startPosition: index,
             });
          }
        })
        // 给图片绑定点击事件
        // 调用预览函数进行预览
      },
      // 处理子组件触发的评论成功时间
      onPostSuccess(data){
        // console.log(data);
        this.isPostShow=false
        this.commentList.unshift(data)
      },
      onReply(comment){
        console.log(comment);
        this.isReplyShow=true
        this.currentComment=comment
      }
  },
}
</script>

<style scoped lang="less">
@import './github-markdown.css';
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
   /deep/ .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
