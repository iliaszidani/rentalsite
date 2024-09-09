// thunks/userThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from axiosInstance
import axiosInstance from "@/lib/axiosConfig";

export const loginUser = createAsyncThunk("user/loginUser", async ({ phone1_or_email, password }) => {
  const response = await axiosInstance.post("/api/login", { phone1_or_email, password });
  console.log("response ", response);
  return response.data;
});

export const logoutUser = createAsyncThunk("user/logoutUser", async () => {
    console.log("is called ")
    const response = await axiosInstance.post("/api/logout");
    return response.data;
  });

  export const registerUser = createAsyncThunk("user/registerUser", async (userObject, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/register", userObject);
      console.log("response ", response);
      return response.data;
    } catch (error) {
      console.log("error ", error);
      if (error.response) {
        // Server responded with a status other than 200 range
        console.error("Error response: ", error.response.data);
        return rejectWithValue({
          success: false,
          status_code: error.response.status,
          error: true,
          message: 'error de validation',
          errorList: error.response.data.errors || error.response.data
        });
      } else if (error.request) {
        // Request was made but no response received
        console.error("Error request: ", error.request);
        return rejectWithValue({
          success: false,
          status_code: 500,
          error: true,
          message: 'No response from server',
          errorList: error.request
        });
      } else {
        // Something else happened while setting up the request
        console.error("Error message: ", error.message);
        return rejectWithValue({
          success: false,
          status_code: 500,
          error: true,
          message: error.message,
          errorList: error.message
        });
      }
    }
  });