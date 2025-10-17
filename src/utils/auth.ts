import Cookies from 'universal-cookie'

const cookies = new Cookies(null, { path: '/' })

const ACCESS_TOKEN_KEy = 'access_token'
const REFRESH_TOKEN_KEY = 'refresh_token'

export const setAccessToken = (token: string) => {
  cookies.set(ACCESS_TOKEN_KEy, token)
}

export const getAccessToken = (): string | undefined => {
  return cookies.get(ACCESS_TOKEN_KEy)
}

export const removeAccessToken = () => {
  cookies.remove(ACCESS_TOKEN_KEy)
}

export const setRefreshToken = (refreshToken: string) => {
  cookies.set(REFRESH_TOKEN_KEY, refreshToken)
}

export const getRefreshToken = (): string | undefined => {
  return cookies.get(REFRESH_TOKEN_KEY)
}

export const removeRefreshToken = () => {
  cookies.remove(REFRESH_TOKEN_KEY)
}

const OAUTH_CSRF_TOKEN_KEY = 'oauth_csrf_token'

export const setOAuthCsrfToken = (csrfToken: string) => {
  sessionStorage.setItem(OAUTH_CSRF_TOKEN_KEY, csrfToken)
}

export const getOAuthCsrfToken = (): string | null => {
  return sessionStorage.getItem(OAUTH_CSRF_TOKEN_KEY)
}

export const removeOAuthCsrfToken = () => {
  sessionStorage.removeItem(OAUTH_CSRF_TOKEN_KEY)
}
