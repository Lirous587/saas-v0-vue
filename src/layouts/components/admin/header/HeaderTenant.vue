<script setup lang="ts">
import { type Tenant } from '@/api/tenant'
import { getTenant } from '@/composable/useTenantHandler'
import { ref, watch } from 'vue'
import HeaderSwitchTenant from './HeaderSwitchTenant.vue'
import { Skeleton } from 'li-daisy'
import { useRoute } from 'vue-router'

const route = useRoute()

const nowTenant = ref<Tenant>()
const getTenantHandler = (id: number) => {
  nowTenant.value = null
  getTenant(id).then(res => {
    nowTenant.value = res
  })
}

watch(
  () => (route.params as { id?: number }).id,
  (newId, oldId) => {
    if (newId !== oldId) {
      getTenantHandler(newId)
    }
  },
  {
    immediate: true,
  }
)
</script>

<template>
  <div class="flex items-center gap-x-1.5 flex-nowrap text-nowrap">
    <Skeleton :loading="!nowTenant" :delay="2000">
      <template #skeleton>
        <div class="flex gap-x-1.5">
          <div class="skeleton p-1 rounded-md w-12 h-5"></div>
          <div class="skeleton p-1 rounded-md w-12 h-5"></div>
        </div>
      </template>
      <template #content>
        <span class="text-sm font-bold p-1">
          {{ nowTenant.name }}
        </span>
        <span class="badge badge-primary badge-soft badge-sm">
          {{ nowTenant.plan_type }}
        </span>
      </template>
    </Skeleton>

    <HeaderSwitchTenant />
  </div>
</template>
