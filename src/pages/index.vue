<template>
  <div class="!scroll-smooth">
    <!-- Navbar -->
    <div
      class="navbar bg-base-100/80 backdrop-blur-md border-b border-base-300 sticky top-0 z-50 shadow-sm px-4"
    >
      <div class="navbar-start">
        <div class="text-xl font-bold gap-2 cursor-pointer">
          <span class="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
            >Li-SaaS</span
          >
        </div>
      </div>
      <div class="navbar-center flex">
        <ul class="menu menu-horizontal px-1 gap-1">
          <li><a class="btn btn-ghost btn-sm" href="#features">功能</a></li>
          <li><a class="btn btn-ghost btn-sm" href="#price">定价</a></li>
          <li>
            <a class="btn btn-ghost btn-sm" href="https://lirous.com" target="_blank">文档</a>
          </li>
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
    <MotionFadeInUp
      class="relative h-screen border-b border-b-base-300 flex flex-col items-center justify-center text-center space-y-6"
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
        class="text-7xl font-extrabold leading-tight bg-conic from-primary via-info to-secondary bg-clip-text text-transparent"
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
    </MotionFadeInUp>

    <!-- How It Works -->
    <MotionFadeInUp
      class="relative h-screen border-b border-b-base-300 flex flex-col items-center justify-center text-center space-y-6"
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
    </MotionFadeInUp>

    <!-- Features Section -->
    <!-- Use Cases -->
    <MotionFadeInUp
      id="features"
      class="relative min-h-screen border-b border-b-base-300 p-12 grid grid-cols-2 items-center scroll-m-20"
    >
      <!-- Features Section -->
      <div class="space-y-3 flex flex-col">
        <div class="text-center space-y-4 font-bold">
          <div class="badge badge-primary opacity-85 badge-lg">
            核心优势
            <CloudIcon class="w-5 h-5" />
          </div>
          <h2 class="text-4xl text-primary/80">强大的功能</h2>
          <p class="text-xl text-info">提供完整的评论管理解决方案</p>
        </div>
        <div class="mx-auto space-x-2">
          <div class="badge badge-primary">自定义样式</div>
          <div class="badge badge-secondary">图库支持</div>
          <div class="badge badge-success">灵活配置</div>
        </div>
      </div>

      <!-- Use Cases -->
      <div class="space-y-3 flex flex-col">
        <div class="text-center space-y-4 font-bold">
          <div class="badge badge-secondary badge-lg">
            应用场景
            <GlobeAltIcon class="w-5 h-5" />
          </div>
          <h2 class="text-4xl text-secondary">适用场景</h2>
          <p class="text-xl text-secondary/60">适合各类静态网站和内容平台</p>
        </div>
        <div class="mx-auto space-x-2">
          <div class="badge badge-primary">博客网站</div>
          <div class="badge badge-secondary">图像集</div>
          <div class="badge badge-success">宣传页</div>
        </div>
      </div>
    </MotionFadeInUp>

    <!-- Pricing Section -->
    <MotionFadeInUp
      id="price"
      class="relative min-h-screen p-12 border-b border-b-base-300 flex flex-col items-center justify-center text-center z-10 space-y-6 scroll-m-20"
    >
      <div class="text-center space-y-4 font-bold mb-10">
        <div class="badge badge-primary opacity-95 badge-lg">
          灵活定价
          <CurrencyDollarIcon class="w-5 h-5" />
        </div>
        <h2 class="text-4xl text-primary/75">选择适合您的方案</h2>
        <p class="text-xl text-info/90">服务至上 一分钱一份货</p>
      </div>

      <div
        class="grid grid-cols-3 gap-8 *:shadow-xl *:hover:shadow-2xl *:transition-all *:border *:border-base-300 *:px-6 *py-4"
      >
        <!-- 免费版 -->
        <div class="card">
          <div class="card-body">
            <div class="badge badge-secondary mb-2">快速体验</div>
            <h3 class="card-title text-3xl mb-2">免费版</h3>
            <div class="my-3">
              <span class="text-5xl font-bold">Free</span>
            </div>
            <ul class="space-y-3 mb-8 features">
              <li>10用户</li>
              <li>5 个板块</li>
              <li>10评论/板块</li>
              <li class="font-bold">基础功能</li>
            </ul>
            <div class="card-actions">
              <button
                class="btn btn-secondary btn-outline btn-block hover:scale-105 transition-transform"
              >
                开始使用
              </button>
            </div>
          </div>
        </div>

        <!-- 爱心版 -->
        <div class="card translate-y-[-10px]">
          <div class="absolute -top-4 left-1/2 -translate-x-1/2">
            <div class="badge badge-success gap-2 px-4 py-3">
              推荐
              <SparklesIcon class="w-5 h-5" />
            </div>
          </div>
          <div class="card-body">
            <div class="badge badge-primary mb-2">生产可用</div>
            <h3 class="card-title text-3xl mb-2">爱心版</h3>
            <div class="my-3">
              <span class="text-4xl font-bold">仅需star</span>
            </div>
            <ul class="space-y-3 mb-8 features">
              <li class="font-bold">无限用户</li>
              <li>300板块</li>
              <li>100评论/板块</li>
              <li class="font-bold">基础功能</li>
            </ul>
            <div class="card-actions">
              <button
                class="btn btn-primary btn-block hover:scale-105 transition-transform shadow-lg"
              >
                开始使用
              </button>
            </div>
          </div>
        </div>

        <!-- 专业版 -->
        <div class="card">
          <div class="card-body">
            <div class="badge badge-neutral mb-2">服务可靠</div>
            <h3 class="card-title text-3xl mb-2">专业版</h3>
            <div class="my-3">
              <span class="text-5xl font-bold">¥5</span>
              <span class="text-base-content/60">/月</span>
            </div>
            <ul class="space-y-3 mb-8 features">
              <li class="font-bold">无限用户</li>
              <li>1000板块</li>
              <li>500评论/板块</li>
              <li class="font-bold">基础功能</li>
            </ul>
            <div class="card-actions">
              <button
                class="btn btn-neutral btn-block hover:scale-105 transition-transform shadow-lg"
              >
                立即购买
              </button>
            </div>
          </div>
        </div>
      </div>
    </MotionFadeInUp>

    <!-- FAQ -->
    <MotionFadeInUp
      class="relative min-h-screen p-12 border-b border-b-base-300 flex flex-col items-center justify-center text-center z-10 space-y-6"
    >
      <div class="text-center mb-12 font-bold">
        <div class="badge badge-neutral badge-lg mb-4">FAQ</div>
        <h2 class="text-4xl text-neutral/80 mb-4">常见问题</h2>
        <p class="text-xl text-neutral/40">快速了解更多信息</p>
      </div>

      <div class="join join-vertical bg-base-100 *:text-start">
        <div class="collapse collapse-plus bg-base-100 join-item border border-base-300">
          <input type="radio" name="faq-accordion" checked />
          <div class="collapse-title text-xl font-semibold flex items-center gap-3">
            <QuestionMarkCircleIcon class="h-6 w-6 text-primary" />
            什么是板块(Plate)?
          </div>
          <div class="collapse-content text-base-content/80">
            <p class="leading-relaxed">
              板块是评论系统的基本组织单位
              <br />
              每个板块对应网站上的一个独立内容单元，比如一篇博客文章、一个图库集或一个产品页面
              <br />
              您需要为每个需要评论功能的页面创建一个板块
              <br />
              通过belong_key 参数，系统会自动匹配对应页面的评论内容
            </p>
          </div>
        </div>
        <div class="collapse collapse-plus bg-base-100 join-item border border-base-300">
          <input type="radio" name="faq-accordion" />
          <div class="collapse-title text-xl font-semibold flex items-center gap-3">
            <CodeBracketIcon class="h-6 w-6 text-secondary" />
            如何集成到我的网站?
          </div>
          <div class="collapse-content text-base-content/80">
            <div class="leading-relaxed">
              集成非常简单，只需两步:
              <ol class="list list-decimal list-inside">
                <li>在管理后台创建板块并获取嵌入代码</li>
                <li>将代码复制到您网站的相应位置</li>
              </ol>
              我们的 JS 库会自动根据页面 URL 加载对应的评论内容，无需任何后端开发工作
            </div>
          </div>
        </div>
        <div class="collapse collapse-plus bg-base-100 join-item border border-base-300">
          <input type="radio" name="faq-accordion" />
          <div class="collapse-title text-xl font-semibold flex items-center gap-3">
            <AdjustmentsVerticalIcon class="h-6 w-6 text-accent" />
            支持哪些功能配置?
          </div>
          <div class="collapse-content text-base-content/80">
            <p class="leading-relaxed">
              系统支持丰富的配置选项：评论审核模式、字数限制、排序方式、邮件通知等
              <br />
              您可以在租户级别设置全局配置，也可以为每个板块单独配置，板块配置优先级更高
            </p>
          </div>
        </div>
        <div class="collapse collapse-plus bg-base-100 join-item border border-base-300">
          <input type="radio" name="faq-accordion" />
          <div class="collapse-title text-xl font-semibold flex items-center gap-3">
            <ShieldCheckIcon class="h-6 w-6 text-success" />
            数据安全有保障吗?
          </div>
          <div class="collapse-content text-base-content/80">
            <p class="leading-relaxed">
              <strong> 我们非常重视数据安全 </strong>
              <br />
              我们采用严格的数据隔离机制，每个租户的数据完全独立
              <br />
              所有数据传输使用 HTTPS加密，并定期进行数据备份
            </p>
          </div>
        </div>
      </div>
    </MotionFadeInUp>

    <footer class="footer footer-center grid-rows-2 gap-1 py-2.5">
      <p class="text-base-content/80 font-medium">Li-SaaS 评论系统托管平台</p>
      <p class="p-0 text-base-content/50 text-xs">
        Copyright © {{ new Date().getFullYear() }} Li-SaaS. All rights reserved.
      </p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import {
  SparklesIcon,
  BoltIcon,
  PlayCircleIcon,
  PuzzlePieceIcon,
  CloudIcon,
  GlobeAltIcon,
  CurrencyDollarIcon,
  QuestionMarkCircleIcon,
  CodeBracketIcon,
  AdjustmentsVerticalIcon,
  ShieldCheckIcon,
} from '@heroicons/vue/24/outline'

import MotionFadeInUp from '@/components/motion/MotionFadeInUp.vue'
</script>

<style scoped>
.features {
  text-align: start;
}
.features li::before {
  content: '✓ ';
}
</style>
