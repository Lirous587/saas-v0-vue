<template>
  <div>
    <Skeleton :loading="loading" :delay="500">
      <template #content>
        <div class="flex gap-2 items-center flex-wrap">
          <button
            type="button"
            class="btn btn-dash"
            :class="[btnSize, model === 0 ? 'btn-primary' : '']"
            @click="selectCategory(0)"
          >
            全部
          </button>
          <div
            v-for="category in categories"
            :key="category.prefix"
            class="group relative rounded-sm tooltip"
            :class="{
              'animate-shake': inAbnormalMode,
            }"
            :data-tip="category.prefix"
          >
            <button
              class="btn btn-dash"
              type="button"
              :class="[btnSize, model === category.id ? 'btn-primary' : '']"
              @click="selectCategory(category.id)"
            >
              {{ category.title }}
            </button>

            <div
              v-if="inAbnormalMode"
              class="absolute flex group-hover:opacity-100 opacity-0 inset-0 bg-base-content/80 dark:bg-neutral/90 duration-300 rounded-sm *:m-auto"
            >
              <!-- 更新 -->
              <ArrowPathIcon
                v-if="nowMode === 'update'"
                class="w-5 text-base-100 dark:text-neutral-content"
                @click="handleUpdateCategory(category.id)"
              />

              <!-- 删除 -->
              <Popconfirm v-else @confirm="handleDelete(category.id)">
                <template #trigger>
                  <TrashIcon class="w-5 text-base-100 dark:text-neutral-content" />
                </template>
              </Popconfirm>
            </div>
          </div>

          <!-- 新增 -->
          <button
            v-if="props.usage === 'gallery'"
            class="btn"
            type="button"
            :class="[btnSize]"
            @click="handleCreateCategory"
          >
            <PlusCircleIcon class="w-5" />
          </button>

          <!-- 更新 -->
          <Transition v-if="props.usage === 'gallery'">
            <button
              v-if="nowMode !== 'update'"
              class="btn"
              type="button"
              :class="[btnSize]"
              @click="enterMode('update')"
            >
              <WrenchScrewdriverIcon class="w-5" />
            </button>
          </Transition>

          <!-- 删除 -->
          <Transition v-if="props.usage === 'gallery'">
            <button
              v-if="nowMode !== 'delete'"
              class="btn"
              type="button"
              :class="[btnSize]"
              @click="enterMode('delete')"
            >
              <MinusCircleIcon class="w-5" />
            </button>
          </Transition>
        </div>
      </template>
      <template #skeleton>
        <div class="flex gap-2 items-center flex-wrap">
          <SkeletonItem v-for="i in skeletonCount" :key="i" class="w-12 h-8 !rounded-sm">
          </SkeletonItem>
        </div>
      </template>
    </Skeleton>

    <Modal v-if="props.usage === 'gallery'" ref="modalRef">
      <template #body>
        <Form ref="formRef" :form="form" :schema="schema" align="vertical">
          <FormItem name="title" label="分类名">
            <TextInput v-model="form.title" placeholder="输入分类名"></TextInput>
          </FormItem>
          <FormItem name="prefix" label="URL前缀">
            <TextInput v-model="form.prefix" placeholder="输入URL前缀"></TextInput>
          </FormItem>
          <FormItem>
            <button type="button" class="btn btn-sm w-full" @click="handelSubmit">
              <span v-if="formBtnLoading" class="loading loading-sm loading-infinity"></span>
              {{ manageTitle }}
            </button>
          </FormItem>
        </Form>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, onMounted, onUnmounted, reactive, ref, watch, type Ref } from 'vue'

