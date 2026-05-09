import apiClient from "./client";
import { Order } from "../types";

interface DriverRegistration {
  vehicleType: string;
  vehicleNumber: string;
  licenseNumber: string;
}

export const driverApi = {
  register: (data: DriverRegistration) =>
    apiClient.post("/driver/register", data),
  getProfile: () => apiClient.get("/driver/profile"),
  getAvailableOrders: () => apiClient.get<Order[]>("/driver/available-orders"),
  acceptOrder: (orderId: string) =>
    apiClient.post(`/driver/orders/${orderId}/accept`),
  updateOrderStatus: (orderId: string, status: "picked_up" | "delivered") =>
    apiClient.put(`/driver/orders/${orderId}/status`, { status }),
  updateLocation: (lat: number, lng: number) =>
    apiClient.put("/driver/location", { lat, lng }),
  getMyOrders: () => apiClient.get<Order[]>("/driver/my-orders"),
};
