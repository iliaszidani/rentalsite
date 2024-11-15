import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchData: {
    isLoading : false,
    isFilled: false,
    isDifferentLocations: false,
    pick_up_agency: { id: null, name: "", type: "", address: "" },
    drop_off_agency: { id: null, name: "", type: "", address: "" },
    pick_up_time: null,
    drop_off_time: null,
  },
};
// console.log("searchDataSlice ",sessionStorage.getItem("searchData"));
// const savedState = JSON.parse(sessionStorage.getItem('searchData'));
// const finalInitialState = savedState ? { searchData:savedState } : initialState;

const savedStateString = sessionStorage.getItem('searchData');
let savedState;
try {
  savedState = JSON.parse(savedStateString);
} catch (e) {
  console.error("Failed to parse JSON", e);
  savedState = null;
}

const finalInitialState = savedState ? { searchData: savedState } : initialState;


const searchSlice = createSlice({
  name: "search",
  initialState: finalInitialState,
  reducers: {
   
    setSearchData(state, action) {
      
      state.isLoading = true;
      state.searchData = action.payload;
      state.searchData.isFilled = true;
       if (state.searchData.pick_up_time && state.searchData.drop_off_time ) {
        console.log("dkhol hna : state.searchData.pick_up_time",state.searchData.pick_up_time)
         const pickUpTime = new Date(state.searchData.pick_up_time);
         const dropOffTime = new Date(state.searchData.drop_off_time);
         
         if (dropOffTime <= pickUpTime) {
           const pickupPlus1 = new Date(pickUpTime);
           pickupPlus1.setDate(pickupPlus1.getDate() + 1);
           state.searchData.drop_off_time = pickupPlus1.toISOString();
          }
     
    }
    if(state.searchData.pick_up_time && state.searchData.pick_up_agency.id && state.searchData.drop_off_time){
      sessionStorage.setItem('searchData', JSON.stringify(state.searchData));
    }
    state.isLoading = false;


    },
  },
});

export const { setSearchData, initializeSearchData } = searchSlice.actions;
export default searchSlice.reducer;
