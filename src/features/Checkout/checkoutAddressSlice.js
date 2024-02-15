import { createSlice } from "@reduxjs/toolkit";

export const checkoutAddressSlice = createSlice({
  name: "address",
  initialState: [],
  reducers: {
    addAddress: (state, action) => {
      state.push(action.payload);
    },
    setAddresses: (state, action) => {
      return action.payload;
    },
  },
});

export const { addAddress, setAddresses } = checkoutAddressSlice.actions;

export default checkoutAddressSlice.reducer;
