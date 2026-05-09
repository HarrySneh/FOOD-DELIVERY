import apiClient from "./client";

export const paymentsApi = {
  initiate: (orderId: string) =>
    apiClient.post(`/payments/initiate/${orderId}`),
  verify: (reference: string) =>
    apiClient.get(`/payments/verify?reference=${reference}`),
};
