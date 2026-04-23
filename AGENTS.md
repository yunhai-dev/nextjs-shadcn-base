<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# Project: shadcn-admin-base

Chinese-language admin dashboard built with Next.js App Router, shadcn/ui (radix-nova style), Tailwind CSS v4, and pnpm.

## Tech Stack

- **Framework**: Next.js (App Router)
- **UI Library**: shadcn/ui (radix-nova style)
- **Styling**: Tailwind CSS v4
- **Package Manager**: pnpm
- **Theme**: next-themes (light / dark / system)
- **Icons**: lucide-react
- **Charts**: recharts

## Directory Structure

```
app/
  layout.tsx                   # Root layout — ThemeProvider
  globals.css                  # Global styles + CSS variables
  favicon.ico                  # Site icon (used in sidebar logo)
  (admin)/
    layout.tsx                 # Admin layout — LayoutSettingsProvider + SidebarProvider
    page.tsx                   # Dashboard
    users/page.tsx             # Users list
    orders/page.tsx            # Orders list
    settings/page.tsx          # Settings (side-nav layout)
    errors/403/page.tsx
    errors/404/page.tsx
    errors/500/page.tsx
    errors/503/page.tsx
components/
  app-header.tsx               # Sticky header
  app-sidebar.tsx              # Collapsible sidebar
  layout-settings-context.tsx  # Layout/theme context + localStorage
  style-settings.tsx           # Style settings Sheet drawer
  theme-provider.tsx           # next-themes wrapper
  theme-toggle.tsx             # Light/dark/system toggle
  bulk-action-bar.tsx          # Floating bar for table bulk actions
  data-table-pagination.tsx    # Pagination bar component
  facet-filter.tsx             # Multi-select filter button
  dashboard/
    stats-cards.tsx            # KPI stat cards
    revenue-chart.tsx          # Line/bar revenue chart (recharts)
    top-products.tsx           # Top products table
    recent-orders.tsx          # Recent orders list
  ui/                          # shadcn/ui primitives (do not modify)
hooks/
  use-data-table.ts            # Master table hook
  use-debounce.ts              # Generic debounce hook
  use-row-selection.ts         # Row checkbox selection hook
  use-mobile.ts                # Mobile breakpoint hook
lib/
  site.ts                      # siteConfig constants
  utils.ts                     # cn() utility
```

## Layout Stack

```
app/layout.tsx
  └─ ThemeProvider
       └─ app/(admin)/layout.tsx
            └─ LayoutSettingsProvider
                 ├─ AdminLayoutInner
                 │    └─ SidebarProvider (defaultOpen only, never controlled)
                 │         ├─ AppSidebar
                 │         └─ SidebarInset (overflow-hidden)
                 │              ├─ AppHeader (sticky)
                 │              └─ <main> (overflow-y-auto)
                 └─ StyleSettings  ← outside SidebarProvider
```

## Sidebar Navigation

### How to Add Menu Items

Edit `components/app-sidebar.tsx` and modify the `navGroups` array:

```tsx
const navGroups: NavGroup[] = [
  {
    label: "概览", // Group label
    items: [{ title: "仪表盘", icon: LayoutDashboard, href: "/" }],
  },
  {
    label: "业务管理", // Another group
    items: [
      { title: "用户管理", icon: Users, href: "/users" },
      { title: "订单管理", icon: ShoppingCart, href: "/orders" },
    ],
  },
];
```

### Menu Item Types

**Simple Link** (no children):

```tsx
{ title: "用户管理", icon: Users, href: "/users" }
```

**Collapsible Group** (with children):

```tsx
{
  title: "错误页面",
  icon: AlertTriangle,
  children: [
    { title: "403 禁止访问", href: "/errors/403" },
    { title: "404 页面不存在", href: "/errors/404" },
  ],
}
```

### Navigation Rules

- Each group has a `label` (displayed as `SidebarGroupLabel`)
- Items with `href` are direct links
- Items with `children` become collapsible sub-menus
- When sidebar is collapsed (`icon` mode), items with children show a `DropdownMenu` on hover
- When expanded, items with children use `Collapsible` component
- Active state is determined by `pathname === item.href`
- Sub-menus auto-expand if any child matches current pathname

