import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Todos from '@/components/Todos'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '',
          component: Login
        },
        {
          path: 'home',
          name: 'Dashboard',
          component: Todos
        }
      ]
    }
  ]
})
