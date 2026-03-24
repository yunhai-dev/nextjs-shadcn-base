<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# Project: shadcn-admin-base

Chinese-language admin dashboard built with Next.js App Router, shadcn/ui (radix-nova style), Tailwind CSS v4, and pnpm.

## Architecture Overview

### Route Structure

- `app/layout.tsx` — Root layout: `ThemeProvider` (next-themes)
- `app/(admin)/layout.tsx` — Admin layout: `LayoutSettingsProvider` → `AdminLayoutInner` → `SidebarProvider` + `AppSidebar` + `SidebarInset` + `AppHeader`
- `app/(admin)/page.tsx` — Dashboard page
- `app/(admin)/users/`, `orders/`, `settings/` — Feature pages

### Key Components

| File                                     | Purpose                                                                                                    |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `components/layout-settings-context.tsx` | React context for `sidebarStyle` + `layoutMode`, persisted to `localStorage`                               |
| `components/app-sidebar.tsx`             | Collapsible sidebar with grouped nav, sub-menus via `Collapsible`, user avatar dropdown in footer          |
| `components/app-header.tsx`              | Sticky header: sidebar trigger, breadcrumb, search, theme toggle, style settings, notifications, user menu |
| `components/style-settings.tsx`          | Sheet drawer with 主题/侧边栏/布局 settings and mini preview thumbnails                                    |
| `components/theme-toggle.tsx`            | Light/dark/system theme toggle                                                                             |
| `components/dashboard/`                  | Dashboard widgets: stats cards, revenue chart, top products, recent orders                                 |

## Layout Settings

### SidebarStyle (`sidebarStyle`)

- `"default"` — Standard sidebar with border-r
- `"floating"` — Sidebar with rounded corners + shadow; content area has no extra border/shadow
- `"inset"` — Content area gets `m-2 rounded-xl overflow-hidden h-[calc(100svh-1rem)] flex flex-col`; inner `<main>` gets `overflow-y-auto` for inner scroll

### LayoutMode (`layoutMode`)

- `"expanded"` — Full-width sidebar, `collapsible="offcanvas"`
- `"collapsed"` — Icon-only sidebar, `collapsible="icon"`
- `"hidden"` — No sidebar rendered

### Critical: SidebarProvider key

```tsx
<SidebarProvider key={layoutMode} defaultOpen={layoutMode !== "hidden"}>
```

The `key={layoutMode}` forces a full remount when layout mode changes, resetting internal open/collapsed state. Without this, the sidebar trigger state mismatches the selected mode.

## Sidebar Transition

- Sidebar width animates via `transition-[width] duration-200 ease-linear` (built into `sidebar.tsx`)
- `SidebarInset` has `transition-[margin,width] duration-200 ease-linear` added to animate content area shift

## Header

- `sticky top-0 z-10 bg-background/80 backdrop-blur-sm` — frosted glass, no bottom border
- No scroll with content; stays fixed at top of `SidebarInset`

## Conventions & Rules

1. **All layout components are `"use client"`** — they use `useLayoutSettings`, `usePathname`, `useTheme`.
2. **`AppSidebar` accepts optional `collapsible` prop** — layout passes it explicitly; component falls back to context if not provided.
3. **`DropdownMenuItem` uses `cursor-pointer`** — changed from default `cursor-default` in `components/ui/dropdown-menu.tsx:76`.
4. **Mini preview thumbnails** in style settings use hardcoded zinc colors for theme previews (not semantic tokens), so they show actual light/dark appearance regardless of current theme.
5. **`MiniSidebar` uses `self-stretch`** to fill height without overflow in floating mode.
6. **`MiniContent` uses `overflow-hidden`** to clip inner content to preview box bounds.
7. **Never add `h-full` inside a margin/padding container** — causes overflow in floating sidebar layout.
8. **Inset mode scroll**: `overflow-hidden` on `SidebarInset`, `overflow-y-auto` on inner `<main>` — do not put scroll on the outer container.

## Installed shadcn/ui Components

