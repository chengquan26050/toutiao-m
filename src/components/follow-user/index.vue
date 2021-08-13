<template>
  <van-button
   :loading="loading"
   @click="onFollow"
   v-if="is_followed"
    class="follow-btn"
    round
    size="small"
  >已关注</van-button>
  <van-button
    :loading="loading"
   @click="onFollow"
    v-else
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
  >关注</van-button>
          
</template>

<script>
import {addFollow,deleteFollow} from '@/api/user'
export default {
  name: 'FollowUser',
  components: {},
  model:{
      prop:'is_followed',
      event:'update_follow'
  },
  props: {
    // 用来接收父组件传的用户关注状态
    is_followed:{
        type:Boolean,
        required:true
    },
    aut_id:{
        required:true,
        type:String
    }
  },
  data() {
    return {
        loading:false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async  onFollow(){
        // 请求前打开loading状态
        this.loading=true
        try{
            if(this.is_followed){
                // 取消关注
               await deleteFollow(this.aut_id)
            }else{
                // 关注
               await addFollow(this.aut_id)
            }
            // 通知父组件修改用户的关注状态
            this.$emit('update_follow',!this.is_followed)
        }catch(err){
            let message='获取失败，稍后重试'
            if(err.response&&err.response.status===400){
               message='不能关注自己'
                
            }
            this.$toast.fail(message)

        }
        // 请求后关闭loading状态
        this.loading=false
    }
  },
}
</script>

<style lang="less" scoped></style>