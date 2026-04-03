import apiClient from "./client";
import { PaystackInitializeResponse } from "../types";

export const paymentsApi = {
  initialize: (orderId: string, amount: number, email: string) =>
    apiClient.post<PaystackInitializeResponse>("/payments/initialize", {
      orderId,
      amount,
      email,
    }),
  verify: (reference: string) => apiClient.get(`/payments/verify/${reference}`),
};
