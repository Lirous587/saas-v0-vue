import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMyThemeStore = defineStore('myThemeStore', () => {
  const isDark = ref(false)

  const toggleTheme = (mode: 'light' | 'dark') => {
    if (mode === 'light') {
      isDark.value = false
    } else {
      isDark.value = true
    }
  }

  return {
    isDark,
    toggleTheme,
  }
})
