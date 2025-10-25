import { GetUserProfile, type User } from '@/api/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMyUserStore = defineStore('myUserStore', () => {
  const profile = ref<User>()

  const GetProfile = async () => {
    if (!profile.value) {
      await GetUserProfile().then(res => {
        profile.value = res.data
      })
    }
    return profile.value
  }

  return {
    profile,
    GetProfile,
  }
})
