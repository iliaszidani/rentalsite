import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { loginUser, logoutUser, registerUser } from "./thunk";
import Cookies from "js-cookie";
 

const initialState = {
  user: typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user")) || {} : {},
  reservations: [],
  isLoading: false,
  error: null,
  errorList:{}
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    setReservations(state, action) {
      state.reservations = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
 
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log("actikon ", action);
        state.isLoading = false;
        state.user = action.payload;
        if (typeof window !== "undefined") {
          localStorage.setItem("user", JSON.stringify(action.payload));
        }
        Cookies.set("token", action.payload.token);
        
      })
      .addCase(loginUser.rejected, (state, action) => {
        // console.log("rejected ", action);
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = {};
        localStorage.removeItem("user");
        Cookies.remove("token");
      })
      .addCase(logoutUser.rejected, (state ,action) => {
        console.log('logoutUser.rejected ',  action.error)
       
      }).addCase(registerUser.pending, (state ) => {
        state.isLoading = true;
        state.errorList = {};
        
       
      }).addCase(registerUser.fulfilled, (state ,action) => {
        state.isLoading = false;
        state.user = action.payload;
        if (typeof window !== "undefined") {
          localStorage.setItem("user", JSON.stringify(action.payload));
        }
        Cookies.set("token", action.payload.token);
       
      }).addCase(registerUser.rejected, (state ,action) => {
          console.log("rejected ", action.payload.errorList.errorList);
        state.isLoading = false;
        state.error = action.error;
        state.errorList = action.payload.errorList.errorList;
      });
  },
});

export const { setUser, setReservations } = userSlice.actions;
export default userSlice.reducer;
