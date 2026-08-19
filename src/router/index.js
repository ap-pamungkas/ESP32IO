import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import IntegratedCodeView from '../views/IntegratedCodeView.vue'
import InputCodeView from '../views/InputCodeView.vue'
import CommandCodeView from '../views/CommandCodeView.vue'
import OutputCodeView from '../views/OutputCodeView.vue'
import InputWiringView from '../views/InputWiringView.vue'
import OutputWiringView from '../views/OutputWiringView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/integrated',
      name: 'integrated',
      component: IntegratedCodeView
    },
    {
      path: '/input',
      name: 'input',
      component: InputCodeView
    },
    {
      path: '/command',
      name: 'command',
      component: CommandCodeView
    },
    {
      path: '/output',
      name: 'output',
      component: OutputCodeView
    },
    {
      path: '/input-wiring',
      name: 'input-wiring',
      component: InputWiringView
    },
    {
      path: '/output-wiring',
      name: 'output-wiring',
      component: OutputWiringView
    }
  ]
})

export default router
