import Vue from 'vue'

// 导入dayjs包
import dayjs from 'dayjs'

// 导入中文语言包
import 'dayjs/locale/zh-cn'

import relativeTime from 'dayjs/plugin/relativeTime'

// 配置使用处理相对时间的插件
dayjs.extend(relativeTime)

// 全局注册中文包
dayjs.locale('zh-cn')

// 事件格式化
// console.log(dayjs().format('YYYY-MM-DD HH:mm:ss'));

// dayjs(a).to(b)
// dayjs(a).from(b)
// 几天前  从a时间  to  b时间经过的相对时间
// console.log(dayjs().to('2021-08-06 12:00:00'));
// 几天内   从a时间  to  b时间经过的相对时间
// console.log(dayjs().from('2021-08-06 12:00:00'));

Vue.filter('relativeTime',(val)=>{
    return dayjs().to(val)
})