---
description: 本项目指导
alwaysApply: true
applyTo: "**"
version: 0.0.2
---

# SaaS-V0 项目指导

## 项目概述
SaaS-V0 是一个基于 Vue 3、Tailwind CSS 和 DaisyUI 构建的评论系统托管平台。该项目旨在为没有评论功能的网站(如静态博客)提供一个可嵌入的评论解决方案。

## 技术栈
- **前端框架**: Vue 3 (使用 Composition API)
- **样式框架**: Tailwind CSS 4
- **UI 组件库**: DaisyUI 5
- **构建工具**: Vite
- **包管理器**: pnpm
- **对象存储**: Cloudflare R2

## 项目结构
```
saas-v0
├── .github\
│   └── instructions\
│       ├── daisyui.instructions.md  # DaisyUI 指导
│       └── saas-v0.md               # 本项目指导
├── src\
│   ├── api\                         # API接口定义(包含请求和响应类型)
│   ├── assets\
│   │   └── main.css                 # 样式入口
│   ├── components\                  # 公共组件
│   ├── pages\                       # 页面组件
│   │   ├── index.vue                # Landing Page
│   │   ├── dashboard.vue            # 管理后台首页
│   │   ├── plates.vue               # 板块管理页面
│   │   └── settings.vue             # 配置页面
│   ├── router\                      # 路由配置
│   ├── stores\                      # Pinia 状态管理
│   └── App.vue                      # 根组件
├── public\
├── index.html
├── package.json
├── tailwind.config.js               # Tailwind 配置
└── vite.config.js                   # Vite 配置
```

## 开发指南

### 使用 DaisyUI 组件
- 遵循 DaisyUI 5 的类名规则,使用 `component`、`part`、`modifier` 等类名。
- 示例:使用 `btn` 类创建按钮,添加 `btn-primary` 设置颜色。
- 参考 `.github/instructions/daisyui.instructions.md` 获取详细组件列表和用法。

### 响应式设计
- 使用 Tailwind CSS 的响应式前缀,如 `sm:`、`md:`、`lg:`。
- 示例:`lg:drawer-open` 在大屏幕上显示侧边栏。

### 主题和颜色
- **必须使用** DaisyUI 的语义颜色,如 `primary`、`secondary`、`base-100` 等。
- **禁止使用** Tailwind 颜色名(如 `red-500`),以支持主题切换。
- 优先级:**最高**

### 布局组件
- **Navbar**: 顶部导航栏,使用 `navbar`、`navbar-start`、`navbar-center`、`navbar-end`。
- **Drawer**: 侧边栏布局,使用 `drawer`、`drawer-content`、`drawer-side`。
- **Hero**: 英雄区域,使用 `hero`、`hero-content`。
- **Card**: 卡片组件,使用 `card`、`card-body`、`card-actions`。

### 表单组件
- 使用 `input`、`select`、`textarea`、`checkbox`、`radio` 等类名。
- 添加验证提示,使用 `validator` 和 `validator-hint`。

### 其他最佳实践
- 使用 Vue 3 的 Composition API 管理状态。
- 组件化开发,将可复用部分提取为组件。
- 使用 `loading`、`skeleton` 显示加载状态。
- 确保可访问性,使用 `aria-*` 属性。

## 常见问题
- **DaisyUI 组件不生效**: 检查 CSS 文件是否正确导入 Tailwind 和 DaisyUI。
- **主题不切换**: 确保使用 `data-theme` 属性或 `theme-controller` 类。
- **响应式问题**: 使用 Tailwind 的断点类调整布局。

## 版本历史
- v0.0.2: 完善项目功能说明
- v0.0.1: 初始版本,基础模板和指导

---

## 项目核心功能

### 功能定位
SaaS-V0 是一个**评论系统托管平台**,为没有评论功能的网站(如静态博客、个人主页)提供可嵌入的评论服务。

### 使用场景示例
**场景**: 用户 A 有一个静态博客,但缺少评论功能。
**解决方案**: 
1. 用户 A 在 SaaS-V0 注册租户
2. 创建板块并获取嵌入代码
3. 在博客中引入 JS 库
4. 访客可以在博客文章下方评论

---

## 系统架构

### 用户流程

```
访客访问 Landing Page
    ↓
注册并创建租户
    ↓
登录管理后台
    ↓
配置板块(Plate)
    ↓
获取 JS 嵌入代码
    ↓
在网站中集成评论功能
```

### 角色权限体系

#### 租户(Tenant)
- 一个用户可以是**多个租户**的管理员
- 每个租户独立管理自己的评论数据

#### 角色定义
| 角色 | 英文名 | 权限说明 | 适用场景 |
|------|--------|----------|----------|
| 租户管理员 | domain_admin | 完整的管理权限 | 管理后台使用 |
| 查看者 | viewer | 只读权限 | JS 库使用(前端展示) |

