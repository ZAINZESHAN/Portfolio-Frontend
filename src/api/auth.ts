import { api } from "@/api/axios";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
}

export interface AdminProfile {
  id: number;
  username: string;
  email: string;
  created_at: string;
}

export async function loginAdmin(payload: LoginPayload): Promise<TokenResponse> {
  const { data } = await api.post<TokenResponse>("/auth/login", payload);
  return data;
}

export async function getAdminProfile(): Promise<AdminProfile> {
  const { data } = await api.get<AdminProfile>("/auth/me");
  return data;
}
