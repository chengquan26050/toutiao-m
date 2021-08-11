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
      <search-history v-else></search-history>
      <!-- /搜索历史记录 --> 

  </div>
</template>

<script>
import SearchHistory from './components/search-history.vue'
import SearchResult from './components/search-result.vue'
import SearchSuggestion from './components/search-suggestion.vue'
export default {
  name: 'SearchPage',
  components: {SearchHistory, SearchResult, SearchSuggestion},
  props: {},
  data() {
    return {
        searchText:'',
        isResultShow:false//控制搜索结果的展示
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    //提交事件
    onSearch(val) {
      //   console.log(val);
      this.searchText=val
      this.isResultShow=true
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