import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Code2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <motion.div
      className={cn("group flex items-center gap-3", className)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Link to="/" className="flex items-center gap-3">
      <div className="dark-ui relative flex h-11 w-11 items-center justify-center rounded-xl shadow-inner">
        <span className="dark-ui-primary font-mono text-base font-bold">ZZ</span>
        <Code2 className="dark-ui-primary dark-ui-surface absolute -bottom-1 -right-1 h-4 w-4 rounded-full p-0.5" />
      </div>
      <div className="hidden sm:block">
        <p className="text-base font-semibold text-foreground">Zain Zeeshan</p>
        <p className="text-sm text-muted">Full Stack Developer</p>
      </div>
      </Link>
    </motion.div>
  );
}
