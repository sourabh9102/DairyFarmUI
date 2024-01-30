import { configureStore } from '@reduxjs/toolkit'
import productReducer from '../features/Product/productSlice'
import cartProductSlice from '../features/Cart/cartProductSlice'
import userDetails from '../features/Counter/userDetailsSlice'
import wishlistSlice from '../features/Cart/wishlistSlice'



const store = configureStore({
    reducer: {
        product: productReducer,
        cart: cartProductSlice,
        userDetails: userDetails,
        wishlist: wishlistSlice,
    },
});

export default store;
