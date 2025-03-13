import React from "react";
import { ordersApi, OrderResponse } from "../../services/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const OrderConfirmation: React.FC = () => {
  // Fetch products using TanStack Query
  const { orderId } = useParams<{ orderId: string }>(); // Extract orderId from URL
  const numericOrderId = Number(orderId);

  const {
    data: order,
    isLoading,
    isError,
  } = useQuery<OrderResponse>({
    queryKey: ["orders", numericOrderId], // Depend on orderId
    queryFn: async () => {
      const response = await ordersApi.getOrder(numericOrderId); // Fetch order
      console.log("Order API Response:", response.data); // Debug log
      return response.data; // ✅ Return only the data, not the AxiosResponse
    }, // Pass orderId dynamically
  });

  // Add debug log for order data
  console.log("Current order data:", order);

  if (isNaN(numericOrderId)) {
    console.error("Invalid order ID:", orderId);
    return <div>Error: Invalid order ID</div>;
  }

  if (isLoading) {
    return <div>Loading order details...</div>;
  }

  if (isError) {
    return <div>Error loading order details</div>;
  }

  const formatDate = (isoDate?: string) => {
    const date = new Date(isoDate || Date.now());
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="flex w-full  p-8 bg-[#F8F6F3]">
      <div className="flex-col justify-center items-center w-1/2 mx-auto">
        <h1 className="text-3xl font-bold mb-4">Order Confirmation</h1>
        <p className="text-gray-600 mb-8">
          Thank you. Your order has been received.
        </p>

        {/* Order Summary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 text-sm">
          <div>
            <p className="text-gray-500 uppercase mb-1">ORDER NUMBER:</p>
            <p className="font-medium">{order?.id}</p>
          </div>
          <div>
            <p className="text-gray-500 uppercase mb-1">DATE:</p>
            <p className="font-medium">{formatDate(order?.createdAt)}</p>
          </div>
          <div>
            <p className="text-gray-500 uppercase mb-1">TOTAL:</p>
            <p className="font-medium">£{order?.total}</p>
          </div>
          <div>
            <p className="text-gray-500 uppercase mb-1">STATUS:</p>
            <p className="font-medium">{order?.status}</p>
          </div>
        </div>

        {/* Order Details Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Order details</h2>
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-6 py-3">Product</th>
                  <th className="text-right px-6 py-3">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {order?.items.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4">
                      <span className="text-green-600">{item.productName}</span>{" "}
                      × {item.quantity}
                    </td>
                    <td className="text-right px-6 py-4">
                      £{Number(item.price).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Billing Address Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Billing address</h2>
          <div className="space-y-2 text-gray-600">
            {order?.billingDetails ? (
              <>
                <p>
                  {order.billingDetails.firstName}{" "}
                  {order.billingDetails.lastName}
                </p>
                {order.billingDetails.companyName && (
                  <p>{order.billingDetails.companyName}</p>
                )}
                <p>{order.billingDetails.streetAddress}</p>
                <p>{order.billingDetails.townCity}</p>
                <p>{order.billingDetails.stateCounty}</p>
                <p>{order.billingDetails.postcodeZip}</p>
                <p>{order.billingDetails.country}</p>
                <p className="flex items-center gap-2">
                  <span className="inline-block">📞</span>
                  {order.billingDetails.phoneNumber}
                </p>
                <p className="flex items-center gap-2">
                  <span className="inline-block">✉️</span>
                  {order.billingDetails.emailAddress}
                </p>
              </>
            ) : (
              <p>No billing details available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
