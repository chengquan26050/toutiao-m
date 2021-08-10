// 频道编辑组件
<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <van-cell>
      <template #title class="title-text">
        我的频道
      </template>
      <van-button 
       @click="isEdit=!isEdit" 
       class="edit-btn" 
       round 
       type="danger" 
       plain 
       size="mini">
        {{isEdit?'完成':'编辑'}}
      </van-button>
    </van-cell>
    <van-grid class="my-grid" :gutter="10">
      <van-grid-item class="grid-item"  
      v-for="value,index in myChannel" 
      :key="value.id"
      @click="onChannelClick(value,index)">
        <span class="text" 
        :class="{active:index==active}" 
        slot="text">{{value.name}}</span>
        <van-icon slot="icon" name="clear" v-show="isEdit && !fixedChannels.includes(value.id)"/>
      </van-grid-item>
    </van-grid>
    <!-- /我的频道 -->

    <!-- 频道推荐 -->
    <van-cell>
      <template #title class="title-text">
        频道推荐
      </template>
    </van-cell>
    <van-grid class="recommend-grid" :gutter="10">
      <van-grid-item 
      class="grid-item" 
      v-for="value in recommendChannels" 
      :key="value.id" 
      :text="value.name" 
      icon="plus"
      @click="addChannels(value)">
        <!-- <span slot="text">文字</span> -->
      </van-grid-item>

    </van-grid>
    <!-- /频道推荐 -->
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {getAllChannels,addUserChannels,delUserChannel} from '@/api/channel'
import {setItem} from '@/utils/storage'
// 测试是否引入成功
// console.log(getAllChannels);
// console.log(addUserChannels);

export default {
  name: '',
  components: {},
  props: {
    myChannel:{
      required:true,
      type:Array
    },
    active:{
      requierd:true,
      type:Number
    },
  },
  data() {
    return {
      allChannels:[],
      isEdit:false,
      fixedChannels:[0]
    }
  },
  computed: {
    ...mapState(['user']),
    recommendChannels(){
    //   const channels=[]
    //   this.allChannels.forEach(item=>{
    //     // 当前频道是否出现在我的频道列表中
    //     // const flag=this.myChannel.find(val=>val.id==item.id)
    //     const flag=this.myChannel.some(val=>val.id==item.id)
    //     if(!flag){
    //       channels.push(item)
    //     }
    //   })
    //   return channels
    return this.allChannels.filter(item=>!this.myChannel.some(val=>val.id==item.id))
    }

  },
  watch: {},
  created() {
    this.loadAllChannles()
  },
  mounted() {},
  methods: {
    // 加载全部频道
    async loadAllChannles(){
      try{
        const {data} = await getAllChannels()
        // console.log(data);
        this.allChannels= data.data.channels
        // console.log(this.allChannels);
      }catch(err){
        this.$toast('删除失败，请稍后重试')
      }
    },
    // 添加频道
    async addChannels(value){
      // console.log(value);
      // 把channel对象添加到 我的频道 数组中
      this.myChannel.push(value)

      // TODO添加到数据库中
      // 判断是否登录
      if(this.user){
        try{
          await addUserChannels({
          id:value.id,
          seq:this.myChannel.length
        })
        }catch(err){
          this.$toast('添加失败，请稍后重试')
        }
      }else{
        setItem('TOUTIAO_CHANNELS',this.myChannel)
      }
    },
    // 点击我的频道项 删除频道 高亮显示
    onChannelClick(value,index){
      // console.log(value,'----------',index);
      // 判断当前是否处在编辑状态
      if(this.isEdit){
        if(this.fixedChannels.includes(value.id)){
          return
        }
        // 根据索引删除频道
        this.myChannel.splice(index,1)
        // 判读当前删除的频道是否在高亮前面
        if(index<=this.active){
          // 要把active的值减一
        this.$emit('update-active',this.active-1,true)
        
        }

        // 删除指定用户频道
        this.deleteChannel(value)
      
      // 如果非编辑状态
      }else{
        this.$emit('update-active',index,false)
      }
    },
    // 删除频道
    async deleteChannel(value){
      if(this.user){
        try{
          await delUserChannel(value.id)
        }catch(err){
          this.$toast('删除失败，请稍后重试')
        }
        // console.log(1);
      }else{
        // console.log(2);
        setItem('TOUTIAO_CHANNELS',this.myChannel)
      }
    }
  },
}
</script>

<style lang="less" scoped>
.channel-edit {
  padding: 85px 0;
  .title-text {
    font-size: 32px;
    color: #333333;
  }

  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }

  /deep/ .grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      white-space: nowrap;
      background-color: #f4f5f6;
      .van-grid-item__text, .text {
        font-size: 28px;
        color: #222;
        margin-top: 0;
      }
      .active {
        color: red;
      }
      .van-grid-item__icon-wrapper {
        position: unset;
      }
    }
  }

  /deep/ .my-grid {
    .grid-item {
      .van-icon-clear {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;
        color: #cacaca;
        z-index: 2;
      }
    }
  }

  /deep/ .recommend-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;
        .van-icon-plus {
          font-size: 28px;
          margin-right: 6px;
        }
      }
    }
  }
}
</style>