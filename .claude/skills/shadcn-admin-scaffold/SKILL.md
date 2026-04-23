---
name: shadcn-admin-scaffold
description: Scaffold pages for shadcn-admin-base projects following exact component patterns, layout conventions, and code structure. Use this skill whenever the user wants to create list pages, settings pages, detail pages, error pages, or add sidebar menu items in a shadcn/ui admin dashboard project. Also trigger when they mention "create a page", "add a module", "scaffold a feature", or reference any CRUD interface patterns, even if they don't explicitly say "scaffold" or "admin".
---

# shadcn-admin-scaffold

Generate page scaffolds for the shadcn-admin-base project that follow exact component usage patterns, layout conventions, and code organization standards.

## When to Use This Skill

Use this skill when the user wants to:

- Create a new list/table page with search, filters, pagination, and bulk actions
- Add a settings-style page with side navigation and URL-bound sections
- Create detail or edit pages (Dialog for simple, sub-route for complex)
- Add new sidebar menu items or groups
- Scaffold any admin interface component following project conventions

## Core Principles

1. **Follow the project's component patterns exactly** - Use `useDataTable`, `FacetFilter`, `DataTablePagination`, `BulkActionBar` as shown in existing pages
2. **Maintain consistent layout structure** - Card wrapping, spacing, toolbar placement
3. **Respect project conventions** - URL binding for settings, AlertDialog for deletes, MoreHorizontal for row actions
4. **Generate clean, minimal code** - No business logic, just structural scaffolding with placeholder data
5. **Use Chinese labels** - All UI text should be in Chinese to match the project

## Project Context

This is a Next.js App Router project using:

- **UI**: shadcn/ui (radix-nova style)
- **Styling**: Tailwind CSS v4
- **State**: Custom hooks (`useDataTable`, `useRowSelection`, `useDebounce`)
- **Icons**: lucide-react
- **Language**: Chinese (all labels, descriptions, placeholders)

### Key File Locations

```
app/(admin)/
  layout.tsx              # Admin layout with sidebar
  page.tsx                # Dashboard
  [feature]/page.tsx      # List pages
  [feature]/[id]/page.tsx # Detail pages
  settings/
    layout.tsx            # Settings layout with side nav
    [section]/page.tsx    # Settings sections

components/
  app-sidebar.tsx         # Sidebar with navGroups array
  facet-filter.tsx        # Multi-select filter
  data-table-pagination.tsx
  bulk-action-bar.tsx
  ui/                     # shadcn primitives

hooks/
  use-data-table.ts       # Master table hook
```

## Page Types

### 1. List Page (Most Common)

A list page includes:

- Page header with title, description, and action button
- Toolbar with search Input + FacetFilter components + reset button
- Table wrapped in Card → CardContent (p-0)
- Checkbox column for row selection
- Action column with DropdownMenu (MoreHorizontal icon)
- DataTablePagination below table
- BulkActionBar for multi-select actions
- AlertDialog for delete confirmation

**Required imports**:

```tsx
"use client";

import { useEffect, useState } from "react";
import { Plus, MoreHorizontal, Trash2, X } from "lucide-react";
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
```

**Structure template**:

```tsx
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
    ids: mockData.map((item) => item.id),
    filterKeys: ["status", "category"], // Adjust based on needs
  });

  useEffect(() => {
    // TODO: Replace with real API call
    console.log("[API params]", params);
  }, [params]);

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
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

      {/* Toolbar */}
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
              {/* TODO: Replace with API data
                  Real scenario:
                  const { data, isLoading } = useQuery(['items', page, pageSize, search, filters], fetchItems);
                  const filteredData = data?.items || [];
                  
                  Mock scenario (client-side filtering):
                  const filteredData = useMemo(() => {
                    return mockData.filter(item => {
                      if (search && !item.name.toLowerCase().includes(search.toLowerCase())) return false;
                      if (filters.status?.size > 0 && !filters.status.has(item.status)) return false;
                      return true;
                    });
                  }, [mockData, search, filters]);
              */}
              {mockData
                .filter((item) => {
                  // Client-side filtering for mock data
                  if (search && !item.name.toLowerCase().includes(search.toLowerCase()))
                    return false;
                  if (filters.status?.size > 0 && !filters.status.has(item.status)) return false;
                  return true;
                })
                .map((item) => (
                  <TableRow
                    key={item.id}
                    data-state={selected.has(item.id) ? "selected" : undefined}
                  >
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
                            onClick={() => setDeleteId(item.id)}
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
        totalPages={10} // TODO: Get from API
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={onPageSizeChange}
      />

      {/* Bulk Actions */}
      <BulkActionBar
        count={selected.size}
        onClear={clearSelection}
        actions={[
          {
            icon: <Trash2 className="size-4" />,
            label: "批量删除",
            onClick: () => console.log("Bulk delete:", Array.from(selected)),
            className: "size-7 text-destructive hover:text-destructive",
          },
        ]}
      />

      {/* Delete Confirmation */}
      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除</AlertDialogTitle>
            <AlertDialogDescription>此操作无法撤销。确定要删除这条记录吗?</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={() => {
                console.log("Delete:", deleteId);
                setDeleteId(null);
              }}
            >
              删除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
```

