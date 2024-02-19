import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import {
  selectBillAddress,
  selectOrderDetails,
  selectProductDataDetails,
  selectSums,
} from "../OrderDetails/orderDetailsSlice";
import { useSelector } from "react-redux";
// import logo from "../../images/001.jpg";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const Invoice = (ref) => {
  const orderDetail = useSelector(selectOrderDetails);
  const productDataDetail = useSelector(selectProductDataDetails);
  const billingAddress = useSelector(selectBillAddress);
  const sums = useSelector(selectSums);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            {/* Header */}
            <div className="bg-gray-800 text-white py-4 px-6 flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-semibold">Dairy Delight</h1>
                <p>123 Street Name, City, Country</p>
                <p>Phone: +1234567890</p>
                <p>Email: info@example.com</p>
              </div>
              {/* <div>
                <img src={logo} alt="Company Logo" className="h-12" />
              </div> */}
            </div>

            {/* Customer information */}
            <div className="py-4 px-6">
              <h2 className="text-lg font-semibold">Billing Address</h2>
              <p>
                {billingAddress[0].fname} {billingAddress[0].lname}
              </p>
              <p>{billingAddress[0].address}</p>
              <p>{billingAddress[0].email}</p>
              {/* Add any additional customer details */}
            </div>

            {/* Order details */}
            <div className="border-t border-gray-200">
              <h1 className="text-2xl px-6 py-4 bg-gray-100 font-semibold">
                Order Details
              </h1>
              {productDataDetail?.map((product, index) => (
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
                <p>₹{sums?.totalSubtotal}</p>
              </div>
              <div className="flex items-center justify-between py-2 px-6">
                <p className="font-semibold">Shipping:</p>
                <p>₹{sums?.totalShippingCost}</p>
              </div>
              <div className="flex items-center justify-between py-2 px-6">
                <p className="font-semibold">Tax:</p>
                <p>₹{sums?.totalTax}</p>
              </div>
              <div className="flex items-center justify-between py-2 px-6">
                <p className="font-semibold">Total:</p>
                <p className="text-indigo-600">₹{sums?.totalTotal}</p>
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
        </View>
      </Page>
    </Document>
  );
};

export default Invoice;
