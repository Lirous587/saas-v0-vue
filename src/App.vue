<script setup lang="ts">
import { defineAsyncComponent, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { useMyThemeStore } from './stores/theme'

const layouts = {
  none: defineAsyncComponent(() => import('./layouts/none.vue')),
  admin: defineAsyncComponent(() => import('./layouts/admin.vue')),
  auth: defineAsyncComponent(() => import('./layouts/admin.vue')),
}

const route = useRoute()

const currentLayout = computed(() => {
  const layoutName = (route.meta.layout as keyof typeof layouts) || 'none'

  return layouts[layoutName]
})

const themeStore = useMyThemeStore()

onMounted(() => {
  themeStore.initTheme()
})
</script>

<template>
  <component :is="currentLayout"> </component>
</template>
