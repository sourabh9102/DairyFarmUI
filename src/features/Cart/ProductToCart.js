import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, selectCartProduct } from '../Cart/cartProductSlice';
import { selectUserDetails } from '../Counter/userDetailsSlice';

const ProductToCart = ({ userId, cartItems }) => {
    const dispatch = useDispatch();

    const userDetail = useSelector(selectUserDetails);
    const cartItem = useSelector(selectCartProduct);

    console.log("cartItem product to do me", cartItem);

    useEffect(() => {
        const transferCartToDatabase = async () => {
            try {
                const flattenedCartItems = cartItems.flat();
                console.log("flattenedCartItems", flattenedCartItems);
                await axios.post("http://localhost:5001/auth/cart", { userId: userDetail.id, cartItems: flattenedCartItems });
                dispatch(clearCart());
            } catch (error) {
                console.error("Error transferring cart:", error);
            }
        };

        if (userId && cartItems.length > 0) {
            transferCartToDatabase();
        }
    }, [userId, cartItems, dispatch]);

    return null;
};

export default ProductToCart;
