/// <reference types="vite/client" />
/// <reference types="unplugin-vue-router/client" />
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  const component: DefineComponent<{}, {}, any>
  export default component
}
