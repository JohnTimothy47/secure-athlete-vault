import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
  color?: string;
}

export const StatsCard = ({ title, value, icon: Icon, trend, color = "hsl(var(--primary))" }: StatsCardProps) => {
  return (
    <Card className="bg-card border-border transition-all hover:shadow-[var(--shadow-card)] hover:scale-[1.02]">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground font-medium">{title}</p>
            <p className="text-3xl font-bold text-foreground">{value}</p>
            {trend && (
              <p className="text-xs text-accent font-medium">
                {trend}
              </p>
            )}
          </div>
          <div 
            className="p-3 rounded-xl transition-all"
            style={{ backgroundColor: `${color}20` }}
          >
            <Icon className="w-6 h-6" style={{ color }} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
