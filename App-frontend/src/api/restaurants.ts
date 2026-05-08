import apiClient from './client';

export const restaurantsApi = {
  getAll: (params) => apiClient.get('/restaurants', { params }),
  getById: (id) => apiClient.get(`/restaurants/${id}`),
  getMenu: (restaurantId) => apiClient.get(`/restaurants/${restaurantId}/menu`),
  create: (data) => apiClient.post('/restaurants', data),
  addMenuItem: (restaurantId, data) => apiClient.post(`/restaurants/${restaurantId}/menu`, data),
  approve: (id) => apiClient.put(`/restaurants/${id}/approve`),
};