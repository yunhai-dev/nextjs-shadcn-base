"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

const data = [
  { month: "1月", revenue: 186000, orders: 240 },
  { month: "2月", revenue: 205000, orders: 280 },
  { month: "3月", revenue: 237000, orders: 310 },
  { month: "4月", revenue: 173000, orders: 220 },
  { month: "5月", revenue: 209000, orders: 290 },
  { month: "6月", revenue: 214000, orders: 320 },
  { month: "7月", revenue: 284590, orders: 362 },
];

const chartConfig = {
  revenue: {
    label: "营收 (¥)",
    color: "hsl(var(--chart-1))",
  },
};

export function RevenueChart() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>营收趋势</CardTitle>
        <CardDescription>近7个月营收数据</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[240px] w-full">
          <AreaChart data={data} margin={{ top: 4, right: 12, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12, fill: "var(--color-muted-foreground)" }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tickFormatter={(v) => `¥${(v / 10000).toFixed(0)}万`}
              tick={{ fontSize: 12, fill: "var(--color-muted-foreground)" }}
              tickLine={false}
              axisLine={false}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="var(--color-revenue)"
              fill="var(--color-revenue)"
              fillOpacity={0.1}
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
