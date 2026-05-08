import apiClient from './client';

export const paymentsApi = {
  initiate: (orderId) => apiClient.post(`/payments/initiate/${orderId}`),
  verify: (reference) => apiClient.get(`/payments/verify?reference=${reference}`),
};