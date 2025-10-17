<template>
  <div>
    <ThemeSwitch class="!sr-only" />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { ThemeSwitch } from 'li-daisy'
</script>
