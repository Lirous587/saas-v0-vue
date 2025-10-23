import request from '@/request'

export interface Tenant {
  created_at: number
  description: string
  id: number
  name: string
  // price: number
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

export interface GetTenantListQuery {
  keyword?: string
  last_id: number
  page_size: number
}

export const GetTenantList = (query: GetTenantListQuery) => {
  return request.get<Tenant[]>('/v1/tenant', {
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
