import apiClient from "./client";

export interface Address {
  _id: string;
  label: string;
  address: string;
  city: string;
  isDefault: boolean;
}

export interface PaymentMethod {
  _id: string;
  type: "card" | "momo";
  last4?: string;
  phoneNumber?: string;
  isDefault: boolean;
}

export const userApi = {
  getAddresses: () => apiClient.get<Address[]>("/users/addresses"),
  addAddress: (data: Omit<Address, "_id">) =>
    apiClient.post<Address>("/users/addresses", data),
  updateAddress: (id: string, data: Partial<Address>) =>
    apiClient.put<Address>(`/users/addresses/${id}`, data),
  deleteAddress: (id: string) => apiClient.delete(`/users/addresses/${id}`),

  getPaymentMethods: () =>
    apiClient.get<PaymentMethod[]>("/users/payment-methods"),
  addPaymentMethod: (data: Omit<PaymentMethod, "_id">) =>
    apiClient.post<PaymentMethod>("/users/payment-methods", data),
  updatePaymentMethod: (id: string, data: Partial<PaymentMethod>) =>
    apiClient.put<PaymentMethod>(`/users/payment-methods/${id}`, data),
  deletePaymentMethod: (id: string) =>
    apiClient.delete(`/users/payment-methods/${id}`),
};
