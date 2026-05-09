// API request/response types
export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone: string;
  city?: string;
  role?: "customer" | "owner" | "admin" | "driver";
}

export interface CreateOrderData {
  items: Array<{ _id: string; restaurantId: string; quantity: number }>;
  deliveryAddress: string;
  paymentMethod: string;
  totalAmount: number;
}

export interface DriverRegistrationData {
  vehicleType: string;
  vehicleNumber: string;
  licenseNumber: string;
}

export interface RestaurantData {
  name: string;
  description?: string;
  address: string;
  city: string;
  deliveryTime: number;
  deliveryFee: number;
  minimumOrder?: number;
  cuisine: string[];
  phone: string;
}

export interface MenuItemData {
  name: string;
  description?: string;
  price: number;
  category: string;
  isAvailable?: boolean;
  isPopular?: boolean;
  preparationTime?: number;
}
