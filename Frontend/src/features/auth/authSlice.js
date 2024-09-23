import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUser, loginUser, signOut,checkAuth } from "./authAPI";
// console.log("inside authSlice.js");

const initialState = {
  loggedInUserToken: null, // this should only contain user identity 'id'/'role'
  status: "idle",
  error: null,
  userChecked:false,
};
export const createUserAsync = createAsyncThunk(
  "user/createUser",
  async (userData) => {
    const response = await createUser(userData);
    return response.data;
  }
);
export const loginUserAsync = createAsyncThunk(
  "user/loginUser",
  async (loginInfo) => {
    try {
      const response = await loginUser(loginInfo);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }
);

export const checkAuthAsync = createAsyncThunk(
  "user/checkAuth",
  async () => {
    try {
      const response = await checkAuth();
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }
);

export const signOutAsync = createAsyncThunk(
  "signout/signOutUser",
  async () => {
    const response = await signOut();
    return response.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        console.log("inside loginUserAsync",action.payload)
        state.loggedInUserToken = action.payload;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      })
      // .addCase(updateUserAsync.pending, (state) => {
      //   state.status = 'loading';
      // })
      // .addCase(updateUserAsync.fulfilled, (state, action) => {
      //   state.status = 'idle';
      //   state.loggedInUserToken = action.payload;
      // })
      .addCase(signOutAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = null;
      })
      .addCase(checkAuthAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
        state.userChecked =true;
      })
      .addCase(checkAuthAsync.rejected, (state, action) => {
        state.status = "idle";
        state.userChecked = true;
      });
  },
});

export const selectloggedInUser = (state) => {
  const comingData = state.auth.loggedInUserToken;
  return comingData;
};
export const selectError = (state) => {
  const comingData = state.auth.error;
  return comingData;
};

export const selectUserChecked = (state)=> state.auth.userChecked;

export default userSlice.reducer;
