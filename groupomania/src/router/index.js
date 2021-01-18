import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { auth: true }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import(/* webpackChunkName: "about" */ '@/views/Profile.vue'),
    meta: { auth: true }
  },
  {
    path: '/connexion',
    name: 'Connexion',
    component: () => import(/* webpackChunkName: "about" */ '@/views/Connexion.vue'),
    meta: { pub: true }
  },
  {
    path: '/profile/:userId',
    name: 'UserProfile'
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const authRequired = to.matched.some((route) => route.meta.auth)
  const publicPage = to.matched.some((route) => route.meta.pub)
  const authed = localStorage.getItem('token')
  if (authRequired && !authed) {
    next('/connexion')
  } if (publicPage && authed) {
    next('/')
  } else {
    next()
  }
})


export default router
