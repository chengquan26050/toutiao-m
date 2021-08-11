<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
    >
      <van-cell v-for="item,ind in list" :key="ind" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import {getSearchResult} from '@/api/search'
export default {
  name: 'SearchResult',
  components: {},
  props: {
      searchText:{
          required:true,
          type:String
      }
  },
  data() {
    return {
      list: [],//列表数组
      loading: false,//控制加载中
      finished: false,//加载完成
      page:1,//页码值
      per_page:10,//，每一页显示的数量
      error:false,//控制是否显示失败的提示
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onLoad() {
        try{
          const {data}= await getSearchResult({
              page:this.page,
              per_page:this.per_page,
              q:this.searchText
          })
          const {results}=data.data
          this.list.push(...results)
          // 加载状态结束
          this.loading = false;

        // 数据全部加载完成
        if(results.length===0){
            this.finished=true
        }else{
            this.page++
        }
        }catch(err){
            console.log('获取失败');
            this.error=true
            this.loading=false
        }
    }, 
  },
 
}
</script>

<style lang="less" scoped></style>