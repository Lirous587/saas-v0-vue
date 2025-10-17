<template>
  <div class="space-y-5 flex flex-col">
    <form class="flex shrink-0 items-center" @submit.prevent="fetch">
      <TextInput
        v-model="query.keyword"
        class="w-80"
        size="sm"
        color="base"
        placeholder="图片搜素..."
      >
        <template #suffix>
          <button type="submit">
            <MagnifyingGlassIcon class="h-5 aspect-square hover:cursor-pointer" @click="fetch" />
          </button>
        </template>
      </TextInput>
    </form>

    <ImgCategory v-model="query.category_id" :usage="props.mode" @select="handleChangeCategory" />

    <Transition name="previewImg">
      <div
        v-if="previewImgObject.id !== 0"
        class="min-w-[768px] fixed inset-0 z-10 flex items-center justify-center gap-x-10"
      >
        <div class="fixed inset-0 bg-neutral opacity-50 z-[-1]"></div>

        <XCircleIcon
          class="w-10 cursor-pointer absolute top-5 right-15 lg:right-20 xl:right-30 mx-auto text font-bold text-shadow-xl"
          @click="closePreview"
        />

        <div class="btn btn-circle btn-neutral">
          <ArrowLeftIcon class="w-20" @click="handleChangePreviewImgDebounced('last')" />
        </div>
        <div class="h-[80vh] w-[70vw]">
          <Transition name="fade" mode="out-in">
            <img
              :key="previewImgObject.url"
              class="h-full w-full object-contain rounded-lg"
              :src="previewImgObject.url"
            />
          </Transition>
        </div>
        <div class="btn btn-circle btn-neutral" @click="handleChangePreviewImgDebounced('next')">
          <ArrowRightIcon class="w-20" />
        </div>

        <div
          class="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full text-sm"
        >
          {{ previewImgObject.index + 1 }} / {{ list.length }}
        </div>
      </div>
    </Transition>

    <Skeleton :loading="loading" :delay="800">
      <template #content>
        <div class="min-w-lg grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-3 gap-x-4">
          <ImgUpload
            v-if="props.mode === 'gallery'"
            :init-id="query.category_id"
            size="md"
            @upload="handleUploadImgCallback"
          >
            <template #trigger>
              <div
                class="box-content max-w-50 aspect-[16/9] overflow-hidden border-2 border-dashed border-se p-2 shadow-md rounded-md duration-200 hover:shadow-xl hover:translate-y-[-4px] hover:scale-105 hover:border-primary flex"
              >
                <div class="m-auto flex flex-col items-center text-base-content/60">
                  <PlusIcon class="w-8 text-secondary hover:text-primary" />
                </div>
              </div>
            </template>
          </ImgUpload>

          <div
            v-for="img in list"
            :key="img.id"
            class="group relative box-content max-w-50 aspect-[16/9] overflow-hidden border border-base-300 p-2 shadow-md rounded-md duration-200 hover:shadow-xl hover:translate-y-[-4px] hover:scale-105"
          >
            <img class="w-full h-full object-cover" :src="img.url" :alt="img.description" />

            <div
              class="opacity-0 group-hover:opacity-100 absolute inset-0 bg-base-content/20 dark:bg-neutral/50 flex justify-center items-center gap-x-5 duration-250 *:h-5 *:text-base-100 *:cursor-pointer"
            >
              <EyeIcon @click="previewImg(img.id)" />
              <component
                :is="copiedImgId === img.id ? DocumentCheckIcon : ClipboardIcon"
                :class="['w-5 transition-colors', copiedImgId === img.id ? 'text-success' : '']"
                :title="copiedImgId === img.id ? '已复制' : '复制链接'"
                @click="copyImgUrl(img.url, img.id)"
              />
              <Popover :z-index="1" position="top" trigger="click">
                <template #trigger>
                  <component
                    :is="props.mode === 'gallery' ? TrashIcon : WrenchScrewdriverIcon"
                    class="h-5"
                    :class="!allowDelte ? 'cursor-not-allowed' : ''"
                  />
                </template>
                <template #content>
                  <template v-if="props.mode === 'gallery'">
                    <div
                      class="bg-base-100 border border-base-300 rounded-md shadow-md flex flex-col gap-2"
                    >
                      <h2 class="text-xs font-bold border-b border-base-300 px-4 py-1.5">
                        请选择删除图片方式
                      </h2>
                      <div class="ml-auto flex w-fit gap-x-1 items-center pb-2 px-2.5">
                        <button class="btn btn-xs btn-neutral" @click="handleDelete(img.id, false)">
                          <span v-if="softDeleteBtnLoading" class="loading loading-xs"></span>
                          软删除
                        </button>
                        <button class="btn btn-xs btn-warning" @click="handleDelete(img.id, true)">
                          <span v-if="hardDeleteBtnLoading" class="loading loading-xs"></span>
                          硬删除
                        </button>
                      </div>
                    </div></template
                  >
                  <template v-else>
                    <div
                      class="bg-base-100 border border-base-300 rounded-md shadow-md flex flex-col gap-2"
                    >
                      <h2 class="text-xs font-bold border-b border-base-300 px-2.5 py-1.5 w-32">
                        如何操作位于回收站的该图片？
                      </h2>
                      <div class="ml-auto flex w-fit gap-x-1 items-center pb-2 px-2.5">
                        <button
                          class="btn btn-xs btn-dash btn-warning"
                          @click="handleDeleteFromRecycle(img.id)"
                        >
                          <span v-if="recycleDeleteBtnLoading" class="loading loading-xs"></span>
                          删除
                        </button>
                        <button
                          class="btn btn-xs btn-dash btn-success"
                          @click="handleRestoreFromRecycle(img.id)"
                        >
                          <span v-if="recycleRestoreBtnLoading" class="loading loading-xs"></span>
                          恢复
                        </button>
                      </div>
                    </div>
                  </template>
                </template>
              </Popover>
            </div>
          </div>
        </div>
      </template>
      <template #skeleton>
        <div class="min-w-lg grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-3 gap-x-4">
          <div
            v-for="index in skeletonCount"
            :key="index"
            class="group relative box-content max-w-50 aspect-[16/9] overflow-hidden border border-base-300 p-2 shadow-md rounded-md duration-200 hover:shadow-xl hover:translate-y-[-4px] hover:scale-105 skeleton"
          ></div>
        </div>
      </template>
    </Skeleton>

    <Paging
      ref="pagingRef"
      v-model="query.page"
      class="mx-auto"
      :pages="pages"
      @change="
        async () => {
          await nextTick()
          fetch()
        }
      "
    />
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, reactive, ref } from 'vue'
import {
  MagnifyingGlassIcon,
  ClipboardIcon,
  EyeIcon,
  TrashIcon,
  DocumentCheckIcon,
  PlusIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  XCircleIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/vue/24/outline'

import { TextInput, Paging, Popover, Message, Skeleton } from 'li-daisy'
import type { DrawerRef, FormRef, PagingSize } from 'li-daisy'

import ImgCategory from '@/components/img/Category.vue'

import {
  getImgs,
  uploadImg,
  deleteImg,
  deleteImgFromRecycle,
  restoreImgFromRecycle,
} from '@/api/img'
import type { Img, ImgQuery, ImgList, uploadImgReq } from '@/api/img'

import { useCrud } from '@/composable/useCrud'
import ImgUpload from '@/components/img/Upload.vue'
import { debounce } from '@/utils'
import { useRoute } from 'vue-router'

const props = withDefaults(
  defineProps<{
    mode?: 'gallery' | 'recycle'
  }>(),
  {
    mode: 'gallery',
  }
)

const drawerRef = ref<DrawerRef>()
const formRef = ref<FormRef>()
const pagingRef = ref<PagingSize>()

const route = useRoute()

const {
  query,

  loading,
  list,
  pages,

  fetch,
} = useCrud<ImgList, Img, ImgQuery, uploadImgReq>({
  modelName: '图库',
  fetch: getImgs,
  create: data => uploadImg(data),
  remove: id => deleteImg(id),
  onFetchAfter: res => {
    list.value = res.list
    pages.value = res.pages
  },
  drawerRef: drawerRef,
  initForm: () => {
    return {
      id: 0,
      description: '',
      url: '',
    }
  },
  initQuery: () => {
    return {
      page: Number(route.query.page ?? 1),
      page_size: Number(route.query.page_size ?? 10),
      category_id: Number(route.query.category_id ?? 0),
      keyword: typeof route.query.keyword === 'string' ? route.query.keyword : '',
      deleted: props.mode === 'gallery' ? false : true,
    }
  },
  formRef,
})

const handleChangeCategory = (id: number) => {
  query.category_id = id
  query.page = 1
  fetch()
}

const skeletonCount = computed(() => {
  return Math.floor(Math.random() * 8) + 8 // 8-16之间的随机数
})

// 上传图片之后的回调
const handleUploadImgCallback = () => {
  query.page = 1
  fetch()
}

// 预览图片
const previewImgObject = reactive<{
  id: number
  url: string
  index: number
}>({
  id: 0,
  url: '',
  index: -1,
})
const previewImg = (imgId?: number) => {
  const index = list.value.findIndex(img => img.id === imgId)
  previewImgObject.id = imgId
  previewImgObject.index = index
  previewImgObject.url = list.value[index].url
}

const handleChangePreviewImgDebounced = debounce(
  (where: 'last' | 'next') => handleChangePreviewImg(where),
  50
)

const handleChangePreviewImg = (where: 'last' | 'next') => {
  if (list.value.length === 0) return

  let newIndex: number

  if (where === 'next') {
    // 下一张：如果是最后一张，回到第一张
    newIndex = (previewImgObject.index + 1) % list.value.length
  } else {
    // 上一张：如果是第一张，回到最后一张
    newIndex = previewImgObject.index - 1 < 0 ? list.value.length - 1 : previewImgObject.index - 1
  }

  const newImg = list.value[newIndex]
  previewImgObject.url = newImg.url
  previewImgObject.id = newImg.id
  previewImgObject.index = newIndex
}

// 关闭预览
const closePreview = () => {
  previewImgObject.id = 0
  previewImgObject.url = ''
  previewImgObject.index = -1
}

const handleKeydown = (event: KeyboardEvent) => {
  // 只在预览模式下处理键盘事件
  if (previewImgObject.id === 0) return

  switch (event.key) {
    case 'Escape':
      closePreview()
      break
    case 'ArrowLeft':
      handleChangePreviewImg('last')
      break
    case 'ArrowRight':
      handleChangePreviewImg('next')
      break
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})

// 复制图片链接
const copiedImgId = ref<number | null>(null)
const copyImgUrl = async (url: string, imgId: number) => {
  try {
    await navigator.clipboard.writeText(url)
    copiedImgId.value = imgId
    Message.success('链接已复制到剪贴板')
  } catch {
    Message.error('复制失败')
  }
}

// 删除逻辑 --> 对于图库
const hardDeleteBtnLoading = ref(false)
const softDeleteBtnLoading = ref(false)

const allowDelte = computed(() => {
  return !hardDeleteBtnLoading.value && !softDeleteBtnLoading.value
})

const handleDelete = (id: number, hard = false) => {
  hard ? (hardDeleteBtnLoading.value = true) : (softDeleteBtnLoading.value = true)

  deleteImg(id, hard)
    .then(() => {
      Message.success('删除成功')
    })
    .finally(() => {
      hard ? (hardDeleteBtnLoading.value = false) : (softDeleteBtnLoading.value = false)
      fetch()
    })
}

// 回收站操作
const recycleDeleteBtnLoading = ref(false)
const recycleRestoreBtnLoading = ref(false)
const handleDeleteFromRecycle = (id: number) => {
  recycleDeleteBtnLoading.value = true
  deleteImgFromRecycle(id)
    .then(() => {
      Message.success('从回收站删除图片成功')
    })
    .finally(() => {
      recycleDeleteBtnLoading.value = false
      fetch()
    })
}

const handleRestoreFromRecycle = (id: number) => {
  recycleRestoreBtnLoading.value = true
  restoreImgFromRecycle(id)
    .then(() => {
      Message.success('从回收站恢复图片成功')
    })
    .finally(() => {
      recycleRestoreBtnLoading.value = false
      fetch()
    })
}
</script>

<style scoped>
.previewImg-enter-active,
.previewImg-leave-active {
  transition: all 0.5s ease;
}

.previewImg-enter-from,
.previewImg-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0.2;
  scale: 0.6;
}
</style>
