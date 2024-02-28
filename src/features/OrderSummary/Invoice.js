import React, { forwardRef, useEffect, useState } from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import {
  selectBillAddress,
  selectOrderDetails,
  selectProductDataDetails,
  selectSums,
} from "../OrderDetails/orderDetailsSlice";
import { useDispatch, useSelector } from "react-redux";
import { SideBarNav } from "../UserProfile/UserProfile";
import axios from "axios";
import { selectUserDetails } from "../Counter/userDetailsSlice";

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

const Invoice = forwardRef((props, ref) => {
  const { trackingId, pdfRef } = props;
  console.log("trackingId invoice me", trackingId);
  const userDetail = useSelector(selectUserDetails);
  const billingAddress = useSelector(selectBillAddress);
  const sums = useSelector(selectSums);
  const dispatch = useDispatch();
  const [orderDetails, setOrderDetails] = useState([]);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5001/auth/orderHistory",
          {
            userId: userDetail.id,
          }
        );
        setOrderDetails(response.data.orderHistory);
      } catch (error) {
        console.error("Error fetching order history:", error);
      }
    };

    fetchOrderHistory();
  }, [trackingId, userDetail.id]);

  const filteredOrderDetails = orderDetails.filter(
    (order) => order.trackingId === trackingId
  );

  console.log("filteredOrderDetails", filteredOrderDetails);

  return (
    <>
      <div ref={pdfRef}>
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.section}>
              {filteredOrderDetails?.map((order) => (
                <div
                  key={order.orderId}
                  className="lg:pl-64 bg-white shadow-md rounded-lg overflow-hidden"
                >
                  {/* Header */}
                  <div className="bg-gray-800 text-white py-4 px-6 flex justify-between items-center mt-48">
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
                    {/* <p>
                    {billingAddress[0].fname} {billingAddress[0].lname}
                  </p>
                  <p>{billingAddress[0].address}</p>
                  <p>{billingAddress[0].email}</p> */}
                  </div>

                  {/* Order details */}
                  <div className="border-t border-gray-200">
                    <h1 className="text-2xl px-6 py-4 bg-gray-100 font-semibold">
                      Order Details
                    </h1>
                    {filteredOrderDetails.map((order, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between py-2 px-6 border-b border-gray-200"
                      >
                        <div>
                          <p className="text-lg font-semibold">
                            {order.Product.name}
                          </p>
                          <p>Quantity: {order.quantity}</p>
                        </div>
                        <div>
                          <p className="text-lg font-semibold">
                            ₹{order.total}
                          </p>
                        </div>
                      </div>
                    ))}

                    {/* Total amount */}
                    <div className="flex items-center justify-between py-2 px-6">
                      <p className="font-semibold">Subtotal:</p>
                      <p>
                        ₹
                        {filteredOrderDetails.reduce(
                          (total, order) => total + order.subtotal,
                          0
                        )}
                      </p>
                    </div>
                    <div className="flex items-center justify-between py-2 px-6">
                      <p className="font-semibold">Shipping:</p>
                      <p>
                        ₹
                        {filteredOrderDetails.reduce(
                          (total, order) => total + order.shippingCost,
                          0
                        )}{" "}
                      </p>
                    </div>
                    <div className="flex items-center justify-between py-2 px-6">
                      <p className="font-semibold">Tax:</p>
                      <p>
                        ₹
                        {filteredOrderDetails.reduce(
                          (total, order) => total + order.tax,
                          0
                        )}
                      </p>
                    </div>
                    <div className="flex items-center justify-between py-2 px-6">
                      <p className="font-semibold">Total:</p>
                      <p className="text-indigo-600">
                        ₹
                        {filteredOrderDetails.reduce(
                          (total, order) => total + order.total,
                          0
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Payment information */}
                  <div className="py-4 px-6">
                    <h2 className="text-lg font-semibold">
                      Payment Information
                    </h2>
                    <p>Payment method: {order.paymentMethod}</p>
                  </div>

                  {/* Footer */}
                  <div className="bg-gray-800 text-white py-4 px-6 text-center mb-48">
                    <p>Thank you for your purchase!</p>
                  </div>
                </div>
              ))}
            </View>
          </Page>
          <style>{`@media print {.sidebar-nav { display: none !important;}}`}</style>
        </Document>
      </div>
    </>
  );
});

export default Invoice;
