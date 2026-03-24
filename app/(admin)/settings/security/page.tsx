import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function SecuritySettingsPage() {
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
