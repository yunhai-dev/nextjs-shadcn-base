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

| File                                   | Purpose                                                                    |
| -------------------------------------- | -------------------------------------------------------------------------- |
| `components/facet-filter.tsx`          | Dashed-border filter button, popover command palette, max 2 inline labels  |
| `components/data-table-pagination.tsx` | Rows-per-page selector + first/prev/pages/next/last                        |
| `components/bulk-action-bar.tsx`       | Fixed floating bar: clear + count + icon-only action buttons with tooltips |

### FacetFilter Reset Button Convention

```tsx
{
  hasActiveFilters && (
    <button
      onClick={clearAllFilters}
      className="flex items-center gap-1 h-9 px-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
    >
      <X className="size-3.5" />
      重置
    </button>
  );
}
```

## Page Patterns

### List/Table Page Template

```tsx
"use client";
import { useDataTable } from "@/hooks/use-data-table";
import { FacetFilter } from "@/components/facet-filter";
import { DataTablePagination } from "@/components/data-table-pagination";
import { BulkActionBar, type BulkAction } from "@/components/bulk-action-bar";

export default function SomePage() {
  const { ...all } = useDataTable({ ids, filterKeys: ["status"] });
  const bulkActions: BulkAction[] = [{ icon: <Icon />, label: "操作", onClick: () => {} }];
  return (
    <div className="flex flex-col gap-4">
      {/* toolbar: Input + FacetFilter + reset */}
      {/* Table with checkboxes */}
      <DataTablePagination
        page={page}
        totalPages={N}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={onPageSizeChange}
      />
      <BulkActionBar count={selected.size} onClear={clearSelection} actions={bulkActions} />
    </div>
  );
}
```

### Settings Page Pattern

Side-nav layout with fixed left nav and scrollable right content:

```tsx
<div className="flex flex-col gap-6 h-full">
  <div>{/* header + Separator */}</div>
  <div className="flex flex-1 min-h-0 gap-8">
    <nav className="w-44 shrink-0 flex flex-col gap-1">{/* nav buttons */}</nav>
    <div className="flex-1 overflow-y-auto">{/* section content */}</div>
  </div>
</div>
```

### Error Page Pattern

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
