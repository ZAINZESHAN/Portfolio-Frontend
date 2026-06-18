export const TOKEN_KEY = "portfolio_admin_token";

export const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function removeToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

export function isAuthenticated(): boolean {
  return Boolean(getToken());
}
