import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useMyHeaderStore = defineStore('myHeaderStore', () => {
  const SCROLL_THRESHOLD = 64

  const scrollY = ref(0)
  const isScrolled = computed(() => scrollY.value > 64)

  // 滚动百分比 (0-1)，超过阈值后保持为 1
  const scrollProgress = computed(() => {
    return Math.min(scrollY.value / SCROLL_THRESHOLD, 1)
  })

  const handleScroll = () => {
    scrollY.value = window.scrollY
  }

  const initScrollListener = () => {
    window.addEventListener('scroll', handleScroll, { passive: true })
  }

  const removeScrollListener = () => {
    window.removeEventListener('scroll', handleScroll)
  }

  return {
    scrollY,
    scrollProgress,
    isScrolled,
    initScrollListener,
    removeScrollListener,
  }
})
