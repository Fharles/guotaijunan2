import Vue from 'vue'
import Router from 'vue-router'
import Fgs from '@/views/fgs.vue'
import Contrast from '@/views/contrast.vue'
import RankDetail from '@/views/rankDetail.vue'
import Fgssxyyb from '@/views/fgssxyyb.vue'
import Search from '@/views/search.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home',
    },{
      path: '/home',
      name: 'fgs',
      component: Fgs
    },{
      path: '/rankDetail',
      name: 'rank',
      component: RankDetail
    },
    {
      path: '/detail',
      name: 'xxx',
      component: Fgssxyyb
    },{
      path:'/contrast',
      name:'contrast',
      component:Contrast
    },{
      path: '/search',
      name: 'search',
      component: Search
    }
  ]
})
