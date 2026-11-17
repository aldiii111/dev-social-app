import { api } from "./apiClient";
import type { LoginPayload, RegisterPayload, AuthResponse } from "@/types";

export const authService = {
  async login(data: LoginPayload): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/login", data);
    const { token, user } = response.data;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    return response.data;
  },

  async register(data: RegisterPayload): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/register", data);
    const { token, user } = response.data;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    return response.data;
  },

  logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  getToken(): string | null {
    return localStorage.getItem("token");
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem("token");
  },
};
