"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const navItems = [
  { value: "general", label: "基本设置", href: "/settings/general" },
  { value: "security", label: "安全设置", href: "/settings/security" },
  { value: "notifications", label: "通知设置", href: "/settings/notifications" },
];

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-4 h-full">
      <div>
        <h1 className="text-2xl font-bold">系统设置</h1>
        <p className="text-muted-foreground">管理系统配置和偏好</p>
      </div>
      <Separator />
      <div className="flex gap-8 flex-1 min-h-0">
        <nav className="flex w-44 shrink-0 flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.value}
              href={item.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm text-left transition-colors hover:bg-accent hover:text-accent-foreground",
                pathname === item.href
                  ? "bg-accent text-accent-foreground font-medium"
                  : "text-muted-foreground",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex-1 min-w-0 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
