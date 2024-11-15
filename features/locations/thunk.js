import axiosInstance from "@/lib/axiosConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";

 

  // Async thunk to fetch car data
export const fetchLocations = createAsyncThunk("locations/fetchLocations", async () => {
    try{

        const response = await axiosInstance.get("/api/get-all-locations"); // Replace with your API endpoint
        // console.log("locations/fetchLocations ", response)
        return response.data;
    }catch(error){
        console.error("error ", error)
    }
  });