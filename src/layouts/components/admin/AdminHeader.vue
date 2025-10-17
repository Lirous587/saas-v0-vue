<template>
  <div class="flex items-center justify-end px-10 gap-x-3">
    <div class="flex items-center">
      <ThemeSwitch ref="themeSwitchRef" @toggle="handleThemeToggle" />
    </div>
    <div class="dropdown dropdown-end ml-3">
      <div class="avatar" role="button">
        <div class="ring-primary ring-offset-base-100 w-8 rounded-full">
          <img src="https://lirous.com/avatar.jpg" />
        </div>
      </div>

      <ul tabindex="0" class="dropdown-content menu bg-base-100 z-1 w-52 p-2 shadow-sm rounded-lg">
        <li class="">2115883273@qq.com</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMyThemeStore } from '@/stores/thme'
import { ThemeSwitch, type ThemeSwitchRef } from 'li-daisy'
import { onMounted, ref } from 'vue'

const themeStore = useMyThemeStore()
const themeSwitchRef = ref<ThemeSwitchRef>()

const handleThemeToggle = (mode: 'light' | 'dark') => {
  themeStore.toggleTheme(mode)
}

onMounted(() => {
  themeStore.toggleTheme(themeSwitchRef.value.isDark ? 'dark' : 'light')
})
</script>
