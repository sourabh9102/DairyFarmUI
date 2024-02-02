import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { fetchAllProducts, fetchProductById } from "./productAPI";

const initialState = {
  products: [],
  filteredProducts: JSON.parse(localStorage.getItem("filtered_product")) || [],
  filteredProductsByType: [],
  sortedProducts: [],
  status: "idle",
  selectedProduct: null,
};

export const fetchAllProductsAsync = createAsyncThunk(
  "product/fetchAllProducts",
  async () => {
    const response = await fetchAllProducts();
    return response.data;
  }
);

export const fetchAllProductByIdAsync = createAsyncThunk(
  "product/fetchProductById",
  async (id) => {
    const response = await fetchProductById(id);
    console.log("API Response:", response.data);
    return response.data;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setFilteredProducts: (state, action) => {
      console.log("Action Payload:", action.payload);
      state.filteredProducts = action.payload;
      localStorage.setItem("filtered_product", JSON.stringify([]));
    },
    setFilteredProductsByType: (state, action) => {
      console.log("Action Payload:", action.payload);
      state.filteredProductsByType = action.payload;
    },
    setSortedProducts: (state, action) => {
      console.log("Action Payload:", action.payload);
      state.sortedProducts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      })
      .addCase(fetchAllProductByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProductByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedProduct = action.payload;
      });
  },
});

export const {
  setFilteredProducts,
  setFilteredProductsByType,
  setSortedProducts,
  updateFilterOptions,
} = productSlice.actions;

export const selectAllProducts = (state) => state.product.products;
export const selectFilteredProducts = (state) => state.product.filteredProducts;
export const selectFilteredProductsByType = (state) =>
  state.product.filteredProductsByType;
export const selectSortedProducts = (state) => state.product.sortedProducts;
export const selectProductById = (state) => state.product.selectedProduct;

export default productSlice.reducer;