**Critical conventions**:

- Always wrap Table in `Card` → `CardContent` with `p-0`
- Checkbox column: `w-10` width
- Action column: `w-10` width, `MoreHorizontal` icon
- Destructive actions: `className="text-destructive"` in menu, `variant="destructive"` in AlertDialog
- Reset button: plain `<button>` with specific classes (not Button component)
- Row selection: `data-state="selected"` on TableRow
- Use `useEffect` with `params` dependency for API calls (leave as TODO comment)
- **IMPORTANT**: Always apply client-side filtering to mock data (see Data Filtering section below)

### Data Filtering: Mock vs Real API

**For Mock Data (Development/Demo)**:
Always filter data client-side before rendering:

```tsx
{
  mockData
    .filter((item) => {
      // Search filter
      if (search && !item.name.toLowerCase().includes(search.toLowerCase())) return false;
      // Status filter
      if (filters.status?.size > 0 && !filters.status.has(item.status)) return false;
      // Category filter
      if (filters.category?.size > 0 && !filters.category.has(item.category)) return false;
      return true;
    })
    .map((item) => <TableRow key={item.id}>...</TableRow>);
}
```

**For Real API (Production)**:
The `params` object from `useDataTable` is already API-ready. Pass it to your backend:

```tsx
useEffect(() => {
  // params contains: { page, pageSize, search, filters }
  // Backend should handle filtering, pagination, and search
  fetch("/api/items", {
    method: "POST",
    body: JSON.stringify(params),
  })
    .then((res) => res.json())
    .then((data) => setItems(data.items));
}, [params]);

// Then render the API data directly (already filtered by backend)
{
  items.map((item) => <TableRow key={item.id}>...</TableRow>);
}
```

**Key difference**:

- Mock data: Filter client-side in the render
- API data: Backend filters, client renders directly

### 2. Settings Page (Side Nav + URL Binding)

Settings pages use a shared layout with side navigation, where each section is a separate route.

**Directory structure**:

```
app/(admin)/settings/
  layout.tsx          # Side nav + header
  page.tsx            # Redirects to first section
  general/page.tsx    # Section 1
  security/page.tsx   # Section 2
  notifications/page.tsx # Section 3
```

**layout.tsx pattern**:

```tsx
"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Settings, Shield, Bell } from "lucide-react";

const navItems = [
  { label: "基本设置", href: "/settings/general", icon: Settings },
  { label: "安全设置", href: "/settings/security", icon: Shield },
  { label: "通知设置", href: "/settings/notifications", icon: Bell },
];

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-bold">设置</h1>
        <p className="text-muted-foreground">管理系统设置和偏好</p>
      </div>
      <div className="flex gap-6">
        {/* Side Nav */}
        <nav className="w-48 shrink-0">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
                  pathname === item.href
                    ? "bg-accent text-accent-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                }`}
              >
                <item.icon className="size-4" />
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
        {/* Content */}
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
```

**page.tsx (index redirect)**:

```tsx
import { redirect } from "next/navigation";

export default function SettingsPage() {
  redirect("/settings/general");
}
```

**Section page pattern** (no Card wrapper):

```tsx
export default function GeneralSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium">基本设置</h2>
        <p className="text-sm text-muted-foreground">管理基本信息和偏好</p>
      </div>
      {/* Settings content - no Card border */}
      <div className="space-y-4">{/* Form fields, switches, etc. */}</div>
    </div>
  );
}
```

**Critical conventions**:

- Use `<Link>` not `<button>` for nav items (URLs must be bookmarkable)
- Active state driven by `usePathname()`, not `useState`
- Index route must `redirect()` to default section
- Section content has **no Card wrapper** - plain div with title + description
- Side nav uses `w-48 shrink-0` for fixed width

### 3. Adding Sidebar Menu Items

Edit `components/app-sidebar.tsx` and modify the `navGroups` array.

**Simple link**:

```tsx
{ title: "用户管理", icon: Users, href: "/users" }
```

**Collapsible group**:

```tsx
{
  title: "系统管理",
  icon: Settings,
  children: [
    { title: "角色管理", href: "/system/roles" },
    { title: "权限管理", href: "/system/permissions" },
  ],
}
```

**Adding a new group**:

```tsx
const navGroups: NavGroup[] = [
  // ... existing groups
  {
    label: "新分组名称",
    items: [
      { title: "菜单项1", icon: IconComponent, href: "/path1" },
      { title: "菜单项2", icon: IconComponent, href: "/path2" },
    ],
  },
];
```

### 4. Detail Pages

**Simple detail (Dialog)**:
Use for viewing simple data that fits in a modal.

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

**Complex detail (Sub-route)**:
For complex data with tabs, forms, or nested content.

```
app/(admin)/[feature]/
  page.tsx              # List page
  [id]/page.tsx         # Detail page