## Key Components

| File                                     | Purpose                                                                                                        |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `components/layout-settings-context.tsx` | Context: `sidebarStyle`, `layoutMode`, `prevLayoutMode`, `styleSettingsOpen`. All persisted to `localStorage`. |
| `components/app-sidebar.tsx`             | Grouped nav, collapsible sub-menus. Collapsed → `DropdownMenu`. Footer: avatar + `ChevronsUpDown`.             |
| `components/app-header.tsx`              | Frosted-glass header. Hidden mode → restore button; others → `SidebarTrigger`.                                 |
| `components/style-settings.tsx`          | Controlled Sheet via context. 主题/侧边栏/布局 pickers with mini preview thumbnails.                           |
| `components/theme-toggle.tsx`            | Three-state theme toggle (light/dark/system).                                                                  |
| `lib/site.ts`                            | `siteConfig` — name, subtitle, description, icon. Used in sidebar header and metadata.                         |

## Layout Settings

### SidebarStyle (`sidebarStyle`)

- `"default"` — Standard sidebar with border-r
- `"floating"` — Sidebar with rounded corners + shadow
- `"inset"` — `SidebarInset` gets `m-2 rounded-xl h-[calc(100svh-1rem)] flex flex-col`; `<main>` gets `overflow-y-auto`

### LayoutMode (`layoutMode`)

- `"expanded"` — Full-width sidebar, `collapsible="offcanvas"`, `defaultOpen=true`
- `"collapsed"` — Icon-only sidebar, `collapsible="icon"`, `defaultOpen=false`
- `"hidden"` — No sidebar, `collapsible="offcanvas"`, `defaultOpen=false`

### prevLayoutMode

Tracks the last non-hidden layout mode. When `layoutMode === "hidden"`, the header shows a restore button that calls `setLayoutMode(prevLayoutMode)`.

### Critical Rules

- `SidebarProvider` uses **`defaultOpen` only** — never pass controlled `open` prop (breaks animations)
- `StyleSettings` must live **outside** `SidebarProvider` — prevents Sheet closing on layout switch
- Global `* { transition }` in `globals.css` overrides sidebar width transitions → use Tailwind `![]` modifier in `sidebar.tsx`

## Installed shadcn/ui Components

```
button, card, table, badge, avatar, separator, skeleton, input, select, textarea,
breadcrumb, scroll-area, tooltip, chart, progress, dialog, alert-dialog, sheet,
tabs, toggle, collapsible, dropdown-menu, sidebar, popover, command, checkbox,
pagination, input-group
```

### Custom UI Modifications

| File                                 | Change                                                                                              |
| ------------------------------------ | --------------------------------------------------------------------------------------------------- |
| `components/ui/dropdown-menu.tsx:76` | `cursor-pointer` (was `cursor-default`)                                                             |
| `components/ui/sidebar.tsx`          | `h-svh` (was `min-h-svh`); `!important` transitions on sidebar-gap, sidebar-container, SidebarInset |
| `components/ui/button.tsx`           | `size="icon-sm"` variant added                                                                      |

## Hooks

### `useDataTable` (master table hook)

Provides all state management for list pages: pagination, search, filters, and row selection.

```tsx
const {
  page,
  pageSize,
  setPage,
  onPageSizeChange, // pagination
  search,
  onSearchChange, // debounced search
  filters,
  toggleFilter,
  clearFilter, // facet filters
  clearAllFilters,
  hasActiveFilters,
  selected,
  allSelected,
  someSelected, // row selection
  toggleAll,
  toggleOne,
  clearSelection,
  params, // api-ready: { page, pageSize, search, filters }
} = useDataTable({
  ids: rows.map((r) => r.id),
  filterKeys: ["status", "role"],
  defaultPageSize: 10,
  searchDebounce: 300,
});
```

### `useDebounce`

```tsx
const debouncedValue = useDebounce(value, 300);
```

### `useRowSelection`

```tsx
const { selected, allSelected, someSelected, toggleAll, toggleOne, clearSelection } =
  useRowSelection(ids);
```

## Reusable Table Components

