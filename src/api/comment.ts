import request from '@/request'

//#region 评论/回复 点赞/取消 删除
interface CreateCommentRequest {
  content: string
  parent_id?: number
  root_id?: number
}

export const CreateComment = (tenantID: number, belongKey: string, req: CreateCommentRequest) => {
  return request.post(`/v1/comment/${tenantID}/${belongKey}`, req)
}

export const ToggleLike = (tenantID: number, id: number) => {
  return request.put(`/v1/comment/${tenantID}/like/${id}`)
}

export const DeleteComment = (tenantID: number, id: number) => {
  return request.delete(`/v1/comment/${tenantID}/${id}`)
}
//#endregion

//#region 审计
interface AuditRequest {
  action: 'accept' | 'reject'
}

export const Audit = (tenantID: number, id: number, req: AuditRequest) => {
  return request.put(`/v1/comment/${tenantID}/${id}`, req)
}
//#endregion

//#region 获取roots replies
interface User {
  avatar: string
  id: number
  nickname: string
}
interface GetGetRootsQuery {
  last_id: number
  page_size: number
}

interface CommentRoot {
  content: string
  created_at: number
  id: number
  is_liked: boolean
  like_count: number
  parent_id: number
  replies_count: number
  root_id: number
  user: User
}

export const GetRoots = (tenantID: number, belongKey: string, query: GetGetRootsQuery) => {
  return request.get<CommentRoot[]>(`/v1/comment/${tenantID}/${belongKey}/roots`, {
    params: {
      ...query,
    },
  })
}

interface GetRepliesQuery {
  last_id: number
  page_size: number
}

export const GetReplies = (
  tenantID: number,
  belongKey: string,
  rootID: number,
  query: GetRepliesQuery
) => {
  return request.get<CommentRoot[]>(`/v1/comment/${tenantID}/${belongKey}/${rootID}/replies`, {
    params: {
      ...query,
    },
  })
}
//#endregion

//#region 评论plate基础操作
interface CreateCommentPlateRequest {
  belong_key: string
  related_url: string
  summary: string
}

export const CreateCommentPlate = (tenantID: number, req: CreateCommentPlateRequest) => {
  return request.post(`/v1/comment/${tenantID}/plate`, req)
}

interface UpdateCommentPlateRequest {
  belong_key: string
  related_url: string
  summary: string
}

export const UpdateCommentPlate = (
  tenantID: number,
  id: number,
  req: UpdateCommentPlateRequest
) => {
  return request.put(`/v1/comment/${tenantID}/plate/${id}`, req)
}

export const DeleteCommentPlate = (tenantID: number, id: number) => {
  return request.delete(`/v1/comment/${tenantID}/plate/${id}`)
}

interface CommentPlateQuery {
  belong_key: string
  related_url: string
  summary: string
}

export const GetCommentPlates = (tenantID: number, query: CommentPlateQuery) => {
  return request.get(`/v1/comment/${tenantID}/plate`, {
    params: {
      ...query,
    },
  })
}
//#endregion

//#region plate级别配置
interface SetPlateConfigRequest {
  if_audit: boolean
}

export const SetPlatetConfig = (
  tenantID: number,
  belongKey: string,
  req: SetPlateConfigRequest
) => {
  return request.put(`/v1/comment/${tenantID}/plate/config/${belongKey}`, req)
}

interface PlateConfigResponse {
  if_audit: boolean
  created_at: number
  updated_at: number
}

export const GetPlateConfig = (tenantID: number, id: number) => {
  return request.get<PlateConfigResponse>(`/v1/comment/${tenantID}/plate/config/${id}`)
}
//#endregion

//#region tenant级别配置
interface SetTenantConfigRequest {
  if_audit: boolean
}

export const SetTenantConfig = (tenantID: number, req: SetTenantConfigRequest) => {
  return request.put(`/v1/comment/${tenantID}/config`, req)
}

interface TenantConfigResponse {
  client_token: string
  if_audit: boolean
  created_at: number
  updated_at: number
}

export const GetTenantConfig = (tenantID: number) => {
  return request.get<TenantConfigResponse>(`/v1/comment/${tenantID}/config`)
}
//#endregion
