import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

export default function LoginSplitPage() {
  return (
    <div className="flex flex-1">
      {/* Left — form */}
      <div className="flex flex-1 flex-col justify-center px-8 py-12 lg:px-16 xl:px-24">
        <div className="mx-auto w-full max-w-sm">
          <Link href="/" className="flex items-center gap-2.5 mb-10">
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
              <Input id="password" type="password" placeholder="请输入密码" className="h-10" />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">
                7天内免登录
              </Label>
            </div>
            <Button type="submit" className="w-full h-10 mt-1">
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

      {/* Right — brand panel */}
      <div className="hidden lg:flex flex-1 flex-col items-center justify-center relative bg-zinc-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-zinc-700 via-zinc-900 to-zinc-950" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="relative flex flex-col items-center gap-6 px-12 text-center">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
            <img
              src={siteConfig.icon}
              alt={siteConfig.name}
              width={36}
              height={36}
              className="rounded-md"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tight">{siteConfig.name}</h2>
            <p className="text-zinc-400 mt-2 text-sm leading-relaxed max-w-xs">
              一体化管理平台，让数据驱动决策，让效率成就价值。
            </p>
          </div>
          <div className="flex gap-4 mt-2">
            {["用户管理", "数据分析", "订单处理"].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs bg-white/10 border border-white/20 text-zinc-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="absolute bottom-10 left-0 right-0 text-center">
          <p className="text-xs text-zinc-500">© 2026 {siteConfig.name}. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
