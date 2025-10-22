import { reactive } from 'vue'
import { GetTenantList, type GetTenantListQuery, type Tenant } from '@/api/tenant'
import { useRouter } from 'vue-router'

export const tenantCheck = (successBack?: () => void) => {
  const form = reactive<GetTenantListQuery>({
    last_id: 0,
    page_size: 5,
  })

  const router = useRouter()

  let firstTenant: Tenant

  GetTenantList(form)
    .then(res => {
      if (res.data.length > 0) {
        firstTenant = res.data[0]
        successBack ? successBack() : router.push(`/tenant/${firstTenant.id}`)
      } else {
        router.push(`/tenant/register`)
      }
    })
    .catch(() => {
      router.push(`/tenant/register`)
    })
}
