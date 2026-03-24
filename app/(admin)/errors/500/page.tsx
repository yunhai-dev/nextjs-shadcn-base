"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ServerCrash } from "lucide-react";

export default function Error500() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center relative overflow-hidden">
      <ServerCrash className="absolute inset-0 size-full text-foreground/5 dark:text-foreground/10 pointer-events-none select-none" />
      <div className="flex flex-col gap-2 relative">
        <h1 className="text-8xl font-bold tracking-tight">500</h1>
        <p className="text-xl font-medium">服务器错误</p>
        <p className="text-sm text-muted-foreground">
          服务器发生内部错误，请稍后再试。如问题持续，请联系技术支持。
        </p>
      </div>
      <div className="flex gap-2 relative">
        <Button variant="outline" onClick={() => window.location.reload()}>
          刷新页面
        </Button>
        <Button asChild>
          <Link href="/">返回首页</Link>
        </Button>
      </div>
    </div>
  );
}
