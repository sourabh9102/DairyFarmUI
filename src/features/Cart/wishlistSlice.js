import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: {
        items: JSON.parse(localStorage.getItem('wishlist_product')) || [],
    },
    reducers: {
        setAddToWishlist: (state, action) => {
            if (!Array.isArray(state.items)) {
                state.items = [];
                localStorage.setItem('wishlist_product', JSON.stringify([]));
            }
            state.items.push(action.payload);
        },
        removeFromWishlist: (state, action) => {
            if (!Array.isArray(state.items)) {
                localStorage.setItem('wishlist_product', JSON.stringify([]));
                return;
            }
            state.items = state.items.filter((product) => product.id !== action.payload);
        },

    },
});

export const { setAddToWishlist, removeFromWishlist } = wishlistSlice.actions;

export const selectWishlistProduct = (state) => state.wishlist.items || [];

export default wishlistSlice.reducer;
