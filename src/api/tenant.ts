import request from '@/request'

type planType = 'free' | 'care' | 'pro'

export const PlanFree: planType = 'free'
export const PlanCare: planType = 'care'
export const PlanPro: planType = 'pro'

export interface Tenant {
  id: string
  name: string
  creator_id: 0
  plan_type: planType
  description: string
  created_at: number
  updated_at: number
}

type billingCycle = 'monthly' | 'yearly' | 'lifetime'

export const BillingCycleMonthly: billingCycle = 'monthly'
export const BillingCycleYearly: billingCycle = 'yearly'
export const BillingCycleLifetime: billingCycle = 'lifetime'

export interface CreateTenantRequest {
  name: string
  description: string
  billing_cycle: billingCycle
  plan_type: planType
}

export const CreateTenant = (req: CreateTenantRequest) => {
  return request.post('/v1/tenant', req)
}

export const ReadTenant = (id: string) => {
  return request.get<Tenant>(`/v1/tenant/${id}`, {
    my_silent: true,
  })
}

export interface UpdateTenantRequest {
  description: string
}

export const UpdateTenant = (id: string, req: UpdateTenantRequest) => {
  return request.put<Tenant>(`/v1/tenant/${id}`, req)
}

export interface GetTenantsQuery {
  keyword?: string
  prev_cursor?: string
  next_cursor?: string
  page_size: number
}

export interface TenantPage {
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
  tenant_id: string
  billing_cycle: string
  can_upgrade: boolean
  plan_type: string
  status: string
  start_time: number
  end_time: number
}

export const GetTenantPlan = (id: string) => {
  return request.get<TenantPlan>(`/v1/tenant/${id}/plan`)
}

// todo
// 升级租户
// const UpgradeTenant = () => {}
