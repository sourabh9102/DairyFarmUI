import React from "react";
import { PDFViewer } from "@react-pdf/renderer";

export default function Invoice({
  orderDetail,
  productDataDetail,
  billingAddress,
  sums,
}) {
  return (
    <PDFViewer style={{ width: "100%", height: "100vh" }}>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gray-800 text-white py-4 px-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold">Dairy Delight</h1>
            <p>123 Street Name, City, Country</p>
            <p>Phone: +1234567890</p>
            <p>Email: info@example.com</p>
          </div>
          <div>
            <img src="/logo.png" alt="Company Logo" className="h-12" />
          </div>
        </div>

        {/* Customer information */}
        <div className="py-4 px-6">
          <h2 className="text-lg font-semibold">Billing Address</h2>
          <p>
            {billingAddress.fname} {billingAddress.lname}
          </p>
          <p>{billingAddress.address}</p>
          <p>{billingAddress.email}</p>
          {/* Add any additional customer details */}
        </div>

        {/* Order details */}
        <div className="border-t border-gray-200">
          <h2 className="px-6 py-4 bg-gray-100 font-semibold">Order Details</h2>
          {productDataDetail.map((product, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-2 px-6 border-b border-gray-200"
            >
              <div>
                <p className="text-lg font-semibold">{product.name}</p>
                <p>Quantity: {product.quantity}</p>
                {/* Add any additional product details */}
              </div>
              <div>
                <p className="text-lg font-semibold">₹{product.price}</p>
              </div>
            </div>
          ))}
          {/* Total amount */}
          <div className="flex items-center justify-between py-2 px-6">
            <p className="font-semibold">Subtotal:</p>
            <p>₹{sums.totalSubtotal}</p>
          </div>
          <div className="flex items-center justify-between py-2 px-6">
            <p className="font-semibold">Shipping:</p>
            <p>₹{sums.totalShippingCost}</p>
          </div>
          <div className="flex items-center justify-between py-2 px-6">
            <p className="font-semibold">Tax:</p>
            <p>₹{sums.totalTax}</p>
          </div>
          <div className="flex items-center justify-between py-2 px-6">
            <p className="font-semibold">Total:</p>
            <p className="text-indigo-600">₹{sums.totalTotal}</p>
          </div>
        </div>

        {/* Payment information */}
        <div className="py-4 px-6">
          <h2 className="text-lg font-semibold">Payment Information</h2>
          <p>Payment method: {orderDetail[0].paymentMethod}</p>
          {/* Add any additional payment details */}
        </div>

        {/* Footer */}
        <div className="bg-gray-800 text-white py-4 px-6 text-center">
          <p>Thank you for your purchase!</p>
        </div>
      </div>
    </PDFViewer>
  );
}
