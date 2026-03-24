import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Download, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const orders = [
  {
    id: "#1024",
    customer: "张三",
    product: "iPhone 15 Pro",
    amount: "¥9,999",
    status: "已完成",
    date: "2024-07-20",
  },
  {
    id: "#1023",
    customer: "李四",
    product: "MacBook Air M3",
    amount: "¥9,499",
    status: "处理中",
    date: "2024-07-20",
  },
  {
    id: "#1022",
    customer: "王五",
    product: "AirPods Pro",
    amount: "¥1,999",
    status: "已完成",
    date: "2024-07-19",
  },
  {
    id: "#1021",
    customer: "赵六",
    product: "iPad Pro",
    amount: "¥8,999",
    status: "待付款",
    date: "2024-07-19",
  },
  {
    id: "#1020",
    customer: "钱七",
    product: "Apple Watch",
    amount: "¥2,999",
    status: "已取消",
    date: "2024-07-18",
  },
  {
    id: "#1019",
    customer: "孙八",
    product: "iPhone 15",
    amount: "¥5,999",
    status: "处理中",
    date: "2024-07-18",
  },
  {
    id: "#1018",
    customer: "周九",
    product: "MacBook Pro",
    amount: "¥16,999",
    status: "已完成",
    date: "2024-07-17",
  },
];

const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  已完成: "default",
  处理中: "secondary",
  待付款: "outline",
  已取消: "destructive",
};

export default function OrdersPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">订单管理</h1>
          <p className="text-muted-foreground">查看和管理所有订单</p>
        </div>
        <Button variant="outline">
          <Download data-icon="inline-start" />
          导出数据
        </Button>
      </div>
      <Tabs defaultValue="all">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">全部</TabsTrigger>
            <TabsTrigger value="pending">待付款</TabsTrigger>
            <TabsTrigger value="processing">处理中</TabsTrigger>
            <TabsTrigger value="completed">已完成</TabsTrigger>
            <TabsTrigger value="cancelled">已取消</TabsTrigger>
          </TabsList>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
            <Input placeholder="搜索订单..." className="w-56 pl-8" />
          </div>
        </div>
        <TabsContent value="all" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>订单列表</CardTitle>
              <CardDescription>共 {orders.length} 条订单</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>订单号</TableHead>
                    <TableHead>客户</TableHead>
                    <TableHead className="hidden md:table-cell">商品</TableHead>
                    <TableHead>金额</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead className="hidden md:table-cell">日期</TableHead>
                    <TableHead className="w-10"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell className="hidden md:table-cell text-muted-foreground">
                        {order.product}
                      </TableCell>
                      <TableCell className="font-medium">{order.amount}</TableCell>
                      <TableCell>
                        <Badge variant={statusVariant[order.status]}>{order.status}</Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-muted-foreground">
                        {order.date}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="size-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>查看详情</DropdownMenuItem>
                            <DropdownMenuItem>更新状态</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              取消订单
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="pending" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground text-sm">待付款订单列表</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="processing" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground text-sm">处理中订单列表</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="completed" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground text-sm">已完成订单列表</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="cancelled" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground text-sm">已取消订单列表</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
