"use client";

import { useState } from "react";
import { authApi } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function decodeJwt<T>(token: string): T {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    throw new Error("Invalid token");
  }
}

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface JwtPayload {
  userId: number;
  role: string;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuth } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    try {
      const token = await authApi.login(email, password);

      if (token) {
        const decoded = decodeJwt<JwtPayload>(token);

        setAuth({ token, role: decoded.role, userId: decoded.userId }); // ✅ Include userId

        console.log("Login successful:", {
          token,
          role: decoded.role,
          userId: decoded.userId,
        });

        // Close modal first
        onClose();

        // Navigate based on role
        if (decoded.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/home");
        }

        alert("Login successful!");
      } else {
        setError("No access token received");
        console.error("No access token received");
      }
    } catch (err: any) {
      setError(err.message || "Invalid email or password");
      console.error("Login failed:", err);
    }
  };

  const handleLogout = () => {
    authApi.logout();
    setAuth({ token: null, role: null, userId: null }); // ✅ Include userId
    navigate("/home"); // Redirect to home after logout
    alert("You have been logged out.");
  };
  const handleRegister = () => {
    navigate("/register"); // Redirect to home after logout
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      ></div>

      {/* Centered Login Modal */}
      <div
        className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
        bg-white p-6 rounded-lg shadow-lg max-w-sm w-full transition-transform duration-300 ease-in-out z-50`}
      >
        {/* Header */}
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md shadow-sm text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </form>

        {/* Buttons */}
        <div className="mt-4 flex flex-col space-y-2">
          <button
            onClick={handleRegister}
            className="w-full py-2 px-4 bg-gray-300 text-gray-700 rounded-md shadow-sm text-sm font-medium hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Register
          </button>

          <button
            onClick={handleLogout}
            className="w-full py-2 px-4 bg-red-500 text-white rounded-md shadow-sm text-sm font-medium hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
