import type { AxiosError } from 'axios'

export interface SuccessResponse<T = any> {
  // 状态码
  httpStatus: number

  // 后端数据
  code: number
  message: string
  data: T
}

export interface ErrorResponse {
  // 状态码
  httpStatus: number

  // 后端数据
  code: number
  message: string
  details?: Record<string, any>
}

export const isValidApiResponse = (
  data: any
): data is { code: number; message?: string; data?: any } => {
  return data && typeof data === 'object' && typeof data.code === 'number'
}

export const isValidErrorResponse = (data: any): data is ErrorResponse => {
  return (
    data &&
    typeof data === 'object' &&
    typeof data.code === 'number' &&
    typeof data.message === 'string'
  )
}

export const isTokenExpired = (error: AxiosError) => {
  return (
    error.response && isValidErrorResponse(error.response.data) && error.response.data.code === 1063
  )
}
