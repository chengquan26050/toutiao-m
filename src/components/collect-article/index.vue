<template>
  <van-button
    :class="{collected:value}"
    :loading="loading"
    style="border:none"
    :icon="value?'star':'star-o'"
    @click="onCollect"
  />
</template>

<script>
import {addCollect,deleteCollect} from '@/api/article'
export default {
  name: 'CollextArticle',
  components: {},
  props: {
      value:{
          type:Boolean,
          required:true
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
    async onCollect(){
        this.loading=true
        try{
          if(this.value){
              await deleteCollect(this.art_id)
          }else{
              await addCollect(this.art_id)
          }
          this.$emit('input',!this.value)
        }catch(err){
            this.$toast.fail('操作失败')
        }
        this.loading=false
    }
  },
}
</script>

<style lang="less" scoped>
.collected{
    /deep/ .van-icon {
    color: #ffa500;
    }
}
</style>