import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import MusicPage from '../views/MusicPage.vue'
import HousePage from '../views/HousePage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/music',
    name: 'music',
    component: MusicPage
  },
  {
    path: '/house',
    name: 'house',
    component: HousePage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
