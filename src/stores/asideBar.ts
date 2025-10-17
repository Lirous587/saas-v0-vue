import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export type asideBarStatus = 'Expanded' | 'Collapsed'

export const useMyAsideBarStore = defineStore('myExpandStore', () => {
  const status = ref<asideBarStatus>('Expanded')

  const screenWidth = ref(window.innerWidth)

  const changeStatus = (newStatus: asideBarStatus) => {
    status.value = newStatus
  }

  const isCollapsed = computed(() => {
    switch (status.value) {
      case 'Expanded':
        return screenWidth.value < 968
      case 'Collapsed':
        return true
      default:
        return screenWidth.value < 968
    }
  })

  // 检查屏幕尺寸
  const checkScreenSize = () => {
    screenWidth.value = window.innerWidth
  }

  // 初始化监听器
  const initResizeListener = () => {
    window.addEventListener('resize', checkScreenSize)
  }

  // 清理监听器
  const destroyResizeListener = () => {
    window.removeEventListener('resize', checkScreenSize)
  }

  return {
    status,
    screenWidth,
    isCollapsed,
    changeStatus,
    checkScreenSize,
    initResizeListener,
    destroyResizeListener,
  }
})
