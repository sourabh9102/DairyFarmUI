import { useSelector } from "react-redux";
import { SideBarNav } from "../UserProfile/UserProfile";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import ReactToPrint from "react-to-print";
import { selectUserDetails } from "../Counter/userDetailsSlice";
import Invoice from "../OrderSummary/Invoice";
import { Link } from "react-router-dom";

export default function OrderHistory() {
  const userDetail = useSelector(selectUserDetails);
  const [orderDetails, setOrderDetails] = useState([]);
  const componentRef = useRef();
  const handlePrint = () => {
    window.print();
  };

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
        setLoading(false);
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
                {orderDetails?.map((order) => (
                  <div key={order.number}>
                    <h3 className="sr-only">
                      Order placed on{" "}
                      <time dateTime={order.dateTime}>{order.dateTime}</time>
                    </h3>

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
                          <dd className="sm:mt-1">{order.total}</dd>
                        </div>
                      </dl>
                      <div className="flex sm:items-baseline sm:space-x-4 mt-5">
                        <ReactToPrint
                          trigger={() => (
                            <button
                              onClick={() => {
                                const invoiceElement =
                                  document.getElementById("invoice");
                                if (invoiceElement) {
                                  invoiceElement.classList.toggle("hidden");
                                }
                              }}
                              className="w-full flex items-center justify-center bg-white mt-6 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto sm:mt-0"
                            >
                              View invoice
                              <span aria-hidden="true"> &rarr;</span>
                            </button>
                          )}
                          content={() => componentRef.current}
                        />
                      </div>
                      <div id="invoice" className="hidden" ref={componentRef}>
                        <Invoice />
                      </div>
                    </div>

                    <table className="mt-4 w-full text-gray-500 sm:mt-6">
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
                      <tbody className="border-b border-gray-200 divide-y divide-gray-200 text-sm sm:border-t">
                        <tr>
                          <td className="py-6 pr-8">
                            <div className="flex items-center">
                              <img
                                src={order.Product.imageSrc}
                                alt={order.Product.imageAlt}
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
                            {order.status}
                          </td>
                          <td className="py-6 font-medium text-right whitespace-nowrap">
                            <Link
                              to={`/productOverview/${order.Product.id}`}
                              className="text-indigo-600"
                            >
                              View
                              <span className="hidden lg:inline"> Product</span>
                              <span className="sr-only">
                                , {order.Product.name}
                              </span>
                            </Link>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
