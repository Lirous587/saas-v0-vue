import request from '@/request'

export interface Tenant {
  id: number
  created_at: number
  description: string
  name: string
  updated_at: number
}

type billingCycle = 'monthly' | 'yearly' | 'lifetime'
type planType = 'free' | 'caring' | 'professional'

export interface CreateTenantRequest {
  name: string
  description: string
  billing_cycle: billingCycle
  plan_type: planType
}

export const CreateTenant = (req: CreateTenantRequest) => {
  return request.post('/v1/tenant', req)
}

export const ReadTenant = (id: number) => {
  return request.get<Tenant>(`/v1/tenant/${id}`, {
    my_silent: true,
  })
}

export interface UpdateTenantRequest {
  description: string
}

export const UpdateTenant = (id: number, req: UpdateTenantRequest) => {
  return request.put<Tenant>(`/v1/tenant/${id}`, req)
}

export interface GetTenantsQuery {
  keyword?: string
  prev_cursor?: string
  next_cursor?: string
  page_size?: string
}

interface TenantPage {
  has_next: boolean
  has_prev: boolean
  items: Tenant[]
  next_cursor: string
  prev_cursor: string
}

export const GetTenants = (query?: GetTenantsQuery) => {
  return request.get<TenantPage>('/v1/tenant', {
    params: {
      ...query,
    },
  })
}

export const CheckTenantName = (name: string) => {
  return request.get('/v1/tenant/check_name', {
    params: {
      name: name,
    },
    my_silent: true,
  })
}

export interface TenantPlan {
  billing_cycle: string
  can_upgrade: boolean
  end_time: number
  plan_type: string
  start_time: number
  status: string
  tenant_id: number
}

export const GetTenantPlan = (id: number) => {
  return request.get<TenantPlan>(`/v1/tenant/${id}/plan`)
}

// todo
// 升级租户
// const UpgradeTenant = () => {}
