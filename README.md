# shadcn-admin-base

基于 Next.js App Router + shadcn/ui 的中文管理后台基础模板，可直接作为新项目起点使用。

## 技术栈

- **Next.js** (App Router)
- **shadcn/ui** (radix-nova style)
- **Tailwind CSS v4**
- **next-themes** 主题切换
- **lucide-react** 图标
- **recharts** 图表
- **pnpm** 包管理

## 功能特性

- 响应式侧边栏，三种布局模式：展开 / 紧凑（图标）/ 隐藏
- 三种侧边栏样式：标准 / 浮动 / 内嵌
- 亮色 / 暗色 / 跟随系统主题切换
- 样式设置抽屉，实时预览，持久化到 localStorage
- 侧边栏展开/折叠平滑过渡动画
- 仪表盘：统计卡片、收入图表（暗色适配）、热销商品、近期订单
- 数据表格模式：搜索、多维过滤、分页、批量操作
- 错误页面：403 / 404 / 500 / 503
- 设置页面：侧边导航 + 独立滚动内容区
- 可复用 hooks：`useDataTable`、`useRowSelection`、`useDebounce`

## 路由结构

```
app/
├── layout.tsx                # 根布局（ThemeProvider）
└── (admin)/
    ├── layout.tsx            # 管理布局（Sidebar + Header）
    ├── page.tsx              # 仪表盘
    ├── users/page.tsx        # 用户管理
    ├── orders/page.tsx       # 订单管理
    ├── settings/page.tsx     # 系统设置
    └── errors/
        ├── 403/page.tsx
        ├── 404/page.tsx
        ├── 500/page.tsx
        └── 503/page.tsx
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
| `AppSidebar`          | 可折叠侧边栏，分组导航，折叠时子菜单转为 DropdownMenu    |
| `AppHeader`           | 顶部栏：面包屑、搜索、主题切换、样式设置、通知、用户菜单 |
| `StyleSettings`       | 样式设置抽屉：主题 / 侧边栏样式 / 布局模式，minimap 预览 |
| `FacetFilter`         | 多选过滤器，popover 命令面板，内联已选标签               |
| `DataTablePagination` | 分页栏：每页条数 + 首/上/页码/下/末导航                  |
| `BulkActionBar`       | 批量操作浮动栏，图标按钮 + tooltip                       |
| `InputGroup`          | 组合输入框，支持前缀/后缀图标、按钮、文本                |

## 可复用 Hooks

| Hook              | 说明                                                                     |
| ----------------- | ------------------------------------------------------------------------ |
| `useDataTable`    | 分页 + 防抖搜索 + 多维过滤 + 行选择，输出 `params` 对象直接用于 API 调用 |
| `useRowSelection` | 行复选框状态管理                                                         |
| `useDebounce`     | 通用防抖 hook                                                            |

## 项目配置

站点名称、副标题、图标等常量统一在 `lib/site.ts` 中修改：

```ts
export const siteConfig = {
  name: "管理后台",
  subtitle: "Admin Dashboard",
  description: "shadcn/ui 管理后台",
  icon: "/favicon.ico",
};
```

## 开发规范

详见 [AGENTS.md](./AGENTS.md)，涵盖架构说明、组件规范、页面模板和关键约定。
