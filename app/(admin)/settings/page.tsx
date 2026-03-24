"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const navItems = [
  { value: "general", label: "基本设置" },
  { value: "security", label: "安全设置" },
  { value: "notifications", label: "通知设置" },
];

function GeneralSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>基本信息</CardTitle>
        <CardDescription>修改系统基本配置信息</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="grid gap-2">
          <label className="text-sm font-medium">系统名称</label>
          <Input defaultValue="管理后台" />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium">系统描述</label>
          <Input defaultValue="基于 shadcn/ui 的管理系统" />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium">管理员邮箱</label>
          <Input defaultValue="admin@example.com" type="email" />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium">系统网址</label>
          <Input defaultValue="https://example.com" type="url" />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium">联系电话</label>
          <Input defaultValue="+86 138 0000 0000" type="tel" />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium">公司名称</label>
          <Input defaultValue="示例科技有限公司" />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium">公司地址</label>
          <Input defaultValue="北京市朝阳区示例路 1 号" />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium">版权信息</label>
          <Input defaultValue="© 2025 示例科技有限公司" />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium">备案号</label>
          <Input defaultValue="京ICP备00000000号" />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium">时区</label>
          <Input defaultValue="Asia/Shanghai" />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium">语言</label>
          <Input defaultValue="zh-CN" />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium">货币单位</label>
          <Input defaultValue="CNY (¥)" />
        </div>
        <Separator />
        <div className="flex justify-end">
          <Button>保存设置</Button>
        </div>
      </CardContent>
    </Card>
  );
}

function SecuritySettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>安全设置</CardTitle>
        <CardDescription>修改密码和安全配置</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="grid gap-2">
          <label className="text-sm font-medium">当前密码</label>
          <Input type="password" placeholder="请输入当前密码" />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium">新密码</label>
          <Input type="password" placeholder="请输入新密码" />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium">确认新密码</label>
          <Input type="password" placeholder="请再次输入新密码" />
        </div>
        <Separator />
        <div className="flex justify-end">
          <Button>更新密码</Button>
        </div>
      </CardContent>
    </Card>
  );
}

function NotificationSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>通知设置</CardTitle>
        <CardDescription>配置系统通知方式</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">通知设置功能开发中...</p>
      </CardContent>
    </Card>
  );
}

const panels: Record<string, React.ReactNode> = {
  general: <GeneralSettings />,
  security: <SecuritySettings />,
  notifications: <NotificationSettings />,
};

export default function SettingsPage() {
  const [active, setActive] = useState("general");

  return (
    <div className="flex flex-col gap-4 h-full">
      <div>
        <h1 className="text-2xl font-bold">系统设置</h1>
        <p className="text-muted-foreground">管理系统配置和偏好</p>
      </div>
      <Separator />
      <div className="flex gap-8 flex-1 min-h-0">
        {/* Side nav */}
        <nav className="flex w-44 shrink-0 flex-col gap-1">
          {navItems.map((item) => (
            <button
              key={item.value}
              onClick={() => setActive(item.value)}
              className={cn(
                "rounded-md px-3 py-2 text-sm text-left transition-colors hover:bg-accent hover:text-accent-foreground",
                active === item.value
                  ? "bg-accent text-accent-foreground font-medium"
                  : "text-muted-foreground",
              )}
            >
              {item.label}
            </button>
          ))}
        </nav>
        {/* Content */}
        <div className="flex-1 min-w-0 overflow-y-auto">{panels[active]}</div>
      </div>
    </div>
  );
}
