<template>
  <div class="article-list">
    <van-pull-refresh v-model="isLoading" 
    @refresh="onRefresh"
    :success-text="refreshText"
    :success-duration='1500'>
    
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <article-item 
        v-for="(val,index) in list" 
        :key="index" 
        :article="val"></article-item>
        <!-- <van-cell v-for="(val,index) in list" :key="index" :title="val.title" /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import {getArticle} from '@/api/article'
import ArticleItem from '@/components/article-item'
export default {
  name: '',
  components: {ArticleItem},
  props: {
      channel:{
          type:Object,
          required:true
      }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp:null,
      error: false,
      isLoading:false,
      refreshText:'刷新成功',
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
      async onLoad() {
      // 异步更新数据
        try{
            const res=await getArticle({
                channel_id:this.channel.id,
                timestamp:this.timestamp||Date.now(),
                with_top:1,
            })
            console.log(res.data);
            // this.list=res.data.data.results
            //  1. 请求获取数据
            // 2. 把请求结果数据追加到list
            const results=res.data.data.results
            console.log(results);
            this.list.push(...results)
            // 3. 加载状态结束
            this.loading=false

            // 4. 更新请求下一页的时间戳
            if(results.length===0){
                this.finished=true
            }else{
                this.timestamp=res.data.data.pre_timestamp
            }
            
        }catch(err){
            console.log('请求失败');
            this.error=true
            this.loading=false
        }
      
      // 数据全部加载完成
        
      },
      async onRefresh(){
        try{
          const {data}=await getArticle({
                channel_id:this.channel.id,
                timestamp:Date.now(),
                with_top:1,
          })
          // 新数据添加到头部
          this.list.unshift(...data.data.results)
          // 关掉加载中
          this.isLoading=false
          // 刷新成功提示信息
          this.refreshText=`刷新成果 更新了${data.data.results.length}条数据`

        }catch(err){
          console.log('请求失败',err);
          this.isLoading=false
          this.refreshText='刷新失败'
        }

      }
  },
  
}
</script>

<style lang="less" scoped>
.article-list {
  // 百分比单位是相对于父元素的
  // height: 100%;

  // 视口（在移动端是布局视口）单位：vw 和 vh，不受父元素影响
  // 1vw = 视口宽度的百分之一
  // 1vh = 视口高度的百分之一
  // 兼容不同手机高度 calc(100vh-100px);
  // height: 76vh;
  // 要加空格
  height: calc(100vh - 300px);

  overflow-y: auto;
}
</style>