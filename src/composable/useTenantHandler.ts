import { GetTenants, ReadTenant, type Tenant, type TenantPlan } from '@/api/tenant'
import type { ErrorResponse } from '@/request/response'
import { useMyTenantStore } from '@/stores/tenant'
import { useRoute, useRouter, type Router } from 'vue-router'

export const tenantCheck = async (router: Router) => {
  let firstTenant: Tenant

  await GetTenants().then(res => {
    const tenants = res.data?.items
    if (tenants.length > 0) {
      firstTenant = tenants[0]
      router.push(`/tenant/${firstTenant.id}`)
    } else {
      router.push(`/tenant/register`)
    }
  })
}

export const getTenant = async (id: number): Promise<Tenant> => {
  const router = useRouter()

  let nowTenant: Tenant

  await ReadTenant(id)
    .then(res => {
      nowTenant = res.data
    })
    .catch((err: ErrorResponse) => {
      if (err.httpStatus === 401) {
        router.push(`/auth-redirect`)
      }
    })

  return nowTenant
}

export const getTenatPlan = async (): Promise<TenantPlan> => {
  const store = useMyTenantStore()

  let tenantPlan: TenantPlan
  await store.getTenantPlan().then(res => {
    tenantPlan = res
  })

  return tenantPlan
}
