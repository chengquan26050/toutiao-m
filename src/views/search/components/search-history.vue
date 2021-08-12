<template>
  <div class="search-history">
      <van-cell title="搜索历史">
        <div v-if="isDeleteShow">
          <span @click="$emit('clear')">全部删除</span>
          &nbsp;&nbsp;
          <span @click="isDeleteShow=false">完成</span>
        </div>

          <van-icon name="delete" v-else @click="isDeleteShow=true"></van-icon>
      </van-cell>
      <van-cell 
      @click="searchItemClick(item,ind)"
      v-for="item,ind in list"
      :key="ind"
      :title="item">
          <van-icon name="close" v-show="isDeleteShow"></van-icon>
      </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  components: {},
  props: {
    list:{
      type:Array,
      required:true,
    }
  },
  data() {
    return {
      isDeleteShow:false,
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    searchItemClick(item,ind){
      if(this.isDeleteShow){
        // 执行删除操作
        // 如果props的值是一个引用数据类型，
        // 那么只要不对他重新赋值，地址值不变没有影响
        this.list.splice(ind,1)
      }else{
        // 执行搜索逻辑
        this.$emit('search',item)
      }
    }
  },
}
</script>

<style lang="less" scoped></style>