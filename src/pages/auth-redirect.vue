<script setup lang="ts">
import { tenantCheck } from '@/composable/useTenantHandler'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  setTimeout(() => {
    tenantCheck(router)
  }, 1000)
})
</script>

<!-- 获取该用户所拥有的租户 -->
<!-- 若无则引导其创建 -->
<!-- 若有则默认选择第一个即可 -->
<template>
  <div class="hero min-h-screen bg-base-200">
    <div class="hero-content text-center">
      <div>
        <h1 class="text-5xl font-bold">加载中...</h1>
        <p class="py-6">正在获取你的租户信息</p>
        <div class="loading loading-spinner loading-lg"></div>
      </div>
    </div>
  </div>
</template>
