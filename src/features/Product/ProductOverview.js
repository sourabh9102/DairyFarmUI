import { Disclosure, Tab } from "@headlessui/react";
import { CiStar, CiHeart } from "react-icons/ci";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FiMinus, FiPlus } from "react-icons/fi";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAllProductByIdAsync, selectProductById } from "./productSlice";
import { Rating, Stack } from "@mui/material";
import axios from "axios";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductOverview() {
  const dispatch = useDispatch();
  const params = useParams();
  const product = useSelector(selectProductById);
  const [productImages, setProductImages] = useState([]);
  const [isProductLoaded, setIsProductLoaded] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchAllProductByIdAsync(params.productId.toString()));
  }, [dispatch, params.productId]);

  useEffect(() => {
    if (product && product.length > 0) {
      setIsProductLoaded(true);
    }

    axios
      .get(`http://localhost:5001/auth/productImages/${params.productId}`)
      .then((res) => {
        if (res.data.success) {
          const imagePaths = res.data.images.map(
            (imageObject) => imageObject.image
          );
          setProductImages(imagePaths);
          setSelectedImageIndex(0);
        }
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  }, [params.productId, product]);

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  if (!isProductLoaded) {
    return <div>Loading...</div>;
  }

  const largeImageSrc = `http://localhost:3000/${productImages[
    selectedImageIndex
  ].replace(/^\.\.\//, "")}`;

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="lg:flex lg:items-start lg:space-x-5">
          {/* Large Image */}
          {productImages.length > 0 && (
            <div className="lg:w-2/3 lg:mr-8 relative mb-5">
              <img
                src={largeImageSrc}
                alt={`Product Image ${selectedImageIndex + 1}`}
                className="w-full h-full object-center object-cover rounded-lg mb-6 sm:mb-0"
              />

              {/* Image gallery (conditionally rendered for screen size) */}
              <div className="hidden md:flex md:flex-row gap-4 mt-4 mb-5 overflow-x-auto">
                {productImages.map((image, index) => (
                  <img
                    key={index}
                    onClick={() => handleImageClick(index)}
                    src={`http://localhost:3000/${image.replace(
                      /^\.\.\//,
                      ""
                    )}`}
                    alt={`Product Image ${index + 1}`}
                    className={`h-24 w-full object-cover rounded cursor-pointer ${
                      selectedImageIndex === index
                        ? "border-2 border-indigo-500"
                        : ""
                    }`}
                    style={{ flexBasis: `calc(25% - 8px)` }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Product info */}
          <div className="lg:w-1/3">
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
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-2 sm:grid-cols-2 ">
                <button
                  type="button"
                  className="w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                >
                  <AiOutlineShoppingCart
                    className="h-6 w-6 flex-shrink-0 mr-2"
                    aria-hidden="true"
                  />{" "}
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
                  Add to Wishlist
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
