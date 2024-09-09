import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchData: {
    isLoading : false,
    isFilled: false,
    isDifferentLocations: false,
    pick_up_agency: { id: null, name: "", type: "", address: "" },
    drop_off_agency:{ id: null, name: "", type: "", address: "" },
    pick_up_time: null,
    drop_off_time: null,
  },
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchData(state, action) {
   
      state.isLoading = true;
      state.searchData = action.payload;
      state.searchData.isFilled = true;
       if (state.searchData.pick_up_time && state.searchData.drop_off_time ) {
        console.log("dkhol hna")
         const pickUpTime = new Date(state.searchData.pick_up_time);
         const dropOffTime = new Date(state.searchData.drop_off_time);
         
         if (dropOffTime <= pickUpTime) {
           const pickupPlus1 = new Date(pickUpTime);
           pickupPlus1.setDate(pickupPlus1.getDate() + 1);
           state.searchData.drop_off_time = pickupPlus1.toISOString();
          }
     
    }
    state.isLoading = false;
    },
  },
});

export const { setSearchData } = searchSlice.actions;
export default searchSlice.reducer;
