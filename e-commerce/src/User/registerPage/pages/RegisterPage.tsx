import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../services/api"; // Import auth API

export default function RegisterPage() {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",

    lastName: "",
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Mutation for creating profile

  // Mutation for registering user
  const registerMutation = useMutation({
    mutationFn: async () => {
      return authApi.register(
        formData.email,
        formData.password,
        formData.firstName,
        formData.lastName,
        "user" // Role should be last!
      );
    },
    onSuccess: (userId) => {
      console.log("User registered with ID:", Number(userId));

      navigate("/home"); // Redirect after success

      if (!userId) {
        console.error("User registration failed. No userId returned.");
        return;
      }
    },
    onError: (error) => {
      console.error("Registration failed:", error);
    },
  });

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerMutation.mutate();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto px-4 py-8">
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white p-8 rounded-lg shadow-sm border"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  name="firstName"
                  type="text"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded-md focus:outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  name="lastName"
                  type="text"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded-md focus:outline-none"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                name="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none"
              />
            </div>
          </div>

          {/* Show Error Messages */}
          {registerMutation.error && (
            <p className="text-red-500">
              Something went wrong. Please try again.
            </p>
          )}

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-[#8BC34A] hover:bg-[#7CB342] rounded-md"
            disabled={registerMutation.isPending}
          >
            {registerMutation.isPending ? "Creating..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}
