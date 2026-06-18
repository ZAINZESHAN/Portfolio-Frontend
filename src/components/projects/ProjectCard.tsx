import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, Pencil, Star, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Project } from "@/api/projects";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  index: number;
  isAdmin?: boolean;
  onDelete?: (id: number) => void;
}

export function ProjectCard({ project, index, isAdmin, onDelete }: ProjectCardProps) {
  const [imgError, setImgError] = useState(false);
  const navigate = useNavigate();

  const techs = project.tech_stack
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const hasLiveUrl =
    project.live_url &&
    project.live_url !== "#" &&
    !project.live_url.includes("example.com");

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6, scale: 1.03 }}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl border bg-card/50 backdrop-blur-md transition-shadow hover:shadow-xl hover:shadow-primary/10",
        project.is_featured
          ? "border-primary/40 shadow-lg shadow-primary/10 ring-1 ring-primary/25"
          : "border-border/80 hover:border-primary/30"
      )}
    >
      <div className="relative aspect-video overflow-hidden bg-surface">
        {!imgError && project.image_url ? (
          <img
            src={project.image_url}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-surface via-card to-primary/20">
            <span className="font-mono text-4xl font-bold text-primary/40">
              {"</>"}
            </span>
          </div>
        )}

        {project.is_featured && (
          <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full border border-primary/30 bg-background/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary backdrop-blur-sm">
            <Star className="h-3 w-3 fill-primary" />
            Featured
          </span>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="mb-2 text-lg font-bold text-foreground sm:text-xl">
          {project.title}
        </h3>
        <p className="mb-4 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">
          {project.short_description}
        </p>

        <div className="mb-5 flex flex-wrap gap-1.5">
          {techs.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-border/80 bg-surface/60 px-2.5 py-1 text-[11px] font-medium text-muted transition-colors hover:border-primary/40 hover:text-primary sm:text-xs"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-3.5 w-3.5" />
              GitHub
            </a>
          </Button>

          {hasLiveUrl && (
            <Button size="sm" asChild>
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Live Demo
              </a>
            </Button>
          )}

          {isAdmin && (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/admin/projects")}
                className="ml-auto text-muted hover:text-primary"
              >
                <Pencil className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete?.(project.id)}
                className="text-muted hover:text-red-400"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </>
          )}
        </div>
      </div>
    </motion.article>
  );
}
