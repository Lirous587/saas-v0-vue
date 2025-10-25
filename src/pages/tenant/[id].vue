<script setup lang="ts">
definePage({
  meta: {
    layout: 'admin',
  },
})

import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { BookOpenIcon } from '@heroicons/vue/24/outline'
import { tenantCheck } from '@/composable/useTenantCheck'

const router = useRouter()
const route = useRoute()

tenantCheck()
</script>

<template>
  <div>{{ route.params }}</div>
</template>
