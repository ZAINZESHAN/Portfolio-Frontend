import { api } from "@/api/axios";

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export async function getMessages(): Promise<ContactMessage[]> {
  const { data } = await api.get<ContactMessage[]>("/admin/contacts");
  return data;
}

export async function markMessageAsRead(id: number): Promise<ContactMessage> {
  const { data } = await api.patch<ContactMessage>(`/admin/contacts/${id}`);
  return data;
}

export async function deleteMessage(id: number): Promise<void> {
  await api.delete(`/admin/contacts/${id}`);
}
