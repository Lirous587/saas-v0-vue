<template>
  <div class="flex flex-col w-full items-center h-screen px-8 py-3">
    <header class="text-xl flex items-center justify-between w-full h-[72px]">
      <div class="tooltip tooltip-right" data-tip="源码">
        <a href="https://github.com/Lirous587/vue-admin" target="_blank">
          <IconGithub />
        </a>
      </div>
    </header>
    <main class="flex-1 flex flex-col justify-center items-center gap-y-6 px-5">
      <h2 class="text-xl font-bold font-mono">Log in to Li-Admin</h2>

      <a
        :href="githubAuthUrl"
        class="btn btn-primary btn-outline w-[320px] flex items-center justify-center"
      >
        <IconGithub />
        使用GitHub登录
      </a>

      <div class="w-[320px] h-[1px] bg-base-300 my-2"></div>
    </main>

    <div class="h-[72px] w-full flex justify-end items-center">
      <a class="link link-primary" href="https://Lirous.com" target="_blank">blog </a>
    </div>
  </div>
</template>

<script setup lang="ts">
definePage({
  meta: {
    layout: 'none',
  },
})
import { github_login_config } from '@/config'
import IconGithub from '@/components/Icon/github.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

import { v4 as uuidv4 } from 'uuid'
import { setOAuthCsrfToken } from '@/utils/auth'

const route = useRoute()

const githubState = computed(() => {
  // 生成一个随机的csrf token
  const csrfToken = uuidv4()

  // 将 CSRF token 存储在 sessionStorage 或 cookie 中，以便稍后验证
  setOAuthCsrfToken(csrfToken)

  const redirectPath = route.query.redirect as string | undefined
  const stateObject = {
    csrf: csrfToken,
    redirect: redirectPath,
  }

  return encodeURIComponent(JSON.stringify(stateObject))
})

const githubAuthUrl = computed(() => {
  const params = new URLSearchParams({
    client_id: github_login_config.client_id,
    redirect_uri: github_login_config.redirect_uri,
    scope: 'user:email',
    state: githubState.value,
  })
  return `https://github.com/login/oauth/authorize?${params.toString()}`
})
</script>
