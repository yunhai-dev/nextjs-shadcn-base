"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, LogIn, Fingerprint } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function LoginSplitPage() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="min-h-svh flex">
      {/* Left — form */}
      <div className="flex flex-1 flex-col justify-center px-8 py-12 lg:px-16 xl:px-24">
        <div className="mx-auto w-full max-w-sm">
          <Link href="/" className="flex items-center justify-center gap-2.5 mb-10">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <img
                src={siteConfig.icon}
                alt={siteConfig.name}
                width={18}
                height={18}
                className="rounded-sm"
              />
            </div>
            <span className="font-semibold">{siteConfig.name}</span>
          </Link>

          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight">欢迎回来</h1>
            <p className="text-sm text-muted-foreground mt-1.5">请登录您的账号以继续</p>
          </div>

          <form className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">邮箱账号</Label>
              <Input id="email" type="email" placeholder="admin@example.com" className="h-10" />
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
                  className="h-10 pr-10"
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
            <Button type="submit" className="w-full h-10 mt-1">
              <LogIn className="size-4" />
              登录
            </Button>
          </form>

          <div className="relative my-6">
            <Separator />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
              或者
            </span>
          </div>

          <Button variant="outline" className="w-full h-10">
            <Fingerprint className="size-4" />
            使用 SSO 登录
          </Button>

          <p className="text-center text-xs text-muted-foreground mt-8">
            登录即表示同意
            <Link href="#" className="underline underline-offset-4 hover:text-foreground mx-1">
              服务条款
            </Link>
            与
            <Link href="#" className="underline underline-offset-4 hover:text-foreground ml-1">
              隐私政策
            </Link>
          </p>
        </div>
      </div>

      {/* Right — image panel */}
      <div className="hidden lg:flex flex-1 relative bg-zinc-100 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-zinc-700 via-zinc-900 to-zinc-950" />
        <img
          src="https://picsum.photos/1200/900"
          alt="cover"
          className="absolute top-[150px] left-[70px] w-[calc(100%-70px)] h-[calc(100%-150px)] object-cover rounded-tl-md"
        />
      </div>
    </div>
  );
}
