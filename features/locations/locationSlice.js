import { createSlice } from "@reduxjs/toolkit";
import { fetchLocations } from "./thunk";

const initialState = {
    locations:[],
    isLoading: false,
    errors:null
};

export const locationSlice = createSlice({
    name:"location-slice",
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchLocations.pending , (state)=>{
            state.isLoading = true;
        })
        .addCase(fetchLocations.fulfilled , (state, action)=>{
            // console.log("fulfielled ", action   )
            state.isLoading = false;
            state.locations =  action.payload;
        })
        .addCase(fetchLocations.rejected , (state, action)=>{
            state.isLoading = false;
            // console.log("locations/fetchLocations ", action)
        })
    }
});


export default locationSlice.reducer;