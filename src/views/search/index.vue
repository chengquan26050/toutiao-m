// 搜索页面
<template>
  <div class="search-container">
      <!-- 搜索栏 --> 
      <form action="/" class="search-form">
        <van-search
          v-model="searchText"
          show-action
          background="#3296fa"
          placeholder="请输入搜索关键词"
          @search="onSearch"
          @cancel="onCancel"
          @focus="isResultShow=false"
        />
      </form>
      <!-- /搜索栏 --> 
      
      <!-- 搜索结果 -->
      <search-result v-if="isResultShow" :searchText="searchText"></search-result>
      <!-- /搜索结果 -->

      <!-- 联想建议 -->
      <search-suggestion 
      v-else-if="searchText" 
      :searchText="searchText"
      @search="onSearch"></search-suggestion>
      <!-- /联想建议 -->

      <!-- 搜索历史记录 -->
      <search-history 
      v-else 
      :list="SearchHistories"
      @clear="SearchHistories=[]"
      @search="onSearch"></search-history>
      <!-- /搜索历史记录 --> 

  </div>
</template>

<script>
import SearchHistory from './components/search-history.vue'
import SearchResult from './components/search-result.vue'
import SearchSuggestion from './components/search-suggestion.vue'
import {getItem,setItem} from '@/utils/storage'
export default {
  name: 'SearchPage',
  components: {SearchHistory, SearchResult, SearchSuggestion},
  props: {},
  data() {
    return {
        searchText:'',
        isResultShow:false,//控制搜索结果的展示
        SearchHistories:getItem('TOUTIAO_SEARCH_HISTORIES')||[],
    }
  },
  computed: {},
  watch: {
    SearchHistories(val){
      setItem('TOUTIAO_SEARCH_HISTORIES',val)
    }
  },
  created() {},
  mounted() {},
  methods: {
    //提交事件
    onSearch(val) {
      //   console.log(val);
      // 搜索建议显示到输入框
      this.searchText=val
      // 显示搜索结果
      this.isResultShow=true

      // 存储搜索历史
      // 不能重复把最新的添加到最前面
      const index=this.SearchHistories.indexOf(val)
      if(index!==-1){
        // 删除重复项
        this.SearchHistories.splice(index,1)
      }
      // 把当前搜索文本显示在最前面
      this.SearchHistories.unshift(val)

    },
    //取消按钮
    onCancel() {
      //   console.log('取消');
      this.$router.back()
    },
  },
}
</script>

<style lang="less" scoped>
.search-container {
  padding-top: 108px;
  .van-search__action {
    color: #fff;
  }
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>