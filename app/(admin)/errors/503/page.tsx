import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CloudOff } from "lucide-react";

export default function Error503() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center relative overflow-hidden">
      <CloudOff className="absolute inset-0 size-full text-foreground/5 dark:text-foreground/10 pointer-events-none select-none" />
      <div className="flex flex-col gap-2 relative">
        <h1 className="text-8xl font-bold tracking-tight">503</h1>
        <p className="text-xl font-medium">服务不可用</p>
        <p className="text-sm text-muted-foreground">
          服务正在维护中，请稍后再试。我们将尽快恢复服务。
        </p>
      </div>
      <Button variant="outline" asChild className="relative">
        <Link href="/">返回首页</Link>
      </Button>
    </div>
  );
}
