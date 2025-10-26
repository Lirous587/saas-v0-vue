import { defineStore } from 'pinia'
import { ref } from 'vue'

type ThemeMode = 'system' | 'light' | 'dark'

export const useMyThemeStore = defineStore('myThemeStore', () => {
  const themeMode = ref<ThemeMode>('system')

  const STORAGE_KEY = 'theme-mode'

  // 获取系统主题偏好
  const getSystemTheme = (): 'light' | 'dark' => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }
    return 'light'
  }

  // 应用主题到 HTML
  const applyTheme = (mode: ThemeMode) => {
    const htmlElement = document.documentElement
    let actualTheme: 'light' | 'dark'

    if (mode === 'system') {
      actualTheme = getSystemTheme()
    } else {
      actualTheme = mode
    }

    if (actualTheme === 'dark') {
      htmlElement.setAttribute('data-theme', 'dark')
    } else {
      htmlElement.removeAttribute('data-theme')
    }
  }

  // 设置主题模式
  const setThemeMode = (mode: ThemeMode) => {
    themeMode.value = mode
    applyTheme(mode)
    localStorage.setItem(STORAGE_KEY, mode)
  }

  // 初始化主题
  const initTheme = () => {
    const saved = localStorage.getItem(STORAGE_KEY) as ThemeMode | null
    const mode = saved || 'system'
    themeMode.value = mode
    applyTheme(mode)

    // 监听系统主题变化
    if (mode === 'system') {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        applyTheme('system')
      })
    }
  }

  return {
    themeMode,
    setThemeMode,
    initTheme,
  }
})
