import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/Product/productSlice";
import cartProductSlice from "../features/Cart/cartProductSlice";
import userDetails from "../features/Counter/userDetailsSlice";
import wishlistSlice from "../features/Cart/wishlistSlice";
import checkoutAddressSlice from "../features/Checkout/checkoutAddressSlice";
import orderDetailsSlice from "../features/OrderDetails/orderDetailsSlice";

const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartProductSlice,
    userDetails: userDetails,
    wishlist: wishlistSlice,
    address: checkoutAddressSlice,
    orderDetails: orderDetailsSlice,
  },
});

export default store;