| Component                              | Purpose                                                                    | Import Path                          |
| -------------------------------------- | -------------------------------------------------------------------------- | ------------------------------------ |
| `FacetFilter`                          | Multi-select filter button with popover, max 2 inline labels               | `@/components/facet-filter`          |
| `DataTablePagination`                  | Rows-per-page selector + first/prev/pages/next/last                        | `@/components/data-table-pagination` |
| `BulkActionBar`                        | Fixed floating bar: clear + count + icon-only action buttons with tooltips | `@/components/bulk-action-bar`       |
| `Table`, `TableHeader`, `TableBody`... | shadcn table primitives                                                    | `@/components/ui/table`              |
| `Input`                                | Search input                                                               | `@/components/ui/input`              |
| `Checkbox`                             | Row selection checkboxes                                                   | `@/components/ui/checkbox`           |
| `DropdownMenu`                         | Row action menu (three-dot menu)                                           | `@/components/ui/dropdown-menu`      |
| `Dialog`                               | Simple detail view modal                                                   | `@/components/ui/dialog`             |
| `AlertDialog`                          | Destructive action confirmation (delete, disable, etc.)                    | `@/components/ui/alert-dialog`       |

## List Page Implementation Guide

### Complete List Page Structure

```tsx
"use client";

import { useEffect, useState } from "react";
import { Plus, MoreHorizontal, Trash2, Power, PowerOff, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { FacetFilter } from "@/components/facet-filter";
import { DataTablePagination } from "@/components/data-table-pagination";
import { BulkActionBar } from "@/components/bulk-action-bar";
import { useDataTable } from "@/hooks/use-data-table";

export default function ListPage() {
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const {
    page,
    pageSize,
    setPage,
    onPageSizeChange,
    search,
    onSearchChange,
    filters,
    toggleFilter,
    clearFilter,
    clearAllFilters,
    hasActiveFilters,
    selected,
    allSelected,
    someSelected,
    toggleAll,
    toggleOne,
    clearSelection,
    params,
  } = useDataTable({
    ids: data.map((item) => item.id),
    filterKeys: ["status", "role"],
  });

  // API call with params
  useEffect(() => {
    // fetch("/api/items", { params })
    console.log("[API params]", params);
  }, [params]);

  const handleDelete = (id: number) => {
    setDeleteId(id);
  };

  const confirmDelete = () => {
    // API call to delete
    console.log("Delete:", deleteId);
    setDeleteId(null);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">页面标题</h1>
          <p className="text-muted-foreground">页面描述</p>
        </div>
        <Button>
          <Plus data-icon="inline-start" />
          新增
        </Button>
      </div>

      {/* Toolbar: Search + Filters + Reset */}
      <div className="flex items-center gap-2">
        <Input
          placeholder="搜索..."
          className="w-56"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <FacetFilter
          label="状态"
          options={statusOptions}
          selected={filters["status"]}
          onToggle={(v) => toggleFilter("status", v)}
          onClear={() => clearFilter("status")}
        />
        <FacetFilter
          label="角色"
          options={roleOptions}
          selected={filters["role"]}
          onToggle={(v) => toggleFilter("role", v)}
          onClear={() => clearFilter("role")}
        />
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="flex items-center gap-1 h-9 px-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="size-3.5" />
            重置
          </button>
        )}
      </div>

      {/* Table */}
      <Card className="py-0 rounded-lg">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10">
                  <Checkbox
                    checked={allSelected}
                    data-state={someSelected ? "indeterminate" : undefined}
                    onCheckedChange={toggleAll}
                    aria-label="全选"
                  />
                </TableHead>
                <TableHead>列名</TableHead>
                <TableHead>状态</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id} data-state={selected.has(item.id) ? "selected" : undefined}>
                  <TableCell>
                    <Checkbox
                      checked={selected.has(item.id)}
                      onCheckedChange={() => toggleOne(item.id)}
                      aria-label={`选择 ${item.name}`}
                    />
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    <Badge>{item.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>查看详情</DropdownMenuItem>
                        <DropdownMenuItem>编辑</DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => handleDelete(item.id)}
                        >
                          删除
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      <DataTablePagination
        page={page}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={onPageSizeChange}
      />

      {/* Bulk Actions */}
      <BulkActionBar
        count={selected.size}
        onClear={clearSelection}
        actions={[
          { icon: <Power className="size-4" />, label: "开启", onClick: () => {} },
          { icon: <PowerOff className="size-4" />, label: "禁用", onClick: () => {} },
          {
            icon: <Trash2 className="size-4" />,
            label: "删除",
            onClick: () => {},
            className: "size-7 text-destructive hover:text-destructive",
          },
        ]}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除</AlertDialogTitle>
            <AlertDialogDescription>此操作无法撤销。确定要删除这条记录吗?</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={confirmDelete}>
              删除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
```

