<template>
  <div class="flex flex-col h-screen">
    <AdminHeader
      class="fixed left-0 right-0 h-[52px] bg-base-100 border-b border-b-base-300 z-10"
    />

    <div class="flex-1 mt-[52px]">
      <AdmintAside
        class="fixed top-[52px] bottom-0 overflow-y-auto overflow-x-hidden transition-[width] duration-200 border-r border-r-base-300"
      />
      <main
        class="bg-base-100 shrink-0 p-5 overflow-auto duration-200"
        :class="isCollapsed ? 'ml-[60px]' : 'ml-[200px]'"
      >
        <RouterView class="p-4" />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import AdmintAside from './components/admin/AdminAside.vue'
import AdminHeader from './components/admin/AdminHeader.vue'
import { useMyAsideBarStore } from '@/stores/asideBar'
import { computed } from 'vue'

const asideBarStore = useMyAsideBarStore()

const isCollapsed = computed(() => asideBarStore.isCollapsed)
</script>
