import request from '@/request'

export interface Tenant {
  created_at: number
  description: string
  id: number
  name: string
  updated_at: number
}

export interface CreateTenantRequest {
  name: string
  description: string
  plan_id: number
}

export const CreateTenant = (req: CreateTenantRequest) => {
  return request.post<Tenant>('/v1/tenant', req)
}

interface UpdateTenantRequest {
  description: string
  id: string
}

export const UpdateTenant = (req: UpdateTenantRequest) => {
  return request.put<Tenant>('/v1/tenant', req)
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

// todo
// 升级租户
// const UpgradeTenant = () => {}
