import apiClient from './client';

export const ordersApi = {
  create: (data) => apiClient.post('/orders', data),
  getUserOrders: () => apiClient.get('/orders/my-orders'),
  getOrderById: (id) => apiClient.get(`/orders/${id}`),
  updateStatus: (orderId, status) => apiClient.put(`/orders/${orderId}/status`, { status }),
  markReady: (orderId) => apiClient.put(`/orders/${orderId}/ready`),
  cancel: (orderId) => apiClient.put(`/orders/${orderId}/cancel`),
};