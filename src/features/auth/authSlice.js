import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { checkUser, createUser } from './authAPI';

const initialState = {
  loggedInUser: null,
  status: 'idle',
  error :null
};
export const createUserAsync = createAsyncThunk(
  'user/createUser',
  async (userData) => {
     
    const response = await createUser(userData);
    console.log({response});
    return response.data;
  }
);
export const checkUserAsync = createAsyncThunk(
  'user/checkUser',
  async (loginInfo) => {
     
    const response = await checkUser(loginInfo);
    console.log({response});
    return response.data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error;
      });
  },
});



export const selectLoggedInUser  = (state) => {
  const comingData = state.auth.loggedInUser;
  return comingData;
}
export const selectError  = (state) => {
  const comingData = state.auth.error;
  return comingData;
}

export default userSlice.reducer;
