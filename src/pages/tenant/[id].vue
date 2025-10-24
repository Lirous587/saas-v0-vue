<script setup lang="ts">
import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { BookOpenIcon } from '@heroicons/vue/24/outline'
import { tenantCheck } from '@/composable/useTenantCheck'

const router = useRouter()
const route = useRoute()

tenantCheck()
</script>

<template>
  <div class="relative">
    <div class="navbar bg-base-100 border-b border-base-300 sticky top-0 z-50 px-4">
      <div class="navbar-start"></div>
      <div class="navbar-center flex"></div>
      <div class="navbar-end flex gap-2">
        <a class="btn btn-circle btn-sm" href="https://lirous.com" target="_blank">
          <BookOpenIcon class="w-5 h-5 text-neutral" />
        </a>

        <div class="avatar">
          <div class="w-8 rounded-full">
            <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
