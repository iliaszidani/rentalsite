import axiosInstance from "@/lib/axiosConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";

 

  // Async thunk to fetch car data
export const fetchCars = createAsyncThunk("cars/fetchCars", async () => {
    const response = await axiosInstance.get("/api/get-all-cars-for-client"); // Replace with your API endpoint
     
    return response.data;
  });

  export const fetchFilteredCars = createAsyncThunk(
    'cars/fetchFilteredCars',
    async (filters, thunkAPI) => {
      try {
        // console.log("cars/fetchFilteredCars filter ", filters);
        const response = await axiosInstance.post("/api/filter-cars-by-location", filters);
        // console.log('25/10/2024 11:00 fetch filtred cars  response.status ', response.status)
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response ? error.response.data : error.message
        );
      }
    }
  );
  
  export const reserveCar = createAsyncThunk(
    "cars/reserveCar",
    async ({ carId, formData }, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.post(`/api/cars/reserve/${carId}`, formData);
        // console.log("thunk reserve car response:", response);
        return response.data;
      } catch (error) {
        console.error("thunk reserve car error:", error);
        return rejectWithValue(error.response.data);
      }
    }
  );