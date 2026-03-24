"use client";

import { Bell, Settings2, PanelLeft } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import { useLayoutSettings } from "@/components/layout-settings-context";

export function AppHeader() {
  const { setStyleSettingsOpen, layoutMode, prevLayoutMode, setLayoutMode } = useLayoutSettings();
  return (
    <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-2 px-4 bg-background/80 backdrop-blur-sm">
      {layoutMode === "hidden" ? (
        <Button
          variant="outline"
          size="icon-sm"
          className="-ml-1"
          onClick={() => setLayoutMode(prevLayoutMode)}
        >
          <PanelLeft className="size-4" />
          <span className="sr-only">显示侧边栏</span>
        </Button>
      ) : (
        <SidebarTrigger className="-ml-1" variant="outline" />
      )}
      <div className="h-4 w-px bg-border" />
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">管理后台</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>仪表盘</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="ml-auto flex items-center gap-2">
        <div className="hidden md:block">
          <Input placeholder="搜索..." className="w-64" />
        </div>

        <ThemeToggle />

        <Button variant="ghost" size="icon" onClick={() => setStyleSettingsOpen(true)}>
          <Settings2 className="size-4" />
          <span className="sr-only">样式设置</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="size-4" />
              <Badge className="absolute -right-1 -top-1 size-4 justify-center p-0 text-[10px]">
                3
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            <DropdownMenuItem>新用户注册：张三</DropdownMenuItem>
            <DropdownMenuItem>订单 #1024 待处理</DropdownMenuItem>
            <DropdownMenuItem>系统更新完成</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="size-8">
                <AvatarImage src="" />
                <AvatarFallback>管</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col gap-0.5 py-1">
                <span className="text-sm font-medium">管理员</span>
                <span className="text-xs text-muted-foreground">admin@example.com</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>个人资料</DropdownMenuItem>
              <DropdownMenuItem>账号设置</DropdownMenuItem>
              <DropdownMenuItem>帮助与支持</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive focus:text-destructive">
              退出登录
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
