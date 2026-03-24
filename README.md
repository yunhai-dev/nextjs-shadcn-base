# nextjs-shadcn-base

基于 Next.js App Router + shadcn/ui 的中文管理后台基础模板。

## 技术栈

- **Next.js** (App Router)
- **shadcn/ui** (radix-nova style)
- **Tailwind CSS v4**
- **next-themes** 主题切换
- **pnpm** 包管理

## 功能特性

- 响应式侧边栏，支持三种布局模式：默认（展开）、紧凑（图标）、铺满（隐藏）
- 三种侧边栏样式：标准、浮动、内嵌
- 亮色 / 暗色 / 跟随系统主题切换
- 样式设置抽屉，实时预览并持久化到 localStorage
- 仪表盘页面：统计卡片、收入图表、热销商品、近期订单
- 数据表格模式：搜索、多维过滤、分页、批量操作
- 可复用 hooks：`useDataTable`、`useRowSelection`、`useDebounce`

## 路由结构

```
app/
├── layout.tsx              # 根布局（ThemeProvider）
└── (admin)/
    ├── layout.tsx          # 管理布局（Sidebar + Header）
    ├── page.tsx            # 仪表盘
    ├── users/page.tsx      # 用户管理
    ├── orders/page.tsx     # 订单管理
    └── settings/page.tsx   # 系统设置
```

## 快速开始

```bash
pnpm install
pnpm dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看效果。

## 主要组件

| 组件                  | 说明                                                     |
| --------------------- | -------------------------------------------------------- |
| `AppSidebar`          | 可折叠侧边栏，支持分组导航和子菜单                       |
| `AppHeader`           | 顶部栏：面包屑、搜索、主题切换、样式设置、通知、用户菜单 |
| `StyleSettings`       | 样式设置抽屉：主题 / 侧边栏样式 / 布局模式               |
| `FacetFilter`         | 多选过滤器，带 popover 命令面板                          |
| `DataTablePagination` | 分页栏：每页条数 + 页码导航                              |
| `BulkActionBar`       | 批量操作浮动栏                                           |
