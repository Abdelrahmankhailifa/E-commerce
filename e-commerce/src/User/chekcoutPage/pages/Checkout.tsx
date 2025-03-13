import React, { useState, useEffect } from "react";
import { useCart } from "../../productPage/components/CartContext";
import { useNavigate } from "react-router-dom";
import { cartApi, ordersApi } from "../../services/api";
import { useBilling } from "../../hooks/useBilling";
import { useAuth } from "../../context/AuthContext";

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cart } = useCart();
  const { billingDetails, isLoading, saveBillingDetails, isSaving } =
    useBilling(user?.id || 0);

  const [paymentMethod, setPaymentMethod] = useState("check");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    country: "Egypt",
    streetAddress: "",
    apartment: "",
    city: "",
    postcode: "",
    phoneNumber: "",
    emailAddress: "",
    notes: "",
  });

  // Load existing billing details if available
  useEffect(() => {
    if (billingDetails) {
      setFormData((prev) => ({
        ...prev,
        firstName: billingDetails.firstName,
        lastName: billingDetails.lastName,
        companyName: billingDetails.companyName || "",
        country: billingDetails.country,
        streetAddress: billingDetails.streetAddress,
        city: billingDetails.townCity,
        postcode: billingDetails.postcodeZip,
        phoneNumber: billingDetails.phoneNumber,
        emailAddress: billingDetails.emailAddress,
      }));
    }
  }, [billingDetails]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // First, save billing details
      await saveBillingDetails({
        firstName: formData.firstName,
        lastName: formData.lastName,
        companyName: formData.companyName,
        country: formData.country,
        streetAddress: formData.streetAddress,
        townCity: formData.city,
        stateCounty: formData.city, // Using city as state/county
        postcodeZip: formData.postcode,
        phoneNumber: formData.phoneNumber,
        emailAddress: formData.emailAddress,
      });

      // Then create order
      const orderResponse = await ordersApi.createOrder();

      // Clear cart after successful order creation
      await cartApi.clearCart();

      // Redirect to order confirmation page
      navigate(`/order/${orderResponse.id}`);
    } catch (error) {
      console.error("Checkout failed:", error);
      alert("Checkout failed. Please try again.");
    }
  };

  if (isLoading) {
    return <div className="p-8">Loading billing details...</div>;
  }

  if (!user) {
    return <div className="p-8">Please log in to continue with checkout</div>;
  }

  return (
    <div className="p-8 bg-[#F8F6F3] min-h-screen">
      <h1 className="text-3xl ml-20 font-bold mb-6 border-b-4 border-[#8BC34A] w-[1300px] pb-5">
        Checkout
      </h1>

      {/* Coupon Section */}
      <div className="mb-6 ml-20">
        <label className="flex items-center space-x-2">
          <input type="checkbox" className="form-checkbox" />
          <span>
            Have a coupon?{" "}
            <a href="#" className="text-[#8BC34A] hover:underline">
              Click here to enter your code
            </a>
          </span>
        </label>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 w-[1200px] ml-14"
      >
        {/* Billing Details */}
        <div className="col-span-2 bg-[#F8F6F3] p-6">
          <h2 className="text-2xl font-bold mb-4 font-serif border-b-2 pb-5">
            Billing details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First Name */}
            <div>
              <label
                htmlFor="firstName"
                className="block font-semibold mb-1 text-[#333333]"
              >
                First name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="border w-full p-2 rounded"
                required
              />
            </div>
            {/* Last Name */}
            <div>
              <label
                htmlFor="lastName"
                className="block font-semibold mb-1 text-[#333333]"
              >
                Last name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="border w-full p-2 rounded"
                required
              />
            </div>
          </div>

          {/* Company Name */}
          <div className="mt-4">
            <label
              htmlFor="companyName"
              className="block text-[#333333] font-semibold mb-1"
            >
              Company name (optional)
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="border w-full p-2 rounded"
            />
          </div>

          {/* Country */}
          <div className="mt-4">
            <label
              htmlFor="country"
              className="block font-semibold mb-1 text-[#333333]"
            >
              Country / Region <span className="text-red-500">*</span>
            </label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="border w-full p-2 rounded"
              required
            >
              <option value="Egypt">Egypt</option>
              {/* Add more countries if needed */}
            </select>
          </div>

          {/* Street Address */}
          <div className="mt-4">
            <label
              htmlFor="streetAddress"
              className="block text-[#333333] font-semibold mb-1"
            >
              Street address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="streetAddress"
              name="streetAddress"
              value={formData.streetAddress}
              onChange={handleChange}
              className="border w-full p-2 rounded mb-2"
              placeholder="House number and street name"
              required
            />
            <input
              type="text"
              id="apartment"
              name="apartment"
              value={formData.apartment}
              onChange={handleChange}
              className="border w-full p-2 rounded"
              placeholder="Apartment, suite, unit, etc. (optional)"
            />
          </div>

          {/* Town/City */}
          <div className="mt-4">
            <label
              htmlFor="city"
              className="block text-[#333333] font-semibold mb-1"
            >
              Town / City <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="border w-full p-2 rounded"
              required
            />
          </div>

          {/* Postcode/ZIP */}
          <div className="mt-4">
            <label
              htmlFor="postcode"
              className="block font-semibold mb-1 text-[#333333]"
            >
              Postcode / ZIP <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="postcode"
              name="postcode"
              value={formData.postcode}
              onChange={handleChange}
              className="border w-full p-2 rounded"
              required
            />
          </div>

          {/* Phone */}
          <div className="mt-4">
            <label
              htmlFor="phoneNumber"
              className="block font-semibold mb-1 text-[#333333]"
            >
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="border w-full p-2 rounded"
              required
            />
          </div>

          {/* Email */}
          <div className="mt-4">
            <label
              htmlFor="emailAddress"
              className="block text-[#333333] font-semibold mb-1"
            >
              Email address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="emailAddress"
              name="emailAddress"
              value={formData.emailAddress}
              onChange={handleChange}
              className="border w-full p-2 rounded"
              required
            />
          </div>

          <h2 className="text-2xl font-bold mb-4 mt-6 font-serif border-b-2 pb-3">
            Additional information
          </h2>

          {/* Order Notes */}
          <div className="mt-10">
            <label
              htmlFor="notes"
              className="block text-[#333333] font-semibold mb-1"
            >
              Order notes (optional)
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="border w-full p-2 rounded"
              rows={4}
            ></textarea>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-[#F8F6F3] w-[500px] rounded p-6 border-2 border-gray-300 h-[fit-content]">
          <h2 className="text-lg font-bold mb-4">Your order</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border-b p-4 text-left font-semibold">
                  Product
                </th>
                <th className="border-b p-4 text-left font-semibold">
                  Subtotal
                </th>
              </tr>
            </thead>
            <tbody>
              {cart?.items.map((item) => (
                <tr key={item.product.id} className="border-b">
                  <td className="p-4">
                    {item.product.name} X {item.quantity}
                  </td>
                  <td className="p-4">
                    £{(item.quantity * item.product.price).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between py-2 border-b">
            <span>Subtotal</span>
            <span>£{cart?.total}</span>
          </div>
          <div className="flex justify-between py-2">
            <span>Total</span>
            <span className="font-bold">£{cart?.total}</span>
          </div>

          {/* Payment Method */}
          <div className="mt-4">
            <label className="block font-semibold mb-2">Payment Method</label>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="check"
                  checked={paymentMethod === "check"}
                  onChange={() => setPaymentMethod("check")}
                  className="form-radio"
                />
                <span>Check payments</span>
              </label>
              <div
                className={`
                overflow-hidden transition-all duration-300 ease-in-out
                ${
                  paymentMethod === "check"
                    ? "max-h-24 opacity-100"
                    : "max-h-0 opacity-0"
                }
              `}
              >
                <p className="text-gray-800 ml-6 p-4 bg-gray-50 rounded-md">
                  Please send a check to Store Name, Store Street, Store Town,
                  Store State / County, Store Postcode.
                </p>
              </div>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cash"
                  checked={paymentMethod === "cash"}
                  onChange={() => setPaymentMethod("cash")}
                  className="form-radio"
                />
                <span>Cash on delivery</span>
              </label>
              <div
                className={`
                overflow-hidden transition-all duration-300 ease-in-out
                ${
                  paymentMethod === "cash"
                    ? "max-h-24 opacity-100"
                    : "max-h-0 opacity-0"
                }
              `}
              >
                <p className="text-gray-800 ml-6 p-4 bg-gray-50 rounded-md">
                  Pay with cash upon delivery.
                </p>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="w-full bg-[#6A9739] text-white py-2 rounded hover:bg-[#8BC34A] transition mt-4 font-semibold disabled:opacity-50"
          >
            {isSaving ? "SAVING..." : "PLACE ORDER"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
