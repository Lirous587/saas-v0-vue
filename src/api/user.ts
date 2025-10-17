import request from '@/request'

export interface LoginRes {
  access_token: string
  refresh_token: string
}

// api/user/auth/github
export const githubLogin = (code: string) => {
  return request.post<LoginRes>('/api/v1/user/auth/github', {
    code: code,
  })
}

export const validateAuth = () => {
  return request.post('/api/v1/user/auth')
}

export const refreshToken = (refreshToken: string) => {
  return request.post<LoginRes>(
    '/api/v1/user/refresh_token',
    {},
    {
      headers: {
        'X-Refresh-Token': refreshToken,
      },
    }
  )
}
