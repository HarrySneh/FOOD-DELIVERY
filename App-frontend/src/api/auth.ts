import apiClient from "./client";
import { User } from "../types";

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone: string;
  role?: "customer" | "owner" | "admin" | "driver";
}

export const authApi = {
  login: (data: LoginData) =>
    apiClient.post<{ user: User; token: string }>("/auth/login", data),
  register: (data: RegisterData) =>
    apiClient.post<{ user: User; token: string }>("/auth/register", data),
  logout: () => apiClient.post("/auth/logout"),
  getProfile: () => apiClient.get<User>("/auth/profile"),
};
