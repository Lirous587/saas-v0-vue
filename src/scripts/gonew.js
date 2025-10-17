/* eslint-disable no-console */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function emptyDirExceptKeep(dir, keepFiles = []) {
  const items = fs.readdirSync(dir)
  for (const item of items) {
    if (keepFiles.includes(item)) continue
    const itemPath = path.join(dir, item)
    const stats = fs.statSync(itemPath)
    if (stats.isDirectory()) {
      fs.rmSync(itemPath, { recursive: true, force: true })
    } else {
      fs.unlinkSync(itemPath)
    }
  }
  // 创建 .gitkeep
  fs.writeFileSync(path.join(dir, '.gitkeep'), '')
}

function removeRouterGuardsFromMainTs(mainTsPath) {
  if (!fs.existsSync(mainTsPath)) return
  let content = fs.readFileSync(mainTsPath, 'utf-8')
  // 删除 import { setupRouterGuards } from './routerGuards'
  content = content.replace(
    /^\s*import\s+\{\s*setupRouterGuards\s*\}\s+from\s+['"]\.\/routerGuards['"]\s*;?\s*$/gm,
    ''
  )
  // 删除 // 设置路由守卫（允许前后有空行）
  content = content.replace(/^\s*\/\/\s*设置路由守卫\s*$/gm, '')
  // 删除 setupRouterGuards(router)（允许前后有空行和分号）
  content = content.replace(/^\s*setupRouterGuards\s*\(\s*router\s*\)\s*;?\s*$/gm, '')
  fs.writeFileSync(mainTsPath, content, 'utf-8')
  console.log('🧹 已清理 main.ts 中的路由守卫相关代码')
}

function removeRestartScriptFromPackageJson(pkgPath) {
  if (!fs.existsSync(pkgPath)) return
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
  if (pkg.scripts && pkg.scripts.restart) {
    delete pkg.scripts.restart
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2), 'utf-8')
    console.log('🧹 已从 package.json 移除 restart 脚本')
  }
}

function resetAppVue(appVuePath) {
  const content = `<template>
  <router-view />
</template>

<script setup lang="ts"></script>
`
  fs.writeFileSync(appVuePath, content, 'utf-8')
  console.log('📝 已重置 App.vue 内容')
}

function restart() {
  const srcDir = path.resolve(__dirname, '../')
  const keepFiles = ['assets', 'App.vue', 'main.ts']

  console.log('🚀 开始执行重置脚本...')

  const items = fs.readdirSync(srcDir)
  for (const item of items) {
    // 跳过需要保留的项目
    if (keepFiles.includes(item)) continue

    const itemPath = path.join(srcDir, item)

    const stats = fs.statSync(itemPath)
    if (stats.isDirectory()) {
      // 清空目录内容并创建 .gitkeep
      emptyDirExceptKeep(itemPath)
      console.log(`🧹 清空目录: ${item}`)
    } else {
      // 删除文件
      fs.unlinkSync(itemPath)
      console.log(`🗑️  删除文件: ${item}`)
    }
  }

  // 对 assets 目录以外的所有目录都创建 .gitkeep
  for (const item of items) {
    const itemPath = path.join(srcDir, item)
    if (keepFiles.includes(item)) continue
    if (fs.existsSync(itemPath) && fs.statSync(itemPath).isDirectory()) {
      const gitkeepPath = path.join(itemPath, '.gitkeep')
      if (!fs.existsSync(gitkeepPath)) {
        fs.writeFileSync(gitkeepPath, '')
      }
    }
  }

  // 1. 删除 main.ts 中的指定内容
  const mainTsPath = path.join(srcDir, 'main.ts')
  removeRouterGuardsFromMainTs(mainTsPath)

  // 2. 删除 package.json 中的 restart 脚本
  const pkgPath = path.resolve(srcDir, '../package.json')
  removeRestartScriptFromPackageJson(pkgPath)

  // 3. 重置 App.vue 内容
  const appVuePath = path.join(srcDir, 'App.vue')
  resetAppVue(appVuePath)

  console.log('✨ 重置完成！')
  console.log('📁 保留的项目:', keepFiles.join(', '))
  console.log('\n🎯 接下来执行以下命令开始开发:')
  console.log('   pnpm i')
  console.log('   pnpm run dev')
}

restart()
