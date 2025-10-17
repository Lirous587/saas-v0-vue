import request from '@/request'
import { refreshAccessToken } from '@/composable/useTokenRefresh'

export interface uploadImgReq {
  object: Blob
  path?: string
  description?: string
  category_id?: number
}

export interface Img {
  id: number
  description?: string
  url: string
}

interface ImgRes {
  id: number
  url: string
  description?: string
  created_at: string
}

export interface ImgQuery {
  page: number
  page_size: number
  keyword: string
  category_id?: number
  deleted?: boolean
}

export interface ImgList {
  list: Array<ImgRes>
  pages: number
}

export const uploadImg = async (req: uploadImgReq) => {
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

  return request.post<Img>('/api/v1/img/upload', form, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

// 软删除进回收站，硬删除直接删除
export const deleteImg = (id: number, hard = false) => {
  return request.delete(`/api/v1/img/${id}`, {
    params: {
      hard,
    },
  })
}

export const getImgs = (query?: ImgQuery) => {
  return request.get<ImgList>(`/api/v1/img`, {
    params: {
      ...query,
    },
  })
}

// 删除回收站图片
export const deleteImgFromRecycle = (id: number) => {
  return request.delete(`/api/v1/img/recycle/${id}`)
}

// 恢复回收站图片
export const restoreImgFromRecycle = (id: number) => {
  return request.put(`/api/v1/img/recycle/${id}`)
}

export interface ImgCategory {
  id: number
  title: string
  prefix: string
}

export interface createImgCategoryReq {
  title: string
  prefix?: string
}

export interface updateImgCategoryReq {
  title: string
  prefix?: string
}

export const getImgCategories = () => {
  return request.get<ImgCategory[]>(`/api/v1/img/categories`)
}

export const createImgCategory = (req: createImgCategoryReq) => {
  return request.post<ImgCategory>('/api/v1/img/category', req)
}

export const updateImgCategory = (id: number, req: createImgCategoryReq) => {
  return request.put<ImgCategory>(`/api/v1/img/category/${id}`, req)
}
export const deleteImgCategory = (id: number) => {
  return request.delete(`/api/v1/img/category/${id}`)
}
