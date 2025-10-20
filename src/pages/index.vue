<script setup lang="ts">
import {
  SparklesIcon,
  BoltIcon,
  PlayCircleIcon,
  PuzzlePieceIcon,
  CloudIcon,
  GlobeAltIcon,
  CheckIcon,
  CurrencyDollarIcon,
} from '@heroicons/vue/24/outline'
</script>

<template>
  <div>
    <!-- Navbar -->
    <div
      class="navbar bg-base-100/80 backdrop-blur-md border-b border-base-300 sticky top-0 z-50 shadow-sm px-4"
    >
      <div class="navbar-start">
        <div class="text-xl font-bold gap-2 cursor-pointer">
          <span class="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
            >SaaS-V0</span
          >
        </div>
      </div>
      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1 gap-1">
          <li><a class="rounded-lg hover:bg-base-300">功能</a></li>
          <li><a class="rounded-lg hover:bg-base-300">定价</a></li>
          <li><a class="rounded-lg hover:bg-base-300">文档</a></li>
        </ul>
      </div>
      <div class="navbar-end gap-2">
        <router-link to="/login" class="btn btn-sm rounded-full btn-dash"> 登录 </router-link>

        <router-link
          to="/register"
          class="btn btn-sm btn-primary opacity-80 rounded-full shadow-lg hover:shadow-xl transition-shadow"
        >
          免费注册
        </router-link>
      </div>
    </div>

    <!-- Hero Section -->
    <div
      class="relative h-screen border-b-2 border-b-base-300 flex flex-col items-center justify-center text-center z-10 space-y-6"
    >
      <!-- 装饰性背景 -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl"></div>
        <div class="absolute bottom-20 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
      </div>

      <div class="badge badge-primary badge-lg">
        轻松接入，即刻使用
        <SparklesIcon class="h-5 w-5" />
      </div>
      <h1
        class="text-5xl lg:text-7xl font-extrabold leading-tight bg-conic from-primary via-info to-secondary bg-clip-text text-transparent"
      >
        <span> 为您的网站 </span>
        <br />
        <span>添加评论功能</span>
      </h1>

      <h2 class="font-semibold my-4">
        <span class="text-primary text-2xl"> 无需后端开发 </span>
        <br />
        <span class="text-info"> 即可为静态博客、个人主页添加完整的评论系统 </span>
      </h2>

      <div class="flex justify-center mb-6 gap-x-3">
        <button class="btn btn-primary btn-lg shadow-lg hover:shadow-xl transition hover:scale-105">
          <BoltIcon class="w-5 h-5" />
          立即开始
        </button>
        <button class="btn btn-outline btn-lg hover:scale-105 transition">
          <PlayCircleIcon class="w-5 h-5" />
          查看演示
        </button>
      </div>

      <!-- Stats -->
      <div class="stats stats-horizontal shadow-xl bg-base-100 border border-base-300">
        <div class="stat place-items-center">
          <div class="stat-title text-base-content/60">活跃评论</div>
          <div class="stat-value text-primary text-4xl">10K+</div>
          <div class="stat-desc text-base-content/50">每日新增中</div>
        </div>
        <div class="stat place-items-center">
          <div class="stat-title text-base-content/60">网站接入</div>
          <div class="stat-value text-secondary text-4xl">500+</div>
          <div class="stat-desc text-base-content/50">全球信赖</div>
        </div>
        <div class="stat place-items-center">
          <div class="stat-title text-base-content/60">服务可用性</div>
          <div class="stat-value text-accent text-4xl">99.9%</div>
          <div class="stat-desc text-base-content/50">稳定运行</div>
        </div>
      </div>
    </div>

    <!-- How It Works -->
    <div
      class="relative h-screen border-b-2 border-b-base-300 flex flex-col items-center justify-center text-center z-10 space-y-6"
    >
      <div class="space-y-4 font-bold">
        <div class="badge badge-secondary badge-lg">
          简单三步
          <PuzzlePieceIcon class="w-5 h-5" />
        </div>
        <h2 class="text-secondary text-4xl">使用流程</h2>
        <p class="text-xl text-secondary/60">快速接入评论系统，提升网站互动性</p>
      </div>

      <ul class="steps steps-horizontal w-full mb-8">
        <li class="step step-primary">
          <div class="text-center">
            <div class="flex items-center gap-3 mb-2">
              <div class="badge badge-primary">STEP 1</div>
              <h3 class="font-bold text-xl">注册租户</h3>
            </div>
            <p class="text-base-content/70">创建账号并设置您的租户信息</p>
          </div>
        </li>
        <li class="step step-primary">
          <div class="text-center">
            <div class="flex items-center gap-3 mb-2">
              <div class="badge badge-primary">STEP 2</div>
              <h3 class="font-bold text-xl">创建板块</h3>
            </div>
            <p class="text-base-content/70">为您的文章或页面创建评论板块</p>
          </div>
        </li>
        <li class="step step-primary">
          <div class="text-center">
            <div class="flex items-center gap-3 mb-2">
              <div class="badge badge-primary">STEP 3</div>
              <h3 class="font-bold text-xl">嵌入代码</h3>
            </div>
            <p class="text-base-content/70">复制相关代码到您的网站即可</p>
          </div>
        </li>
      </ul>

      <!-- Code Example -->
      <div
        class="card bg-gradient-to-br from-base-200 to-base-300 max-w-4xl mx-auto shadow-2xl border border-base-300"
      >
        <div class="card-body">
          <div class="flex items-center gap-3 mb-4">
            <div class="badge badge-primary">代码示例</div>
            <h3 class="card-title">集成示例</h3>
          </div>

          <h3 class="text-start font-semibold">引入js库</h3>
          <div class="mockup-code w-full">
            <pre><code>&lt;script src="https://cdn.saas-v0.com/comments.js"&gt;&lt;/script&gt;</code></pre>
          </div>

          <h3 class="text-start font-semibold mt-3">添加html元素</h3>
          <div class="mockup-code w-full">
            <pre><code>&lt;div id="comments" data-belong-key="/blog/post-001"&gt;&lt;/div&gt;</code></pre>
          </div>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div
      class="relative h-screen border-b-2 border-b-base-300 flex flex-col items-center justify-center text-center z-10 space-y-6"
    >
      <div class="text-center space-y-4 font-bold">
        <div class="badge badge-primary opacity-85 badge-lg">
          核心优势
          <CloudIcon class="w-5 h-5" />
        </div>
        <h2 class="text-4xl text-primary/80">强大的功能</h2>
        <p class="text-xl text-info">提供完整的评论管理解决方案</p>
      </div>

      <div class="grid grid-cols-3 gap-8">
        <div
          class="card bg-gradient-to-br from-accent/10 to-accent/5 hover:shadow-xl transition hover:scale-105 border border-accent/20"
        >
          <div class="card-body">
            <div class="w-16 h-16 bg-accent/20 rounded-2xl text-4xl mb-4"></div>
            <h3 class="card-title text-accent">自定义样式</h3>
            <p class="text-start text-base-content/70">支持无头样式，美观与否有你决定</p>
          </div>
        </div>

        <div
          class="card bg-gradient-to-br from-info/10 to-info/5 hover:shadow-xl transition-all hover:scale-105 border border-info/20"
        >
          <div class="card-body">
            <div
              class="w-16 h-16 bg-info/20 rounded-2xl flex items-center justify-center text-4xl mb-4"
            ></div>
            <h3 class="card-title text-info">图片支持</h3>
            <p class="text-start text-base-content/70">
              集成 Cloudflare R2，支持评论附带图片，表达更丰富
            </p>
          </div>
        </div>

        <div
          class="card bg-gradient-to-br from-warning/10 to-warning/5 hover:shadow-xl transition-all hover:scale-105 border border-warning/20"
        >
          <div class="card-body">
            <div
              class="w-16 h-16 bg-warning/20 rounded-2xl flex items-center justify-center text-4xl mb-4"
            ></div>
            <h3 class="card-title text-warning">灵活配置</h3>
            <p class="text-start text-base-content/70">支持租户级和板块级配置，满足不同场景需求</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Use Cases -->
    <div
      class="relative h-screen border-b-2 border-b-base-300 flex flex-col items-center justify-center text-center z-10 space-y-6"
    >
      <div class="text-center space-y-4 font-bold">
        <div class="badge badge-secondary badge-lg">
          应用场景
          <GlobeAltIcon class="w-5 h-5" />
        </div>
        <h2 class="text-4xl text-secondary">适用场景</h2>
        <p class="text-xl text-secondary/60">适合各类静态网站和内容平台</p>
      </div>
    </div>

    <!-- Pricing Section -->
    <div
      class="relative h-screen border-b-2 border-b-base-300 flex flex-col items-center justify-center text-center z-10 space-y-6"
    >
      <div class="text-center space-y-4 font-bold mb-10">
        <div class="badge badge-primary opacity-95 badge-lg">
          灵活定价
          <CurrencyDollarIcon class="w-5 h-5" />
        </div>
        <h2 class="text-4xl text-primary/75">选择适合您的方案</h2>
        <p class="text-xl text-info/90">相信您永远不会为本次抉择所后悔</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <!-- 免费版 -->
        <div
          class="card bg-base-100 shadow-xl hover:shadow-2xl transition-all border border-base-300"
        >
          <div class="card-body">
            <div class="badge badge-info mb-2">快速体验</div>
            <h3 class="card-title text-3xl mb-2">免费版</h3>
            <div class="my-6">
              <span class="text-5xl font-bold">¥0</span>
              <span class="text-base-content/60">/月</span>
            </div>
            <ul class="space-y-3 mb-8">
              <li class="flex items-center gap-3">
                <CheckIcon class="w-5 h-5" />
                <span>5 个板块</span>
              </li>
              <li class="flex items-center gap-3">
                <CheckIcon class="w-5 h-5" />
                <span>1000 条评论/月</span>
              </li>
              <li class="flex items-center gap-3">
                <CheckIcon class="w-5 h-5" />
                <span>基础功能</span>
              </li>
            </ul>
            <div class="card-actions">
              <button class="btn btn-outline btn-block hover:scale-105 transition-transform">
                开始使用
              </button>
            </div>
          </div>
        </div>

        <!-- 爱心版 -->
        <div
          class="card bg-gradient-to-br from-primary to-secondary text-primary-content shadow-2xl hover:shadow-3xl transition-all scale-105 border-2 border-primary"
        >
          <div class="absolute -top-4 left-1/2 -translate-x-1/2">
            <div class="badge badge-warning gap-2 px-4 py-3">
              推荐
              <SparklesIcon class="w-5 h-5" />
            </div>
          </div>
          <div class="card-body">
            <div class="badge badge-secondary mb-2">生产可用</div>
            <h3 class="card-title text-3xl mb-2">爱心版</h3>
            <div class="my-6">
              <span class="text-5xl font-bold">¥0</span>
              <span class="text-base-content/60">/月</span>
            </div>
            <ul class="space-y-3 mb-8">
              <li class="flex items-center gap-3">
                <CheckIcon class="w-5 h-5" />
                <span>无限用户</span>
              </li>
              <li class="flex items-center gap-3">
                <CheckIcon class="w-5 h-5" />
                <span><strong>无限</strong>板块</span>
              </li>
              <li class="flex items-center gap-3">
                <CheckIcon class="w-5 h-5" />
                <span>无限评论</span>
              </li>
              <li class="flex items-center gap-3">
                <CheckIcon class="w-5 h-5" />
                <span>图片上传</span>
              </li>
              <li class="flex items-center gap-3">
                <CheckIcon class="w-5 h-5" />
                <span>邮件通知</span>
              </li>
            </ul>
            <div class="card-actions">
              <button
                class="btn btn-secondary btn-block hover:scale-105 transition-transform shadow-lg"
              >
                点个Star!
              </button>
            </div>
          </div>
        </div>

        <!-- 专业版 -->
        <div
          class="card bg-base-100 shadow-xl hover:shadow-2xl transition-all border border-base-300"
        >
          <div class="card-body">
            <div class="badge badge-neutral mb-2">企业定制</div>
            <h3 class="card-title text-3xl mb-2">企业版</h3>
            <div class="my-6">
              <span class="text-5xl font-bold">定制</span>
            </div>
            <ul class="space-y-3 mb-8">
              <li class="flex items-center gap-3">
                <CheckIcon class="w-5 h-5" />

                <span><strong>无限</strong>租户</span>
              </li>
              <li class="flex items-center gap-3">
                <CheckIcon class="w-5 h-5" />

                <span><strong>无限</strong>板块</span>
              </li>
              <li class="flex items-center gap-3">
                <CheckIcon class="w-5 h-5" />

                <span><strong>无限</strong>评论</span>
              </li>
              <li class="flex items-center gap-3">
                <CheckIcon class="w-5 h-5" />

                <span>专属支持</span>
              </li>
              <li class="flex items-center gap-3">
                <CheckIcon class="w-5 h-5" />

                <span>SLA 保证</span>
              </li>
              <li class="flex items-center gap-3">
                <CheckIcon class="w-5 h-5" />

                <span>定制开发</span>
              </li>
            </ul>
            <div class="card-actions">
              <button class="btn btn-outline btn-block hover:scale-105 transition-transform">
                联系销售
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- FAQ -->
    <div class="mx-auto px-4 py-16 bg-base-200/50 rounded-3xl my-16">
      <div class="text-center mb-16">
        <div class="badge badge-warning badge-lg mb-4">FAQ</div>
        <h2 class="text-4xl lg:text-5xl font-bold mb-4">常见问题</h2>
        <p class="text-xl text-base-content/70">快速了解更多信息</p>
      </div>

      <div class="max-w-4xl mx-auto space-y-3">
        <div class="collapse collapse-plus bg-base-100 shadow-md hover:shadow-lg transition-shadow">
          <input type="radio" name="faq-accordion" checked />
          <div class="collapse-title text-xl font-semibold flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-primary"
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
            什么是板块(Plate)?
          </div>
          <div class="collapse-content text-base-content/80">
            <p class="leading-relaxed">
              板块是评论系统的基本组织单位。每个板块对应网站上的一个独立内容单元，比如一篇博客文章、一个图库集或一个产品页面。您需要为每个需要评论功能的页面创建一个板块。通过
              belong_key 参数，系统会自动匹配对应页面的评论内容。
            </p>
          </div>
        </div>

        <div class="collapse collapse-plus bg-base-100 shadow-md hover:shadow-lg transition-shadow">
          <input type="radio" name="faq-accordion" />
          <div class="collapse-title text-xl font-semibold flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-secondary"
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
            如何集成到我的网站?
          </div>
          <div class="collapse-content text-base-content/80">
            <p class="leading-relaxed">
              集成非常简单，只需两步：<br />1) 在管理后台创建板块并获取嵌入代码<br />2)
              将代码复制到您网站的相应位置<br /><br />我们的 JS 库会自动根据页面 URL
              加载对应的评论内容，无需任何后端开发工作。
            </p>
          </div>
        </div>

        <div class="collapse collapse-plus bg-base-100 shadow-md hover:shadow-lg transition-shadow">
          <input type="radio" name="faq-accordion" />
          <div class="collapse-title text-xl font-semibold flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-accent"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              />
            </svg>
            支持哪些功能配置?
          </div>
          <div class="collapse-content text-base-content/80">
            <p class="leading-relaxed">
              系统支持丰富的配置选项：评论审核模式、匿名评论、字数限制、排序方式、敏感词过滤、邮件通知等。您可以在租户级别设置全局配置，也可以为每个板块单独配置，板块配置优先级更高。
            </p>
          </div>
        </div>

        <div class="collapse collapse-plus bg-base-100 shadow-md hover:shadow-lg transition-shadow">
          <input type="radio" name="faq-accordion" />
          <div class="collapse-title text-xl font-semibold flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-success"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            数据安全有保障吗?
          </div>
          <div class="collapse-content text-base-content/80">
            <p class="leading-relaxed">
              我们非常重视数据安全。采用严格的数据隔离机制，每个租户的数据完全独立。所有数据传输使用
              HTTPS 加密，并定期进行数据备份。我们还提供敏感词过滤功能，确保评论内容健康合规。
            </p>
          </div>
        </div>
      </div>
    </div>

    <footer class="footer footer-center text-base-content p-6 border-t border-base-content/10">
      <aside>
        <p class="text-base-content/70">
          Copyright © 2025 - SaaS-V0 评论系统托管平台 · 让评论更简单
        </p>
      </aside>
    </footer>
  </div>
</template>
