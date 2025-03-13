// src/contexts/CartContext.tsx
import { createContext, useContext, ReactNode, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { cartApi, CartResponse } from "../../services/api";

interface CartContextType {
  cart: CartResponse | undefined;
  isLoading: boolean;
  error: any;
  addToCart: (productId: number, quantity: number) => void;
  removeFromCart: (cartId: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getQuantity: () => number;
  getProductQuantity: (productId: number) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const queryClient = useQueryClient();

  // Fetch cart data
  const {
    data: cart,
    isLoading,
    error,
  } = useQuery<CartResponse>({
    queryKey: ["cart"],
    queryFn: () => cartApi.getCart().then((res) => res.data),
  });

  useEffect(() => {
    if (error) {
      console.error("Failed to load cart:", error);
    }
  }, [error]);

  // Mutations
  const addMutation = useMutation({
    mutationFn: ({
      productId,
      quantity,
    }: {
      productId: number;
      quantity: number;
    }) => cartApi.addToCart(productId, quantity),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
  });

  const removeMutation = useMutation({
    mutationFn: (cartId: number) => cartApi.removeFromCart(cartId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
  });

  const clearMutation = useMutation({
    mutationFn: cartApi.clearCart,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
  });

  // Helper functions
  const getCartTotal = () => Number(cart?.total) || 0;

  const getQuantity = () =>
    cart?.items && Array.isArray(cart.items)
      ? cart.items.reduce((acc, item) => acc + item.quantity, 0)
      : 0;

  const getProductQuantity = (productId: number) =>
    cart?.items.find((item) => item.product.id === productId)?.quantity || 0;

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoading,
        error,
        addToCart: (productId, quantity) =>
          addMutation.mutate({ productId, quantity }),
        removeFromCart: (cartId) => removeMutation.mutate(cartId),
        clearCart: () => clearMutation.mutate(),
        getCartTotal,
        getQuantity,
        getProductQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
