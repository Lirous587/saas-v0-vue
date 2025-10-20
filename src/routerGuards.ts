import type { Router, RouteLocationNormalized } from 'vue-router'
import type { ErrorResponse } from '@/request/response'
import NProgress from 'nprogress'

import { getAccessToken, removeAccessToken } from './utils/auth'
import { ValidateAuth } from './api/user'

// 从路由对象中提取 name 的类型
type RouteName = RouteLocationNormalized['name']
const loginRoutes: RouteName[] = ['/login/', '/login/github']
const publicRoutes: RouteName[] = [...loginRoutes, '/', '/404']

export function setupRouterGuards(router: Router) {
  router.beforeEach(async (to, from, next) => {
    NProgress.start()

    const token = getAccessToken()

    // 检查是否是 404 页面
    if (to.matched.length === 0) {
      next({
        name: '/404',
      })
      return
    }

    if (token) {
      try {
        await ValidateAuth()
        if (loginRoutes.includes(to.name)) {
          next({
            name: '/home',
          })
        } else {
          next()
        }
      } catch (err: any) {
        // 权限错误时才移除 避免开发时后端服务未启动导致移除的不愉快体验
        const resErr = err as ErrorResponse
        if (resErr.code >= 1001 && resErr.code <= 1100) {
          removeAccessToken()
          next({
            name: '/login/',
          })
        } else {
          next()
        }
      }
    } else {
      if (publicRoutes.includes(to.name)) {
        // 公开路由允许访问
        next()
      } else {
        next({
          name: '/login/',
          query: { redirect: to.fullPath },
        })
      }
    }
  })

  router.afterEach((_to, _from) => {
    NProgress.done()
  })

  router.onError(_error => {
    // console.log('Router error', error)
  })
}
