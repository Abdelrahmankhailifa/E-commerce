import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import Bar from "./User/homePage/components/Bar";
import About from "./User/aboutPage/pages/About";
import Contact from "./User/contact page/pages/Contact";
import Home from "./User/homePage/pages/Home";
import { ProductPage } from "./User/productPage/pages/ProductPage";
import Shop from "./User/shoPage/pages/Shop";
import GroceryPage from "./User/groceryPage/pages/GroceryPage";
import JuicePage from "./User/juicePage/pages/JuicePage";
import Cart from "./User/cartPage/pages/Cart";
import Checkout from "./User/chekcoutPage/pages/Checkout";
import OrderConfirmation from "./User/orderPage/pages/OrderConfrimation";
import { AuthProvider } from "./User/context/AuthContext"; // Import your AuthProvider
import ProtectedRoute from "./ProtectedRoute"; // Import your ProtectedRoute
import AdminDashboard from "./Admin/homePage/pages/HomeAdmin"; // Import AdminDashboard
import RegisterPage from "./User/registerPage/pages/RegisterPage";

function AppRouter() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="home" replace />, // Redirect to "home" path
    },
    {
      path: "home/*",
      element: (
        <>
          <Bar />
          <Outlet /> {/* Render children routes here */}
        </>
      ),
      children: [
        { path: "", element: <Home /> }, // Default child route for "/home"
        { path: "about", element: <About /> }, // About page
        { path: "contact", element: <Contact /> }, // Contact page
        { path: "cart", element: <Cart /> },
        { path: "checkout", element: <Checkout /> },
        {
          path: "shop/*",
          element: (
            <>
              <Outlet /> {/* Render shop-related routes */}
            </>
          ),
          children: [
            { path: "", element: <Shop /> }, // Shop homepage
          ],
        },
        {
          path: "product-category/groceries/*",
          element: (
            <>
              <Outlet /> {/* Render product category children */}
            </>
          ),
          children: [
            { path: "", element: <GroceryPage /> }, // Groceries page
          ],
        },
        {
          path: "product-category/juice/*",
          element: (
            <>
              <Outlet /> {/* Render product category children */}
            </>
          ),
          children: [
            { path: "", element: <JuicePage /> }, // Juice page
          ],
        },
      ],
    },
    {
      path: "product/:id",
      element: (
        <>
          <Bar />
          <ProductPage /> {/* Dynamic product page */}
        </>
      ),
    },
    {
      path: "order/:orderId",
      element: (
        <>
          <Bar />
          <OrderConfirmation />
        </>
      ),
    },
    {
      path: "register/",
      element: (
        <>
          <RegisterPage />
        </>
      ),
    },
    {
      path: "admin/*",
      element: <ProtectedRoute role="admin" />, // Protected route for admin
      children: [
        { path: "", element: <AdminDashboard /> }, // Admin dashboard
      ],
    },
    {
      path: "*",
      element: <Navigate to="/home" replace />, // Catch-all redirect
    },
  ]);

  return (
    // Wrap the RouterProvider with AuthProvider so that every route can access auth state
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default AppRouter;
