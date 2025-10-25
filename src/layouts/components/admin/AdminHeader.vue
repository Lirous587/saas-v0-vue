<template>
  <div class="navbar">
    <div class="navbar-start">tenants</div>
    <div class="navbar-center"></div>
    <div class="navbar-end px-3">
      <Popover position="bottom-end" trigger="click" :z-index="100">
        <template #trigger>
          <div class="avatar">
            <div class="ring-primary ring-offset-base-100 w-8 rounded-full">
              <img :src="useProfile?.avatar_url" />
            </div>
          </div>
        </template>
        <template #content>
          <div
            v-if="useProfile"
            class="bg-base-100 rounded-box border border-base-300 py-3 px-2.5 text-sm w-64 flex flex-col gap-y-0.5"
          >
            <div class="px-1.5 space-y-0.5">
              <h3 class="text-sm font-bold font-sans overflow-hidden truncate">
                {{ useProfile.username }}
              </h3>
              <h4 class="text-base-content/80 truncate">
                {{ useProfile.email }}
              </h4>
            </div>

            <div class="border border-base-300 w-[calc(100%+20px)] -ml-2.5 my-2"></div>

            <RouterLink
              to=""
              class="px-1.5 py-1.5 rounded-md text-base-content/75 hover:bg-base-300 hover:text-base-content transition"
            >
              管理面板
            </RouterLink>

            <RouterLink
              to=""
              class="px-1.5 py-1.5 rounded-md text-base-content/75 hover:bg-base-300 hover:text-base-content transition"
            >
              账户设置
            </RouterLink>

            <div class="border border-base-300 w-[calc(100%+20px)] -ml-2.5 my-2"></div>

            <!-- 主题设置 -->
            <div
              to="/"
              class="px-1.5 py-1.5 rounded-md hover:bg-base-300 transition flex items-center justify-between"
            >
              <span class="text-base-content/75 hover:text-base-content">主题</span>

              <div class="flex gap-x-0.5 rounded-full">
                <ComputerDesktopIcon class="w-4 h-4 text-base-content/80 hover:text-neutral" />
                <SunIcon class="w-4 h-4 text-base-content/80 hover:text-neutral" />
                <MoonIcon class="w-4 h-4 text-base-content/80 hover:text-neutral" />
              </div>
            </div>

            <!-- <div
              class="px-1.5 py-1.5 rounded-md text-base-content/75 hover:bg-base-300 hover:text-base-content transition"
            >
              <label class="flex cursor-pointer gap-2 items-center">
                <MoonIcon class="w-4 h-4" />
                <input type="checkbox" value="li-dark" class="toggle theme-controller" />
                <SunIcon class="w-4 h-4" />
              </label>
            </div> -->

            <div class="border border-base-300 w-[calc(100%+20px)] -ml-2.5 my-2"></div>

            <RouterLink
              to="/"
              class="px-1.5 py-1.5 rounded-md hover:bg-base-300 transition flex items-center justify-between"
            >
              <span class="text-base-content/75 hover:text-base-content"> 着陆页 </span>
              <HomeIcon class="w-5 h-5" />
            </RouterLink>

            <RouterLink
              to="/"
              class="px-1.5 py-1.5 rounded-md hover:bg-base-300 transition flex items-center justify-between"
            >
              <span class="text-base-content/75 hover:text-base-content">退出登录</span>
              <ArrowRightEndOnRectangleIcon class="w-5 h-5" />
            </RouterLink>

            <div class="border border-base-300 w-[calc(100%+20px)] -ml-2.5 my-2"></div>

            <RouterLink to="/" class="px-1.5 py-1.5">
              <button class="btn btn-neutral btn-wide btn-sm">升级为专业版</button>
            </RouterLink>
          </div>
        </template>
      </Popover>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User } from '@/api/user'
import { useMyThemeStore } from '@/stores/thme'
import { useMyUserStore } from '@/stores/user'
import { type ThemeSwitchRef, Popover } from 'li-daisy'
import {
  ArrowRightEndOnRectangleIcon,
  HomeIcon,
  ComputerDesktopIcon,
  SunIcon,
  MoonIcon,
} from '@heroicons/vue/24/outline'
import { onMounted, ref } from 'vue'

const themeStore = useMyThemeStore()
const themeSwitchRef = ref<ThemeSwitchRef>()

const handleThemeToggle = (mode: 'light' | 'dark') => {
  themeStore.toggleTheme(mode)
}

const userStore = useMyUserStore()

const useProfile = ref<User>()
userStore.GetProfile().then(res => {
  useProfile.value = res
})

onMounted(() => {
  themeStore.toggleTheme(themeSwitchRef.value?.isDark ? 'dark' : 'light')
})
</script>
