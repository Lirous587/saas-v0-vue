<script setup lang="ts">
import HeaderTheme from './HeaderTheme.vue'
import type { User } from '@/api/user'
import { Popover, Skeleton } from 'li-daisy'
import { useMyUserStore } from '@/stores/user'
import { ArrowRightEndOnRectangleIcon, HomeIcon } from '@heroicons/vue/24/outline'
import { ref } from 'vue'

const userStore = useMyUserStore()

const useProfile = ref<User>()
userStore.GetProfile().then(res => {
  useProfile.value = res
})

const avatarLoaded = ref(false)

function handleAvatarLoad() {
  avatarLoaded.value = true
}

function handleAvatarError() {
  avatarLoaded.value = false
}
</script>

<template>
  <Popover position="bottom-end" trigger="click" :z-index="100">
    <template #trigger>
      <div class="avatar cursor-pointer">
        <div class="ring-primary ring-offset-base-100 w-8 rounded-full">
          <img
            class="sr-only"
            :src="useProfile?.avatar_url"
            @load="handleAvatarLoad"
            @error="handleAvatarError"
          />
          <Skeleton :loading="!avatarLoaded" :delay="1500">
            <template #skeleton>
              <div class="skeleton w-8 h-8 rounded-full"></div>
            </template>
            <template #content>
              <div class="avatar cursor-pointer">
                <div class="ring-primary ring-offset-base-100 w-8 rounded-full">
                  <img :src="useProfile.avatar_url" />
                </div>
              </div>
            </template>
          </Skeleton>
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
        <HeaderTheme />

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
</template>
