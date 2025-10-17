import 'nprogress/nprogress.css'
import 'li-daisy/dist/style.css'
import './assets/css/tailwind.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router/auto'
import { routes } from 'vue-router/auto-routes'

import { loadingDirective } from 'li-daisy'
import { setupRouterGuards } from './routerGuards'

import App from './App.vue'

const app = createApp(App)

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 设置路由守卫
setupRouterGuards(router)

app.directive('loading', loadingDirective)

app.use(router)
app.use(createPinia())

app.mount('#app')
