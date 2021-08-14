<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    :error.sync="error"
    error-text="请求失败，点击重新加载"
  >
    <comment-item @reply-click="$emit('reply-click',$event)" v-for="item,ind in list" :key="ind" :title="item.content" :comment="item"></comment-item>
    <!-- <van-cell v-for="item,ind in list" :key="ind" :title="item.content"/> -->
  </van-list>
</template>

<script>
import {getComments} from '@/api/comment'
import CommentItem from './comment-item.vue'
export default {
  name: '',
  components: {CommentItem},
  props: {
    source:{
      type:String,
      required:true,
    },
    list:{
      type:Array,
      default:()=>[]
    }, 
    type:{
      type:String,
      default:'a',
      // 只能传入a或c
      validator(value){
        return ['a','c'].includes(value)
      },
    },
  },
  data() {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset:null,//加载下一页列表的页码
      limit:5,//每页评论的数量
      error:false,
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onLoad() {
      // 调用接口
      try{
        const {data} = await getComments({
          type:this.type,//评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
          source:this.source,//源id，文章id或评论id
          offset:this.offset,//获取评论数据的偏移量，值为评论id，取最后评论的id
          limit:this.limit//获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
        })
        console.log(data);
        const {results}=data.data
        // console.log(1);
        this.list.push(...results)
        // console.log(1);
        this.loading=false
        // console.log(1);
        if(results.length===0){
          this.finished=true
        }else{
          this.offset=data.data.last_id
        }
      }catch(err){
        this.error=true
        this.loading=false
      }
      // 得到的数据追加到list
      // 关闭loading
      // 判断数据是否全部加载完成（finish）
      // 未完成更新下一页
    },
  },
}
</script>

<style lang="less" scoped></style>