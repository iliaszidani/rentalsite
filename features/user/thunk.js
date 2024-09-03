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