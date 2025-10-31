import request from '@/request'

//#region 评论/回复 点赞/取消 删除
interface CreateCommentRequest {
  content: string
  parent_id?: string
  root_id?: string
}

export const CreateComment = (tenantID: string, belongKey: string, req: CreateCommentRequest) => {
  return request.post(`/v1/comment/${tenantID}/${belongKey}`, req)
}

export const ToggleLike = (tenantID: string, commentID: string) => {
  return request.put(`/v1/comment/${tenantID}/like/${commentID}`)
}

export const DeleteComment = (tenantID: string, commentID: string) => {
  return request.delete(`/v1/comment/${tenantID}/${commentID}`)
}
//#endregion

//#region 审计
interface AuditRequest {
  action: 'accept' | 'reject'
}

export const Audit = (tenantID: string, commentID: string, req: AuditRequest) => {
  return request.put(`/v1/comment/${tenantID}/${commentID}`, req)
}
//#endregion

//#region 获取roots replies
interface User {
  avatar: string
  id: string
  nickname: string
}
interface GetGetRootsQuery {
  last_id: string
  page_size: number
}

interface CommentRoot {
  id: string
  root_id: string
  parent_id: string
  user: User
  is_liked: boolean
  content: string
  like_count: number
  replies_count: number
  created_at: number
}

export const GetRoots = (tenantID: string, belongKey: string, query: GetGetRootsQuery) => {
  return request.get<CommentRoot[]>(`/v1/comment/${tenantID}/${belongKey}/roots`, {
    params: {
      ...query,
    },
  })
}

interface GetRepliesQuery {
  last_id: string
  page_size: number
}

export const GetReplies = (
  tenantID: string,
  belongKey: string,
  rootID: string,
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

export const CreateCommentPlate = (tenantID: string, req: CreateCommentPlateRequest) => {
  return request.post(`/v1/comment/${tenantID}/plate`, req)
}

interface UpdateCommentPlateRequest {
  belong_key: string
  related_url: string
  summary: string
}

export const UpdateCommentPlate = (
  tenantID: string,
  plateID: string,
  req: UpdateCommentPlateRequest
) => {
  return request.put(`/v1/comment/${tenantID}/plate/${plateID}`, req)
}

export const DeleteCommentPlate = (tenantID: string, plateID: string) => {
  return request.delete(`/v1/comment/${tenantID}/plate/${plateID}`)
}

interface CommentPlateQuery {
  belong_key: string
  related_url: string
  summary: string
}

export const GetCommentPlates = (tenantID: string, query: CommentPlateQuery) => {
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
  tenantID: string,
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

export const GetPlateConfig = (tenantID: string, plateID: string) => {
  return request.get<PlateConfigResponse>(`/v1/comment/${tenantID}/plate/config/${plateID}`)
}
//#endregion

//#region tenant级别配置
interface SetTenantConfigRequest {
  if_audit: boolean
}

export const SetTenantConfig = (tenantID: string, req: SetTenantConfigRequest) => {
  return request.put(`/v1/comment/${tenantID}/config`, req)
}

interface TenantConfigResponse {
  client_token: string
  if_audit: boolean
  created_at: number
  updated_at: number
}

export const GetTenantConfig = (tenantID: string) => {
  return request.get<TenantConfigResponse>(`/v1/comment/${tenantID}/config`)
}
//#endregion
