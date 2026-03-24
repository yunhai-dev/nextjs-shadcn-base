import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function GeneralSettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-base font-semibold">基本信息</h2>
        <p className="text-sm text-muted-foreground">修改系统基本配置信息</p>
      </div>
      <div className="flex flex-col gap-4">
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
        <div className="grid gap-2">
          <label className="text-sm font-medium">系统网址</label>
          <Input defaultValue="https://example.com" type="url" />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium">联系电话</label>
          <Input defaultValue="+86 138 0000 0000" type="tel" />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium">公司名称</label>
          <Input defaultValue="示例科技有限公司" />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium">公司地址</label>
          <Input defaultValue="北京市朝阳区示例路 1 号" />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium">版权信息</label>
          <Input defaultValue="© 2025 示例科技有限公司" />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium">备案号</label>
          <Input defaultValue="京ICP备00000000号" />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium">时区</label>
          <Input defaultValue="Asia/Shanghai" />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium">语言</label>
          <Input defaultValue="zh-CN" />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium">货币单位</label>
          <Input defaultValue="CNY (¥)" />
        </div>
        <Separator />
        <div className="flex justify-end">
          <Button>保存设置</Button>
        </div>
      </div>
    </div>
  );
}
