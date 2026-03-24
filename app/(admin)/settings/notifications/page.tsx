import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function NotificationSettingsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>通知设置</CardTitle>
        <CardDescription>配置系统通知方式</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">通知设置功能开发中...</p>
      </CardContent>
    </Card>
  );
}
