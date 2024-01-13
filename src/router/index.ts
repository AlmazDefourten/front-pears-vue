// Composables
import {createRouter, createWebHistory} from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Swipes',
    component: () => import('@/components/MainView.vue')
  },
  {
    path: '/registration',
    name: 'Registration',
    component: () => import('@/components/SignUp.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/components/SignIn.vue'),
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/components/Profile.vue'),
  },
  {
    path: '/matches',
    name: 'matches',
    component: () => import('@/components/Matches.vue'),
  },
  {
    path: '/chat',
    name: 'chat',
    component: () => import('@/components/Chats/ChatList.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
