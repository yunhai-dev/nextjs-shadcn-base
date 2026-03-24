"use client";

import { useEffect } from "react";
import { Plus, MoreHorizontal, Power, PowerOff, Trash2, X } from "lucide-react";
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FacetFilter } from "@/components/facet-filter";
import { DataTablePagination } from "@/components/data-table-pagination";
import { BulkActionBar } from "@/components/bulk-action-bar";
import { useDataTable } from "@/hooks/use-data-table";

const users = [
  {
    id: 1,
    name: "张三",
    email: "zhangsan@example.com",
    role: "普通用户",
    status: "正常",
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    name: "李四",
    email: "lisi@example.com",
    role: "VIP用户",
    status: "正常",
    createdAt: "2024-02-20",
  },
  {
    id: 3,
    name: "王五",
    email: "wangwu@example.com",
    role: "普通用户",
    status: "禁用",
    createdAt: "2024-03-10",
  },
  {
    id: 4,
    name: "赵六",
    email: "zhaoliu@example.com",
    role: "管理员",
    status: "正常",
    createdAt: "2024-01-01",
  },
  {
    id: 5,
    name: "钱七",
    email: "qianqi@example.com",
    role: "VIP用户",
    status: "正常",
    createdAt: "2024-04-05",
  },
  {
    id: 6,
    name: "孙八",
    email: "sunba@example.com",
    role: "普通用户",
    status: "待审核",
    createdAt: "2024-07-18",
  },
];

const roleVariant: Record<string, "default" | "secondary" | "outline"> = {
  管理员: "default",
  VIP用户: "secondary",
  普通用户: "outline",
};

const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  正常: "default",
  禁用: "destructive",
  待审核: "outline",
};

const statusOptions = ["正常", "禁用", "待审核"];
const roleOptions = ["管理员", "VIP用户", "普通用户"];
const totalPages = 50;

export default function UsersPage() {
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
    ids: users.map((u) => u.id),
    filterKeys: ["status", "role"],
  });

  // TODO: replace with real API call
  useEffect(() => {
    // fetch("/api/users", { params })
    console.log("[API params]", params);
  }, [params]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">用户管理</h1>
          <p className="text-muted-foreground">管理系统中的所有用户</p>
        </div>
        <Button>
          <Plus data-icon="inline-start" />
          新增用户
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Input
          placeholder="搜索用户..."
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
                <TableHead>用户</TableHead>
                <TableHead className="hidden md:table-cell">邮箱</TableHead>
                <TableHead>角色</TableHead>
                <TableHead>状态</TableHead>
                <TableHead className="hidden md:table-cell">注册日期</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} data-state={selected.has(user.id) ? "selected" : undefined}>
                  <TableCell>
                    <Checkbox
                      checked={selected.has(user.id)}
                      onCheckedChange={() => toggleOne(user.id)}
                      aria-label={`选择 ${user.name}`}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="size-8">
                        <AvatarFallback className="text-xs">{user.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground">
                    {user.email}
                  </TableCell>
                  <TableCell>
                    <Badge variant={roleVariant[user.role]}>{user.role}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[user.status]}>{user.status}</Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground">
                    {user.createdAt}
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
                        <DropdownMenuItem className="text-destructive">禁用</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <DataTablePagination
        page={page}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={onPageSizeChange}
      />
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
    </div>
  );
}
