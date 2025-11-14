import { Header } from "@/components/Header";
import { MetricsChart } from "@/components/MetricsChart";
import { StatsCard } from "@/components/StatsCard";
import { UploadDataDialog } from "@/components/UploadDataDialog";
import { Activity, TrendingUp, Shield, Users } from "lucide-react";
import { useAccount } from "wagmi";
import { Button } from "@/components/ui/button";

const speedData = [
  { name: "Mon", value: 85 },
  { name: "Tue", value: 88 },
  { name: "Wed", value: 82 },
  { name: "Thu", value: 90 },
  { name: "Fri", value: 87 },
  { name: "Sat", value: 92 },
  { name: "Sun", value: 89 },
];

const enduranceData = [
  { name: "Mon", value: 72 },
  { name: "Tue", value: 75 },
  { name: "Wed", value: 78 },
  { name: "Thu", value: 76 },
  { name: "Fri", value: 80 },
  { name: "Sat", value: 82 },
  { name: "Sun", value: 85 },
];

const heartRateData = [
  { name: "Mon", value: 145 },
  { name: "Tue", value: 142 },
  { name: "Wed", value: 148 },
  { name: "Thu", value: 140 },
  { name: "Fri", value: 138 },
  { name: "Sat", value: 135 },
  { name: "Sun", value: 132 },
];

const Index = () => {
  const { isConnected } = useAccount();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        {!isConnected ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
            <div className="relative">
              <Shield className="w-24 h-24 text-primary animate-pulse" />
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
            </div>
            <div className="space-y-3 max-w-md">
              <h1 className="text-4xl font-bold text-foreground">
                Secure Athlete Analytics
              </h1>
              <p className="text-lg text-muted-foreground">
                Connect your Rainbow Wallet to access encrypted training metrics and performance data
              </p>
            </div>
            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                <span>End-to-end encrypted data storage</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                <span>Authorization-based access control</span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-primary" />
                <span>Real-time performance tracking</span>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatsCard
                title="Active Athletes"
                value="24"
                icon={Users}
                trend="+12% from last month"
                color="hsl(var(--chart-1))"
              />
              <StatsCard
                title="Avg Performance"
                value="87%"
                icon={TrendingUp}
                trend="+5% improvement"
                color="hsl(var(--chart-2))"
              />
              <StatsCard
                title="Data Points"
                value="1,284"
                icon={Activity}
                trend="Encrypted & secure"
                color="hsl(var(--chart-3))"
              />
              <StatsCard
                title="Security Status"
                value="Active"
                icon={Shield}
                trend="AES-256 encryption"
                color="hsl(var(--primary))"
              />
            </div>

            {/* Upload Button */}
            <div className="mb-8 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Training Metrics</h2>
                <p className="text-muted-foreground">Encrypted performance data and analytics</p>
              </div>
              <UploadDataDialog />
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <MetricsChart
                title="Speed Training"
                description="Weekly speed performance metrics"
                data={speedData}
                color="hsl(var(--chart-1))"
                encrypted
              />
              <MetricsChart
                title="Endurance Level"
                description="Progressive endurance tracking"
                data={enduranceData}
                color="hsl(var(--chart-2))"
                encrypted
              />
              <MetricsChart
                title="Heart Rate Recovery"
                description="Post-workout recovery rates"
                data={heartRateData}
                color="hsl(var(--chart-3))"
                encrypted
              />
              <div className="bg-card border border-border rounded-lg p-8 flex flex-col items-center justify-center text-center space-y-4">
                <Shield className="w-16 h-16 text-primary" />
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-foreground">
                    Access Controlled
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-sm">
                    All metrics are encrypted and only accessible to authorized coaching staff. 
                    Your performance data remains secure and private.
                  </p>
                </div>
                <Button variant="outline" className="border-primary/20 hover:bg-primary/10">
                  Manage Permissions
                </Button>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Index;
