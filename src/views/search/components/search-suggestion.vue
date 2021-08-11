<template>
  <div class="search-suggestion">
      <van-cell 
      @click="$emit('search',list)"
      v-for="list,ind in suggestions" 
      :key="ind" 
      icon="search">
      <!-- <template #title v-html="val"> -->
          <div slot="title" v-html="highLight(list)"></div>
      <!-- </template> -->
      </van-cell>
      
  </div>
</template>

<script>
import {getSearchList} from '@/api/search'
import {debounce} from 'lodash'
export default {
  name: 'SearchSuggestion',
  components: {},
  props: {
      searchText:{
          required:true,
          type:String
      }
  },
  data() {
    return {
        suggestions:[],
        htmlStr:''
    }
  },
  computed: {},
  watch: {
    searchText:{
        // debounce防抖方法 第一个参数是函数 第二个是时间
        handler:debounce(function(val){
            this.getlist(val)
        },300),
        immediate:true
        // handler(val){
        // //   console.log(val);
        //   this.getlist(val)
        // },
        // handler:debounce(function(val){
        //     console.log(val);
        // },300),
    }
  },
  created() {},
  mounted() {},
  methods: {
    async getlist(val){
      try{
        const {data} = await getSearchList(val)
        this.suggestions=data.data.options
        // console.log(data.data);
        // console.log(this.searchList);
      }catch(err){
          console.log('获取数据失败');
      }
    },
    highLight(list){
        // list是查询到的结果
        // return list.replace(/a/gi,'<span style="color:red">a</span>')
        // 使用构造函数来构建动态的正则表达式
        // 第一个参数是验证的内容
        // 第二个参数是gi
        const reg=new RegExp(this.searchText,'gi')
        return list.replace(reg,`<span style="color:red">${this.searchText}</span>`)

    }
  },
}
</script>

<style lang="less" scoped></style>