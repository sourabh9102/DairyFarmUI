import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { SideBarNav } from "../UserProfile/UserProfile";
import { useEffect, useState } from "react";
import axios from "axios";
import { selectUserDetails } from "../Counter/userDetailsSlice";
import Invoice from "../OrderSummary/Invoice";
import { Link } from "react-router-dom";
import { IoMdPrint } from "react-icons/io";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function OrderHistory() {
  const userDetail = useSelector(selectUserDetails);
  const [orderDetails, setOrderDetails] = useState([]);
  const [selectedTrackingId, setSelectedTrackingId] = useState(null);
  const pdfRef = useRef();

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5001/auth/orderHistory",
          { userId: userDetail.id }
        );
        console.log("orderHistory", response.data.orderHistory);
        setOrderDetails(response.data.orderHistory);
      } catch (error) {
        console.error("Error fetching order history:", error);
      }
    };
    fetchOrderHistory();
  }, [userDetail.id]);

  const formatDate = (dateTime) => {
    const date = new Date(dateTime);
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-GB", options);
    return formattedDate;
  };

  const downloadInvoice = (trackingId) => {
    setSelectedTrackingId(trackingId);
    setTimeout(() => {
      const input = pdfRef.current;
      if (!input) {
        console.error("Invoice component ref not found");
        return;
      }
      const width = 1000;
      const height = 1200;
      html2canvas(input, { width, height }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const doc = new jsPDF("p", "mm", "a4", true);
        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = doc.internal.pageSize.getHeight();
        const aspectRatio = canvas.width / canvas.height;
        const imageWidth = pdfWidth;
        const imageHeight = pdfWidth / aspectRatio;
        const imageX = 0;
        const imageY = 0;
        doc.addImage(imgData, "PNG", imageX, imageY, imageWidth, imageHeight);
        doc.save("invoice.pdf");
        setSelectedTrackingId(null);
      });
    }, 1000);
  };

  return (
    <div className="bg-white">
      <SideBarNav />
      <div className="lg:pl-64 flex flex-col flex-1">
        <main className="flex-1 pb-8">
          <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:pb-24 lg:px-8">
            <div className="max-w-xl">
              <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                Order history
              </h1>
              <p className="mt-2 text-sm text-gray-500">
                Check the status of recent orders, manage returns, and download
                invoices.
              </p>
            </div>

            <div className="mt-16">
              <h2 className="sr-only">Recent orders</h2>

              <div className="space-y-20">
                {orderDetails?.map((order, index) => {
                  const showHeader =
                    index === 0 ||
                    order.trackingId !== orderDetails[index - 1].trackingId;

                  const ordersWithSameTrackingId = orderDetails.filter(
                    (item) => item.trackingId === order.trackingId
                  );
                  const totalAmount = ordersWithSameTrackingId.reduce(
                    (acc, curr) => acc + curr.total,
                    0
                  );

                  return (
                    <div key={order.number}>
                      {/* Display header only once for orders with the same trackingId */}
                      {showHeader && (
                        <div className="bg-gray-50 rounded-lg py-6 px-4 sm:px-6 sm:flex sm:items-center sm:justify-between sm:space-x-6 lg:space-x-8">
                          <dl className="divide-y divide-gray-200 space-y-6 text-sm text-gray-600 flex-auto sm:divide-y-0 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-x-6 lg:w-1/2 lg:flex-none lg:gap-x-8">
                            <div className="flex justify-between sm:block">
                              <dt className="font-medium text-gray-900">
                                Date placed
                              </dt>
                              <dd className="sm:mt-1">
                                <time dateTime={order.dateTime}>
                                  {formatDate(order.dateTime)}
                                </time>
                              </dd>
                            </div>

                            <div className="flex justify-between pt-6 sm:block sm:pt-0">
                              <dt className="font-medium text-gray-900">
                                Order number
                              </dt>
                              <dd className="sm:mt-1">{order.orderId}</dd>
                            </div>
                            <div className="flex justify-between pt-6 font-medium text-gray-900 sm:block sm:pt-0">
                              <dt>Total amount</dt>
                              <dd className="sm:mt-1">{totalAmount}</dd>
                            </div>
                          </dl>
                          <div className="flex sm:items-baseline sm:space-x-4 mt-5">
                            <button
                              onClick={() => downloadInvoice(order.trackingId)}
                              className="w-full flex items-center justify-center bg-white mt-6 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto sm:mt-0"
                            >
                              View invoice
                              <span aria-hidden="true"> &rarr;</span>
                            </button>
                          </div>
                          {selectedTrackingId === order.trackingId && (
                            <div
                              id={`invoice-${order.trackingId}`}
                              className="rounded-lg border border-gray-500 p-4 mt-4"
                            >
                              <Invoice
                                pdfRef={pdfRef}
                                trackingId={selectedTrackingId}
                              />
                            </div>
                          )}
                        </div>
                      )}

                      {/* Display products for the current trackingId */}
                      <div className="rounded-lg border border-gray-500 p-4 mt-4">
                        <table className="w-full text-gray-500">
                          <caption className="sr-only">Products</caption>
                          <thead className="sr-only text-sm font-medium text-gray-900 text-left sm:not-sr-only">
                            <tr>
                              <th
                                scope="col"
                                className="sm:w-2/5 lg:w-1/3 pr-8 py-3 font-normal"
                              >
                                Product
                              </th>
                              <th
                                scope="col"
                                className="hidden w-1/5 pr-8 py-3 font-normal sm:table-cell"
                              >
                                Price
                              </th>
                              <th
                                scope="col"
                                className="hidden pr-8 py-3 font-normal sm:table-cell"
                              >
                                Quantity
                              </th>
                              <th
                                scope="col"
                                className="hidden pr-8 py-3 font-normal sm:table-cell"
                              >
                                Status
                              </th>
                              <th
                                scope="col"
                                className="w-0 py-3 font-normal text-right"
                              >
                                Info
                              </th>
                            </tr>
                          </thead>
                          <tbody className="border-b border-gray-300 divide-y divide-gray-200 text-sm sm:border-t">
                            <tr>
                              <td className="py-6 pr-8">
                                <div className="flex items-center">
                                  <img
                                    src={order.Product.imageSrc}
                                    alt={order.Product.name}
                                    className="w-16 h-16 object-center object-cover rounded mr-6"
                                  />
                                  <div>
                                    <div className="font-medium text-gray-700">
                                      {order.Product.name}
                                    </div>
                                    <div className="mt-1 sm:hidden">
                                      {order.Product.price}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="hidden py-6 pr-8 sm:table-cell">
                                {order.Product.price}
                              </td>
                              <td className="hidden py-6 pr-8 sm:table-cell">
                                {order.quantity}
                              </td>
                              <td className="hidden py-6 pr-8 sm:table-cell">
                                {order.status}
                              </td>
                              <td className="py-6 font-medium text-right whitespace-nowrap">
                                <Link
                                  to={`/productOverview/${order.Product.id}`}
                                  className="text-indigo-600"
                                >
                                  View
                                  <span className="hidden lg:inline">
                                    {" "}
                                    Product
                                  </span>
                                  <span className="sr-only">
                                    , {order.Product.name}
                                  </span>
                                </Link>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
