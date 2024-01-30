import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromWishlist, selectWishlistProduct } from './wishlistSlice';
import { selectCartProduct, setAddToCart } from './cartProductSlice';
import { useEffect } from 'react';

export default function Wishlist() {

    const products = useSelector(selectWishlistProduct) || [];
    const dispatch = useDispatch();

    const handleAddToCart = (e, product) => {
        dispatch(setAddToCart(product));
        console.log("product cart wala", product);

        const wishlistLocal = JSON.parse(localStorage.getItem('wishlist_product')) || [];
        const isProductInWishlist = wishlistLocal.some((wishlistProduct) => wishlistProduct.id === product.id);
        console.log("wishlistLocal", wishlistLocal);
        console.log("isProductInWishlist", isProductInWishlist);

        if (!isProductInWishlist) {
            wishlistLocal.push(product);
            localStorage.setItem('wishlist_product', JSON.stringify(wishlistLocal));
        }

        const cartLocal = JSON.parse(localStorage.getItem('cart_product')) || [];
        const isProductInCart = cartLocal.some((cartProduct) => cartProduct.id === product.id);

        if (!isProductInCart) {
            cartLocal.push(product);
            localStorage.setItem('cart_product', JSON.stringify(cartLocal));
        }

        console.log("cartLocal", cartLocal);
    }

    const handleRemoveItem = (productId) => {
        console.log("Products id:", productId);
        const updatedProducts = products ? products.filter((product) => product.id !== productId) : [];
        console.log("updatedProducts", updatedProducts);
        console.log("Products", products);
        localStorage.setItem('wishlist_product', JSON.stringify(updatedProducts));
        dispatch(removeFromWishlist(productId));
    };

    const cartProducts = useSelector(selectCartProduct) || [];

    const isProductInCart = (product) => {
        return cartProducts.some((cartProduct) => cartProduct.id === product.id);
    };


    return (
        <div className="bg-white">
            <div className="max-w-xl mx-auto py-14 px-4 sm:py-11 sm:px-6 lg:max-w-6xl lg:px-8">
                <h2 className="text-xl font-bold text-gray-900">Your Favourite Items</h2>

                <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                    {products?.map((product) => (
                        <div key={product.id}>
                            <div className="relative">
                                <div className="relative w-full h-72 rounded-lg overflow-hidden">
                                    <img
                                        src={product.imageSrc}
                                        alt={product.imageAlt}
                                        className="w-full h-full object-center object-cover"
                                    />
                                </div>
                                <div className="relative mt-4">
                                    <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                                    <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                                </div>
                                <div className="absolute top-0 inset-x-0 h-72 rounded-lg p-4 flex items-end justify-end overflow-hidden">
                                    <div
                                        aria-hidden="true"
                                        className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                                    />
                                    <p className="relative text-lg font-semibold text-white">₹ {product.price}</p>
                                </div>
                            </div>
                            <div className="mt-6">
                                <button
                                    className="w-full relative flex bg-gray-100 border border-transparent rounded-md py-2 px-8 items-center justify-center text-sm font-medium text-gray-900 hover:bg-gray-200"
                                    onClick={(e) => handleAddToCart(e, product)}
                                    disabled={isProductInCart(product)}
                                >
                                    {isProductInCart(product) ? 'Item in Cart' : 'Add to Cart'}
                                    <span className="sr-only">, {product.name}</span>
                                </button>

                                <button
                                    className="w-full mt-2 relative flex bg-gray-100 border border-transparent rounded-md py-2 px-8 items-center justify-center text-sm font-medium text-gray-900 hover:bg-gray-200"
                                    onClick={() => handleRemoveItem(product.id)}
                                >
                                    Remove from Wishlist<span className="sr-only">, {product.name}</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
