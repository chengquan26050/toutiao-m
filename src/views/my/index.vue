<template>
  <div class="my-container">
    <!-- 已登录 -->
    <div class="header user-info" v-if="user">
      <!-- 用户信息 -->
      <div class="base-info">
        <div class="left">
          <van-image class="avatar"
                     round
                     fit="cover"
                     :src="userInfo.photo"
                     />
          <span class="name">{{userInfo.name}}</span>
        </div>

        <div class="right">
           <van-button size="mini" round>编辑资料</van-button>
        </div>
      </div>
      <!-- 用户数据 -->
      <div class="data-stats">
        <div class="data-item">
          <span class="count">{{userInfo.art_count}}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.follow_count}}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.fans_count}}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.like_count}}</span>
          <span class="text">获赞</span>
        </div>
      </div>

    </div>
    <!-- 未登录 -->
    <div class="header not-login" v-else>
     <div class="login-btn" @click="$router.push('/login')">
        <img class="mobile-img" src="~@/assets/mobile.png">
        <span class="text">登录&nbsp;/&nbsp;注册</span>
     </div>
    </div>
    
          <!-- 宫格导航 -->
      <van-grid class="grid-nav mb-9" :column-num="2" clickable>
        <van-grid-item class="grid-item">
          <template #icon>
            <i class="toutiao toutiao-shoucang"></i>
          </template>
          <template #text>
            <span class="text">收藏</span>
          </template>
        </van-grid-item>
        <van-grid-item class="grid-item">
          <template #icon>
            <i class="toutiao toutiao-lishi"></i>
          </template>
          <template #text>
            <span class="text">历史</span>
          </template>
        </van-grid-item>
      </van-grid>
      <!-- /宫格导航 -->
      <van-cell title="消息通知" is-link />
      <van-cell class="mb-9" title="小智同学" is-link />
      <van-cell  
          @click="onLogout"
          v-if="user"
          class="logout-cell"
          clickable
          title="退出登录"
      />
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
import {getUserInfo} from '@/api/user'
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      userInfo:[]
    }
  },
  computed: {
    ...mapState(['user']),
  },
  watch: {},
  created() {
    if(this.user){
      this.loadUserInfo()
    }
    
  },
  mounted() {
    
  },
  methods: {
    ...mapMutations(['setUser']),
    onLogout(){
      this.$dialog.confirm({
        title: '标题',
      })
        .then(() => {
          // on confirm
          this.setUser(null)
        })
        .catch(() => {
          // on cancel
          console.log('no');
        })
      
    },
    async loadUserInfo(){
      try{
        const res=await getUserInfo()
        console.log(res);
        this.userInfo=res.data.data
      }catch(err){
        console.log(err);
      }
    }
  },
}
</script>

<style lang="less" scoped>
.my-container {
  .header {
    height: 361px;
    background: url("~@/assets/banner.png");
    background-size: cover;
  }
  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .mobile-img {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }
      .text {
        font-size: 28px;
        color: #fff;
      }
    }
  }
  .user-info {
    .base-info {
      height: 231px;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        align-items: center;
        .avatar {
          width: 132px;
          height: 132px;
          border: 4px solid #fff;
          margin-right: 23px;
        }
        .name {
          font-size: 30px;
          color: #fff;
        }
      }
    }
    .data-stats {
      display: flex;
      .data-item {
        height: 130px;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #fff;
        .count {
          font-size: 36px;
        }
        .text {
          font-size: 23px;
        }
      }
    }
  }
    .grid-nav {
    .grid-item {
      height: 141px;
      i.toutiao {
        font-size: 45px;
      }
      .toutiao-shoucang {
        color: #eb5253;
      }
      .toutiao-lishi {
        color: #ff9d1d;
      }
      span.text {
        font-size: 28px;
      }
    }
  }
  .logout-cell {
    text-align: center;
    color: #d86262;
  }

  .mb-9 {
    margin-bottom: 9px;
  }
}
</style>