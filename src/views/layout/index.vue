<template>
  <div class="layout-container">
      <!-- 子路由出口 -->
        <router-view></router-view>
      <!-- /子路由出口 -->

      <!-- 标签栏导航 -->
        <van-tabbar class="layout-tabbar" router>
            <van-tabbar-item to="/">
                <template #icon>
                    <i class="toutiao toutiao-shouye"></i>
                </template>
                <span class="text">首页</span>
            </van-tabbar-item>
            <van-tabbar-item to="/qa">
                <template #icon>
                    <i class="toutiao toutiao-wenda"></i>
                </template>
                <span class="text">问答</span>
            </van-tabbar-item>
            <van-tabbar-item to="/video">
                <template #icon>
                    <i class="toutiao toutiao-shipin"></i>
                </template>
                <span class="text">视频</span>
            </van-tabbar-item>
            <van-tabbar-item to="/my">
                <template #icon>
                    <i class="toutiao toutiao-wode"></i>
                </template>
                <span class="text">我的</span>
            </van-tabbar-item>
        </van-tabbar>
      <!-- /标签栏导航 -->

  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  components: {},
  props: {},
  data() {
    return {
        active: 0,
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
}
</script>

<style lang="less" scoped>
.layout-container {
  .layout-tabbar {
    i.toutiao {
      font-size: 40px;
    }
    span.text {
      font-size: 20px;
    }
  }
}
</style>