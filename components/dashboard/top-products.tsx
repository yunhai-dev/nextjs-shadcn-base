import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const products = [
  { name: "iPhone 15 Pro", sales: 1240, progress: 85, revenue: "¥124,000" },
  { name: "MacBook Air M3", sales: 890, progress: 62, revenue: "¥89,000" },
  { name: "AirPods Pro", sales: 760, progress: 53, revenue: "¥38,000" },
  { name: "iPad Pro", sales: 540, progress: 38, revenue: "¥54,000" },
  { name: "Apple Watch", sales: 420, progress: 29, revenue: "¥21,000" },
];

export function TopProducts() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>热销商品</CardTitle>
        <CardDescription>本月销量排行</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {products.map((product, index) => (
            <div key={product.name} className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="size-6 justify-center p-0 text-xs font-bold">
                    {index + 1}
                  </Badge>
                  <span className="text-sm font-medium">{product.name}</span>
                </div>
                <span className="text-sm text-muted-foreground">{product.revenue}</span>
              </div>
              <Progress value={product.progress} className="h-1.5" />
              <span className="text-xs text-muted-foreground">{product.sales} 件售出</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
