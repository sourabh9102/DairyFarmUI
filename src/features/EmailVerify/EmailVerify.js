import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserDetails, setLogin } from '../Counter/userDetailsSlice';
import { selectCartProduct, setAddToCart } from '../Cart/cartProductSlice';
import ProductToCart from '../Cart/ProductToCart';

function EmailVerify() {

    const [otp, setOtp] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userDetail = useSelector(selectUserDetails);
    const cartItems = useSelector(selectCartProduct);

    console.log("userDetail email verify me", userDetail);
    console.log("cartItems email verify me", cartItems);

    const verifyOtp = () => {
        axios.post('http://localhost:5001/auth/verify', { otp: otp, })
            .then((res) => {
                if (res.data.success) {
                    console.log("User verified.");
                    console.log("cartItems phle", cartItems);
                    const combinedData = res.data.cartItems.map((cartItem, index) => ({
                        cartItem,
                        productDetails: res.data.productDetails[index],
                    }));
                    console.log("combinedData", combinedData);
                    const productDetailsArray = combinedData.map(item => item.productDetails);
                    console.log("productDetailsArray", productDetailsArray);
                    localStorage.removeItem('tempToken_local', res.data.temp_token);
                    localStorage.setItem('token_local', res.data.token);
                    localStorage.setItem('cart_product', JSON.stringify(productDetailsArray));
                    dispatch(setAddToCart(combinedData));
                    const loginData = {
                        token: res.data.token,
                        userDetail: res.data.data,
                    }
                    dispatch(setLogin(loginData));
                    navigate('/userprofile');
                    console.log("cartItems last me", cartItems);
                } else {
                    console.log("User not verified.");
                }
            })
            .catch(err => {
                console.log("Error", err);
            })
    }

    return (
        <>
            <div>
                <input
                    className="shadow appearance-none border rounded ml-11 py-2 px-3 mt-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="number"
                    name="otpRec"
                    placeholder="Enter received otp"
                    onChange={(e) => setOtp(e.target.value)}
                />
                <button
                    type='submit'
                    className="bg-white hover:bg-gray-100 ml-11 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" onClick={verifyOtp}
                >
                    Verify OTP
                </button>
            </div>
            <ProductToCart userId={userDetail} cartItems={cartItems} />
        </>
    )
}

export default EmailVerify
