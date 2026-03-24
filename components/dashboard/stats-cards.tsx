import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, ShoppingCart, DollarSign, TrendingUp } from "lucide-react";

const stats = [
  {
    title: "总用户数",
    value: "12,345",
    change: "+12.5%",
    trend: "up",
    icon: Users,
    desc: "较上月",
  },
  {
    title: "本月订单",
    value: "3,621",
    change: "+8.2%",
    trend: "up",
    icon: ShoppingCart,
    desc: "较上月",
  },
  {
    title: "本月营收",
    value: "¥ 284,590",
    change: "+20.1%",
    trend: "up",
    icon: DollarSign,
    desc: "较上月",
  },
  {
    title: "转化率",
    value: "3.24%",
    change: "-0.4%",
    trend: "down",
    icon: TrendingUp,
    desc: "较上月",
  },
];

export function StatsCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="flex items-center gap-1 mt-1">
              <Badge
                variant={stat.trend === "up" ? "default" : "destructive"}
                className="text-xs px-1"
              >
                {stat.change}
              </Badge>
              <span className="text-xs text-muted-foreground">{stat.desc}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
