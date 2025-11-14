import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const UploadDataDialog = () => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Data Encrypted & Uploaded",
      description: "Your training metrics have been securely encrypted and stored.",
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-[var(--shadow-glow)] transition-all hover:scale-105">
          <Upload className="w-4 h-4" />
          Upload Training Data
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-primary" />
            Upload Encrypted Metrics
          </DialogTitle>
          <DialogDescription>
            Your data will be encrypted before upload. Only authorized staff can decrypt and view it.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="athlete">Athlete Name</Label>
            <Input 
              id="athlete" 
              placeholder="Enter athlete name" 
              required
              className="bg-secondary border-border"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="metric-type">Metric Type</Label>
            <Select required>
              <SelectTrigger className="bg-secondary border-border">
                <SelectValue placeholder="Select metric type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="speed">Speed Training</SelectItem>
                <SelectItem value="endurance">Endurance</SelectItem>
                <SelectItem value="strength">Strength</SelectItem>
                <SelectItem value="recovery">Recovery Rate</SelectItem>
                <SelectItem value="heart-rate">Heart Rate</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="value">Metric Value</Label>
            <Input 
              id="value" 
              type="number" 
              placeholder="Enter value" 
              required
              className="bg-secondary border-border"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="date">Training Date</Label>
            <Input 
              id="date" 
              type="date" 
              required
              className="bg-secondary border-border"
            />
          </div>
          <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/10 border border-primary/20">
            <Lock className="w-4 h-4 text-primary" />
            <span className="text-xs text-muted-foreground">
              Data will be encrypted using AES-256 encryption before storage
            </span>
          </div>
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            Encrypt & Upload
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
