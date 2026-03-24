import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShieldOff } from "lucide-react";

export default function Error403() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center relative overflow-hidden">
      <ShieldOff className="absolute inset-0 size-full text-foreground/5 dark:text-foreground/10 pointer-events-none select-none" />
      <div className="flex flex-col gap-2 relative">
        <h1 className="text-8xl font-bold tracking-tight">403</h1>
        <p className="text-xl font-medium">禁止访问</p>
        <p className="text-sm text-muted-foreground">
          您没有权限访问此页面。请联系管理员获取访问权限。
        </p>
      </div>
      <Button asChild className="relative">
        <Link href="/">返回首页</Link>
      </Button>
    </div>
  );
}
