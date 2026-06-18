import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, Pencil, Plus, Trash2 } from "lucide-react";
import {
  createProject,
  deleteProject,
  getProjects,
  updateProject,
  type Project,
  type ProjectPayload,
} from "@/api/projects";
import { ProjectFormModal } from "@/components/admin/ProjectFormModal";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/context/ToastContext";

export function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);
  const { toast } = useToast();

  const loadProjects = async () => {
    setLoading(true);
    try {
      const data = await getProjects();
      setProjects(data);
    } catch {
      toast("Failed to load projects", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleCreate = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const handleEdit = (project: Project) => {
    setEditing(project);
    setModalOpen(true);
  };

  const handleSubmit = async (data: ProjectPayload) => {
    setSaving(true);
    try {
      if (editing) {
        await updateProject(editing.id, data);
        toast("Project updated successfully");
      } else {
        await createProject(data);
        toast("Project created successfully");
      }
      setModalOpen(false);
      await loadProjects();
    } catch {
      toast("Failed to save project", "error");
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (deleteId === null) return;
    setDeleting(true);
    try {
      await deleteProject(deleteId);
      toast("Project deleted");
      setDeleteId(null);
      await loadProjects();
    } catch {
      toast("Failed to delete project", "error");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-muted">Manage your portfolio projects</p>
        <Button onClick={handleCreate}>
          <Plus className="h-4 w-4" />
          Add New Project
        </Button>
      </div>

      {loading ? (
        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-48" />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card/30 py-16 text-center">
          <p className="text-muted">No projects yet. Create your first one!</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-border/80 bg-card/50 p-5 backdrop-blur-md transition-shadow hover:border-primary/25 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-foreground">{project.title}</h3>
                  {project.is_featured && (
                    <span className="mt-1 inline-block rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-medium text-primary">
                      Featured
                    </span>
                  )}
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleEdit(project)}
                    className="rounded-lg p-2 text-muted transition-colors hover:bg-surface hover:text-primary"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setDeleteId(project.id)}
                    className="rounded-lg p-2 text-muted transition-colors hover:bg-red-500/10 hover:text-red-400"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <p className="mb-3 line-clamp-2 text-sm text-muted">
                {project.short_description}
              </p>

              <div className="mb-4 flex flex-wrap gap-1.5">
                {project.tech_stack.split(",").map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-border bg-surface/60 px-2 py-0.5 text-xs text-muted"
                  >
                    {tech.trim()}
                  </span>
                ))}
              </div>

              <div className="flex gap-3">
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-primary hover:underline"
                >
                  <Github className="h-3.5 w-3.5" /> GitHub
                </a>
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-primary hover:underline"
                >
                  <ExternalLink className="h-3.5 w-3.5" /> Live
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <ProjectFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        project={editing}
        loading={saving}
      />

      <ConfirmDialog
        open={deleteId !== null}
        onOpenChange={(open) => !open && !deleting && setDeleteId(null)}
        title="Delete Project?"
        description="Are you sure you want to delete this project? This action cannot be undone."
        onConfirm={confirmDelete}
        loading={deleting}
      />
    </div>
  );
}
