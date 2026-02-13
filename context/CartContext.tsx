"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "./ToastContext";

export type CartItem = {
  id: string;
  slug: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  itemsCount: number;
  subtotal: number;
  discount: number;
  couponCode: string;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  total: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { showToast } = useToast();

  useEffect(() => {
    const savedCart = localStorage.getItem("pashm-cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
  }, []);

  const [discount, setDiscount] = useState(0);
  const [couponCode, setCouponCode] = useState("");

  useEffect(() => {
    localStorage.setItem("pashm-cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Omit<CartItem, "quantity">, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    showToast(`${product.title} added to cart`);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    setDiscount(0);
    setCouponCode("");
  };

  const applyCoupon = (code: string) => {
    const upperCode = code.toUpperCase();
    const validCoupons: Record<string, number> = {
      "PASHM10": 0.10, "PASHM20": 0.20, "WELCOME": 0.15, "FIRST50": 0.50, 
      "SAVE5": 0.05, "FESTIVE": 0.30, "PASHM500": 500,
      "OFF100": 100, "NEWUSER": 0.10, "PASHMLOVE": 0.15, "PURE10": 0.10,
      "SAFFRON25": 0.25, "NATURAL": 0.12, "HEALTHY": 0.08, "LUXURY20": 0.20,
      "AYURVED": 0.15, "WINTER10": 0.10, "SALE40": 0.40, "CASHBACK": 0.05,
      "FREESHIP": 150, "PASHM30": 0.30, "FLAT500": 500, "GOLDEN": 0.22,
      "ROYAL15": 0.15, "PREMIUM": 0.18, "NATURE10": 0.10, "KASHMIR20": 0.20,
      "SILK20": 0.20, "DIWALI20": 0.20
    };

    if (validCoupons[upperCode]) {
      const val = validCoupons[upperCode];
      let disc = 0;
      if (val < 1) {
        disc = subtotal * val;
      } else {
        disc = val;
      }
      setDiscount(disc);
      setCouponCode(upperCode);
      showToast(`Coupon ${upperCode} applied!`, "success");
      return true;
    }
    showToast("Invalid coupon code", "error");
    return false;
  };

  const removeCoupon = () => {
    setDiscount(0);
    setCouponCode("");
    showToast("Coupon removed");
  };

  const itemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        itemsCount,
        subtotal,
        discount,
        couponCode,
        applyCoupon,
        removeCoupon,
        total: Math.max(0, subtotal - discount + (cart.length > 0 ? 150 : 0)),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