```

### 5. Error Pages

```tsx
import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ErrorPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center relative overflow-hidden">
      <AlertTriangle className="absolute inset-0 size-full text-foreground/5 dark:text-foreground/10 pointer-events-none select-none" />
      <div className="flex flex-col gap-2 relative">
        <h1 className="text-8xl font-bold tracking-tight">404</h1>
        <p className="text-xl font-medium">页面不存在</p>
        <p className="text-sm text-muted-foreground">您访问的页面不存在或已被删除</p>
      </div>
      <Button asChild className="relative">
        <Link href="/">返回首页</Link>
      </Button>
    </div>
  );
}
```

## Component Usage Reference

| Component             | Import Path                          | Usage                                                                       |
| --------------------- | ------------------------------------ | --------------------------------------------------------------------------- |
| `useDataTable`        | `@/hooks/use-data-table`             | Master hook for list pages - handles pagination, search, filters, selection |
| `FacetFilter`         | `@/components/facet-filter`          | Multi-select filter with popover                                            |
| `DataTablePagination` | `@/components/data-table-pagination` | Pagination controls                                                         |
| `BulkActionBar`       | `@/components/bulk-action-bar`       | Floating action bar for selected rows                                       |
| `Input`               | `@/components/ui/input`              | Search input                                                                |
| `Table`               | `@/components/ui/table`              | Table primitives                                                            |
| `Checkbox`            | `@/components/ui/checkbox`           | Row selection                                                               |
| `DropdownMenu`        | `@/components/ui/dropdown-menu`      | Row actions (three-dot menu)                                                |
| `Dialog`              | `@/components/ui/dialog`             | Simple detail modals                                                        |
| `AlertDialog`         | `@/components/ui/alert-dialog`       | Delete/destructive confirmations                                            |
| `Badge`               | `@/components/ui/badge`              | Status indicators                                                           |
| `Button`              | `@/components/ui/button`             | Actions                                                                     |
| `Card`                | `@/components/ui/card`               | Wraps tables and content blocks                                             |

## Code Generation Guidelines

When generating code:

1. **Always use "use client"** at the top of page files
2. **Include all necessary imports** - don't leave any out
3. **Use Chinese for all UI text** - labels, placeholders, descriptions, button text
4. **Add TODO comments** for API integration points
5. **Include mock data** with realistic Chinese field names and values
6. **Follow exact component patterns** from the templates above
7. **Maintain consistent spacing** - `gap-4` for page sections, `gap-2` for toolbars
8. **Use proper icon sizing** - `size-4` for most icons, `size-3.5` for small ones
9. **Include proper ARIA labels** for accessibility
10. **Add proper TypeScript types** where needed

## Mock Data Pattern

Always include realistic mock data at the top of list pages:

```tsx
const mockData = [
  {
    id: 1,
    name: "示例项目",
    status: "进行中",
    category: "开发",
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    name: "测试项目",
    status: "已完成",
    category: "测试",
    createdAt: "2024-02-20",
  },
  // ... more items
];

const statusOptions = ["进行中", "已完成", "已暂停"];
const categoryOptions = ["开发", "测试", "设计"];
```

## File Naming Conventions

- List pages: `app/(admin)/[feature]/page.tsx`
- Detail pages: `app/(admin)/[feature]/[id]/page.tsx`
- Settings sections: `app/(admin)/settings/[section]/page.tsx`
- Settings layout: `app/(admin)/settings/layout.tsx`
- Error pages: `app/(admin)/errors/[code]/page.tsx`

## What NOT to Include

- ❌ Real API calls or backend logic
- ❌ Complex form validation
- ❌ Authentication/authorization code
- ❌ Business-specific calculations
- ❌ Database schemas or migrations
- ❌ Environment variables or config files

Focus purely on the frontend structure, layout, and component usage patterns.

## Workflow

When the user asks to create a page:

1. **Clarify the page type** - List? Settings? Detail? Error?
2. **Ask for basic info** - Page title, route path, what filters/columns they want
3. **Generate the file(s)** following the exact patterns above
4. **If it's a list page**, also ask if they want to add it to the sidebar
5. **Explain what you created** - file paths, what each section does, what they need to customize

Keep explanations brief and focused on the structure, not the business logic.
