import { createContext, ReactNode, useState } from "react";
import { toast } from "react-toastify";

export interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  restaurantId?: string;
  image?: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalPrice: number;
  itemCount: number;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const addToCart = (item: CartItem) => {
    const existing = cart.find((i) => i._id === item._id);
    if (existing) {
      const updated = cart.map((i) =>
        i._id === item._id ? { ...i, quantity: i.quantity + item.quantity } : i,
      );
      saveCart(updated);
    } else {
      saveCart([...cart, item]);
    }
    toast.success("Added to cart");
  };

  const removeFromCart = (id: string) => {
    saveCart(cart.filter((i) => i._id !== id));
    toast.info("Removed from cart");
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      saveCart(cart.map((i) => (i._id === id ? { ...i, quantity } : i)));
    }
  };

  const clearCart = () => saveCart([]);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalPrice,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
