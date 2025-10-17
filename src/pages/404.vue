<template>
  <div
    class="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center px-4"
  >
    <div class="text-center space-y-8 max-w-2xl">
      <!-- 404 数字 -->
      <div class="relative">
        <h1 class="text-9xl md:text-[12rem] font-bold text-primary/20 select-none">404</h1>
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="text-6xl animate-bounce">🛸</div>
        </div>
      </div>

      <!-- 主要信息 -->
      <div class="space-y-4">
        <h2 class="text-3xl md:text-4xl font-bold text-base-content">页面走丢了</h2>
        <p class="text-lg text-base-content/70 max-w-md mx-auto">
          看起来这个页面被外星人带走了，或者可能从未存在过...
        </p>
      </div>

      <!-- 统计信息 -->
      <div
        class="stats stats-vertical sm:stats-horizontal shadow-lg bg-base-100 w-full max-w-lg mx-auto"
      >
        <div class="stat">
          <div class="stat-figure text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="inline-block w-8 h-8 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <div class="stat-title">错误代码</div>
          <div class="stat-value text-primary">404</div>
          <div class="stat-desc">页面未找到</div>
        </div>

        <div class="stat">
          <div class="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="inline-block w-8 h-8 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
              ></path>
            </svg>
          </div>
          <div class="stat-title">状态</div>
          <div class="stat-value text-secondary">丢失</div>
          <div class="stat-desc text-secondary">页面失联中</div>
        </div>
      </div>

      <!-- 操作按钮 -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <button class="btn btn-primary btn-lg gap-2" @click="goHome">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          回到首页
        </button>

        <button class="btn btn-ghost btn-lg gap-2" @click="goBack">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          返回上页
        </button>
      </div>
    </div>

    <!-- 浮动装饰 -->
    <div class="fixed top-20 left-10 text-4xl animate-pulse opacity-20">⭐</div>
    <div
      class="fixed top-40 right-20 text-3xl animate-bounce opacity-20"
      style="animation-delay: 1s"
    >
      🌟
    </div>
    <div
      class="fixed bottom-32 left-20 text-2xl animate-ping opacity-20"
      style="animation-delay: 2s"
    >
      ✨
    </div>
  </div>
</template>

<script setup lang="ts">
definePage({
  meta: {
    layout: 'none',
  },
})

import { useRouter } from 'vue-router'
const router = useRouter()

const goHome = () => {
  router.push({ name: '/home' })
}

const goBack = () => {
  if (window.history.length > 1) {
    router.go(-1)
  } else {
    goHome()
  }
}
</script>

<style scoped>
/* 自定义动画 */
@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}
</style>
