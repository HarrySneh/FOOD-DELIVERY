import apiClient from "./client";
import { Restaurant, MenuItem } from "../types";

export const restaurantsApi = {
  getAll: (params?: {
    lat?: number;
    lng?: number;
    search?: string;
    cuisine?: string;
  }) => apiClient.get<Restaurant[]>("/restaurants", { params }),
  getById: (id: string) => apiClient.get<Restaurant>(`/restaurants/${id}`),
  getMenu: (restaurantId: string) =>
    apiClient.get<MenuItem[]>(`/restaurants/${restaurantId}/menu`),
  approve: (id: string) => apiClient.put(`/restaurants/${id}/approve`),
};
