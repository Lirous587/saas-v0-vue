<script setup lang="ts">
import { type GetTenantsQuery, type Tenant, type TenantPlan } from '@/api/tenant'
import IconChevronUpDown from '@/components/Icon/IconChevronUpDown.vue'
import { getTenant, getTenatPlan } from '@/composable/useTenantHandler'
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const form = reactive<GetTenantsQuery>({
  keyword: '',
  prev_cursor: '',
  next_cursor: '',
  page_size: '',
})

const handleChangeTenant = () => {}
</script>

<template>
  <div class="p-1 rounded-md hover:bg-base-300 cursor-pointer">
    <IconChevronUpDown />
  </div>
</template>
