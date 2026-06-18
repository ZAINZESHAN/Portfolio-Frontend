import { motion } from "framer-motion";
import { Briefcase, Building2, CheckCircle2 } from "lucide-react";
import { viewportOnce } from "@/hooks/useInViewAnimation";

export interface TimelineEntryData {
  company: string;
  role: string;
  duration: string;
  description: string[];
  isCurrent?: boolean;
  phase: string;
}

interface ExperienceCardProps {
  entry: TimelineEntryData;
  index: number;
}

export function ExperienceCard({ entry, index }: ExperienceCardProps) {
  const slideFromLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: slideFromLeft ? -40 : 40, y: 20 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
      whileHover={{ y: -4, scale: 1.01 }}
      className={`relative w-full rounded-2xl border p-5 backdrop-blur-md transition-shadow sm:p-6 ${
        entry.isCurrent
          ? "border-primary/40 bg-card/60 shadow-lg shadow-primary/10"
          : "border-border/80 bg-card/40 shadow-md shadow-black/5"
      }`}
    >
      {entry.isCurrent && (
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-primary/20 via-transparent to-primary/10 opacity-60" />
      )}

      <div className="relative">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <span
              className={`mb-2 inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider sm:text-xs ${
                entry.isCurrent
                  ? "bg-primary/20 text-primary"
                  : "bg-surface text-muted"
              }`}
            >
              {entry.phase}
            </span>
            <h3
              className={`font-bold text-foreground ${
                entry.isCurrent ? "text-xl sm:text-2xl" : "text-lg sm:text-xl"
              }`}
            >
              {entry.role}
            </h3>
            <div className="mt-1.5 flex flex-wrap items-center gap-2 text-sm text-muted">
              <Building2 className="h-3.5 w-3.5 text-primary" />
              <span>{entry.company}</span>
              <span className="text-border">•</span>
              <Briefcase className="h-3.5 w-3.5 text-primary" />
              <span>{entry.duration}</span>
            </div>
          </div>

          {entry.isCurrent && (
            <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              Current
            </span>
          )}
        </div>

        <ul className="space-y-2.5">
          {entry.description.map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <CheckCircle2
                className={`mt-0.5 h-4 w-4 shrink-0 ${
                  entry.isCurrent ? "text-primary" : "text-muted"
                }`}
              />
              <span
                className={`leading-relaxed ${
                  entry.isCurrent
                    ? "text-sm text-foreground/90 sm:text-base"
                    : "text-sm text-muted"
                }`}
              >
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
