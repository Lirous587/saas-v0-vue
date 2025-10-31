import { GetTenantPlan, type TenantPlan } from '@/api/tenant'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

export const useMyTenantStore = defineStore('myTenantStore', () => {
  const route = useRoute()

  const tenantPlan = ref<TenantPlan>()

  const getTenantPlan = async (): Promise<TenantPlan> => {
    if (!tenantPlan.value) {
      const id = (route.params as { id?: string }).id || ''
      await GetTenantPlan(id).then(res => {
        tenantPlan.value = res.data
      })
    }

    return tenantPlan.value
  }

  return {
    tenantPlan,
    getTenantPlan,
  }
})
