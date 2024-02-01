import { Disclosure, Tab } from "@headlessui/react";
import { CiStar, CiHeart } from "react-icons/ci";
import { FiMinus, FiPlus } from "react-icons/fi";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAllProductByIdAsync, selectProductById } from "./productSlice";
import imga from "../../images/01.jpg";
import { Rating, Stack } from "@mui/material";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductOverview() {
  const dispatch = useDispatch();
  const params = useParams();
  const product = useSelector(selectProductById);
  console.log("here is product", product);
  const [isProductLoaded, setIsProductLoaded] = useState(false);

  useEffect(() => {
    dispatch(fetchAllProductByIdAsync(params.productId.toString()));
  }, [dispatch, params.productId]);

  useEffect(() => {
    if (product && product.length > 0) {
      console.log("Product Data:", product);
      console.log("Product Name:", product[0].name);
      console.log("Product Price:", product[0].price);
      console.log("img", product[0].imageSrc);
      console.log(
        "Product image path:",
        `http://localhost:3000${product[0].imageSrc.replace(/^\.\.\//, "/")}`
      );
      setIsProductLoaded(true);
    }
  }, [product]);

  if (!isProductLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          {/* Image gallery */}
          <Tab.Group as="div" className="flex flex-col-reverse">
            {/* Image selector */}
            <div className="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
              <Tab.List className="grid grid-cols-4 gap-6">
                {product[0].imageSrc && (
                  <Tab
                    key={product[0].id}
                    className="relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50"
                  >
                    {({ selected }) => (
                      <>
                        <span className="sr-only">{product[0].name}</span>
                        <span className="absolute inset-0 rounded-md overflow-hidden">
                          <img
                            src={`http://localhost:3000${product[0].imageSrc.replace(
                              /^\.\.\//,
                              "/"
                            )}`}
                            alt={product[0].imageAlt}
                            className="w-full h-full object-center object-cover"
                          />
                        </span>
                        <span
                          className={classNames(
                            selected ? "ring-indigo-500" : "ring-transparent",
                            "absolute inset-0 rounded-md ring-2 ring-offset-2 pointer-events-none"
                          )}
                          aria-hidden="true"
                        />
                      </>
                    )}
                  </Tab>
                )}
              </Tab.List>
            </div>

            <Tab.Panels className="w-full aspect-w-1 aspect-h-1">
              {product[0].imageSrc && (
                <Tab.Panel key={product[0].id}>
                  <img
                    src={imga}
                    alt={product[0].imageAlt}
                    className="w-full h-full object-center object-cover sm:rounded-lg"
                  />
                </Tab.Panel>
              )}
            </Tab.Panels>
          </Tab.Group>

          {/* Product info */}
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
              {product[0].name}
            </h1>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-2xl text-gray-900">₹ {product[0].price}</p>
            </div>

            {/* Reviews */}
            <div className="mt-3">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                {product[0].rating && (
                  <Stack spacing={1}>
                    <Rating
                      name="half-rating-read"
                      defaultValue={product[0].rating}
                      precision={0.5}
                      readOnly
                      size="small"
                    />
                  </Stack>
                )}
              </div>
            </div>

            <form className="mt-6">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                <button
                  type="button"
                  className="w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                >
                  Add to Cart
                </button>
                <button
                  type="button"
                  className="w-full bg-indigo-50 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-indigo-700 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                >
                  <CiHeart
                    className="h-6 w-6 flex-shrink-0"
                    aria-hidden="true"
                  />
                  {"  "} Add to Wishlist
                </button>
              </div>
            </form>

            <section aria-labelledby="details-heading" className="mt-12">
              <h2 id="details-heading" className="sr-only">
                Additional details
              </h2>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
