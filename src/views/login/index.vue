<template>
  <div class="login-container">
      <!-- 导航栏 -->
      <van-nav-bar class="page-nav-bar" title="登录">
        <!-- 后腿上一页：$router.back() || $router.go(-1) -->
        <van-icon slot="left" name="cross" @click="$router.back()"/>
      </van-nav-bar>
      <!-- /导航栏 -->

      <!-- 登陆表单 -->
      <van-form @submit="onSubmit" ref="loginForm">
        <van-field
        v-model="user.mobile"
        :rules="userFromRules.mobile"
        type="number"
        clearable
        maxlength="11"
          name="mobile"
          left-icon="smile-o"
          placeholder="请输入手机号"
        >
          <i slot="left-icon" class="toutiao toutiao-shouji"></i>
        </van-field>
        <van-field
        v-model="user.code"
        :rules="userFromRules.code"
        type="number"
        maxlength="6"
        clearable
          name="code"
          left-icon="smile-o"
          placeholder="请输入验证码"
        >
          <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
          
          <template #button>
            <!-- 倒计时组件 -->
            <van-count-down 
            v-if="isCountDownShow"
            :time="1000*5" 
            format="ss s"
            @finish="isCountDownShow=false"
            />
            <!-- 发送验证码按钮 -->
            <van-button
            v-else
            native-type="button"
            @click="onSendSms"
            class="send-sms-btn" 
            round 
            size="small" 
            type="default">发送验证码
            </van-button>
           </template>   
        </van-field>
        <div class="login-btn-wrap">
          <van-button class="login-btn" block type="info" native-type="submit">登录</van-button>
        </div>
      </van-form>
      <!-- /登陆表单 -->
  </div>
</template>

<script>
import {login,sendSms} from '@/api/user'
export default {
  name: 'LoginPage',
  components: {},
  props: {},
  data () {
    return {
      user:{
        mobile:'',
        code:'',
      },
      userFromRules:{
        mobile:[{
          required:true,
          message:'手机号不能为空'
        },{
          pattern:/^1[3-9]\d{9}$/,
          message:'手机号格式错误'
        }],
        code:[{
          required:true,
          message:'验证码不能为空'
        },{
          pattern:/^\d{6}$/,
          message:'验证码格式错误'
        }]
      },
      isCountDownShow:false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onSubmit() {
      // 获取表单数据
      const user=this.user
      // 表单验证
      
      // 请求前开始转圈圈
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true,
        duration:0,
      });
      // 提交表单请求
      try{
        const res = await login(user)
        this.$router.back()
        // token存储在vuex中
        this.$store.commit('setUser',res.data.data)
        // 成功轻提示
        this.$toast.success('登陆成功');
      }catch(err){
        if(err.response.status==400){
          console.log('手机号或验证码错误');
          // 失败轻提示
          this.$toast.fail('手机号或验证码错误');
        }else{
          console.log('登陆失败，请稍后重试',err);
          // 失败轻提示
          Toast.fail('登陆失败，请稍后重试');
        }
      }
      // 根据请求响应结果处理后续操作

    },
    async onSendSms(){
      // 校验手机号
      try{
        await this.$refs.loginForm.validate('mobile')
        console.log('ok');
      }catch(err){
        return console.log('手机号验证失败');
      }

      // 验证通过显示倒计时
      this.isCountDownShow=true

      // 请求发送验证码
      try{
        await sendSms(this.user.mobile)
        this.$toast('发送成功')

      }catch(err){
        if(err.response.status==429){
          this.$toast('发送太频繁了，请稍后重试')
        }else{
          this.$toast('发送失败，请稍后重试')
        }
      }
    }
  }
}
</script>
<style scoped lang="less">
.login-container {
  .toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 152px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>