import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchLoggedInUserOrders } from './userAPI';

const initialState = {
  userOrders: [],
  status: 'idle',
};
export const fetchLoggedInUserOrderAsync  = createAsyncThunk(
  'user/fetchLoggedInUserOrder',
  async (id) => {
    const response = await fetchLoggedInUserOrders(id);
    return response.data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        //this info can be different or more from logged-in user info
        state.userOrders = action.payload;
      });
  },
});


export const selectUserOrders = (state) => state.user.userOrders;

export default userSlice.reducer;
