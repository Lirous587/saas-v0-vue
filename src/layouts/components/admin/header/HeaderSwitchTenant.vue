<script setup lang="ts">
import { GetTenants, type GetTenantsQuery, type TenantPage } from '@/api/tenant'
import IconChevronUpDown from '@/components/Icon/IconChevronUpDown.vue'
import { computed, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Popover, TextInput, Skeleton } from 'li-daisy'
import {
  MagnifyingGlassIcon,
  PlusCircleIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/vue/24/outline'

const route = useRoute()
const router = useRouter()

const query = reactive<GetTenantsQuery>({
  keyword: '',
  prev_cursor: '',
  next_cursor: '',
  page_size: 8,
})

const id = computed(() => {
  return (route.params as { id?: number }).id | 0
})

const tenantPage = ref<TenantPage>()
const loading = ref(false)

const hadLoaded = ref(false)
const getTenantsHandler = async () => {
  hadLoaded.value = true
  loading.value = true
  await GetTenants(query)
    .then(res => {
      tenantPage.value = res.data
    })
    .finally(() => {
      loading.value = false
    })
}

const handleChangeTenant = (id: number) => {
  router.push(`/tenant/${id}`)
}

const changeCursor = (direction: 'prev' | 'next') => {
  if (direction === 'prev') {
    if (!tenantPage.value.has_prev) return
    query.prev_cursor = tenantPage.value.prev_cursor
    query.next_cursor = ''
  } else {
    if (!tenantPage.value.has_next) return
    query.next_cursor = tenantPage.value.next_cursor
    query.prev_cursor = ''
  }

  getTenantsHandler()
}
</script>

<template>
  <Popover position="right-start" :z-index="100" trigger="click">
    <template #trigger>
      <div
        class="p-1 rounded-md hover:bg-base-300 cursor-pointer"
        @click="!hadLoaded && getTenantsHandler()"
      >
        <IconChevronUpDown />
      </div>
    </template>

    <template #content>
      <div class="bg-base-100 rounded-lg border border-base-300 w-60 p-3 overflow-hidden">
        <form @submit.prevent="getTenantsHandler">
          <TextInput v-model="query.keyword" placeholder="查找租户" class="mt-3">
            <template #prefix>
              <MagnifyingGlassIcon class="w-5 h-5" />
            </template>
          </TextInput>
        </form>
        <div class="flex items-center justify-between mt-4 mb-1 pl-1">
          <p class="text-sm text-base-content/60 font-bold">租户列表</p>

          <div v-if="tenantPage?.has_prev || tenantPage?.has_next" class="inline-flex">
            <ChevronLeftIcon
              class="w-5 h-5"
              :class="
                tenantPage?.has_prev ? 'cursor-pointer' : 'cursor-not-allowed text-base-content/40'
              "
              @click="changeCursor('prev')"
            />
            <ChevronRightIcon
              class="w-5 h-5"
              :class="
                tenantPage?.has_next ? 'cursor-pointer' : 'cursor-not-allowed text-base-content/40'
              "
              @click="changeCursor('next')"
            />
          </div>
        </div>

        <Skeleton :loading="loading" :count="5" :delay="300">
          <template #skeleton>
            <div class="skeleton my-2 w-full h-6 rounded-md"></div>
          </template>
          <template #content>
            <ul>
              <li
                v-for="item in tenantPage.items"
                :key="item.id"
                class="flex items-center hover:bg-base-300 p-1.5 rounded-md cursor-pointer gap-x-3"
                @click="handleChangeTenant(item.id)"
              >
                <span class="badge badge-primary badge-dash badge-sm">
                  {{ item.plan_type }}
                </span>
                <span class="text-sm text-base-content/75 font-extrabold">
                  {{ item.name }}
                </span>
                <CheckIcon v-if="item.id === id" class="ml-auto w-5 h-5" />
              </li>
              <li class="my-2">
                <RouterLink to="/tenant/register" class="btn btn-primary btn-dash btn-wide btn-sm">
                  <PlusCircleIcon class="w-5 h-5" />
                  <b>创建租户</b>
                </RouterLink>
              </li>
            </ul>
          </template>
        </Skeleton>
      </div>
    </template>
  </Popover>
</template>
