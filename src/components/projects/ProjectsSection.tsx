import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FolderKanban } from "lucide-react";
import {
  deleteProject,
  getProjects,
  type Project,
} from "@/api/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectCardSkeleton } from "@/components/projects/ProjectCardSkeleton";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { isAuthenticated } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { viewportOnce } from "@/hooks/useInViewAnimation";
import { useToast } from "@/context/ToastContext";

type Filter = "all" | "mern" | "frontend" | "backend";

const filters: { label: string; value: Filter }[] = [
  { label: "All", value: "all" },
  { label: "MERN", value: "mern" },
  { label: "Frontend", value: "frontend" },
  { label: "Backend", value: "backend" },
];

const frontendKeywords = ["react", "tailwind", "javascript", "typescript", "next", "vue", "css"];
const backendKeywords = ["node", "express", "fastapi", "mongodb", "postgresql", "api", "python"];

function matchesFilter(project: Project, filter: Filter): boolean {
  const stack = project.tech_stack.toLowerCase();
  if (filter === "all") return true;
  if (filter === "mern") {
    return (
      stack.includes("mern") ||
      (stack.includes("react") &&
        (stack.includes("node") || stack.includes("express")) &&
        stack.includes("mongo"))
    );
  }
  if (filter === "frontend") {
    return frontendKeywords.some((k) => stack.includes(k));
  }
  if (filter === "backend") {
    return backendKeywords.some((k) => stack.includes(k));
  }
  return true;
}

export function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>("all");
  const [isAdmin] = useState(() => isAuthenticated());
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);
  const { toast } = useToast();

  const fetchProjects = useCallback(async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch {
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  useEffect(() => {
    const onFocus = () => fetchProjects();
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, [fetchProjects]);

  const filtered = useMemo(
    () => projects.filter((p) => matchesFilter(p, filter)),
    [projects, filter]
  );

  const confirmDelete = async () => {
    if (deleteId === null) return;
    setDeleting(true);
    try {
      await deleteProject(deleteId);
      setProjects((prev) => prev.filter((p) => p.id !== deleteId));
      setDeleteId(null);
      toast("Project deleted");
    } catch {
      toast("Failed to delete project", "error");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <section
      id="projects"
      className="relative overflow-hidden border-t border-border bg-background py-20 sm:py-24"
    >
      <div className="pointer-events-none absolute -left-24 top-32 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-20 h-64 w-64 rounded-full bg-primary/8 blur-3xl" />

      <div className="container-main relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center sm:mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            My Projects
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-muted sm:text-lg">
            Real-world applications built with MERN Stack &amp; modern web technologies
          </p>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto mt-5 h-1 rounded-full bg-primary"
          />
        </motion.div>

        {!loading && projects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            className="mb-8 flex flex-wrap justify-center gap-2"
          >
            {filters.map((f) => (
              <Button
                key={f.value}
                variant={filter === f.value ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(f.value)}
                className={cn(
                  "transition-all",
                  filter === f.value && "shadow-md shadow-primary/20"
                )}
              >
                {f.label}
              </Button>
            ))}
          </motion.div>
        )}

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProjectCardSkeleton key={i} />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewportOnce}
            className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/30 py-20 text-center"
          >
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-surface">
              <FolderKanban className="h-8 w-8 text-muted" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">
              No projects available yet
            </h3>
            <p className="mt-2 max-w-sm text-sm text-muted">
              Projects added by admin will appear here automatically
            </p>
          </motion.div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-muted">No projects match this filter.</p>
            <Button variant="outline" size="sm" className="mt-4" onClick={() => setFilter("all")}>
              Show All
            </Button>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filtered.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  isAdmin={isAdmin}
                  onDelete={setDeleteId}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      <ConfirmDialog
        open={deleteId !== null}
        onOpenChange={(open) => !open && !deleting && setDeleteId(null)}
        title="Delete Project?"
        description="Are you sure you want to delete this project? This action cannot be undone."
        onConfirm={confirmDelete}
        loading={deleting}
      />
    </section>
  );
}
