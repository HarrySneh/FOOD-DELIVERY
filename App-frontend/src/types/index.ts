export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: "customer" | "owner" | "admin" | "driver";
  city?: string;
  createdAt: string;
}

export interface Restaurant {
  _id: string;
  name: string;
  description?: string;
  image?: string;
  cuisine: string[];
  address: string;
  location?: { lat: number; lng: number };
  city: string;
  deliveryTime: number;
  deliveryFee: number;
  minimumOrder?: number;
  rating?: number;
  ownerId: string;
  approved: boolean;
  isOpen?: boolean;
  phone?: string;
  email?: string;
}

export interface MenuItem {
  _id: string;
  restaurantId: string;
  restaurantName: string; // required for cart
  name: string;
  description?: string;
  price: number;
  image?: string;
  category: string;
  isAvailable?: boolean;
  isPopular?: boolean;
  preparationTime?: number;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Order {
  _id: string;
  orderNumber: string;
  customerId:
    | string
    | { _id: string; name: string; email: string; phone: string };
  restaurantId:
    | string
    | { _id: string; name: string; address: string; image?: string };
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  tax: number;
  totalAmount: number;
  deliveryAddress: { text: string; coordinates?: { lat: number; lng: number } };
  status:
    | "pending"
    | "confirmed"
    | "preparing"
    | "ready_for_pickup"
    | "assigned"
    | "picked_up"
    | "delivered"
    | "cancelled";
  paymentMethod: "card" | "momo" | "cash";
  paymentReference?: string;
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  driverId?: string;
  specialInstructions?: string;
  createdAt: string;
  deliveredAt?: string;
}

export interface CreateOrderData {
  items: CartItem[];
  deliveryAddress: string;
  paymentMethod: string;
  totalAmount: number;
}

export interface PaystackInitializeResponse {
  status: boolean;
  message: string;
  data: { authorization_url: string; access_code: string; reference: string };
}
