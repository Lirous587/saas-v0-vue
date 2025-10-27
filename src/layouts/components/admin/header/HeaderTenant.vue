<script setup lang="ts">
import { type Tenant, type TenantPlan } from '@/api/tenant'
import { getTenant, getTenatPlan } from '@/composable/useTenantHandler'
import { ref } from 'vue'
import HeaderSwitchTenant from './HeaderSwitchTenant.vue'
import { Skeleton } from 'li-daisy'

const nowTenant = ref<Tenant>()
getTenant().then(res => {
  nowTenant.value = res
})

const nowTenantPlan = ref<TenantPlan>()
getTenatPlan().then(res => {
  nowTenantPlan.value = res
})
</script>

<template>
  <div class="flex items-center gap-x-1.5">
    <Skeleton :loading="!nowTenant" :delay="2000">
      <template #skeleton>
        <div class="skeleton p-1 rounded-md w-12 h-5"></div>
      </template>
      <template #content>
        <span class="text-sm font-bold p-1">
          {{ nowTenant?.name }}
        </span>
      </template>
    </Skeleton>

    <Skeleton :loading="!nowTenantPlan" :delay="2000">
      <template #skeleton>
        <div class="skeleton p-1 rounded-md w-12 h-5"></div>
      </template>
      <template #content>
        <span class="badge badge-primary badge-soft badge-sm">
          {{ nowTenantPlan?.plan_type }}
        </span>
      </template>
    </Skeleton>

    <HeaderSwitchTenant />
  </div>
</template>
