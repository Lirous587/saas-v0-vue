import request from '@/request'

//#region 登录
export interface LoginResponse {
  access_token: string
  refresh_token: string
}

export const GithubLogin = (code: string) => {
  return request.post<LoginResponse>('/v1/user/auth/github', {
    code: code,
  })
}
//#endregion

//#region 身份验证
export const ValidateAuth = () => {
  return request.post('/v1/user/auth')
}

export const RefreshToken = (refreshToken: string) => {
  return request.post<LoginRes>(
    '/v1/user/refresh_token',
    {},
    {
      headers: {
        'X-Refresh-Token': refreshToken,
      },
    }
  )
}
//#endregion

//#region 用户信息
export interface User {
  id: string
  username: string
  avatar_url: string
  email: string
  email_verified: boolean
  last_login_at: number
  created_at: number
  updated_at: number
}
export const GetUserProfile = () => {
  return request.get<User>(`/v1/user/profile`)
}
//#endregion
