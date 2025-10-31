<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import {
  BillingCycleLifetime,
  BillingCycleMonthly,
  BillingCycleYearly,
  CheckTenantName,
  CreateTenant,
  PlanCare,
  PlanFree,
  PlanPro,
  type CreateTenantRequest,
} from '@/api/tenant'
import { Form, FormItem, TextInput, Textarea, type FormRef, useYup } from 'li-daisy'
import { CheckBadgeIcon, ExclamationTriangleIcon } from '@heroicons/vue/24/outline'
import { debounce } from '@/utils'
import { router } from '@/main'

const formRef = ref<FormRef>()

const form = reactive<CreateTenantRequest>({
  name: '',
  plan_type: 'free',
  billing_cycle: 'monthly',
  description: '',
})

// 是否为免费或爱心版
const isFreePlan = computed(() => [PlanFree, PlanCare].includes(form.plan_type))

// 当plan_type改变时，自动设置billing_cycle
watch(
  () => form.plan_type,
  newPlan => {
    if ([PlanFree, PlanCare].includes(newPlan)) {
      form.billing_cycle = BillingCycleLifetime
    } else {
      form.billing_cycle = BillingCycleMonthly
    }
  },
  {
    immediate: true,
  }
)

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
  plan_type: yup.string().required('请选择计划方案'),
  billing_cycle: yup
    .string()
    .required('请选择计费方案')
    .test('billingCycleValid', '计费方案选择有误', function (value) {
      const { plan_type } = this.parent

      // 如果是专业版，不能选择终身
      if (plan_type === PlanPro && value === BillingCycleLifetime) {
        return this.createError({
          message: '专业版不支持终身计费',
        })
      }

      // 如果是免费或爱心版，必须选择终身
      if ([PlanFree, PlanCare].includes(plan_type)) {
        if (value !== BillingCycleLifetime) {
          return this.createError({
            message: '免费版/爱心版只能选择终身计费',
          })
        }
      }

      return true
    }),
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
  if (formRef.value.isValid) {
    CreateTenant(form).then(() => {
      router.push('/auth-redirect')
    })
  }
}
</script>

<template>
  <div class="min-h-screen p-12 w-full flex relative">
    <div class="m-auto shadow-md border border-base-300 p-6 rounded-md min-w-xl">
      <h2 class="font-semibold text-xl">选择适合您的方案</h2>
      <Form ref="formRef" :form="form" :schema="schema" label-width="60px">
        <FormItem label="租户名" name="name" trigger="input">
          <TextInput v-model="form.name" :maxlength="20" placeholder="租户名">
            <template #suffix>
              <div v-if="nameValidLoading" class="loading loading-xs"></div>
              <CheckBadgeIcon v-else-if="nameValid" class="w-5 h-5 text-success" />
              <ExclamationTriangleIcon v-else class="w-5 h-5 text-error" />
            </template>
          </TextInput>
        </FormItem>
        <FormItem label="选择计划" name="plan_type">
          <select v-model="form.plan_type" class="select select-sm w-full">
            <option :value="PlanFree">Free 免费版</option>
            <option :value="PlanCare">Care 爱心版</option>
            <option :value="PlanPro">Pro 专业版</option>
          </select>
        </FormItem>
        <FormItem label="计费周期" name="billing_cycle">
          <select
            v-model="form.billing_cycle"
            class="select select-sm w-full"
            :disabled="isFreePlan"
          >
            <option :value="BillingCycleMonthly">月付</option>
            <option :value="BillingCycleYearly">年付</option>
            <option v-if="isFreePlan" :value="BillingCycleLifetime">终身</option>
          </select>
        </FormItem>
        <FormItem label="描述" name="description">
          <Textarea
            v-model="form.description"
            :maxlength="20"
            placeholder="租户描述(可选)"
          ></Textarea>
        </FormItem>

        <FormItem>
          <button
            :disabled="!formRef?.isValid"
            type="button"
            class="btn btn-neutral w-full"
            @click="handleSubmit"
          >
            创建租户
          </button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>
