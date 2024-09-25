import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addToCart, deleteItemFromCart, fetchItemsByUserId, resetCart, updateCart } from "./cartAPI";

const initialState = {
  status: "idle",
  items: [],
};
export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async (item) => {
    // item coming from frontend and add into data.json file via
    const response = await addToCart(item);
    return response.data;
  }
);

export const fetchItemsByUserIdAsync = createAsyncThunk(
  "cart/fetchItemsByUserIdAsync",
  async (userId) => { 
    // item coming from frontend and add into data.json file via
    const response = await fetchItemsByUserId(userId);    
    return response.data;
  }
);

export const updateCartAsync = createAsyncThunk(
  "cartItems/updateCart",
  async (update) => {
    // item coming from frontend and add into data.json file via
    const response = await updateCart(update);
    return response.data;
  }
);

export const deleteItemFromCartAsync = createAsyncThunk(
  "cart/deleteItemFromCart",
  async (itemId) => {
    // item coming from frontend and add into data.json file via
    const response = await deleteItemFromCart(itemId);
    return response.data;
  }
);

export const resetCartAsync = createAsyncThunk(
  "cart/resetCart",
  async () => {
    // item coming from frontend and add into data.json file via
    const response = await resetCart();
    return response.data;
  }
);
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items.push(action.payload);
      })
      .addCase(fetchItemsByUserIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItemsByUserIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
      })
      .addCase(updateCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items[index] = action.payload;
      })
      .addCase(deleteItemFromCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteItemFromCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items.splice(index,1);
      })
      .addCase(resetCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetCartAsync.fulfilled, (state) => {
        state.status = "idle";
        state.items = [];
      });
  },
});

export const selectItems = (state) => state.cart.items;
export const selectCartStatus = (state) => state.cart.status;

export default cartSlice.reducer;
