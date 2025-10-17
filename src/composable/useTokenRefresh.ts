import {
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
  removeAccessToken,
  removeRefreshToken,
} from '@/utils/auth'
import { refreshToken } from '@/api/user'
import { router } from '@/main'

export async function refreshAccessToken() {
  const rToken = getRefreshToken()
  if (!rToken) {
    removeAccessToken()
    removeRefreshToken()
    throw new Error('无刷新令牌')
  }
  try {
    const res = await refreshToken(rToken)
    const data = res.data
    setAccessToken(data.access_token)
    setRefreshToken(data.refresh_token)
    return data.access_token
  } catch (e) {
    removeAccessToken()
    removeRefreshToken()
    router.push('/login')
    throw e
  }
}
