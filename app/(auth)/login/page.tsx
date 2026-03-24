"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, LogIn, Fingerprint } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-svh flex items-center justify-center bg-muted/40 p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center gap-3 justify-center mb-8">
          <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <img
              src={siteConfig.icon}
              alt={siteConfig.name}
              width={22}
              height={22}
              className="rounded-md"
            />
          </div>
          <h1 className="text-xl font-semibold">{siteConfig.name}</h1>
        </div>

        {/* Card */}
        <div className="rounded-xl border bg-card p-8 shadow-sm">
          <div className="mb-6">
            <h2 className="text-lg font-semibold">登录</h2>
            <p className="text-sm text-muted-foreground mt-1">输入您的账号和密码登录</p>
          </div>

          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">账号</Label>
              <Input id="email" type="email" placeholder="admin@example.com" />
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">密码</Label>
                <Link
                  href="#"
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  忘记密码？
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="请输入密码"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>
            <Button type="submit" className="w-full mt-2">
              <LogIn className="size-4" />
              登录
            </Button>
          </form>

          <div className="relative my-6">
            <Separator />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
              或
            </span>
          </div>

          <Button variant="outline" className="w-full">
            <Fingerprint className="size-4" />
            使用 SSO 登录
          </Button>

          <p className="text-center text-xs text-muted-foreground mt-6">
            登录即表示您同意我们的
            <Link href="#" className="underline underline-offset-4 hover:text-foreground">
              服务条款
            </Link>
            和
            <Link href="#" className="underline underline-offset-4 hover:text-foreground">
              隐私政策
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
