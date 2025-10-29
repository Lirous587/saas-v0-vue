<script setup lang="ts">
import AdminHeader from './components/admin/AdminHeader.vue'
import AdminSubmenu from './components/admin/AdminSubmenu.vue'
import { BoltIcon } from '@heroicons/vue/24/outline'

import { useMyHeaderStore } from '@/stores/header'
import { onBeforeUnmount, onMounted } from 'vue'

const store = useMyHeaderStore()

onMounted(() => {
  store.initScrollListener()
})

onBeforeUnmount(() => {
  store.removeScrollListener()
})
</script>

<template>
  <div class="flex flex-col h-screen relative">
    <AdminHeader class="bg-base-100" />
    <BoltIcon
      class="w-5 h-5 text-base-content fixed z-10 left-5"
      :style="{
        transform: `scale(${1 - store.scrollProgress * 0.1})`,
        top: `${14 + store.scrollProgress * 1}px`,
      }"
    />

    <AdminSubmenu
      class="shrink-0 sticky top-0 bg-base-100 border-b border-b-base-300 flex items-center"
    />

    <div class="flex-1 bg-base-200">
      <main class="shrink-0 p-5 overflow-auto duration-200 @container">
        <RouterView class="p-4" />
        <div class="h-screen"></div>
      </main>
    </div>

    <!-- <div class="flex-1 mt-[52px] bg-base-200">
      <AdmintAside
        class="fixed top-[52px] bottom-0 overflow-y-auto overflow-x-hidden transition-[width] duration-200 border-r border-r-base-300"
      />
      <main
        class="shrink-0 p-5 overflow-auto duration-200"
        :class="isCollapsed ? 'ml-[60px]' : 'ml-[200px]'"
      >
        <RouterView class="p-4" />
      </main>
    </div> -->
  </div>
</template>