### List Page Checklist

- [ ] **Page Header**: Title + description + action button (新增)
- [ ] **Toolbar**: `Input` for search + `FacetFilter` for filters + reset button
- [ ] **Table**: Wrapped in `Card` → `CardContent` with `p-0`
- [ ] **Checkbox Column**: `w-10` width, `allSelected` + `someSelected` for header
- [ ] **Action Column**: `w-10` width, `DropdownMenu` with `MoreHorizontal` icon
- [ ] **Row Selection**: `data-state="selected"` on `TableRow` when selected
- [ ] **Pagination**: `DataTablePagination` component below table
- [ ] **Bulk Actions**: `BulkActionBar` with icon-only buttons
- [ ] **Delete Confirmation**: `AlertDialog` with `variant="destructive"` on action button

### Data Binding

**Search**:

- Use `Input` component with `value={search}` and `onChange={(e) => onSearchChange(e.target.value)}`
- `useDataTable` handles debouncing automatically

**Filters**:

- Use `FacetFilter` component for each filter dimension
- Pass `selected={filters["key"]}`, `onToggle={(v) => toggleFilter("key", v)}`, `onClear={() => clearFilter("key")}`

**Pagination**:

- `DataTablePagination` handles all pagination UI
- Pass `page`, `totalPages`, `pageSize`, `onPageChange`, `onPageSizeChange`
- `totalPages` comes from API response

**API Integration**:

```tsx
useEffect(() => {
  // params contains: { page, pageSize, search, filters }
  fetch("/api/items", {
    method: "POST",
    body: JSON.stringify(params),
  });
}, [params]);
```

### Row Actions (Three-Dot Menu)

**Standard Actions**:

```tsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost" size="icon">
      <MoreHorizontal className="size-4" />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuItem onClick={() => handleView(item.id)}>查看详情</DropdownMenuItem>
    <DropdownMenuItem onClick={() => handleEdit(item.id)}>编辑</DropdownMenuItem>
    <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(item.id)}>
      删除
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

**Rules**:

- Destructive actions (删除, 禁用) use `className="text-destructive"`
- Always use `align="end"` for right-aligned menus
- Use `onClick` handlers, not `<Link>` for actions that need confirmation

### Detail View Patterns

**Simple Detail (Dialog)**:
Use `Dialog` for simple data that fits in a modal:

```tsx
const [viewId, setViewId] = useState<number | null>(null);

<Dialog open={viewId !== null} onOpenChange={() => setViewId(null)}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>详情</DialogTitle>
    </DialogHeader>
    <div className="space-y-4">{/* Detail content */}</div>
  </DialogContent>
</Dialog>;
```

**Complex Detail (Sub-page)**:
For complex data with tabs, forms, or nested tables, create a sub-route:

```
app/(admin)/users/
  page.tsx              # List page
  [id]/page.tsx         # Detail page
```

```tsx
// app/(admin)/users/[id]/page.tsx
export default function UserDetailPage({ params }: { params: { id: string } }) {
  return <div className="flex flex-col gap-4">{/* Detail content */}</div>;
}
```

### Delete Confirmation Pattern

**Always use `AlertDialog` for destructive actions**:

```tsx
const [deleteId, setDeleteId] = useState<number | null>(null);

const handleDelete = (id: number) => {
  setDeleteId(id);
};

const confirmDelete = async () => {
  await fetch(`/api/items/${deleteId}`, { method: "DELETE" });
  setDeleteId(null);
  // Refresh data
};

<AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>确认删除</AlertDialogTitle>
      <AlertDialogDescription>此操作无法撤销。确定要删除这条记录吗?</AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>取消</AlertDialogCancel>
      <AlertDialogAction variant="destructive" onClick={confirmDelete}>
        删除
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>;
```

**Rules**:

- Use `variant="destructive"` on `AlertDialogAction` for delete/disable actions
- Always provide clear description of consequences
- Use `open` + `onOpenChange` for controlled state
- Store the ID to delete in state, not the full object

### Bulk Actions Pattern

**Standard Bulk Actions**:

```tsx
import { Power, PowerOff, Trash2 } from "lucide-react";
import { BulkActionBar, type BulkAction } from "@/components/bulk-action-bar";

const bulkActions: BulkAction[] = [
  {
    icon: <Power className="size-4" />,
    label: "批量开启",
    onClick: () => console.log("Enable:", Array.from(selected)),
  },
  {
    icon: <PowerOff className="size-4" />,
    label: "批量禁用",
    onClick: () => console.log("Disable:", Array.from(selected)),
  },
  {
    icon: <Trash2 className="size-4" />,
    label: "批量删除",
    onClick: () => console.log("Delete:", Array.from(selected)),
    className: "size-7 text-destructive hover:text-destructive",
  },
];

<BulkActionBar count={selected.size} onClear={clearSelection} actions={bulkActions} />;
```

**Rules**:

- Destructive actions use `className="size-7 text-destructive hover:text-destructive"`
- Always provide `label` for tooltip
- Use icon-only buttons (no text)
- Bar auto-hides when `count === 0`

## Settings Page Pattern

Side-nav layout with URL-bound sections. Each section is a separate page under a shared layout:

```
app/(admin)/settings/
  layout.tsx          # shared side-nav + header, usePathname for active highlight
  page.tsx            # redirect("/settings/general")
  general/page.tsx
  security/page.tsx
  notifications/page.tsx
```

```tsx
// layout.tsx — "use client"
const navItems = [
  { label: "基本设置", href: "/settings/general" },
  { label: "安全设置", href: "/settings/security" },
];
const pathname = usePathname();
// active: pathname === item.href
// nav items are <Link> (not <button>)
```

- Section content has **no Card border/rounded** — plain `<div>` with title + description
- `page.tsx` at the index route must `redirect()` to the default section
- Nav items use `<Link>` not `<button>` so URLs are bookmarkable

### Tab / Sub-nav URL Binding Rule

**Page-level side navigation MUST be URL-bound** (like the settings page):

- Each section → its own `page.tsx` under a shared `layout.tsx`
- Index route → `redirect()` to default section
- Active state driven by `usePathname()`, not `useState`
- Nav items use `<Link>` not `<button>`

**In-page tabs** (e.g. `shadcn Tabs` within a single page) may use local state — no URL binding required.

## Error Page Pattern

```tsx
<div className="flex flex-1 flex-col items-center justify-center gap-6 text-center relative overflow-hidden">
  <Icon className="absolute inset-0 size-full text-foreground/5 dark:text-foreground/10 pointer-events-none select-none" />
  <div className="flex flex-col gap-2 relative">
    <h1 className="text-8xl font-bold tracking-tight">4xx</h1>
    <p className="text-xl font-medium">标题</p>
    <p className="text-sm text-muted-foreground">描述</p>
  </div>
  <Button asChild className="relative">
    <Link href="/">返回首页</Link>
  </Button>
</div>
```

## Conventions

1. All layout/interactive components are `"use client"`.
2. Use `siteConfig` from `lib/site.ts` for site name, subtitle, icon — never hardcode.
3. Chart colors: `CartesianGrid stroke="var(--color-border)"`, tick `fill="var(--color-muted-foreground)"`.
4. Mini preview thumbnails in style settings use hardcoded zinc colors (not semantic tokens).
5. Never add `h-full` inside a margin/padding container — causes overflow in floating layout.
6. Inset mode: `overflow-hidden` on `SidebarInset`, `overflow-y-auto` on inner `<main>`.
7. Sidebar footer user button uses `ChevronsUpDown` icon (not `ChevronRight`).
8. Always wrap tables in `Card` → `CardContent` with `p-0` for consistent styling.
9. Use `MoreHorizontal` icon for row action menus (three-dot menu).
10. Destructive actions always require `AlertDialog` confirmation.
