<template>
  <aside :class="isCollapsed ? 'w-[60px]' : 'w-[200px]'">
    <div class="h-full p-3 space-y-1 flex flex-col">
      <AsideMenu />
      <AsideBar />
    </div>
  </aside>
</template>

<script setup lang="ts">
import AsideMenu from './aside/AsideMenu.vue'
import AsideBar from './aside/AsideBar.vue'
import { useMyAsideBarStore } from '@/stores/asideBar'
import { computed, onMounted, onUnmounted } from 'vue'

const asideBarStore = useMyAsideBarStore()

const isCollapsed = computed(() => asideBarStore.isCollapsed)

onMounted(() => {
  asideBarStore.checkScreenSize()
  asideBarStore.initResizeListener()
})

onUnmounted(() => {
  asideBarStore.destroyResizeListener()
})
</script>
