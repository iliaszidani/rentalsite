import axiosInstance from "@/lib/axiosConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";

 

  // Async thunk to fetch car data
export const fetchCars = createAsyncThunk("cars/fetchCars", async () => {
    const response = await axiosInstance.get("/api/get-all-cars-for-client"); // Replace with your API endpoint
     
    return response.data;
  });