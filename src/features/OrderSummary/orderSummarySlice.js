import { createSlice } from "@reduxjs/toolkit";

const orderProductDataSlice = createSlice({
  name: "orderProductData",
  initialState: {
    orders: [],
    products: [],
  },
  reducers: {
    setOrderProductData: (state, action) => {
      state.orders = action.payload.orders;
      state.products = action.payload.products;
    },
  },
});

export const { setOrderProductData } = orderProductDataSlice.actions;

export const selectOrderData = (state) => state.orderProductData?.orders;
export const selectProductData = (state) => state.orderProductData?.products;

export default orderProductDataSlice.reducer;