button, card, table, badge, avatar, separator, skeleton, input, select, textarea, breadcrumb, scroll-area, tooltip, chart, progress, dialog, alert-dialog, sheet, tabs, toggle, collapsible, dropdown-menu, sidebar, popover, command, checkbox

## Data Table Pattern

All list/table pages follow a unified pattern using shared hooks and components.

### Reusable Components

| File                                   | Purpose                                                                                                                         |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `components/facet-filter.tsx`          | Multi-select filter button with dashed border, popover command palette, inline selected labels (max 2 shown)                    |
| `components/data-table-pagination.tsx` | Pagination bar: rows-per-page selector (left) + paginator with first/prev/pages/next/last (right)                               |
| `components/bulk-action-bar.tsx`       | Fixed floating bar shown when rows are selected: clear button, count label, configurable icon-only action buttons with tooltips |

### Reusable Hooks

| File                         | Purpose                                                                                                                           |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `hooks/use-debounce.ts`      | Generic debounce hook: `useDebounce(value, delay?)`                                                                               |
| `hooks/use-row-selection.ts` | Row selection state: `useRowSelection(ids)` → `{ selected, allSelected, someSelected, toggleAll, toggleOne, clearSelection }`     |
| `hooks/use-data-table.ts`    | Master table hook combining pagination + debounced search + filters + row selection. Exposes `params` object ready for API calls. |

### useDataTable Usage

```tsx
const {
  // pagination
  page,
  pageSize,
  setPage,
  onPageSizeChange,
  // search (debounced)
  search,
  onSearchChange,
  // filters
  filters,
  toggleFilter,
  clearFilter,
  clearAllFilters,
  hasActiveFilters,
  // row selection
  selected,
  allSelected,
  someSelected,
  toggleAll,
  toggleOne,
  clearSelection,
  // api-ready params (use in useEffect to fetch)
  params,
} = useDataTable({
  ids: rows.map((r) => r.id),
  filterKeys: ["status", "role"], // must match keys used in toggleFilter/clearFilter
  defaultPageSize: 10,
  searchDebounce: 300,
});

// params shape:
// { page, pageSize, search, filters: { status: string[], role: string[] } }
useEffect(() => {
  // fetch("/api/resource", { params })
}, [params]);
```

### Page Template

```tsx
"use client";
import { useEffect } from "react";
import { useDataTable } from "@/hooks/use-data-table";
import { FacetFilter } from "@/components/facet-filter";
import { DataTablePagination } from "@/components/data-table-pagination";
import { BulkActionBar, type BulkAction } from "@/components/bulk-action-bar";

export default function SomePage() {
  const { page, pageSize, setPage, onPageSizeChange, search, onSearchChange,
    filters, toggleFilter, clearFilter, clearAllFilters, hasActiveFilters,
    selected, allSelected, someSelected, toggleAll, toggleOne, clearSelection,
    params } = useDataTable({ ids, filterKeys: ["status"] });

  useEffect(() => { /* fetch with params */ }, [params]);

  const bulkActions: BulkAction[] = [
    { icon: <SomeIcon />, label: "操作名", onClick: () => {} },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* toolbar */}
      <div className="flex items-center gap-2">
        <Input value={search} onChange={(e) => onSearchChange(e.target.value)} />
        <FacetFilter label="状态" options={[...]} selected={filters["status"]}
          onToggle={(v) => toggleFilter("status", v)} onClear={() => clearFilter("status")} />
        {hasActiveFilters && <button onClick={clearAllFilters}>重置</button>}
      </div>
      {/* table with checkboxes — allSelected/someSelected/toggleAll/toggleOne/selected */}
      <DataTablePagination page={page} totalPages={N} pageSize={pageSize}
        onPageChange={setPage} onPageSizeChange={onPageSizeChange} />
      <BulkActionBar count={selected.size} onClear={clearSelection} actions={bulkActions} />
    </div>
  );
}
```

### FacetFilter Reset Button Convention

When multiple filters exist, render a global reset button outside the filters:

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
