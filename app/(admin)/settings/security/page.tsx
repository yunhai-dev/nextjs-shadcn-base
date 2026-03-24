import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function SecuritySettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-base font-semibold">安全设置</h2>
        <p className="text-sm text-muted-foreground">修改密码和安全配置</p>
      </div>
      <div className="flex flex-col gap-4">
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
      </div>
    </div>
  );
}
