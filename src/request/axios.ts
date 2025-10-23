import axios, { AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh'

import type { SuccessResponse, ErrorResponse } from './response'
import { isTokenExpired, isValidApiResponse, isValidErrorResponse } from './response'

import { getAccessToken } from '@/utils/auth'
import { Notification } from 'li-daisy'
import { refreshAccessToken } from '@/composable/useTokenRefresh'

// 扩展axios的config 允许传入自定义上下文
type RequestConfig = InternalAxiosRequestConfig & {
  my_silent?: boolean
}

const instance = axios.create({
  // baseURL: '/api',
  timeout: 10 * 1000,
})

const tokenExpiredStatusCode = 499

// 请求拦截器
instance.interceptors.request.use(
  function (config: InternalAxiosRequestConfig) {
    const token = getAccessToken()
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }
    return config
  },
  function (error: AxiosError) {
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  function (response: AxiosResponse): AxiosResponse {
    const apiResponse = response.data

    // 验证API响应格式
    if (!isValidApiResponse(apiResponse)) {
      throw new Error('无效的响应格式')
    }

    // 防御性编程
    {
      if (apiResponse.code === 1063) {
        // token 过期，交给 axios-auth-refresh
        const error = new axios.AxiosError(
          apiResponse.message || 'Token 已过期',
          undefined,
          response.config,
          response.request,
          {
            ...response,
            status: tokenExpiredStatusCode,
            data: apiResponse,
          }
        )
        throw error
      }

      if (apiResponse.code !== 2000) {
        // 其它业务错误
        const errResponse: ErrorResponse = {
          code: apiResponse.code,
          message: apiResponse.message || '业务处理失败',
          httpStatus: response.status,
        }
        throw errResponse
      }
    }

    // 业务成功，将标准化的数据放回 response.data
    response.data = {
      code: apiResponse.code,
      message: apiResponse.message || '请求成功(default)',
      data: apiResponse.data,
      httpStatus: response.status,
    } as SuccessResponse

    return response
  },
  async function (error: AxiosError): Promise<ErrorResponse> {
    const cfg = error.config as RequestConfig | undefined

    // 处理 token 过期的错误
    if (isTokenExpired(error)) {
      error.response!.status = tokenExpiredStatusCode
      return Promise.reject(error)
    }

    // 以下处理非 token 过期的错误
    const errorResponse: ErrorResponse = {
      code: -1,
      message: '网络错误',
      httpStatus: 0,
    }

    if (error.response) {
      const apiResponse = error.response.data
      errorResponse.httpStatus = error.response.status

      if (isValidErrorResponse(apiResponse)) {
        errorResponse.code = apiResponse.code
        errorResponse.message = apiResponse.message

        if (apiResponse.details && typeof apiResponse.details === 'object') {
          errorResponse.details = apiResponse.details
        }
      } else {
        errorResponse.code = error.response.status
        errorResponse.message = `HTTP请求错误，状态码: ${error.response.status}`
      }
    } else if (error.request) {
      errorResponse.message = '请求超时，请检查网络连接或联系管理员'
    } else {
      errorResponse.message = error.message
    }

    if (!cfg?.my_silent) {
      Notification.error({
        title: '请求失败',
        message: errorResponse.message,
      })
    }

    return Promise.reject(errorResponse)
  }
)

// 集成 axios-auth-refresh
createAuthRefreshInterceptor(
  instance,
  async _error => {
    await refreshAccessToken()
  },
  {
    statusCodes: [tokenExpiredStatusCode],
  }
)

export default instance
