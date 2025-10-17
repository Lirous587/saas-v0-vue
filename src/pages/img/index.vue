<template>
  <div>
    <Gallery mode="gallery" />

    <div class="btn btn-sm flex items-center absolute right-5 bottom-5" @click="gotoRecycle">
      <TrashIcon class="w-5" />
      <small class="font-bold">回收站</small>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TrashIcon } from '@heroicons/vue/24/outline'
import Gallery from './components/Gallery.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const gotoRecycle = () => {
  router.push('/img/recycle')
}
</script>
