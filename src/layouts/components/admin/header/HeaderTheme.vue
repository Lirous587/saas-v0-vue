<script setup lang="ts">
import { ComputerDesktopIcon, SunIcon, MoonIcon } from '@heroicons/vue/24/outline'
import { useMyThemeStore } from '@/stores/theme'

const themeStore = useMyThemeStore()
</script>

<template>
  <div class="flex items-center justify-between px-1.5 py-1.5">
    <span class="text-base-content/75">主题</span>
    <div class="rounded-full border border-base-300">
      <button
        class="btn btn-ghost btn-xs btn-circle"
        :class="{ 'btn-active': themeStore.themeMode === 'system' }"
        @click="themeStore.setThemeMode('system')"
      >
        <ComputerDesktopIcon class="w-4 h-4 text-base-content/80" />
      </button>
      <button
        class="btn btn-ghost btn-xs btn-circle"
        :class="{ 'btn-active': themeStore.themeMode === 'light' }"
        @click="themeStore.setThemeMode('light')"
      >
        <SunIcon class="w-4 h-4 text-base-content/80" />
      </button>
      <button
        class="btn btn-ghost btn-xs btn-circle"
        :class="{ 'btn-active': themeStore.themeMode === 'dark' }"
        @click="themeStore.setThemeMode('dark')"
      >
        <MoonIcon class="w-4 h-4 text-base-content/80" />
      </button>
    </div>
  </div>
</template>