**注意**: 
- 管理平台**仅使用** domain_admin 角色
- viewer 角色用于前端 JS 库的数据读取
- 权限在系统初始化时预设,**不支持动态分配**

---

## 核心概念

### 板块(Plate)
板块是评论系统的基本组织单位,每个板块对应网站上的一个独立内容单元。

#### 板块属性

| 属性 | 说明 | 示例 |
|------|------|------|
| belong_key | 唯一标识符,用于匹配 URL | `/blog/post-001` |
| related_url | 关联的完整 URL | `https://example.com/blog/post-001` |
| name | 板块名称 | "Vue 3 入门教程" |
| description | 板块描述 | "适合新手的 Vue 3 教程" |

#### 使用场景
- **博客文章**: 每篇文章创建一个板块
- **图库页面**: 每个图库集创建一个板块
- **产品页面**: 每个产品创建一个板块

#### belong_key 的作用
```javascript
// 前端 JS 库根据当前 URL 传递 belong_key
// 例如:当前页面 URL 为 https://example.com/blog/post-001
const belongKey = window.location.pathname; // "/blog/post-001"
loadComments({ belongKey }); // 加载对应板块的评论
```

#### related_url 的作用
- 用于**邮件通知**
- 当用户收到回复通知时,点击邮件链接可直接跳转到对应页面
- 确保访客能快速定位到评论位置

#### 创建流程
1. 租户管理员登录管理后台
2. 进入"板块管理"页面
3. 创建新板块,填写 belong_key 和 related_url
4. 保存后才能在 JS 库中使用

**重要**: 必须**先创建板块**,JS 库才能正常工作,否则会出现"资源不存在"错误。

---

## 配置系统

### 配置层级

评论系统支持**两级配置**:

```
租户级配置(全局)
    ↓
板块级配置(局部,优先级更高)
```

### 可配置项示例
- 评论审核模式(自动发布 / 需审核)
- 允许匿名评论
- 评论字数限制
- 评论排序方式
- 敏感词过滤
- 通知设置

### 配置优先级规则
1. 如果板块有**独立配置**,使用板块配置
2. 如果板块**未配置**,使用租户全局配置
3. 租户全局配置是**默认值**

---

## 扩展功能

### Cloudflare R2 图库管理
- 集成 Cloudflare R2 对象存储
- 提供图片上传、管理功能
- 简化用户使用 Cloudflare 的流程
- 支持评论中插入图片

### 未来规划(长期)
- [ ] 评论附件功能
- [ ] 自定义表情包
- [ ] Markdown 支持
- [ ] 评论点赞/点踩
- [ ] 用户头像系统
- [ ] 评论统计分析

---

## 项目组成

### 1. 管理后台(当前项目)
- **技术栈**: Vue 3 + Tailwind CSS + DaisyUI
- **功能**: 租户注册、板块管理、评论审核、配置管理
- **用户**: 租户管理员

### 2. 前端 JS 库(待开发)
- **技术栈**: 待定(考虑 Vanilla JS 或轻量级框架)
- **功能**: 评论展示、发表评论、回复功能
- **用户**: 网站访客
- **集成方式**: 
  ```html
  <script src="https://cdn.saas-v0.com/comments.js"></script>
  <div id="comments" data-belong-key="/blog/post-001"></div>
  ```

---

## 技术要点

### 数据隔离
- 每个租户的数据**完全隔离**
- 通过 tenant_id 区分不同租户的数据
- 确保数据安全和隐私

### API 设计原则
- RESTful API 设计
- JWT 认证
- 请求和响应类型定义在 `src/api/` 目录

### 前端状态管理
- 使用 Pinia 管理全局状态
- 用户信息、租户信息、主题配置等存储在 store

---

## 注意事项

1. **权限管理**: 
   - 系统**不支持**动态权限分配
   - 角色权限在初始化时确定
   - 仅有 domain_admin 和 viewer 两个角色

2. **板块创建**: 
   - 板块**必须手动创建**
   - JS 库依赖板块数据
   - 未创建板块会导致功能异常

3. **配置优先级**: 
   - 板块配置 > 租户配置
   - 未设置时使用默认值

4. **主题颜色**: 
   - **强制使用** DaisyUI 语义颜色
   - 禁止使用 Tailwind 原始颜色
   - 确保主题切换功能正常

---

## 开发规范

### 命名约定
- 组件文件: PascalCase (例: `UserProfile.vue`)
- 工具函数: camelCase (例: `formatDate.ts`)
- 常量: UPPER_SNAKE_CASE (例: `API_BASE_URL`)

### 代码组织
- 按功能模块划分目录
- 相关文件放在同一目录
- 避免过深的目录嵌套

### 提交规范
- feat: 新功能
- fix: 修复 bug
- docs: 文档更新
- style: 代码格式调整
- refactor: 重构
- test: 测试相关
- chore: 构建/工具相关

---