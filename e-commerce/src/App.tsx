import AppRouter from "./AppRouter";
import { CartProvider } from "./User/productPage/components/CartContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <AppRouter />
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;
