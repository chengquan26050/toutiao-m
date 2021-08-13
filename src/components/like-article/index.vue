<template>
  <van-button
  @click="onLike"
  :loading="loading"
  :class="{liked:value===1}"
  :icon="value===1?'good-job':'good-job-o'"
  style="border:none"
  >

  </van-button>
</template>

<script>
import {addLike,delLike} from '@/api/article'
export default {
  name: '',
  components: {},
  props: {
      value:{
          required:true,
          type:Number
      },
      art_id:{
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
      async onLike(){
          this.loading=true
          try{
              if(this.value===1){
                  delLike(this.art_id)
                //   this.$emit('input',-1)
              }else{
                  addLike(this.art_id)
                //   this.$emit('input',1)
              }
                  this.$emit('input',this.value===1?-1:1)

              this.$toast.success(this.value===1?'取消点赞':'点赞成功')
          }catch(err){
            this.$toast.fail('点赞失败')
          }
          this.loading=false
      }
  },
}
</script>

<style lang="less" scoped>
.liked {
  .van-icon {
    color: #e5645f;
  }
}
</style>