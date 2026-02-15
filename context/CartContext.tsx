"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "./ToastContext";
import { addToCartAction, getCartAction } from "../app/actions";
import { Cart } from "../lib/shopify";

export type CartItem = {
  id: string; // Variant ID
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
  cartId: string | null;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartId, setCartId] = useState<string | null>(null);
  const [discount, setDiscount] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const { showToast } = useToast();

  const mapShopifyCartToItems = (shopifyCart: Cart): CartItem[] => {
    return shopifyCart.lines.edges.map((edge) => {
      const node = edge.node;
      const variant = node.merchandise;
      const product = variant.product;
      return {
        id: variant.id,
        slug: product.handle,
        title: product.title,
        price: parseFloat(variant.price.amount),
        image: product.featuredImage?.url || "https://placehold.co/600x600?text=No+Image", 
        quantity: node.quantity,
      };
    });
  };

  // Load cart from server on mount
  useEffect(() => {
    const initCart = async () => {
        try {
            const serverCart = await getCartAction();
            if (serverCart) {
                setCartId(serverCart.id);
                setCart(mapShopifyCartToItems(serverCart));
            } else {
                // Check local storage specific to this session? 
                // Mostly rely on server cart if available.
                const savedCart = localStorage.getItem("pashm-cart");
                if (savedCart) {
                    // We don't have sync logic yet, just replace with savedCart if server is empty?
                    // Actually server is truth. If server empty (new session), local is probably stale or from previous unauthenticated Medusa session.
                    // Let's clear local if server is active?
                    // For now, if server returns nothing, we have no cart.
                    // If server returns cart, we use it.
                }
            }
        } catch (e) {
            console.error("Failed to load cart", e);
        }
    }
    initCart();
  }, []);

  useEffect(() => {
    localStorage.setItem("pashm-cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = async (product: Omit<CartItem, "quantity">, quantity = 1) => {
    // Optimistic update?
    const tempCart = [...cart];
    const existing = tempCart.find((item) => item.id === product.id);
    if (existing) {
        existing.quantity += quantity;
    } else {
        tempCart.push({ ...product, quantity });
    }
    setCart(tempCart);
    showToast(`${product.title} added to cart`);

    try {
        const updatedCart = await addToCartAction([{ merchandiseId: product.id, quantity }]);
        if (updatedCart) {
            setCartId(updatedCart.id);
            setCart(mapShopifyCartToItems(updatedCart));
        }
    } catch (e) {
        console.error("Add to cart failed", e);
        showToast("Failed to sync cart with server", "error");
        // Revert?
    }
  };

  const removeFromCart = (id: string) => {
    // We haven't implemented removeFromCartAction yet.
    // Just local update for now or TODO.
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
     // TODO: Implement updateCartLinesAction
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
   // Coupon logic preserved
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
        cartId,
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
