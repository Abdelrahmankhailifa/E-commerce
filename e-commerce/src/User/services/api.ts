import axios, { AxiosError, AxiosInstance } from "axios";

const API_BASE = "http://localhost:3000";
const TOKEN_KEY = "access_token";

// Types
export interface Product {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  discount?: number;
  category: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  subtotal: number;
}

export interface CartResponse {
  id: number;
  items: CartItem[];
  total: number;
}

export interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  price: number;
  quantity: number;
  productSnapshot: Product;
}

export enum OrderStatus {
  PENDING = "pending",
  PROCESSING = "processing",
  SHIPPED = "shipped",
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
}

export interface OrderResponse {
  id: number;
  status: OrderStatus;
  total: number;
  createdAt: string;
  items: OrderItem[];
  userId: number;
  billingDetails?: {
    firstName: string;
    lastName: string;
    companyName?: string;
    country: string;
    streetAddress: string;
    townCity: string;
    stateCounty: string;
    postcodeZip: string;
    phoneNumber: string;
    emailAddress: string;
  };
}

interface OrderError {
  path?: string;
  timestamp?: string;
  message?: string;
  status?: number;
  error?: string;
}

export interface BillingDetails {
  id: number;
  userId: number;
  firstName: string;
  lastName: string;
  companyName?: string;
  country: string;
  streetAddress: string;
  townCity: string;
  stateCounty: string;
  postcodeZip: string;
  phoneNumber: string;
  emailAddress: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBillingDetailsDto {
  firstName: string;
  lastName: string;
  companyName?: string;
  country: string;
  streetAddress: string;
  townCity: string;
  stateCounty: string;
  postcodeZip: string;
  phoneNumber: string;
  emailAddress: string;
}

// Create authenticated API client
const createApiClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: API_BASE,
  });

  client.interceptors.request.use((config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  client.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem(TOKEN_KEY);
        // You might want to redirect to login page here
      }
      return Promise.reject(error);
    }
  );

  return client;
};

const apiClient = createApiClient();