import {
  createImgCategory,
  deleteImgCategory,
  getImgCategories,
  updateImgCategory,
} from '@/api/img'
import type { ImgCategory } from '@/api/img'
import {
  Modal,
  Skeleton,
  SkeletonItem,
  Form,
  FormItem,
  TextInput,
  type FormRef,
  type ModalRef,
  useYup,
  Message,
  Popconfirm,
  Notification,
} from 'li-daisy'
import {
  ArrowPathIcon,
  MinusCircleIcon,
  PlusCircleIcon,
  TrashIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/vue/24/outline'
import { resetForm } from '@/utils'

interface PropsType {
  size?: 'xs' | 'sm'
  usage?: 'upload' | 'gallery' | 'recycle'
}
const props = withDefaults(defineProps<PropsType>(), {
  size: 'sm',
  usage: 'gallery',
})

const model = defineModel<number>()

const emit = defineEmits<{
  select: [id: number]
}>()

const categories = ref<ImgCategory[]>([])

const loading = ref(false)

const btnSize = computed(() => {
  switch (props.size) {
    case 'xs':
      return 'btn-xs'
    case 'sm':
      return 'btn-sm'
    default:
      return 'btn-sm'
  }
})

const skeletonCount = computed(() => {
  return Math.floor(Math.random() * 3) + 5 // 3-8之间的随机数
})

const getCategories = () => {
  loading.value = true
  getImgCategories()
    .then(res => {
      categories.value = res.data
    })
    .finally(() => {
      loading.value = false
    })
}

const selectCategory = (id: number) => {
  if (model.value === id) return
  model.value = id
  emit('select', id)
}

const injectId = inject<Ref<number>>('category_id', ref(0))

watch(injectId, newId => {
  selectCategory(newId)
})

// 管理标签
const modalRef = ref<ModalRef>()

const form = reactive<ImgCategory>({ id: 0, title: '', prefix: '' })

const formRef = ref<FormRef>()

const yup = useYup()

const schema = yup.object({
  title: yup.string().required('请输入分类名').trim().max(10),
  prefix: yup
    .string()
    .required('请填写前缀')
    .trim()
    .max(20)
    .matches(/^[a-zA-Z0-9_-]+$/, 'URL前缀只能包含英文字母、数字、下划线和连字符'),
})

const formBtnLoading = ref(false)

const manageTitle = computed(() => {
  return form.id === 0 ? '创建分类' : '更新分类'
})

const handelSubmit = async () => {
  try {
    await formRef.value?.validate()
  } catch {
    return
  }

  formBtnLoading.value = true

  const handleCreate = () => {
    return createImgCategory({ title: form.title, prefix: form.prefix })
  }
  const handleUpdate = () => {
    return updateImgCategory(form.id, { title: form.title, prefix: form.prefix })
  }

  const operation = form.id === 0 ? handleCreate : handleUpdate

  operation()
    .then(() => {})
    .finally(() => {
      setTimeout(() => {
        formBtnLoading.value = false
        modalRef.value.close()
      }, 200)

      getCategories()
    })
}

const handleCreateCategory = () => {
  resetForm(form)
  modalRef.value?.open()
  form.id = 0
}

const handleUpdateCategory = (id: number) => {
  resetForm(form)
  modalRef.value?.open()
  form.id = id
}

const nowMode = ref<'delete' | 'update' | 'normal'>('normal')

const inAbnormalMode = computed(() => {
  return nowMode.value !== 'normal'
})
const enterMode = (mode: 'delete' | 'update') => {
  nowMode.value = mode
  const str = mode === 'delete' ? '删除' : '更新'
  Message.info(`已进入${str}分类模式，按ESC键退出`)
}

const existMode = () => {
  const str = nowMode.value === 'delete' ? '删除' : '更新'
  nowMode.value = 'normal'
  Message.info(`已退出${str}分类模式`)
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && nowMode.value !== 'normal') {
    existMode()
  }
}

const handleDelete = async (id: number) => {
  await deleteImgCategory(id)
    .then(() => {
      Notification.info({
        title: '删除成功',
        message: '删除图库分类成功',
      })
    })
    .finally(() => {
      getCategories()
    })
}

onMounted(() => {
  getCategories()
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  scale: 0;
}
@keyframes shake {
  0%,
  100% {
    transform: translate(0, 0) rotateZ(0deg);
  }
  25% {
    transform: translate(-1px, -1px) rotateZ(-2deg);
  }
  50% {
    transform: translate(0, 0) rotateZ(0deg);
  }
  75% {
    transform: translate(1px, -1px) rotateZ(2deg);
  }
}

.animate-shake {
  animation: shake 0.5s ease-in-out infinite;
}
</style>
