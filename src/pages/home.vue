<template>
  <div class="min-h-screen bg-base-100">
    <!-- 页面头部 -->
    <div class="bg-gradient-to-r from-primary to-secondary text-primary-content p-6 lg:p-8">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-3xl lg:text-4xl font-bold mb-2">欢迎回来 👋</h1>
        <p class="text-primary-content/80">这是您的工作台概览</p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto p-4 lg:p-6 space-y-6">
      <!-- 快速统计卡片 -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="stats shadow bg-base-100 border border-base-300">
          <div class="stat">
            <div class="stat-figure text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                />
              </svg>
            </div>
            <div class="stat-title">总评论</div>
            <div class="stat-value text-primary">1,284</div>
            <div class="stat-desc">↗︎ 12% 本月</div>
          </div>
        </div>

        <div class="stats shadow bg-base-100 border border-base-300">
          <div class="stat">
            <div class="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <div class="stat-title">活跃板块</div>
            <div class="stat-value text-secondary">8</div>
            <div class="stat-desc">共 12 个板块</div>
          </div>
        </div>

        <div class="stats shadow bg-base-100 border border-base-300">
          <div class="stat">
            <div class="stat-figure text-accent">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <div class="stat-title">访客数</div>
            <div class="stat-value text-accent">3.2K</div>
            <div class="stat-desc">本周访问</div>
          </div>
        </div>

        <div class="stats shadow bg-base-100 border border-base-300">
          <div class="stat">
            <div class="stat-figure text-warning">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </div>
            <div class="stat-title">待审核</div>
            <div class="stat-value text-warning">5</div>
            <div class="stat-desc">需要处理</div>
          </div>
        </div>
      </div>

      <!-- 主内容区 -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- 左侧主要内容 -->
        <div class="lg:col-span-2 space-y-6">
          <!-- 快速操作 -->
          <div class="card bg-base-100 shadow border border-base-300">
            <div class="card-body">
              <h2 class="card-title mb-4">快速操作</h2>
              <div class="grid grid-cols-2 gap-4">
                <button class="btn btn-outline gap-2 justify-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  创建板块
                </button>
                <button class="btn btn-outline gap-2 justify-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  配置设置
                </button>
                <button class="btn btn-outline gap-2 justify-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  图库管理
                </button>
                <button class="btn btn-outline gap-2 justify-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  查看文档
                </button>
              </div>
            </div>
          </div>

          <!-- 最近评论 -->
          <div class="card bg-base-100 shadow border border-base-300">
            <div class="card-body">
              <div class="flex items-center justify-between mb-4">
                <h2 class="card-title">最近评论</h2>
                <a class="link link-primary text-sm">查看全部</a>
              </div>
              <div class="space-y-4">
                <div class="flex gap-4 p-3 rounded-lg hover:bg-base-200 transition-colors">
                  <div class="avatar placeholder">
                    <div class="bg-primary text-primary-content w-10 rounded-full">
                      <span class="text-sm">张</span>
                    </div>
                  </div>
                  <div class="flex-1">
                    <div class="flex items-center gap-2 mb-1">
                      <span class="font-semibold">张三</span>
                      <span class="text-xs text-base-content/60">5 分钟前</span>
                    </div>
                    <p class="text-sm text-base-content/80">这篇文章写得很好，学到了很多东西！</p>
                    <div class="text-xs text-base-content/60 mt-1">板块：技术博客</div>
                  </div>
                  <div class="dropdown dropdown-end">
                    <div tabindex="0" role="button" class="btn btn-ghost btn-sm btn-circle">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                        />
                      </svg>
                    </div>
                    <ul
                      tabindex="-1"
                      class="dropdown-content menu bg-base-100 rounded-box z-50 w-32 p-2 shadow border border-base-300"
                    >
                      <li><a>审核</a></li>
                      <li><a>删除</a></li>
                    </ul>
                  </div>
                </div>

                <div class="flex gap-4 p-3 rounded-lg hover:bg-base-200 transition-colors">
                  <div class="avatar placeholder">
                    <div class="bg-secondary text-secondary-content w-10 rounded-full">
                      <span class="text-sm">李</span>
                    </div>
                  </div>
                  <div class="flex-1">
                    <div class="flex items-center gap-2 mb-1">
                      <span class="font-semibold">李四</span>
                      <span class="text-xs text-base-content/60">1 小时前</span>
                    </div>
                    <p class="text-sm text-base-content/80">请问有相关的代码示例吗？</p>
                    <div class="text-xs text-base-content/60 mt-1">板块：Vue 教程</div>
                  </div>
                  <div class="dropdown dropdown-end">
                    <div tabindex="0" role="button" class="btn btn-ghost btn-sm btn-circle">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                        />
                      </svg>
                    </div>
                    <ul
                      tabindex="-1"
                      class="dropdown-content menu bg-base-100 rounded-box z-50 w-32 p-2 shadow border border-base-300"
                    >
                      <li><a>审核</a></li>
                      <li><a>删除</a></li>
                    </ul>
                  </div>
                </div>

                <div class="flex gap-4 p-3 rounded-lg hover:bg-base-200 transition-colors">
                  <div class="avatar placeholder">
                    <div class="bg-accent text-accent-content w-10 rounded-full">
                      <span class="text-sm">王</span>
                    </div>
                  </div>
                  <div class="flex-1">
                    <div class="flex items-center gap-2 mb-1">
                      <span class="font-semibold">王五</span>
                      <span class="text-xs text-base-content/60">3 小时前</span>
                    </div>
                    <p class="text-sm text-base-content/80">感谢分享，非常实用！</p>
                    <div class="text-xs text-base-content/60 mt-1">板块：产品展示</div>
                  </div>
                  <div class="dropdown dropdown-end">
                    <div tabindex="0" role="button" class="btn btn-ghost btn-sm btn-circle">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                        />
                      </svg>
                    </div>
                    <ul
                      tabindex="-1"
                      class="dropdown-content menu bg-base-100 rounded-box z-50 w-32 p-2 shadow border border-base-300"
                    >
                      <li><a>审核</a></li>
                      <li><a>删除</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧边栏 -->
        <div class="space-y-6">
          <!-- 活跃板块 -->
          <div class="card bg-base-100 shadow border border-base-300">
            <div class="card-body">
              <h2 class="card-title text-lg mb-4">活跃板块</h2>
              <div class="space-y-3">
                <div
                  class="flex items-center justify-between p-2 rounded hover:bg-base-200 transition-colors"
                >
                  <div class="flex items-center gap-3">
                    <div class="badge badge-primary badge-sm">1</div>
                    <div>
                      <div class="font-medium text-sm">技术博客</div>
                      <div class="text-xs text-base-content/60">562 评论</div>
                    </div>
                  </div>
                </div>
                <div
                  class="flex items-center justify-between p-2 rounded hover:bg-base-200 transition-colors"
                >
                  <div class="flex items-center gap-3">
                    <div class="badge badge-secondary badge-sm">2</div>
                    <div>
                      <div class="font-medium text-sm">Vue 教程</div>
                      <div class="text-xs text-base-content/60">428 评论</div>
                    </div>
                  </div>
                </div>
                <div
                  class="flex items-center justify-between p-2 rounded hover:bg-base-200 transition-colors"
                >
                  <div class="flex items-center gap-3">
                    <div class="badge badge-accent badge-sm">3</div>
                    <div>
                      <div class="font-medium text-sm">产品展示</div>
                      <div class="text-xs text-base-content/60">294 评论</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 使用提示 -->
          <div
            class="card bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20"
          >
            <div class="card-body">
              <div class="flex items-center gap-2 mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 class="font-bold">使用提示</h3>
              </div>
              <p class="text-sm text-base-content/80 mb-3">
                记得为每个需要评论的页面创建板块，并配置好 belong_key 参数。
              </p>
              <a class="link link-primary text-sm">查看集成指南 →</a>
            </div>
          </div>

          <!-- 快捷链接 -->
          <div class="card bg-base-100 shadow border border-base-300">
            <div class="card-body">
              <h2 class="card-title text-lg mb-4">快捷链接</h2>
              <div class="space-y-2">
                <a class="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                  开发文档
                </a>
                <a class="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                  API 参考
                </a>
                <a class="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  帮助中心
                </a>
                <a class="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  联系支持
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 可以在这里添加数据获取逻辑
</script>
