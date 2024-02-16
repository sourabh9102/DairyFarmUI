import { useDispatch, useSelector } from "react-redux";
import { selectCartProduct } from "../Cart/cartProductSlice";
import {
  selectBillAddress,
  selectOrderDetails,
  selectProductDataDetails,
  selectSums,
} from "../OrderDetails/orderDetailsSlice";
import { SideBarNav } from "../UserProfile/UserProfile";
import { Link } from "react-router-dom";
import Invoice from "./Invoice";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function OrderSummary() {
  const orderDetail = useSelector(selectOrderDetails);
  const productDataDetail = useSelector(selectProductDataDetails);
  const billingAddress = useSelector(selectBillAddress);
  const sums = useSelector(selectSums);

  const dispatch = useDispatch();

  const combinedData = orderDetail.map((order, index) => ({
    orderDetail: order,
    productDetail: productDataDetail[index],
    billingAddress: billingAddress[index],
    sums: sums,
  }));

  return (
    <div className="bg-gray-50">
      <SideBarNav />
      <div className="lg:pl-64 flex flex-col flex-1">
        <main className="flex-1 pb-8">
          <div className="max-w-2xl mx-auto sm:py-14 sm:px-6 lg:max-w-7xl lg:px-8">
            <Invoice
              orderDetail={orderDetail}
              productDataDetail={productDataDetail}
              billingAddress={billingAddress}
              sums={sums}
            />
            <div className="px-4 space-y-4 sm:px-0 sm:items-baseline sm:justify-between sm:space-y-0">
              <h1 className="mb-2 text-sm font-semibold uppercase tracking-wide text-indigo-600">
                Thank you!
              </h1>
              <p className="mt-2 pb-2 text-3xl font-extrabold tracking-tight sm:text-5xl">
                It's on the way!
              </p>
              <p className="mt-2 pb-2 text-base text-gray-500">
                Your order {orderDetail[0].trackingId} has shipped and will be
                with you soon.
              </p>
              <div className="flex sm:items-baseline sm:space-x-4 mt-5">
                <Link
                  to="#"
                  className="hidden text-sm font-medium text-indigo-600 hover:text-indigo-500 sm:block"
                >
                  View invoice<span aria-hidden="true"> &rarr;</span>
                </Link>
              </div>
              <p className="pt-2 text-sm text-gray-600">
                Order placed{" "}
                <time
                  dateTime="2021-03-22"
                  className="font-medium text-gray-900"
                >
                  {orderDetail[0].dateTime}
                </time>
              </p>
              <Link
                to="#"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500 sm:hidden"
              >
                View invoice<span aria-hidden="true"> &rarr;</span>
              </Link>
            </div>

            {/* Products */}
            <div className="mt-6">
              <h2 className="sr-only">Products purchased</h2>
              {combinedData.map((data, index) => (
                <div key={index} className="space-y-8">
                  <div className="bg-white border-t border-b border-gray-200 shadow-sm sm:border sm:rounded-lg">
                    <div className="py-6 px-4 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:p-8">
                      <div key={index} className="sm:flex lg:col-span-7">
                        <div className="flex-shrink-0 w-full aspect-w-1 aspect-h-1 rounded-lg overflow-hidden sm:aspect-none sm:w-40 sm:h-40">
                          <img
                            src={data.productDetail.imageSrc}
                            alt={data.productDetail.imageAlt}
                            className="w-full h-full object-center object-cover sm:w-full sm:h-full"
                          />
                        </div>

                        <div className="mt-6 sm:mt-0 sm:ml-6">
                          <h3 className="text-base font-medium text-gray-900">
                            {data.productDetail.name}
                          </h3>
                          <p className="mt-2 text-sm font-medium text-gray-900">
                            ₹ {data.productDetail.price}
                          </p>
                          <p className="mt-2 text-sm font-medium text-gray-500">
                            Qty - {data.productDetail.quantity}
                          </p>
                          <p className="mt-3 text-sm text-gray-500">
                            {data.productDetail.description}
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 lg:mt-0 lg:col-span-5">
                        <dl
                          key={index}
                          className="grid grid-cols-2 gap-x-6 text-sm"
                        >
                          <div>
                            <dt className="font-medium text-gray-900">
                              Delivery address
                            </dt>
                            <dd className="mt-3 text-gray-500">
                              <span className="block">
                                {data.billingAddress.fname}{" "}
                                {data.billingAddress.lname}
                              </span>
                              <span className="block">
                                {data.billingAddress.address}
                              </span>
                              {/* <span className="block">
                                {product.address[2]}
                              </span> */}
                            </dd>
                          </div>
                          <div>
                            <dt className="font-medium text-gray-900">
                              Shipping updates
                            </dt>
                            <dd className="mt-3 text-gray-500 space-y-3">
                              <p>{data.billingAddress.email}</p>
                              <p>{data.billingAddress.phone}</p>
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 py-6 px-4 sm:px-6 lg:p-8">
                      <div key={index}>
                        <h4 className="sr-only">Status</h4>
                        <p className="text-sm font-medium text-gray-900">
                          {data.orderDetail.status} on{" "}
                          <time dateTime={data.orderDetail.dateTime}>
                            {data.orderDetail.dateTime}
                          </time>
                        </p>
                        <div className="mt-6" aria-hidden="true">
                          <div className="bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-2 rounded-full"
                              style={{
                                width: (() => {
                                  switch (data.orderDetail.status) {
                                    case "Placed":
                                      return `${(1 / 4) * 100}%`;
                                    case "Processing":
                                      return `${(2 / 4) * 100}%`;
                                    case "Shipped":
                                      return `${(3 / 4) * 100}%`;
                                    case "Delivered":
                                      return "100%";
                                    default:
                                      return "0%";
                                  }
                                })(),
                                backgroundColor: "rgb(57, 73, 171)",
                              }}
                            />
                          </div>
                          <div className="hidden sm:grid grid-cols-4 text-sm font-medium text-gray-600 mt-6">
                            <div className="text-center">Order placed</div>
                            <div className="text-center">Processing</div>
                            <div className="text-center">Shipped</div>
                            <div className="text-right">Delivered</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Billing */}
            <div className="mt-16">
              <h2 className="sr-only">Billing Summary</h2>
              <div className="bg-gray-100 py-6 px-4 sm:px-6 sm:rounded-lg lg:px-8 lg:py-8 lg:grid lg:grid-cols-12 lg:gap-x-8">
                <dl className="grid grid-cols-2 gap-6 text-sm sm:grid-cols-2 md:gap-x-8 lg:col-span-7">
                  <div>
                    <dt className="font-medium text-gray-900">
                      Billing address
                    </dt>
                    <dd className="mt-3 text-gray-500">
                      <span className="block">
                        {billingAddress[0].fname} {billingAddress[0].lname}
                      </span>
                      <span className="block">
                        {orderDetail[0].billingAddress}
                      </span>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-900">
                      Payment Information
                    </dt>
                    <dd className="mt-2 space-y-2 sm:flex sm:space-y-0 sm:space-x-4">
                      {orderDetail[0].paymentMethod === "cash" ? (
                        <div className="flex-none">Cash on delivery</div>
                      ) : (
                        <div className="flex-auto">
                          <p className="text-gray-900">Ending with 4242</p>
                          <p>Expires 12 / 21</p>
                        </div>
                      )}
                    </dd>
                  </div>
                </dl>

                <dl className="mt-8 divide-y divide-gray-200 text-sm lg:mt-0 lg:col-span-5">
                  <div className="pb-4 flex items-center justify-between">
                    <dt className="text-gray-600">Subtotal</dt>
                    <dd className="font-medium text-gray-900">
                      ₹ {sums.totalSubtotal}
                    </dd>
                  </div>
                  <div className="py-4 flex items-center justify-between">
                    <dt className="text-gray-600">Shipping</dt>
                    <dd className="font-medium text-gray-900">
                      ₹ {sums.totalShippingCost}
                    </dd>
                  </div>
                  <div className="py-4 flex items-center justify-between">
                    <dt className="text-gray-600">Tax</dt>
                    <dd className="font-medium text-gray-900">
                      ₹ {sums.totalTax}
                    </dd>
                  </div>
                  <div className="pt-4 flex items-center justify-between">
                    <dt className="font-medium text-gray-900">Order total</dt>
                    <dd className="font-medium text-indigo-600">
                      ₹ {sums.totalTotal}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