export async function fetchProducts() {
  try {
    const response = await axios.get(`${API_BASE}/products`);
    console.log("Products API Response:", response.data);
    return response.data.map((item: any) => ({
      ...item,
      price:
        typeof item.price === "string" ? parseFloat(item.price) : item.price,

      discount:
        typeof item.discount === "string"
          ? parseFloat(item.discount)
          : item.discount,
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
}

// API Services

export const cartApi = {
  getCart: () => apiClient.get<CartResponse>("/cart"),
  addToCart: (productId: number, quantity: number) =>
    apiClient.post("/cart/add", { productId, quantity }),
  removeFromCart: (productId: number) =>
    apiClient.delete(`/cart/remove/${productId}`),
  // 🔍 Check if user is available
  clearCart: () => apiClient.delete("/cart/clear"),
};

export const ordersApi = {
  createOrder: async () => {
    try {
      const cartResponse = await cartApi.getCart();
      const cart = cartResponse.data;

      console.log("🛍️ Cart data before order:", cart);

      if (!cart.items || cart.items.length === 0) {
        throw new Error("Cannot create order: Cart is empty");
      }

      // Get billing details for the current user
      const auth = JSON.parse(localStorage.getItem("auth") || "{}");
      const billingResponse = await billingApi.getBillingDetails(auth.userId);
      const billingDetails = billingResponse;

      // Format order data with proper number types
      const orderData = {
        cartId: cart.id,
        items: cart.items.map((item) => ({
          productId: item.product.id,
          quantity: Number(item.quantity),
          price: Number(item.product.price),
        })),
        total: Number(cart.total).toFixed(2),
        billingDetails: {
          firstName: billingDetails.firstName,
          lastName: billingDetails.lastName,
          companyName: billingDetails.companyName,
          country: billingDetails.country,
          streetAddress: billingDetails.streetAddress,
          townCity: billingDetails.townCity,
          stateCounty: billingDetails.stateCounty,
          postcodeZip: billingDetails.postcodeZip,
          phoneNumber: billingDetails.phoneNumber,
          emailAddress: billingDetails.emailAddress,
        },
      };

      console.log("📦 Sending order data:", orderData);

      const response = await apiClient.post<OrderResponse>(
        "/orders",
        orderData
      );
      console.log("✅ Order created successfully:", response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("🔴 Order Creation Error:", {
          request: error.config?.data,
          response: error.response?.data,
          status: error.response?.status,
        });

        if (error.response?.status === 400) {
          const message = error.response.data.message;
          if (Array.isArray(message)) {
            throw new Error(message.join(", "));
          }
          throw new Error(message || "Invalid order data");
        }

        throw new Error("Failed to create order");
      }
      throw error;
    }
  },

  getOrders: () => apiClient.get<OrderResponse[]>("/orders"),

  getOrder: async (orderId: number) => {
    try {
      // Get order details
      const orderResponse = await apiClient.get<OrderResponse>(
        `/orders/${orderId}`
      );
      const order = orderResponse.data;

      try {
        // Try to get billing details for the order's user
        const billingResponse = await billingApi.getBillingDetails(
          order.userId
        );

        // Combine order and billing details
        return {
          data: {
            ...order,
            billingDetails: {
              firstName: billingResponse.firstName,
              lastName: billingResponse.lastName,
              companyName: billingResponse.companyName,
              country: billingResponse.country,
              streetAddress: billingResponse.streetAddress,
              townCity: billingResponse.townCity,
              stateCounty: billingResponse.stateCounty,
              postcodeZip: billingResponse.postcodeZip,
              phoneNumber: billingResponse.phoneNumber,
              emailAddress: billingResponse.emailAddress,
            },
          },
        };
      } catch (billingError) {
        // If billing details don't exist, return order without billing details
        console.log("No billing details found for order:", orderId);
        return {
          data: order,
        };
      }
    } catch (error) {
      console.error("Error fetching order details:", error);
      throw error;
    }
  },
};

export const authApi = {
  async getProfile(userId: number) {
    // ✅ Added getProfile function
    const response = await axios.get(`${API_BASE}/users/${userId}`);

    return response.data;
  },
  login: async (email: string, password: string): Promise<string> => {
    try {
      console.log("Attempting to login with email:", email);
      const response = await apiClient.post<{ access_token: string }>(
        "/auth/login",
        {
          email,
          password,
        }
      );
      const { access_token } = response.data;
      console.log("Login successful, token received:", access_token);
      localStorage.setItem(TOKEN_KEY, access_token);

      return access_token;
    } catch (error: any) {
      console.error("Error logging in:", error.message);
      throw new Error("Failed to login");
    }
  },

  register: async (
    email: string,
    password: string,
    firstName: string, // ✅ Move required parameters before optional ones
    lastName: string,
    role?: string // ✅ Optional parameter should be last
  ): Promise<{ token: string; userId: number }> => {
    try {
      const response = await apiClient.post<{
        access_token: string;
        userId: number;
      }>(
        "/auth/register",
        { email, password, role, firstName, lastName } // ✅ Include `firstName` and `lastName` in the request
      );
      console.log("Sending registration data:", {
        email,
        password,
        firstName,
        lastName,
        role,
      });

      const { access_token, userId } = response.data;
      if (!access_token || !userId) {
        throw new Error(
          "Invalid registration response: Missing token or userId"
        );
      }

      console.log("Registration successful, token received:", access_token);
      localStorage.setItem(TOKEN_KEY, access_token);
      return { token: access_token, userId };
    } catch (error: any) {
      console.error("Error registering user:", error.message);
      throw new Error("Failed to register");
    }
  },

  logout: () => {
    console.log("Logging out and removing token from storage");
    localStorage.removeItem(TOKEN_KEY);
  },

  createProfile: async (
    userId: number,
    firstName?: string,
    lastName?: string
  ): Promise<any> => {
    try {
      const response = await apiClient.post("/profile", {
        userId,
        firstName,
        lastName,
      });

      console.log("Profile created successfully:", response.data);
      return response.data;
    } catch (error: any) {
      console.error(
        "Profile creation failed:",
        error.response?.data || error.message
      );
      throw new Error("Failed to create profile");
    }
  },
};

export const getAuthToken = () => localStorage.getItem(TOKEN_KEY);

export const billingApi = {
  // Create billing details
  createBillingDetails: async (
    userId: number,
    details: CreateBillingDetailsDto
  ) => {
    try {
      console.log("🔍 Debug - Sending billing request:");
      console.log("User ID:", userId);
      console.log("Billing Data:", JSON.stringify(details, null, 2));

      const response = await apiClient.post<BillingDetails>(
        `/billing/${userId}`,
        details
      );

      console.log("✅ Billing details created successfully:", response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("❌ Billing Creation Error:", {
          request: error.config?.data,
          response: error.response?.data,
          status: error.response?.status,
        });

        // If error 400, extract detailed error messages
        if (error.response?.status === 400) {
          const message = error.response.data.message;
          throw new Error(
            Array.isArray(message)
              ? message.join(", ")
              : message || "Invalid billing details"
          );
        }

        throw new Error(
          error.response?.data?.message || "Failed to create billing details"
        );
      }
      throw error;
    }
  },

  // Get billing details
  getBillingDetails: async (userId: number) => {
    try {
      const response = await apiClient.get<BillingDetails>(
        `/billing/${userId}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error fetching billing details:", error.response?.data);
        throw new Error("Failed to fetch billing details");
      }
      throw error;
    }
  },

  // Update billing details
  updateBillingDetails: async (
    userId: number,
    details: Partial<CreateBillingDetailsDto>
  ) => {
    try {
      const response = await apiClient.put<BillingDetails>(
        `/billing/${userId}`,
        details
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error updating billing details:", error.response?.data);
        throw new Error("Failed to update billing details");
      }
      throw error;
    }
  },

  // Delete billing details
  deleteBillingDetails: async (userId: number) => {
    try {
      const response = await apiClient.delete(`/billing/${userId}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error deleting billing details:", error.response?.data);
        throw new Error("Failed to delete billing details");
      }
      throw error;
    }
  },
};

export default apiClient;
