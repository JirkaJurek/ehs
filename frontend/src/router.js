import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/',
      alias: '/fe/tools',
      name: 'tools',
      component: () => import('./views/Tools.vue')
    },
    {
      path: '/fe/tools/categories',
      name: 'categories',
      component: () => import('./views/ToolCategories.vue')
    },
    {
      path: '/fe/tools/revision-type',
      name: 'revision-type',
      component: () => import('./views/ToolRevisionType.vue')
    },
    {
      path: '/fe/tools/revision-type/:id',
      name: 'revision-type-detail',
      component: () => import('./views/ToolRevisionTypeDetail.vue')
    },
    {
      path: '/fe/tools/revision-upcoming',
      name: 'revision-upcoming',
      component: () => import('./views/ToolRevisionUpcoming.vue')
    },
    {
      path: '/fe/move-history',
      name: 'move-history',
      component: () => import('./views/MoveHistory.vue')
    },
    {
      path: '/pdf',
      name: 'PDF',
      component: () => import('./views/PDF.vue')
    },
    {
      path: '/fe/move-in-stock',
      name: 'move-in-stock',
      component: () => import('./views/MoveInStock')
    },
    {
      path: '/fe/users',
      name: 'users',
      component: () => import('./views/Users')
    },
    {
      path: '/fe/warehouse',
      name: 'warehouse',
      component: () => import('./views/Warehouse')
    },
    {
      path: '/a',
      name: 'a',
      component: () => import('./module/tool/ToolsTable')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
