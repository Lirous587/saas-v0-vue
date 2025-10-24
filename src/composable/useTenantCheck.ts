import { type Tenant } from '@/api/tenant'
import { useMyTenantStore } from '@/stores/tenant'
import { useRouter } from 'vue-router'

export const tenantCheck = async (successBack?: () => void) => {
  const router = useRouter()

  let firstTenant: Tenant

  const tenantStore = useMyTenantStore()

  const tenants = await tenantStore.GetTenantList()

  if (tenants.length > 0) {
    firstTenant = tenants[0]
    successBack ? successBack() : router.push(`/tenant/${firstTenant.id}`)
  } else {
    router.push(`/tenant/register`)
  }
}
