import apiClient from "./client";
import { User } from "../types";

interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone: string;
  city?: string;
  role?: string;
}

export const authApi = {
  register: (data: RegisterData) =>
    apiClient.post<{ user: User; token: string }>("/auth/register", data),
  // login: (data: { email: string; password: string }) =>
  //   apiClient.post<{ user: User; token: string }>("/auth/login", data),
  login: (data: { email: string; password: string }) =>
    apiClient.post("/auth/login", data),
  logout: () => apiClient.post("/auth/logout"),
  getProfile: () => apiClient.get<User>("/auth/profile"),
};
