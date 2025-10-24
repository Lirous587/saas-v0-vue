import { GetTenants, type Tenant } from '@/api/tenant'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMyTenantStore = defineStore('myTenantStore', () => {
  const tenants = ref<Tenant[]>([])

  const GetTenantList = async () => {
    if (tenants.value.length === 0) {
      await GetTenants().then(res => {
        if (res.data.length > 0) {
          tenants.value = res.data
        }
      })
    }

    return tenants.value
  }

  return {
    tenants,
    GetTenantList,
  }
})
