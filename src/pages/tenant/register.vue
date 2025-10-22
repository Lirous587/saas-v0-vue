<script setup lang="ts">
import { reactive, ref } from 'vue'
import { CheckTenantName, CreateTenant, type CreateTenantRequest } from '@/api/tenant'
import { Form, FormItem, TextInput, Textarea, type FormRef, useYup } from 'li-daisy'
import { CheckBadgeIcon, ExclamationCircleIcon } from '@heroicons/vue/24/outline'
import { debounce } from '@/utils'
import { router } from '@/main'

const formRef = ref<FormRef>()

const form = reactive<CreateTenantRequest>({
  name: '',
  description: '',
  plan_id: 1,
})

const yup = useYup()

// 自定义验证规则
const schema = yup.object({
  name: yup
    .string()
    .required('请填写租户名')
    .trim()
    .min(2, '租户名至少2个字符')
    .max(20, '租户名最多20个字符')
    .test('uniqueName', '租户名已被占用', async value => {
      if (!value) return true
      try {
        nameValidLoading.value = true
        await debouncedCheckTenantName(value)
        return true
      } catch {
        return false
      }
    }),
  description: yup.string().trim().max(120, '描述最多120个字符'),
  plan_id: yup.number().required('请选择方案'),
})

const nameValid = ref(true)
const nameValidLoading = ref(false)

const debouncedCheckTenantName = debounce((value: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    CheckTenantName(value)
      .then(() => {
        nameValid.value = true
        resolve()
      })
      .catch(() => {
        nameValid.value = false
        reject(new Error('租户名已被占用'))
      })
      .finally(() => {
        nameValidLoading.value = false
      })
  })
}, 500)

const handleSubmit = async () => {
  await formRef.value?.validate().then(() => {
    CreateTenant(form)
  })
  router.push('/auth-redirect')
}
</script>

<template>
  <div class="min-h-screen p-12 w-full flex relative">
    <!-- 渐变动画背景 -->
    <!-- <div
      class="absolute inset-0 bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10 animate-gradient-shift z-[-1]"
    ></div> -->
    <!-- 渐变背景 -->
    <div
      class="fixed inset-0 bg-gradient-to-br from-primary/5 via-base-100 to-secondary/5 -z-10"
    ></div>

    <!-- 装饰元素 -->
    <div class="fixed top-10 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl -z-10"></div>
    <div
      class="fixed bottom-10 left-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -z-10"
    ></div>

    <div class="m-auto shadow-md border border-base-300 p-6 rounded-md min-w-xl">
      <h2 class="font-semibold text-xl">选择适合您的方案</h2>
      <Form ref="formRef" :form="form" :schema="schema" label-width="60px">
        <FormItem label="租户名" name="name" trigger="input">
          <TextInput v-model="form.name" :maxlength="20" placeholder="租户名">
            <template #suffix>
              <div v-if="nameValidLoading" class="loading loading-xs"></div>
              <CheckBadgeIcon v-else-if="nameValid" class="w-5 h-5 text-success" />
              <ExclamationCircleIcon v-else class="w-5 h-5 text-error" />
            </template>
          </TextInput>
        </FormItem>
        <FormItem label="描述" name="description">
          <Textarea
            v-model="form.description"
            :maxlength="20"
            placeholder="租户描述(可选)"
          ></Textarea>
        </FormItem>
        <FormItem label="计划" name="plan" align="horizontal">
          <select v-model="form.plan_id" class="select select-sm select-neutral w-full">
            <option :value="1">🎉 Free - 免费版</option>
            <option :value="2">⭐ Pro - 专业版</option>
            <option :value="3">👑 Enterprise - 企业版</option>
          </select>
        </FormItem>
        <FormItem>
          <button type="button" class="btn btn-neutral w-full" @click="handleSubmit">
            创建租户
          </button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>
