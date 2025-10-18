import request from '@/request'

//#region 租户基础操作
interface Tenant {
  created_at: number
  description: string
  id: number
  name: string
  price: number
  updated_at: number
}

interface CreateRequest {
  description: string
  name: string
  plan_id: number
}

export const CreateTenant = (req: CreateRequest) => {
  return request.post<Tenant>('/v1/tenant', req)
}

interface UpdateTenantRequest {
  description: string
  id: string
}

export const UpdateTenant = (req: UpdateTenantRequest) => {
  return request.put<Tenant>('/v1/tenant', req)
}

// todo
// 升级租户
// const UpgradeTenant = () => {}

//#endregion

//#region 获取租户下用户
interface GetTenantUsersQuery {
  nickname: string
  page: number
  page_size: number
}

interface User {
  email: string
  id: number
  nickname: string
}

interface UserList {
  list: User[]
  total: number
}

export const GetTenantUsersRequest = (tenant_id: number, query: GetTenantUsersQuery) => {
  return request.get<UserList>(`/v1/tenant/${tenant_id}/users`, {
    params: {
      ...query,
    },
  })
}
//#endregion

//#region 生成邀请token
interface GenInviteTokenRequest {
  expire_second: number
}

interface InviteResponse {
  token: string
}

export const GenInviteToken = (tenantID: number, req: GenInviteTokenRequest) => {
  return request.post<InviteResponse>(`/v1/tenant/${tenantID}/gen_invite_token`, req)
}
//#endregion

//#region 根据邮件邀请指定用户
interface InviteRequest {
  emails: string[]
  expire_second: number
}

export const Invite = (tenantID: number, req: InviteRequest) => {
  return request.post(`/v1/tenant/${tenantID}/invite`, req)
}
//#endregion
