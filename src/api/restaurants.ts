import apiClient from "./client";
import { Restaurant, MenuItem } from "../types";

export const restaurantsApi = {
  getAll: (params?: Record<string, any>) =>
    apiClient.get<Restaurant[]>("/restaurants", { params }),
  getById: (id: string) => apiClient.get<Restaurant>(`/restaurants/${id}`),
  getMenu: (restaurantId: string) =>
    apiClient.get<MenuItem[]>(`/restaurants/${restaurantId}/menu`),
  create: (data: Partial<Restaurant>) =>
    apiClient.post<Restaurant>("/restaurants", data),
  addMenuItem: (restaurantId: string, data: Partial<MenuItem>) =>
    apiClient.post(`/restaurants/${restaurantId}/menu`, data),
  approve: (id: string) => apiClient.put(`/restaurants/${id}/approve`),
};
