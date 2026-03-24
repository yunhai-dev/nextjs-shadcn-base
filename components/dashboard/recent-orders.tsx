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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

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
];

const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  已完成: "default",
  处理中: "secondary",
  待付款: "outline",
  已取消: "destructive",
};

export function RecentOrders() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>最近订单</CardTitle>
        <CardDescription>最新的5条订单记录</CardDescription>
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
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="size-7">
                      <AvatarFallback className="text-xs">{order.customer[0]}</AvatarFallback>
                    </Avatar>
                    {order.customer}
                  </div>
                </TableCell>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
