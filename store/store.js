import { configureStore } from "@reduxjs/toolkit";
import findPlaceSlice from "../features/hero/findPlaceSlice";
import   carReducer   from "@/features/car/carSlice";
import   userReducer   from "@/features/user/userSlice";
import searchReducer from "@/features/searchData/searchDataSlice";
import locationReducer from "@/features/locations/locationSlice";

export const store = configureStore({
    reducer: {
        hero: findPlaceSlice,
        car:carReducer,
        user:userReducer,
        searchData:searchReducer,
        location:locationReducer,
    },
});
