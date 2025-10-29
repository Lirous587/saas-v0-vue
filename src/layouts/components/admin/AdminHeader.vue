<template>
  <div class="navbar">
    <div class="navbar-start *:shrink-0">
      <BoltIcon class="w-5 h-5 text-base-content ml-3" />
      <SlashIcon class="w-5 h-5 mx-1.5 text-base-content/30" />
      <HeaderTenant />
    </div>
    <div class="navbar-end px-3 space-x-2">
      <span class="btn btn-circle btn-sm">
        <BellIcon class="w-5" />
      </span>

      <a class="btn btn-circle btn-sm" :href="document_url" target="_blank">
        <BookOpenIcon class="w-5" />
      </a>

      <HeaderProfile />
    </div>
  </div>
</template>

<script setup lang="ts">
import { document_url } from '@/config'
import HeaderProfile from './header/HeaderProfile.vue'
import HeaderTenant from './header/HeaderTenant.vue'
import { BoltIcon, SlashIcon, BookOpenIcon, BellIcon } from '@heroicons/vue/24/outline'
</script>
