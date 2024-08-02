import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { checkUser, createUser, signOut } from './authAPI';
import { updateUser } from '../user/userAPI';

const initialState = {
  loggedInUser: null,
  status: 'idle',
  error :null
};
export const createUserAsync = createAsyncThunk(
  'user/createUser',
  async (userData) => {
     
    const response = await createUser(userData);
    return response.data;
  }
);
export const checkUserAsync = createAsyncThunk(
  'user/checkUser',
  async (loginInfo) => {
     
    const response = await checkUser(loginInfo);
    return response.data;
  }
);
export const updateUserAsync = createAsyncThunk(
  'update/updateUser',
  async (update) => {
     
    const response = await updateUser(update);
    return response.data;
  }
);

export const signOutAsync = createAsyncThunk(
  'signout/signOutUser',
  async (userId) => {
     
    const response = await signOut(userId);
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
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      .addCase(signOutAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = null
      })
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
