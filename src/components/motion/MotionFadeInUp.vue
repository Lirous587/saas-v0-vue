<template>
  <motion.div
    :initial="{ opacity: 0, y: props.initialY }"
    :while-in-view="{ opacity: 1, y: 0 }"
    :transition="{ duration: props.duration, ease: props.ease }"
    :in-view-options="{ once: true }"
  >
    <slot />
  </motion.div>
</template>

<script setup lang="ts">
import { motion, type Easing } from 'motion-v'

interface Props {
  duration?: number
  ease?: Easing
  initialY?: number
}

const props = withDefaults(defineProps<Props>(), {
  duration: 0.6,
  ease: 'easeOut',
  initialY: 50,
})
</script>
