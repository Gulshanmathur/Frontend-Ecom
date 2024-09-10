import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchLoggedInUser, fetchLoggedInUserOrders, updateUser } from './userAPI';

const initialState = {
  status: 'idle',
  userInfo : null, //this info will be used in case of detailed user info, while auth will 
  // only be used for loggedInUser id etc checks.
};
export const fetchLoggedInUserOrderAsync  = createAsyncThunk(
  'user/fetchLoggedInUserOrder',
  async (id) => {
    const response = await fetchLoggedInUserOrders(id);
    return response.data;
  }
);

export const fetchedLoggedInUserAsync = createAsyncThunk(
  'user/fetchedLoggedInUser',
  async ()=>{
    const response = await fetchLoggedInUser();
    return response.data;
  }
)

export const updateUserAsync = createAsyncThunk(
  'user/updateUser',
  async (updatedUser)=>{
    const response = await updateUser(updatedUser);
    return response.data;
  }
)

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
        state.userInfo.orders = action.payload;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        //this info can be different or more from logged-in user info
        state.userInfo = action.payload;
      })
      .addCase(fetchedLoggedInUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchedLoggedInUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        //this info can be different or more from logged-in user info
        state.userInfo = action.payload;  
      });
  },
});

//TODO: change orders and address to be independent of user;
export const selectUserOrders = (state) => state.user.userInfo.orders;
export const selectUserInfo = (state) => state.user.userInfo;
export const selectUserInfoStatus = (state) => state.user.status;
export default userSlice.reducer;
