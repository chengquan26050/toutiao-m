// 文章列表项组件
<template>
  <!-- :to="'/article/'+article.art_id"  -->
  <!-- :to="{ name:'aericle',params:{articleId:article.art_id}}" -->
  <van-cell 
  :to="`/article/${article.art_id}` "
  class="article-item">
    <template #title class="van-multi-ellipsis--l2">
      {{article.title}}
    </template>
    <template #label>
      <div v-if="article.cover.type===3" class="cover-wrap">
        <div v-for="val,ind in article.cover.images" :key="ind" class="cover-item">
          <van-image
            class="cover-item-img"
            :src="val"
            fit="cover"
           />
        </div>
      </div>
      <div class="label-info-wrap">
        <span>{{article.aut_name}}</span>
        <span>{{article.comm_count}}评论</span>
        <span>{{article.pubdate | relativeTime}}</span>
      </div>
    </template>
    <template #default v-if="article.cover.type===1">
      <van-image
        class="right-cover"
        fit="cover"
        :src="article.cover.images[0]"
      />
    </template>
  </van-cell>
</template>

<script>
export default {
  name: 'AriticleItem',
  components: {},
  props: {
    // 在这里接收父组件传递过来的数据
    article:{
        required:true,
        type:Object,
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
}
</script>

<style lang="less" scoped>
.article-item {
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }

  .van-cell__title {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
    padding-left: 25px;
  }

  .right-cover {
    width: 100%;
    height: 146px;
  }

  .label-info-wrap span {
    font-size: 22px;
    color: #b4b4b4;
    margin-right: 25px;
  }

  .cover-wrap {
    display: flex;
    padding: 30px 0;
    .cover-item {
      flex: 1;
      height: 146px;
      &:not(:last-child) {
        padding-right: 4px;
      }
      .cover-item-img {
        width: 100%;
        height: 146px;
      }
    }
  }
}
</style>