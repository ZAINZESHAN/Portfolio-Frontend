import { api } from "@/api/axios";

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export async function submitContact(payload: ContactPayload): Promise<ContactResponse> {
  const { data } = await api.post<ContactResponse>("/contact", payload);
  return data;
}
