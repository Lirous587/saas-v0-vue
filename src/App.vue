<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

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
</script>

<template>
  <component :is="currentLayout"> </component>
</template>
