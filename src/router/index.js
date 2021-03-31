import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/Index.vue'
import Page from '@/views/Page.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/page',
    name: 'Page',
    component: Page
  },
  // 路由懶加載
  // {
  //   path: '/lazyload',
  //   name: 'Lazyload',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/Success.vue')
  // },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  routes,
  // 跳轉後回到頂端(History模式時)
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

export default router
