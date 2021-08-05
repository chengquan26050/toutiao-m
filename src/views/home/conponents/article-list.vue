<template>
  <div class="article-list">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <van-cell v-for="val in list" :key="val.id" :title="val.title" />
      </van-list>
  </div>
</template>

<script>
import {getArticle} from '@/api/article'
export default {
  name: '',
  components: {},
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
        
      }
  },
  
}
</script>

<style lang="less" scoped></style>