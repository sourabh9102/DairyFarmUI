import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import cartProductSlice, {
  selectCartProduct,
  setAddToCart,
  removeItem,
  updateProductQuantity,
  setIncrementItem,
  setDecrementItem,
} from "./cartProductSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Cart() {
  const [open, setOpen] = useState(true);
  const selectCartProductSlice = useSelector(selectCartProduct);
  const products = useSelector(selectCartProduct).flat();
  // console.log("products redux", products);
  const [subtotal, setSubtotal] = useState(calculateSubtotal());
  const dispatch = useDispatch();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart_product")) || [];
    if (!storedCart) {
      localStorage.setItem("cart_product", JSON.stringify([]));
    }
    // console.log("storedCart", storedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart_product", JSON.stringify(products));
    setSubtotal(calculateSubtotal(products));
  }, [products]);

  function calculateSubtotal(products) {
    return products?.reduce(
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

  return (
    <>
      <div>
        <div className="mx-auto bg-white max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
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
                        <div className="text-gray-500 flex">
                          <label
                            htmlFor={`counter-input-${product.id}`}
                            className="inline text-sm mr-5 font-medium text-gray-900"
                          >
                            Qty
                          </label>
                          <form className=" mx-auto">
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
                                className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5"
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
            <div className="flex justify-between text-base font-medium text-gray-900 my-2">
              <p>Subtotal</p>
              <p>₹ {subtotal}</p>
            </div>
            <div className="flex justify-between text-base font-medium text-gray-900 my-2">
              <p>Total items</p>
              <p>{products.length} items</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="mt-6">
              <Link
                to="/checkout"
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Checkout
              </Link>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                or
                <Link to="/">
                  <button
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                    onClick={() => setOpen(false)}
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
    </>
  );
}
