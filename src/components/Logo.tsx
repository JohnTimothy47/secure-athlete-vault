import { Shield } from "lucide-react";

export const Logo = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="relative w-10 h-10">
        {/* Running silhouette */}
        <svg 
          viewBox="0 0 40 40" 
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Head */}
          <circle cx="25" cy="10" r="3" fill="hsl(var(--primary))" />
          {/* Body */}
          <path 
            d="M 25 13 L 23 20 L 20 25 M 25 13 L 27 20 L 30 28" 
            stroke="hsl(var(--primary))" 
            strokeWidth="2" 
            strokeLinecap="round"
          />
          {/* Legs */}
          <path 
            d="M 23 20 L 18 32 M 27 20 L 25 28" 
            stroke="hsl(var(--primary))" 
            strokeWidth="2" 
            strokeLinecap="round"
          />
        </svg>
        {/* Lock overlay */}
        <div className="absolute -bottom-1 -right-1 bg-accent rounded-full p-1">
          <Shield className="w-4 h-4 text-accent-foreground" />
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-lg font-bold text-foreground leading-none">AthleteMetrics</span>
        <span className="text-xs text-muted-foreground">Encrypted Hub</span>
      </div>
    </div>
  );
};
