import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileSearch } from "lucide-react";

export default function Error404() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center relative overflow-hidden">
      <FileSearch className="absolute inset-0 size-full text-foreground/5 dark:text-foreground/10 pointer-events-none select-none" />
      <div className="flex flex-col gap-2 relative">
        <h1 className="text-8xl font-bold tracking-tight">404</h1>
        <p className="text-xl font-medium">页面不存在</p>
        <p className="text-sm text-muted-foreground">
          您访问的页面不存在或已被删除。请检查网址是否正确。
        </p>
      </div>
      <Button asChild className="relative">
        <Link href="/">返回首页</Link>
      </Button>
    </div>
  );
}
