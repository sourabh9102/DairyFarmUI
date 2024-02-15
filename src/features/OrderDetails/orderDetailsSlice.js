import { createSlice } from "@reduxjs/toolkit";

const orderDetailsSlice = createSlice({
  name: "orderDetails",
  initialState: {
    orders: [],
    productDataDetails: [],
    billAddresses: [],
    sums: null,
  },
  reducers: {
    setOrderDetails: (state, action) => {
      state.orders.push(action.payload.order);
      state.billAddresses.push(action.payload.billedAddress);
      state.sums = action.payload.sums;
    },
    setProductDataDetails: (state, action) => {
      state.productDataDetails.push(action.payload);
    },
  },
});

export const { setOrderDetails, setProductDataDetails } =
  orderDetailsSlice.actions;

export const selectOrderDetails = (state) => state.orderDetails.orders;
export const selectProductDataDetails = (state) =>
  state.orderDetails.productDataDetails;
export const selectBillAddress = (state) => state.orderDetails.billAddresses;
export const selectSums = (state) => state.orderDetails.sums;

export default orderDetailsSlice.reducer;
