import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  removeItem,
  selectCartProduct,
  setDecrementItem,
  setIncrementItem,
} from "../Cart/cartProductSlice";
import { selectUserDetails } from "../Counter/userDetailsSlice";
import axios from "axios";
import { addAddress, setAddresses } from "./checkoutAddressSlice";
import {
  setOrderDetails,
  setProductDataDetails,
} from "../OrderDetails/orderDetailsSlice";

export default function Checkout() {
  const products = useSelector(selectCartProduct);
  const [subTotal, setSubtotal] = useState(calculateSubtotal());
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    address: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addresses = useSelector((state) => state.address);
  // console.log("addresses resuc ka", addresses);

  const userDetail = useSelector(selectUserDetails);
  // console.log("userDetail", userDetail);

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cash");

  function calculateSubtotal() {
    return products.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  }

  function incrementCounter(productId) {
    dispatch(setIncrementItem({ productId }));
  }

  function decrementCounter(productId) {
    dispatch(setDecrementItem({ productId }));
  }

  const handleRemoveItem = (productId) => {
    dispatch(removeItem(productId));
  };

  const handleAddAddress = (e) => {
    e.preventDefault();
    const { id: userId } = userDetail;
    console.log("userId:", userId);
    console.log("formData:", formData);
    axios
      .post("http://localhost:5001/auth/address", { userId, formData })
      .then((res) => {
        if (res.data.success) {
          alert("Address added successfully.");
          dispatch(addAddress(res.data.data));
          setFormData({
            fname: "",
            lname: "",
            email: "",
            address: "",
          });
          navigate("/checkout");
        }
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleReset = () => {
    setFormData({
      fname: "",
      lname: "",
      email: "",
      address: "",
    });
  };

  const handleOrderDetails = () => {
    const { id: userId } = userDetail;

    const orderDataArray = products.map((product) => ({
      userId,
      id: product.id,
      paymentMethod,
      billingAddress: selectedAddress,
      quantity: product.quantity,
    }));

    // console.log("orderDataArray", orderDataArray);

    axios
      .post("http://localhost:5001/auth/order", { orderData: orderDataArray })
      .then((res) => {
        if (res.data.success) {
          const orderDetailsArray = res.data.orders;
          const billAddress = res.data.billedAddresses;
          const sums = res.data.sums;
          // console.log("orderDetailsArray", orderDetailsArray);
          // console.log("billAddress", billAddress);
          // console.log("sums", sums);
          orderDetailsArray.forEach((orderDetails, index) => {
            const billingAddress = billAddress[index];
            dispatch(
              setOrderDetails({
                order: orderDetails,
                billedAddress: billingAddress,
                sums: sums,
              })
            );
            dispatch(setProductDataDetails(products[index]));
          });
          navigate("/orderDetails");
        }
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };

  const handleSelectAddress = (address) => {
    setSelectedAddress(address);
  };

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart_product")) || [];
    if (!storedCart) {
      localStorage.setItem("cart_product", JSON.stringify([]));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart_product", JSON.stringify(products));
    setSubtotal(calculateSubtotal(products));
  }, [products]);

  useEffect(() => {
    const { id: userId } = userDetail;
    axios
      .post("http://localhost:5001/auth/showAddress", { userId })
      .then((res) => {
        if (res.data.success) {
          dispatch(setAddresses(res.data.data));
          localStorage.setItem("addresses", JSON.stringify(res.data.data));
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <div className="space-y-12">
            <form className="px-12 py-12" onSubmit={handleAddAddress}>
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-xl font-semibold leading-7 text-gray-900">
                  Personal Information
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Use a permanent address where you can receive mail.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      First name
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="fname"
                        autoComplete="given-name"
                        value={formData.fname}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Last name
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="lname"
                        autoComplete="family-name"
                        value={formData.lname}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="street-address"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Address
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="address"
                        autoComplete="street-address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    type="button"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={handleReset}
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Add Address
                  </button>
                </div>
              </div>
            </form>
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Addresses
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Choose from existing address
              </p>

              <ul role="list">
                {addresses.map((address) => (
                  <li
                    key={address.id}
                    className="rounded-md flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-300"
                  >
                    <div className="flex min-w-0 gap-x-4">
                      <input
                        name="selectedAddress"
                        type="radio"
                        onChange={() => handleSelectAddress(address)}
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">
                          {address.fname ? address.fname : userDetail.fname}{" "}
                        </p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                          {address.address
                            ? address.address
                            : userDetail.address}{" "}
                        </p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                          {address.pincode}{" "}
                        </p>
                      </div>
                    </div>
                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                      <p className="text-sm leading-6 text-gray-900">
                        Phone: {userDetail.phone}{" "}
                      </p>
                      <p className="text-sm leading-6 text-gray-900">
                        {userDetail.city}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-10 space-y-10">
                <fieldset>
                  <legend className="text-sm font-semibold leading-6 text-gray-900">
                    Payment Methods
                  </legend>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Choose One
                  </p>
                  <div className="mt-6 space-y-6">
                    <div className="flex items-center gap-x-3">
                      <input
                        id="cash"
                        name="payments"
                        type="radio"
                        checked={paymentMethod === "cash"}
                        onChange={() => setPaymentMethod("cash")}
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="cash"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Cash
                      </label>
                    </div>
                    <div className="flex items-center gap-x-3">
                      <input
                        id="card"
                        name="payments"
                        type="radio"
                        checked={paymentMethod === "card"}
                        onChange={() => setPaymentMethod("card")}
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="card"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        UPI / Net Banking
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="mx-auto bg-white max-w-3xl px-0 sm:px-0 lg:px-0">
            <div className="border-gray-200 px-4 py-6 sm:px-6">
              <h1 className="text-2xl my-5 font-bold tracking-tight text-gray-900">
                Cart
              </h1>
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {products.map((product) => (
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
                            <h3>
                              <Link to={product.href}>{product.name}</Link>
                            </h3>
                            <p className="ml-4">
                              ₹ {product.price * product.quantity}
                            </p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            {product.type}
                          </p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="text-gray-500 flex">
                            <label
                              htmlFor={`counter-input-${product.id}`}
                              className="inline text-sm mr-5 font-medium leading-8 text-gray-900"
                            >
                              Qty
                            </label>
                            <form className="mx-auto">
                              <div className="relative flex items-center">
                                <button
                                  type="button"
                                  id={`decrement-button-${product.id}`}
                                  className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5"
                                  onClick={() => decrementCounter(product.id)}
                                >
                                  -
                                </button>
                                <input
                                  type="text"
                                  id={`counter-input-${product.id}`}
                                  className="flex-shrink-0 text-gray-900 dark:text-white border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center"
                                  placeholder=""
                                  value={product.quantity}
                                  required
                                />
                                <button
                                  type="button"
                                  id={`increment-button-${product.id}`}
                                  className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                                  onClick={() => incrementCounter(product.id)}
                                >
                                  +
                                </button>
                              </div>
                            </form>
                          </div>
                          <div className="flex">
                            <button
                              type="button"
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                              onClick={() => handleRemoveItem(product.id)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>₹ {subTotal.toFixed(2)}</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">
                Shipping and taxes calculated at checkout.
              </p>
              <div className="mt-6">
                <Link
                  className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                  onClick={handleOrderDetails}
                >
                  Pay and Order
                </Link>
              </div>
              <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                <p>
                  or
                  <Link to="/">
                    <button
                      type="button"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      &nbsp; Continue Shopping
                      <span aria-hidden="true"> &rarr;</span>
                    </button>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
