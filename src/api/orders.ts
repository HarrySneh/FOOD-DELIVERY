import apiClient from "./client";
import { Order, CreateOrderData } from "../types";

export const ordersApi = {
  create: (data: CreateOrderData) => apiClient.post<Order>("/orders", data),
  getUserOrders: () => apiClient.get<Order[]>("/orders/my-orders"),
  getOrderById: (id: string) => apiClient.get<Order>(`/orders/${id}`),
  updateStatus: (orderId: string, status: string) =>
    apiClient.put(`/orders/${orderId}/status`, { status }),
  markReady: (orderId: string) => apiClient.put(`/orders/${orderId}/ready`),
  cancel: (orderId: string) => apiClient.put(`/orders/${orderId}/cancel`),
};
