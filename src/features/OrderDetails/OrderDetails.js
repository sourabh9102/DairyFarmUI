import { useDispatch, useSelector } from "react-redux";
import {
  removeItem,
  selectCartProduct,
  setDecrementItem,
  setIncrementItem,
} from "../Cart/cartProductSlice";
import { Link } from "react-router-dom";
import {
  selectBillAddress,
  selectOrderDetails,
  selectProductDataDetails,
  selectSums,
} from "./orderDetailsSlice";

export default function OrderDetails() {
  const products = useSelector(selectCartProduct);
  const orderDetail = useSelector(selectOrderDetails);
  const productDataDetail = useSelector(selectProductDataDetails);
  const billingAddress = useSelector(selectBillAddress);
  const sums = useSelector(selectSums);
  // console.log("sums in order detail", sums);
  // console.log("orderDetails", orderDetail);
  // console.log("productDataDetails", productDataDetail);
  // console.log()

  const dispatch = useDispatch();

  return (
    <>
      <main className="relative lg:min-h-full">
        <div>
          <div className="max-w-2xl mx-auto py-10 px-4 sm:px-6 sm:py-18 lg:max-w-7xl lg:px-8 lg:py-16 lg:gap-x-8 xl:gap-x-24">
            <div className="lg:col-start-2">
              <h1 className="text-sm font-medium text-indigo-600">
                Payment successful
              </h1>
              <p className="mt-2 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                Thanks for ordering
              </p>
              <p className="mt-2 text-base text-gray-500">
                We appreciate your order, we’re currently processing it. So hang
                tight and we’ll send you confirmation very soon!
              </p>

              <dl className="mt-16 text-sm font-medium">
                <dt className="text-gray-900">Tracking number</dt>
                <dd className="mt-2 text-indigo-600">
                  {orderDetail[0].trackingId}
                </dd>
              </dl>

              <ul
                role="list"
                className="mt-5 border-t divide-y divide-gray-200"
              >
                {products?.map((product) => (
                  <li key={product.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={product.imageSrc}
                        alt={product.imageAlt}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>{product.name}</h3>
                          <p className="ml-4">
                            ₹ {product.price * product.quantity}
                          </p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {product.type}
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="text-gray-900 flex">
                          <label
                            htmlFor={`counter-input-${product.id}`}
                            className="inline text-sm font-medium text-gray-900"
                          >
                            Qty
                          </label>
                          <span className="ml-2 mr-2">-</span>
                          <span>{product.quantity}</span>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <dl className="text-sm font-medium text-gray-500 space-y-6 border-t border-gray-200 pt-6">
                <div className="flex justify-between">
                  <dt>Subtotal</dt>
                  <dd className="text-gray-900">₹ {sums.totalSubtotal}</dd>
                </div>

                <div className="flex justify-between">
                  <dt>Shipping</dt>
                  <dd className="text-gray-900">₹ {sums.totalShippingCost}</dd>
                </div>

                <div className="flex justify-between">
                  <dt>Taxes</dt>
                  <dd className="text-gray-900">₹ {sums.totalTax}</dd>
                </div>

                <div className="flex items-center justify-between border-t border-gray-200 text-gray-900 pt-6">
                  <dt className="text-base">Total</dt>
                  <dd className="text-base">₹ {sums.totalTotal}</dd>
                </div>
              </dl>

              <dl className="mt-16 grid grid-cols-2 gap-x-4 text-sm text-gray-600">
                <div>
                  <dt className="font-medium text-gray-900">
                    Shipping Address
                  </dt>
                  <dd className="mt-2">
                    <address className="not-italic">
                      <span className="block">
                        {billingAddress[0].fname} {billingAddress[0].lname}
                      </span>
                      <span className="block">
                        {orderDetail[0].billingAddress}
                      </span>
                    </address>
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

              <div className="mt-16 border-t border-gray-200 py-6 text-right">
                <Link to="/">
                  <button
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    &nbsp; Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
