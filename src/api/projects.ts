import { api } from "@/api/axios";

export interface Project {
  id: number;
  title: string;
  short_description: string;
  full_description: string;
  tech_stack: string;
  github_url: string;
  live_url: string;
  image_url: string;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export type ProjectPayload = Omit<Project, "id" | "created_at" | "updated_at">;

export type ProjectUpdatePayload = Partial<ProjectPayload>;

export async function getProjects(): Promise<Project[]> {
  const { data } = await api.get<Project[]>("/projects");
  return data;
}

export async function createProject(payload: ProjectPayload): Promise<Project> {
  const { data } = await api.post<Project>("/admin/projects", payload);
  return data;
}

export async function updateProject(
  id: number,
  payload: ProjectUpdatePayload
): Promise<Project> {
  const { data } = await api.put<Project>(`/admin/projects/${id}`, payload);
  return data;
}

export async function deleteProject(id: number): Promise<void> {
  await api.delete(`/admin/projects/${id}`);
}
