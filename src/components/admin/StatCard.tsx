import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  className?: string;
}

export function StatCard({ title, value, icon: Icon, trend, className }: StatCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={cn(
        "rounded-2xl border border-border/80 bg-card/50 p-5 backdrop-blur-md transition-shadow hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 sm:p-6",
        className
      )}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        {trend && <span className="text-xs text-primary">{trend}</span>}
      </div>
      <p className="text-2xl font-bold text-foreground sm:text-3xl">{value}</p>
      <p className="mt-1 text-sm text-muted">{title}</p>
    </motion.div>
  );
}
