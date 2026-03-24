"use client";

import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  Settings,
  ChevronRight,
  ChevronsUpDown,
  AlertTriangle,
  LogIn,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayoutSettings } from "@/components/layout-settings-context";
import { siteConfig } from "@/lib/site";
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
  useSidebar,
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
      { title: "用户管理", icon: Users, href: "/users" },
      { title: "订单管理", icon: ShoppingCart, href: "/orders" },
    ],
  },
  {
    label: "系统",
    items: [
      { title: "系统设置", icon: Settings, href: "/settings" },
      {
        title: "登录页面",
        icon: LogIn,
        children: [
          { title: "居中登录", href: "/login" },
          { title: "分栏登录", href: "/login-split" },
        ],
      },
      {
        title: "错误页面",
        icon: AlertTriangle,
        children: [
          { title: "403 禁止访问", href: "/errors/403" },
          { title: "404 页面不存在", href: "/errors/404" },
          { title: "500 服务器错误", href: "/errors/500" },
          { title: "503 服务不可用", href: "/errors/503" },
        ],
      },
    ],
  },
];

export function AppSidebar({ collapsible }: { collapsible?: "offcanvas" | "icon" | "none" }) {
  const pathname = usePathname();
  const { sidebarStyle, layoutMode } = useLayoutSettings();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

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
                  <img
                    src={siteConfig.icon}
                    alt={siteConfig.name}
                    width={20}
                    height={20}
                    className="rounded-sm"
                  />
                </div>
                <div className="flex min-w-0 flex-col gap-0.5 leading-none">
                  <span className="truncate font-semibold">{siteConfig.name}</span>
                  <span className="truncate text-xs text-muted-foreground">
                    {siteConfig.subtitle}
                  </span>
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
                    isCollapsed ? (
                      <SidebarMenuItem key={item.title}>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <SidebarMenuButton tooltip={item.title}>
                              <item.icon />
                              <span>{item.title}</span>
                            </SidebarMenuButton>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent side="right" align="start" className="w-48">
                            {item.children.map((sub) => (
                              <DropdownMenuItem key={sub.href} asChild>
                                <Link
                                  href={sub.href}
                                  className={pathname === sub.href ? "bg-accent" : ""}
                                >
                                  {sub.title}
                                </Link>
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </SidebarMenuItem>
                    ) : (
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
                    )
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
                  <Avatar className="size-8 rounded-md">
                    <AvatarImage src="" />
                    <AvatarFallback className="rounded-md">管</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-0.5 leading-none">
                    <span className="font-medium">管理员</span>
                    <span className="text-xs text-muted-foreground">admin@example.com</span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
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
