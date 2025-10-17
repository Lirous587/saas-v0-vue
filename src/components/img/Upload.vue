<template>
  <div>
    <div class="cursor-pointer" @click="modalRef?.open">
      <div
        v-if="!hasTriggerSlot"
        class="aspect-square border-2 border-dashed border-base-300 rounded-lg flex items-center justify-center hover:border-primary hover:bg-base-100 transition-colors"
        :class="sizeComputed"
      >
        <img
          v-if="modelValue"
          :src="modelValue"
          class="w-full h-full object-cover rounded-md"
          alt="预览图片"
        />
        <div
          v-else
          class="flex flex-col items-center text-base-content/60 group-hover:text-primary"
        >
          <PlusIcon class="w-6 h-6 mb-1" />
          <span class="text-xs">上传图片</span>
        </div>
      </div>
      <slot v-else name="trigger"> </slot>
    </div>

    <Modal
      ref="modalRef"
      :size="
        isFullScreen
          ? 'w-screen h-screen max-w-none max-h-none min-w-sm rounded-none'
          : 'h-[620px] max-w-[90%] lg:max-w-[800px] min-w-sm'
      "
    >
      <template #header="{ close }">
        <div class="w-full flex justify-between border-b border-base-300 items-center p-3 h-[50px]">
          <h2 class="font-bold text-base-content/60">图片上传</h2>

          <div
            class="flex items-center gap-x-2 *:w-5 *:h-5 *:text-base-content/60 *:cursor-pointer"
          >
            <ArrowsPointingInIcon v-if="isFullScreen" @click="toggleFullScreen" />
            <ArrowsPointingOutIcon v-else @click="toggleFullScreen" />
            <XMarkIcon @click="close" />
          </div>
        </div>
      </template>

      <template #body>
        <div class="flex flex-col p-4 h-full">
          <div
            class="flex-1 flex flex-col overflow-hidden lg:flex-row gap-4 *:border *:border-base-300"
          >
            <!-- 左边裁剪 -->
            <div class="flex-1 flex relative">
              <div
                v-show="tempImgUrl"
                class="absolute top-0 right-0 bg-base-300/60 p-1 rounded-bl-md cursor-pointer z-1"
              >
                <TrashIcon class="w-5" @click="reset" />
              </div>

              <img
                v-if="tempImgUrl"
                ref="imgRef"
                class="object-contain"
                :src="tempImgUrl"
                alt="裁剪图片"
              />

              <label v-else class="flex items-center justify-center w-full cursor-pointer">
                <ArrowUpTrayIcon
                  class="h-12 w-12 text-base-content/60 hover:text-primary transition-colors"
                />
                <input type="file" accept="image/*" hidden @change="onFileChange" />
              </label>
            </div>

            <!-- 右边预览 -->
            <div ref="previewImgBoxRef" class="flex-1 overflow-hidden"></div>
          </div>

          <Form
            ref="formRef"
            :form="uploadImgReqOpt"
            :schema="schema"
            class="flex flex-col mt-3 *:py-0 *:my-0 h-fit"
            label-width="50px"
            align="horizontal"
          >
            <FormItem label="图片分类" name="category_id" trigger="change">
              <ImgCategory v-model="uploadImgReqOpt.category_id" usage="upload" size="xs" />
            </FormItem>
            <FormItem label="图片路径" name="path" trigger="change">
              <TextInput v-model="uploadImgReqOpt.path" placeholder="可选" size="xs" />
            </FormItem>
            <FormItem label="描述" name="description">
              <TextInput v-model="uploadImgReqOpt.description" placeholder="可选" size="xs" />
            </FormItem>
            <div class="flex items-center ml-auto">
              <button type="button" class="btn btn-xs btn-primary btn-dash" @click="uploadCropped">
                上传
              </button>

              <button
                type="button"
                class="btn btn-xs btn-primary btn-dash ml-3"
                @click="resetForm(uploadImgReqOpt)"
              >
                重置
              </button>
            </div>
          </Form>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onBeforeUnmount, reactive, useSlots, computed, provide, watch } from 'vue'
import {
  Modal,
  type ModalRef,
  Form,
  FormItem,
  TextInput,
  useYup,
  type FormRef,
  Message,
  Notification,
} from 'li-daisy'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import {
  ArrowUpTrayIcon,
  XMarkIcon,
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
  TrashIcon,
  PlusIcon,
} from '@heroicons/vue/24/outline'
import { resetForm } from '@/utils'
import { uploadImg, type Img, type uploadImgReq } from '@/api/img'
import type { SuccessResponse } from '@/request/response'
import ImgCategory from './Category.vue'

