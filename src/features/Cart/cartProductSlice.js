import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: JSON.parse(localStorage.getItem("cart_product")) || [],
    productDetails: JSON.parse(localStorage.getItem("product_details")) || [],
  },
  reducers: {
    setAddToCart: (state, action) => {
      const newItem = action.payload;
      state.items = [...state.items, newItem];
      state.productDetails = [...state.productDetails, newItem];
      localStorage.setItem("cart_product", JSON.stringify(state.items));
      localStorage.setItem(
        "product_details",
        JSON.stringify(state.productDetails)
      );
    },
    setIncrementItem: (state, action) => {
      const { productId } = action.payload;
      const itemIndex = state.items.findIndex((item) => item.id === productId);
      if (itemIndex !== -1) {
        state.items[itemIndex].quantity++;
        localStorage.setItem("cart_product", JSON.stringify(state.items));
      }
    },
    setDecrementItem: (state, action) => {
      const { productId } = action.payload;
      const itemIndex = state.items.findIndex((item) => item.id === productId);
      if (itemIndex !== -1 && state.items[itemIndex].quantity > 1) {
        state.items[itemIndex].quantity--;
        localStorage.setItem("cart_product", JSON.stringify(state.items));
      }
    },
    removeItem: (state, action) => {
      const productIdToRemove = action.payload;
      state.items = state.items.filter(
        (product) => product.id !== productIdToRemove
      );
      state.productDetails = state.productDetails.filter(
        (product) => product.id !== productIdToRemove
      );
      localStorage.setItem("cart_product", JSON.stringify(state.items));
      localStorage.setItem(
        "product_details",
        JSON.stringify(state.productDetails)
      );
    },
    clearCart: (state) => {
      state.items = [];
      state.productDetails = [];
      localStorage.setItem("cart_product", JSON.stringify([]));
      localStorage.setItem("product_details", JSON.stringify([]));
    },
  },
});

export const {
  setAddToCart,
  setIncrementItem,
  setDecrementItem,
  removeItem,
  clearCart,
} = cartSlice.actions;

export const selectCartProduct = (state) => state.cart?.items || [];
export const selectProductDetails = (state) => state.cart?.productDetails || [];

export default cartSlice.reducer;
