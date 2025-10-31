<script setup lang="ts">
import {
  Square3Stack3DIcon,
  PhotoIcon,
  TrashIcon,
  Cog6ToothIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/vue/24/outline'
import { useMyHeaderStore } from '@/stores/header'
import { computed, ref, type Component } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const store = useMyHeaderStore()

interface navItem {
  title: string
  Icon: Component
  path: string
}

// 从路由参数获取 id
const tenantId = computed(() => {
  return (route.params as { id?: string }).id || ''
})

const navs = computed((): navItem[] => [
  {
    title: '板块',
    path: `/tenant/${tenantId.value}/plate`,
    Icon: Square3Stack3DIcon,
  },
  {
    title: '评论',
    path: `/tenant/${tenantId.value}/comment`,
    Icon: ChatBubbleLeftRightIcon,
  },
  {
    title: '图库',
    path: `/tenant/${tenantId.value}/img`,
    Icon: PhotoIcon,
  },
  {
    title: '回收站',
    path: `/tenant/${tenantId.value}/img/recycle`,
    Icon: TrashIcon,
  },
  {
    title: '设置',
    path: `/tenant/${tenantId.value}/setting`,
    Icon: Cog6ToothIcon,
  },
])

// 跟随块的状态
const isHovering = ref(false)
const indicatorStyle = ref({
  left: '0px',
  width: '0px',
})

const handleMouseEnter = (event: MouseEvent) => {
  const target = event.currentTarget as HTMLElement
  const left = target.offsetLeft
  const width = target.offsetWidth

  indicatorStyle.value = {
    left: `${left}px`,
    width: `${width}px`,
  }

  isHovering.value = true
}

const handleMouseLeave = () => {
  isHovering.value = false
}

const handleContainerLeave = () => {
  isHovering.value = false
}
</script>

<template>
  <div
    class="pl-5 pb-2 h-[48px] flex items-center relative"
    :style="{
      paddingLeft: `${20 + store.scrollProgress * 28}px`,
      paddingTop: `${store.scrollProgress * 8}px`,
    }"
    @mouseleave="handleContainerLeave"
  >
    <!-- 悬停指示器 (背景块) -->
    <div
      class="absolute top-[50%] h-9 bg-base-300/90 rounded-md pointer-events-none -z-10 transition-all"
      :class="isHovering ? 'opacity-100' : 'opacity-0'"
      :style="{
        left: indicatorStyle.left,
        width: indicatorStyle.width,
        translate: `0 calc(-50% - ${4 * (1 - store.scrollProgress)}px)`,
      }"
    ></div>

    <!-- 导航项 -->
    <RouterLink
      v-for="nav in navs"
      :key="nav.path"
      :to="nav.path"
      class="flex items-center justify-center gap-x-1 transition-colors hover:text-primary px-4 py-2 text-sm font-extrabold select-none relative group"
      :class="route.path.startsWith(nav.path) ? 'text-primary' : ''"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <component :is="nav.Icon" class="h-5 w-5" />
      {{ nav.title }}

      <!-- 底部指示线（活跃状态） -->
      <div
        v-if="route.path.startsWith(nav.path)"
        class="absolute left-1 right-1 bottom-0 h-[2px] bg-primary/80 pointer-events-none transition-opacity group-hover:opacity-0"
      ></div>
    </RouterLink>
  </div>
</template>
