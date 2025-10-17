<template>
  <div
    class="flex items-center justify-start mt-auto mb-2 hover:bg-base-300 p-1.5 rounded-md w-fit h-fit"
    :class="isCollapsed ? 'mx-auto' : 'ml-2'"
  >
    <Popover position="top-start" :z-index="20" trigger="click">
      <template #trigger>
        <Squares2X2Icon class="w-5 h-5" />
      </template>
      <template #content>
        <div class="border border-base-200 shadow-md rounded-lg bg-base-200">
          <ul class="flex flex-col items-start bg-base-100 rounded-box shadow-md w-42">
            <li class="text-xs text-pretty font-semibold px-2 py-2">Sidebar control</li>
            <li class="h-[1px] w-full bg-base-300"></li>
            <ul class="py-3 px-1 text-xs w-full space-y-0.5">
              <li
                v-for="bar in bars"
                :key="bar"
                class="flex items-center btn btn-ghost btn-sm justify-start h-auto min-h-0 py-2 font-normal"
                @click="changeBar(bar)"
              >
                <IconDot class="w-1 h-1 mr-1" :class="nowBar === bar ? '' : 'opacity-0'" />
                <span>
                  {{ bar }}
                </span>
              </li>
            </ul>
          </ul>
        </div>
      </template>
    </Popover>
  </div>
</template>

<script setup lang="ts">
import IconDot from '@/components/Icon/IconDot.vue'
import { computed } from 'vue'
import { Squares2X2Icon } from '@heroicons/vue/24/outline'
import { Popover } from 'li-daisy'

import { useMyAsideBarStore, type asideBarStatus } from '@/stores/asideBar'

const bars: Array<asideBarStatus> = ['Expanded', 'Collapsed']

const asideBarStore = useMyAsideBarStore()

const isCollapsed = computed(() => asideBarStore.isCollapsed)

const nowBar = computed(() => asideBarStore.status)

const changeBar = (bar: asideBarStatus) => {
  asideBarStore.changeStatus(bar)
}
</script>
