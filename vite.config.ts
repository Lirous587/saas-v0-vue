import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
// import vueDevTools from 'vite-plugin-vue-devtools'
import VueRouter from 'unplugin-vue-router/vite'

import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // 加载对应模式下的环境变量
  const env = loadEnv(mode, process.cwd())

  return {
    plugins: [
      VueRouter({
        routesFolder: 'src/pages',
        dts: './typed-router.d.ts',
        exclude: ['**/components/**'],
      }),
      vue(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_PROXY,
          rewrite: path => path.replace(/^\/api/, ''),
          changeOrigin: true,
        },
      },
    },
  }
})
