import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: JSON.parse(localStorage.getItem('cart_product')) || [],
        productDetails: JSON.parse(localStorage.getItem('product_details')) || [],
    },
    reducers: {
        setAddToCart: (state, action) => {
            if (!Array.isArray(state.items)) {
                state.items = [];
                localStorage.setItem('cart_product', JSON.stringify([]));
            }
            state.items.push(action.payload);
            state.productDetails = [...state.productDetails, action.payload.productDetails];
            localStorage.setItem('cart_product', JSON.stringify(state.items));
            localStorage.setItem('product_details', JSON.stringify(state.productDetails));
        },
        removeItem: (state, action) => {
            if (!Array.isArray(state.items)) {
                localStorage.setItem('cart_product', JSON.stringify([]));
                localStorage.setItem('product_details', JSON.stringify([]));
                return;
            }
            const productIdToRemove = action.payload;
            state.items = state?.items?.filter((product) => product.id !== productIdToRemove);
            state.productDetails = state?.productDetails?.filter((product) => product.id !== productIdToRemove);
            localStorage.setItem('cart_product', JSON.stringify(state.items));
            localStorage.setItem('product_details', JSON.stringify(state.productDetails));
        },
        clearCart: (state) => {
            state.items = [];
            state.productDetails = [];
            localStorage.setItem('cart_product', JSON.stringify([]));
            localStorage.setItem('product_details', JSON.stringify([]));
        },
    },
});

export const { setAddToCart, removeItem, clearCart } = cartSlice.actions;

export const selectCartProduct = (state) => state.cart?.items || [];
export const selectProductDetails = (state) => state.cart?.productDetails || [];

export default cartSlice.reducer;
