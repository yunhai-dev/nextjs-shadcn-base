"use client";

import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  BarChart3,
  Settings,
  ChevronRight,
  Package,
  Bell,
  UserCheck,
  UserX,
  PackageSearch,
  PackagePlus,
  LineChart,
  PieChart,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayoutSettings } from "@/components/layout-settings-context";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

type NavSubItem = { title: string; href: string };
type NavItem = {
  title: string;
  icon: React.ElementType;
  href?: string;
  children?: NavSubItem[];
};
type NavGroup = { label: string; items: NavItem[] };

const navGroups: NavGroup[] = [
  {
    label: "概览",
    items: [{ title: "仪表盘", icon: LayoutDashboard, href: "/" }],
  },
  {
    label: "业务管理",
    items: [
      {
        title: "用户管理",
        icon: Users,
        children: [
          { title: "用户列表", href: "/users" },
          { title: "已认证用户", href: "/users/verified" },
          { title: "已禁用用户", href: "/users/banned" },
        ],
      },
      {
        title: "订单管理",
        icon: ShoppingCart,
        children: [
          { title: "全部订单", href: "/orders" },
          { title: "待处理", href: "/orders/pending" },
        ],
      },
      {
        title: "商品管理",
        icon: Package,
        children: [
          { title: "商品列表", href: "/products" },
          { title: "添加商品", href: "/products/new" },
        ],
      },
    ],
  },
  {
    label: "分析",
    items: [
      {
        title: "数据分析",
        icon: BarChart3,
        children: [
          { title: "趋势报表", href: "/analytics" },
          { title: "用户统计", href: "/analytics/users" },
        ],
      },
      { title: "通知中心", icon: Bell, href: "/notifications" },
    ],
  },
  {
    label: "系统",
    items: [{ title: "系统设置", icon: Settings, href: "/settings" }],
  },
];

export function AppSidebar({ collapsible }: { collapsible?: "offcanvas" | "icon" | "none" }) {
  const pathname = usePathname();
  const { sidebarStyle, layoutMode } = useLayoutSettings();

  return (
    <Sidebar
      collapsible={collapsible ?? (layoutMode === "collapsed" ? "icon" : "offcanvas")}
      variant={
        sidebarStyle === "floating" ? "floating" : sidebarStyle === "inset" ? "inset" : "sidebar"
      }
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <LayoutDashboard className="size-4 shrink-0" />
                </div>
                <div className="flex min-w-0 flex-col gap-0.5 leading-none">
                  <span className="truncate font-semibold">管理后台</span>
                  <span className="truncate text-xs text-muted-foreground">Admin Dashboard</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {navGroups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) =>
                  item.children ? (
                    <Collapsible
                      key={item.title}
                      asChild
                      defaultOpen={item.children.some((c) => c.href === pathname)}
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton tooltip={item.title}>
                            <item.icon />
                            <span>{item.title}</span>
                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up overflow-hidden">
                          <SidebarMenuSub>
                            {item.children.map((sub) => (
                              <SidebarMenuSubItem key={sub.href}>
                                <SidebarMenuSubButton asChild isActive={pathname === sub.href}>
                                  <Link href={sub.href}>{sub.title}</Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  ) : (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === item.href}
                        tooltip={item.title}
                      >
                        <Link href={item.href!}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ),
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg">
                  <Avatar className="size-8">
                    <AvatarImage src="" />
                    <AvatarFallback>管</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-0.5 leading-none">
                    <span className="font-medium">管理员</span>
                    <span className="text-xs text-muted-foreground">admin@example.com</span>
                  </div>
                  <ChevronRight className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="right" align="end" className="w-48">
                <DropdownMenuItem>个人资料</DropdownMenuItem>
                <DropdownMenuItem>账号设置</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">退出登录</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
