import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-bold">系统设置</h1>
        <p className="text-muted-foreground">管理系统配置和偏好</p>
      </div>
      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">基本设置</TabsTrigger>
          <TabsTrigger value="security">安全设置</TabsTrigger>
          <TabsTrigger value="notifications">通知设置</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>基本信息</CardTitle>
              <CardDescription>修改系统基本配置信息</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">系统名称</label>
                <Input defaultValue="管理后台" />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">系统描述</label>
                <Input defaultValue="基于 shadcn/ui 的管理系统" />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">管理员邮箱</label>
                <Input defaultValue="admin@example.com" type="email" />
              </div>
              <Separator />
              <div className="flex justify-end">
                <Button>保存设置</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-4">
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
        </TabsContent>

        <TabsContent value="notifications" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>通知设置</CardTitle>
              <CardDescription>配置系统通知方式</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">通知设置功能开发中...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
