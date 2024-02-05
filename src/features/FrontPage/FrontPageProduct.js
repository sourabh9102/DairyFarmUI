import React, { useState, Fragment, useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import { IoEyeOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { Link } from "react-router-dom";
import { FaChevronUp } from "react-icons/fa";
import {
  selectAllProducts,
  fetchAllProductsAsync,
} from "../Product/productSlice";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { selectCartProduct, setAddToCart } from "../Cart/cartProductSlice";
import { selectWishlistProduct, setAddToWishlist } from "../Cart/wishlistSlice";
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";
import { Pagination } from "@mui/material";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

function FrontPageProduct() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const cartProductSlice = useSelector(selectCartProduct);
  const wishlistProduct = useSelector(selectWishlistProduct);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openModal = (productId) => {
    setSelectedProduct(productId);
    handleOpen();
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    dispatch(fetchAllProductsAsync());
  }, [dispatch]);

  const RenderModal = () => {
    const selectedProductData = selectedProduct
      ? products.find((product) => product.id === selectedProduct)
      : null;

    return (
      <>
        <Dialog open={open} size={"lg"} handler={handleOpen}>
          <DialogHeader>Its a simple dialog.</DialogHeader>
          <DialogBody>
            {selectedProductData && (
              <>
                <Card className="w-full max-w-[48rem] flex-row">
                  <CardHeader
                    shadow={false}
                    floated={false}
                    className="m-0 w-2/5 shrink-0 rounded-r-none"
                  >
                    <img
                      src={selectedProductData.imageSrc}
                      alt={selectedProductData.imageAlt}
                      className="h-full w-full object-cover"
                    />
                  </CardHeader>
                  <CardBody>
                    <Typography
                      variant="h6"
                      color="gray"
                      className="mb-4 uppercase"
                    >
                      {selectedProductData.type}
                    </Typography>
                    <Typography variant="h4" color="blue-gray" className="mb-2">
                      {selectedProductData.name}
                    </Typography>
                    <Typography color="gray" className="mb-8 font-normal">
                      {selectedProductData.description}
                    </Typography>
                    <Link className="inline-block">
                      <Button
                        variant="text"
                        className="flex items-center gap-2"
                        onClick={handleOpen}
                      >
                        Learn More
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                          className="h-4 w-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                          />
                        </svg>
                      </Button>
                    </Link>
                  </CardBody>
                </Card>
              </>
            )}
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handleOpen}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
            <Button variant="gradient" color="green" onClick={handleOpen}>
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        </Dialog>
      </>
    );
    return null;
  };

  const handleAddToCart = (e, product) => {
    console.log("product---------", product);
    dispatch(setAddToCart(product));
    // localStorage.setItem('cart_product', JSON.stringify(cartProductSlice));
  };

  const handleAddToWishlist = (e, product) => {
    dispatch(setAddToWishlist(product));
    console.log("product wishlist", product);
  };

  useEffect(() => {
    localStorage.setItem("wishlist_product", JSON.stringify(wishlistProduct));
  }, [wishlistProduct]);

  useEffect(() => {
    localStorage.setItem("cart_product", JSON.stringify(cartProductSlice));
  }, [cartProductSlice]);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const visibleProducts = products.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(products.length / productsPerPage))
    );
  };

  return (
    <>
      <Link
        className={
          "fixed bottom-4 right-4 p-2 text-2xl text-blue-gray-600 hover:text-blue-gray-900"
        }
        onClick={scrollToTop}
      >
        <FaChevronUp />
      </Link>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-16 lg:max-w-7xl lg:px-8">
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              New Products
            </h2>
            <div className="flex space-x-2">
              <CiCircleChevLeft
                size={30}
                className="text-light-green-600 cursor-pointer"
                onClick={handlePrevPage}
              />
              <CiCircleChevRight
                size={30}
                className="text-light-green-600 cursor-pointer"
                onClick={handleNextPage}
              />
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {visibleProducts.map((product) => (
              <div key={product.id} className="group">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none">
                  <div className="relative z-0 max-w-48">
                    <img
                      src={product.imageSrc}
                      alt={product.imageAlt}
                      className="w-full object-cover object-center h-48 transition-transform transform hover:scale-125"
                    />
                    <div className="absolute top-0 left-0 p-4 opacity-0 group-hover:opacity-100">
                      <button
                        onClick={() => openModal(product.id)}
                        className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 hover:from-teal-300 hover:to-blue-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800"
                      >
                        <span className="relative px-4 py-2 transition-all ease-in duration-500 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                          <Link>
                            <IoEyeOutline
                              className="text-xl"
                              // data-modal-target='static-modal'
                              data-modal-toggle="static-modal"
                              size={15}
                            />
                          </Link>
                        </span>
                      </button>
                      <br />
                      <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 hover:from-teal-300 hover:to-blue-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800">
                        <span className="relative px-4 py-2 transition-all ease-in duration-500 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 hover:">
                          <Link>
                            <FiPlus
                              className="text-xl"
                              data-modal-target="static-modal"
                              data-modal-toggle="static-modal"
                              size={15}
                              onClick={(e) => handleAddToCart(e, product)}
                            />
                          </Link>
                        </span>
                      </button>
                      <br />
                      <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 hover:from-teal-300 hover:to-blue-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800">
                        <span className="relative px-4 py-2 transition-all ease-in duration-500 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                          <Link>
                            <CiHeart
                              className="text-xl"
                              data-modal-target="static-modal"
                              data-modal-toggle="static-modal"
                              size={15}
                              onClick={(e) => handleAddToWishlist(e, product)}
                            />
                          </Link>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <Link href={product.href}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.color}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    ₹ {product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <RenderModal />
    </>
  );
}

export default FrontPageProduct;
