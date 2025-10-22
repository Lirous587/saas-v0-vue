<script setup lang="ts">
import { tenantCheck } from '@/composable/useTenantChekc'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

tenantCheck(() => {})
</script>

<template>
  <div>
    {{ route.params }}
  </div>
</template>
