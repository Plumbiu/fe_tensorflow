import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Home from '../components/Home.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', component: Home },
  { path: '/toxicity', component: () => import('../view/Toxicity.vue') },
  { path: '/mobilenet', component: () => import('../view/MobileNet.vue') },
  { path: '/hand', component: () => import('../view/Hand.vue') }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
