export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: "customer" | "owner" | "admin" | "driver";
  createdAt: string;
}

export interface Restaurant {
  _id: string;
  name: string;
  description: string;
  image: string;
  cuisine: string[];
  address: string;
  location: { lat: number; lng: number };
  deliveryTime: number;
  deliveryFee: number;
  rating?: number;
  ownerId: string;
  approved?: boolean;
}

export interface MenuItem {
  _id: string;
  restaurantId: string;
  restaurantName: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  category: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Order {
  _id: string;
  customer: { _id: string; name: string; email: string; phone: string };
  restaurant: {
    _id: string;
    name: string;
    location: { lat: number; lng: number };
    address: string;
  };
  items: CartItem[];
  totalAmount: number;
  deliveryAddress: {
    text: string;
    coordinates?: { lat: number; lng: number };
  };
  status:
    | "pending"
    | "confirmed"
    | "preparing"
    | "ready_for_pickup"
    | "assigned"
    | "picked_up"
    | "delivered";
  paymentMethod: "card" | "momo";
  paymentReference?: string;
  driver?: {
    _id: string;
    name: string;
    location: { lat: number; lng: number };
  };
  deliveryFee?: number;
  createdAt: string;
}

export interface CreateOrderData {
  items: CartItem[];
  totalAmount: number;
  deliveryAddress: string;
  paymentMethod: "card" | "momo";
}

export interface PaystackInitializeResponse {
  status: boolean;
  message: string;
  data: { authorization_url: string; access_code: string; reference: string };
}

export interface PaymentVerificationResponse {
  status: boolean;
  message: string;
  data: { status: string; reference: string; amount: number };
}
