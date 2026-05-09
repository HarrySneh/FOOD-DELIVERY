import apiClient from "../api/client";

export const initializePayment = async (
  orderId: string,
  email: string,
  amount: number,
  callback: (success: boolean, result: any) => void,
): Promise<void> => {
  try {
    const { data } = await apiClient.post(`/payments/initiate/${orderId}`);
    const { authorization_url, reference } = data;

    const handler = (window as any).PaystackPop.setup({
      key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
      email: email,
      amount: amount * 100,
      ref: reference,
      currency: "GHS",
      callback: async (response: any) => {
        try {
          const verifyRes = await apiClient.get(
            `/payments/verify?reference=${response.reference}`,
          );
          if (verifyRes.data.order.paymentStatus === "paid") {
            callback(true, verifyRes.data.order);
          } else {
            callback(false, "Payment verification failed");
          }
        } catch (err) {
          callback(false, "Verification error");
        }
      },
      onClose: () => {
        callback(false, "Payment window closed");
      },
    });
    handler.openIframe();
  } catch (error) {
    console.error(error);
    callback(false, "Payment initialization failed");
  }
};
