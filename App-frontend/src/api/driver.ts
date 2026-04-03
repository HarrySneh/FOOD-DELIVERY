import apiClient from "./client";
import { Order } from "../types";

export const driverApi = {
  register: (data: { vehicleType: string; vehicleNumber: string }) =>
    apiClient.post("/driver/register", data),
  getAvailableOrders: () => apiClient.get<Order[]>("/driver/available-orders"),
  acceptOrder: (orderId: string) =>
    apiClient.post(`/driver/orders/${orderId}/accept`),
  updateOrderStatus: (orderId: string, status: "picked_up" | "delivered") =>
    apiClient.put(`/driver/orders/${orderId}/status`, { status }),
  updateLocation: (lat: number, lng: number) =>
    apiClient.put("/driver/location", { lat, lng }),
  getMyOrders: () => apiClient.get<Order[]>("/driver/my-orders"),
  getDriverLocation: (driverId: string) =>
    apiClient.get(`/driver/location/${driverId}`),
};
