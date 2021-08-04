import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
    {
        path:'/',
        // name:'layout',
        component:()=>import ('@/views/layout'),
        children:[
            {
                path:'',
                name:'home',
                component:()=>import('@/views/home')
            },
            {
                path:'qa',
                name:'qa',
                component:()=>import('@/views/qa')
            },
            {
                path:'video',
                name:'video',
                component:()=>import('@/views/video')
            },
            {
                path:'my',
                name:'my',
                component:()=>import('@/views/my')
            },
        ]
    },
    {
        path: '/login',
        name: 'login',
        // 路由懒加载：当访问到这个页面组件的时候才动态加载里面的内容
        component: () =>
            import ('@/views/login')
    },
]

const router = new VueRouter({
    routes
})

export default router