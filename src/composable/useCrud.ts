import { computed, reactive, ref, toRaw, type Ref } from 'vue'
import type { SuccessResponse } from '@/request/response'
import { Notification, type DrawerRef, type FormRef } from 'li-daisy'
import { useRoute, useRouter } from 'vue-router'
import { pickvalidQuery } from '@/utils'

interface CrudOptions<
  FetchRes,
  Model extends { id: number },
  Query extends object = Record<string, any>,
  CreateReq extends object = Record<string, any>,
  UpdateReq extends object = Record<string, any>,
> {
  modelName?: string
  fetch: (query?: Query) => Promise<SuccessResponse<FetchRes>>
  create?: (data: CreateReq) => Promise<SuccessResponse<Model>>
  update?: (id: number, data: UpdateReq) => Promise<SuccessResponse<Model>>
  remove?: (id: number) => Promise<SuccessResponse<any>>

  onFetchBefore?: (query: Query) => Query
  onFetchAfter?: (data: FetchRes) => void

  initForm: () => Model
  initQuery: () => Query
  drawerRef: Ref<DrawerRef | undefined>
  formRef: Ref<FormRef | undefined>
  onOpenDrawerForCreateBefore?: () => void
  OnOpenDrawerForUpdateBefore?: () => void
}

export function useCrud<
  FetchRes,
  Model extends { id: number },
  Query extends object = Record<string, any>,
  CreateReq extends object = Record<string, any>,
  UpdateReq extends object = Record<string, any>,
>(options: CrudOptions<FetchRes, Model, Query, CreateReq, UpdateReq>) {
  // 必须数据
  const loading = ref(false)

  const form = reactive<Model>(options.initForm())

  const query = reactive<Query>(options.initQuery())
  const error = ref<string | null>(null)

  const operation = ref<'创建' | '更新'>('创建')
  const drawerTitle = computed(() =>
    options.modelName ? operation.value + options.modelName : operation.value + '操作'
  )

  // 常用数据 list pages
  const list = ref<Model[]>([])
  const pages = ref(1)

  // 辅助变量
  const updateId = ref<number>(0)

  const route = useRoute()
  const router = useRouter()

  const fetch = async () => {
    loading.value = true
    error.value = null
    try {
      let q = toRaw(query) as Query

      //  同步 query 到路由
      router.replace({
        path: route.path,
        query: { ...route.query, ...pickvalidQuery(q) },
      })

      // onFetchBefore：请求前参数处理
      if (options.onFetchBefore) q = options.onFetchBefore(q)
      // fetchList：发起请求
      const res = await options.fetch(q)
      // onFetchAfter：请求后数据处理
      options.onFetchAfter?.(res.data)
    } finally {
      loading.value = false
    }
  }

  fetch()

  const resetForm = () => {
    Object.assign(form, options.initForm())
  }

  const openDrawer = (row?: Model | null, reset: boolean = true) => {
    // 恢复默认状态
    updateId.value = 0
    operation.value = '创建'

    if (reset) resetForm()

    if (row) {
      // 更新
      updateId.value = row.id
      // 设置form等准备update
      Object.assign(form, row)
      updateId.value = row.id
      operation.value = '更新'

      options.OnOpenDrawerForUpdateBefore?.()
    } else {
      // 创建
      options.onOpenDrawerForCreateBefore?.()
    }

    options.drawerRef.value?.open()
  }

  const handleCreate = async () => {
    if (!options.create) return

    await options.create({ ...form } as CreateReq)
    Notification.success({
      title: '创建成功',
      message: `创建${options.modelName || '记录'}成功`,
    })
    await fetch()
    options.drawerRef.value?.close()
  }

  const handleSubmit = () => {
    options.formRef.value
      ?.validate()
      .then(() => {
        updateId.value !== 0 ? handleUpdate() : handleCreate()
      })
      .catch(() => {
        Notification.warning({
          title: '请求失败',
          message: '参数错误',
        })
      })
  }

  const handleUpdate = async () => {
    if (!options.update) return

    await options.update(updateId.value, { ...form } as UpdateReq)
    Notification.success({
      title: '更新成功',
      message: `更新${options.modelName || '记录'}成功`,
    })
    await fetch()
    options.drawerRef.value?.close()
  }

  const handleDelete = async (id: number) => {
    if (!options.remove) return
    await options.remove(id)
    Notification.success({
      title: '删除成功',
      message: '成功删除该记录',
    })
    await fetch()
  }

  return {
    form,
    query,

    operation,
    drawerTitle,

    loading,
    list,
    pages,

    resetForm,
    openDrawer,
    // handlePagingChange,
    fetch,
    handleCreate,
    handleUpdate,
    handleDelete,
    handleSubmit,
  }
}