const modelValue = defineModel<string>()

const emit = defineEmits<{
  upload: []
}>()

const props = withDefaults(
  defineProps<{
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    initId?: number
  }>(),
  {
    size: 'md',
    initId: 0,
  }
)

provide('category_id', props.initId)

watch(
  () => props.initId,
  newVal => {
    uploadImgReqOpt.category_id = newVal
  }
)

const sizeComputed = computed(() => {
  switch (props.size) {
    case 'xs':
      return 'w-10'
    case 'sm':
      return 'w-20'
    case 'md':
      return 'w-30'
    case 'lg':
      return 'w-40'
    case 'xl':
      return 'w-50'
    default:
      return 'w-30'
  }
})

const slots = useSlots()

const modalRef = ref<ModalRef>()
const imgRef = ref<HTMLImageElement>()
const previewImgBoxRef = ref<HTMLDivElement>()

const tempImgUrl = ref<string>('')

const isFullScreen = ref(false)

const formRef = ref<FormRef>()

const yup = useYup()

const schema = yup.object({
  path: yup
    .string()
    .trim()
    .matches(/^[\u4e00-\u9fa5a-zA-Z0-9._\-\/]*$/, '文件名不能包含非法字符')
    .test('not-only-ext', '不能只输入扩展名', value => {
      if (!value) return true
      return !/^\.[a-zA-Z0-9]+$/.test(value)
    })
    .max(100, '文件名不能超过100个字符'),
  description: yup.string().trim().max(60),
})

const uploadImgReqOpt = reactive({
  path: '',
  description: '',
  category_id: 0,
})

let cropper: Cropper | null = null

const reset = () => {
  if (cropper) cropper.destroy()
  if (tempImgUrl.value) URL.revokeObjectURL(tempImgUrl.value)
  tempImgUrl.value = ''
}

const onFileChange = async (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) {
    reset()
    tempImgUrl.value = URL.createObjectURL(file)
    await nextTick()
    modalRef.value?.open()
  }

  newCropper()
}

const newCropper = () => {
  if (imgRef.value && previewImgBoxRef.value) {
    cropper = new Cropper(imgRef.value, {
      viewMode: 1,
      autoCropArea: 0.5,
      dragMode: 'crop',
      preview: previewImgBoxRef.value,
    })
  }
}

const uploadCropped = async () => {
  try {
    await formRef.value.validate()
  } catch {
    Notification.error({
      title: '表单验证失败',
      message: '请正确填写表单',
    })
    return
  }

  if (cropper) {
    const canvas = cropper.getCroppedCanvas()
    canvas.toBlob(async blob => {
      if (blob) {
        const uploadImgReq: uploadImgReq = {
          object: blob,
        }

        if (uploadImgReqOpt.path) uploadImgReq.path = uploadImgReqOpt.path
        if (uploadImgReqOpt.description) uploadImgReq.description = uploadImgReqOpt.description
        if (uploadImgReqOpt.category_id) uploadImgReq.category_id = uploadImgReqOpt.category_id

        await uploadImg(uploadImgReq)
          .then((res: SuccessResponse<Img>) => {
            modelValue.value = res.data.url
            Message.success('上传成功')
            emit('upload')
            modalRef.value.close()
            return res.data.url
          })
          .finally(() => {})
      } else {
        Message.error('无效的对象上传')
        return null
      }
    }, 'image/png')
  }
}

const toggleFullScreen = () => {
  isFullScreen.value = !isFullScreen.value

  // 全屏切换后重新初始化 cropper，确保尺寸正确
  setTimeout(() => {
    if (cropper && imgRef.value) {
      cropper.destroy()
      newCropper()
    }
  }, 100)
}

const hasTriggerSlot = computed(() => !!slots.trigger)

onBeforeUnmount(() => {
  if (cropper) {
    cropper.destroy()
    cropper = null
  }
  if (tempImgUrl.value) {
    // 释放本地图片预览资源
    URL.revokeObjectURL(tempImgUrl.value)
  }
})
</script>

<style scoped>
:deep(.li-modal-body) {
  padding: 0;
  height: calc(100% - 60px);
}
</style>
