import request from '@/request'
import { refreshAccessToken } from '@/composable/useTokenRefresh'

//#region 图片操作
export interface Img {
  id: string
  url: string
  description?: string
}

interface ImgResponse {
  id: string
  url: string
  description?: string
  created_at: number
}

export interface ImgQuery {
  category_id?: string
  keyword: string
  deleted?: boolean
  page: number
  page_size: number
}

export interface ImgList {
  list: ImgResponse[]
  pages: number
}

// todo 上次接口待用预签名重写
export interface UploadImgRequest {
  object: Blob
  path?: string
  category_id?: string
  description?: string
}

export const UploadImg = async (req: UploadImgRequest) => {
  // 先做一个刷新access_token操作 确保上传的时间窗口足够
  await refreshAccessToken()

  const form = new FormData()

  form.append('object', req.object)

  if (req.path) {
    form.append('path', req.path)
  }
  if (req.description) {
    form.append('description', req.description)
  }
  if (req.category_id) {
    form.append('category_id', req.category_id.toString())
  }

  return request.post<Img>('/v1/img/upload', form, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export const GetImgs = (tenantID: string, query?: ImgQuery) => {
  return request.get<ImgList>(`/v1/img/${tenantID}`, {
    params: {
      ...query,
    },
  })
}

// 软删除进回收站，硬删除直接删除
export const DeleteImg = (tenantID: string, imgID: string, hard = false) => {
  return request.delete(`/v1/img/${tenantID}/${imgID}`, {
    params: {
      hard,
    },
  })
}

// 移除回收站图片
export const DeleteImgFromRecycle = (tenantID: string, imgID: string) => {
  return request.delete(`/v1/img/${tenantID}/recycle/${imgID}`)
}

// 恢复回收站图片
export const RestoreImgFromRecycle = (tenantID: string, imgID: string) => {
  return request.put(`/v1/img/${tenantID}/recycle/${imgID}`)
}
//#endregion

//#region R2配置
interface SetR2configRequest {
  access_key_id: string
  account_id: string
  delete_bucket: string
  public_bucket: string
  public_url_prefix: string
  secret_access_key?: string
}

export const SetR2config = (tenantID: st, req: SetR2configRequest) => {
  return request.put(`/v1/img/${tenantID}/r2_config`, req)
}

interface R2ConfigResponse {
  access_key_id: string
  account_id: string
  delete_bucket: string
  public_bucket: string
  public_url_prefix: string
}

export const GetR2Config = (tenantID: string) => {
  return request.get<R2ConfigResponse>(`/v1/img/${tenantID}/r2_config`)
}
//#endregion

//#region 图库分类
export interface ImgCategory {
  id: string
  prefix: string
  title: string
  created_at: number
}

export interface CreateImgCategoryRequset {
  title: string
  prefix: string
}

export const CreateImgCategory = (tenantID: string, req: CreateImgCategoryRequset) => {
  return request.post(`/v1/img/${tenantID}/category`, req)
}

export interface UpdateImgCategoryRequest {
  title: string
  prefix: string
}

export const UpdateImgCategory = (
  tenantID: string,
  categoryID: string,
  req: UpdateImgCategoryRequest
) => {
  return request.put(`/v1/img/${tenantID}/category/${categoryID}`, req)
}

export const DeleteImgCategory = (tenantID: string, categoryID: string) => {
  return request.delete(`/v1/img/${tenantID}/category/${categoryID}`)
}

export const GetImgCategories = (tenantID: string) => {
  return request.get<ImgCategory[]>(`/v1/img/${tenantID}/categories`)
}
//#endregion
