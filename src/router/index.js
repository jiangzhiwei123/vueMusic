import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '@/views/recommend/index.vue'
import RecommendDetail from '@/views/recommend/detail'
import Rank from '@/views/rank/index.vue'
import RankDetail from '@/views/rank/detail'
import Singer from '@/views/singer/index.vue'
import SingerDetail from '@/views/singer/detail'
import Search from '@/views/search/index.vue'
Vue.use(Router)
// router-link的 to 后面接的name名就是路径的名字
export default new Router({
  mode:'history',
  routes: [
    // 路由重定向
    {
      path:'/',
      redirect:'/recommend'
    },
    {
      path:'/recommend',
      component:Recommend,
      children:[
        {
          path:'/recommend/detail',
          component:RecommendDetail
        }
      ]
    },
    {
      path:'/rank',
      component:Rank,
      children:[
        {
          path:'/rank/:id',
          component:RankDetail,
        }
      ]
    },
    {
      path:'/singer',
      component:Singer,
      children:[
        {
          path:'/singer/:id',
          component:SingerDetail,
        }
      ]
    },
    {
      path:'/search',
      component:Search
    },
  ]
})
