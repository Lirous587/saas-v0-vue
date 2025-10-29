<script setup lang="ts">
import { useMyHeaderStore } from '@/stores/header'

const store = useMyHeaderStore()
</script>

<template>
  <div class="">
    <div
      class="p-2 pl-5 pt-0 space-x-2"
      :style="{
        translate: `${store.scrollProgress * 32}px`,
        paddingTop: `${store.scrollProgress * 8}px`,
      }"
    >
      <RouterLink class="btn btn-sm" to=""> 板块 </RouterLink>
      <RouterLink class="btn btn-sm" to=""> 图库 </RouterLink>
      <RouterLink class="btn btn-sm" to=""> 设置 </RouterLink>
    </div>
  </div>
</template>
