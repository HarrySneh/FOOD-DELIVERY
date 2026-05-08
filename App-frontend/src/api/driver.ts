import apiClient from './client';

export const driverApi = {
  register: (data) => apiClient.post('/driver/register', data),
  getProfile: () => apiClient.get('/driver/profile'),
  getAvailableOrders: () => apiClient.get('/driver/available-orders'),
  acceptOrder: (orderId) => apiClient.post(`/driver/orders/${orderId}/accept`),
  updateOrderStatus: (orderId, status) => apiClient.put(`/driver/orders/${orderId}/status`, { status }),
  updateLocation: (lat, lng) => apiClient.put('/driver/location', { lat, lng }),
  getMyOrders: () => apiClient.get('/driver/my-orders'),
};