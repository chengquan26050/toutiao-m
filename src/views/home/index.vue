<template>
  <div class="home-container" >
     <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
        to="/search"
      >搜索</van-button>
    </van-nav-bar>

    <van-tabs  class="channel-tabs" v-model="active" swipeable animated border>
        <van-tab v-for="channel in channels" :key="channel.id" :title="channel.name">
              <article-list :channel="channel"/>
        </van-tab>
        
        <!-- 右侧自定义内容 -->
        <!-- 占位元素 -->
        
        <div slot="nav-right" class="placeholder">
        </div>
        
        <!-- 右侧按钮 -->
        <div slot="nav-right" class="hamburger-btn" @click="editShow=true">
            <i class="toutiao toutiao-gengduo"></i>
        </div>
        <!-- <template #nav-right>
          <div class="hamburger-btn">
            <i class="toutiao toutiao-gengduo"></i>
          </div>
        </template> -->
    </van-tabs>
    <!-- /频道列表 -->
    <van-popup
      v-model="editShow"
      closeable
      position="bottom"
      close-icon-position="top-left"
      :style="{ height: '100%' }"
    >
      <channel-edit 
      :myChannel="channels" 
      :active="active"
      @update-active="onUpdateActive"></channel-edit>
    </van-popup>
  </div>
</template>

<script>
import {getUserChannel} from '@/api/user'
import ArticleList from './conponents/article-list.vue'
import ChannelEdit from './conponents/channel-edit.vue'
import {mapState} from 'vuex'
import {getItem} from '@/utils/storage'
export default {
  name: 'HomePage',
  components: {ArticleList,ChannelEdit},
  props: {},
  data() {
    return {
      active:0,
      channels:[],
      editShow:false
    }
  },
  computed: {
    ...mapState(['user']),
  },
  watch: {},
  created() {
    // this.loadChannel()
    // 进行判断
    if(this.user){
      // 如果用户已登录，直接从线上接口获取数据
      this.loadChannel()
    }else{
      const localChannels=getItem('TOUTIAO_CHANNELS')
      // 如果用户未登录直接从本地获取数据
      if(localChannels){
        this.channels=localChannels
      }else{
        // 本地没有数据，从线上接口获取数据
        this.loadChannel()
      }
    }
  },
  mounted() {},
  methods: {
    async loadChannel(){
      try{
        const {data}=await getUserChannel()
        // console.log(res);
        this.channels=data.data.channels
        // console.log(channels[0].name);
      }catch(err){
        console.log('获取失败');
      }
    },
    // 处理子组件触发的自定义事件
    onUpdateActive(index,isShow){
      this.active=index
      this.editShow=isShow
    }
  },
}
</script>

<style lang="less" scoped>
.home-container {
  padding-bottom: 100px;
  padding-top: 174px;
  /deep/ .van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }
  /deep/ .channel-tabs {
    .van-tab {
      border-right: 1px solid #edeff3;
      min-width: 200px;
      font-size: 30px;
      color: #777777;
    }

    .van-tab--active {
      color: #333333;
    }

    .van-tabs__nav {
      padding-bottom: 0;
    }

    .van-tabs__line {
      bottom: 8px;
      width: 31px !important;
      height: 6px;
      background-color: #3296fa;
    }

    .placeholder {
      flex-shrink: 0;
      width: 66px;
      height: 82px;
    }

    .hamburger-btn {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 82px;
      background-color: #fff;
      background-color: rgba(255, 255, 255, 0.902);
      i.toutiao {
        font-size: 33px;
      }
      &:before {
        content: "";
        position: absolute;
        left: 0;
        width: 1px;
        height: 58px;
        background-image: url(~@/assets/gradient-gray-line.png);
        background-size: contain;
      }
    }
  }
  /deep/ .van-tabs__wrap {
    position: fixed;
    top: 92px;
    z-index: 1;
    left: 0;
    right: 0;
    height: 82px;
  }
}</style>