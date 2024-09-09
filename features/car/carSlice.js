import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCars } from "./thunk";



const initialState = {
  cars: [],
  filteredCars: [],
  isLoading: null,
  filters: {
    price: null,
    bookingDetails: null
  },
};

export const carSlice = createSlice({
  name: "car-slice",
  initialState,
  reducers: {
    setPriceFilter: (state, action) => {
      state.filters.price = action.payload;
      state.filteredCars = state.cars.filter(car => car.price <= action.payload);
    },
    setBookingDetails: (state, action) => {
      console.log("setBookingDetails action.payload", action.payload);
      state.filters.bookingDetails = action.payload;
      console.log("setBookingDetails action.payload", action.payload);
    
      const { pick_up_agency, drop_off_agency, pick_up_time, drop_off_time } = action.payload;
      const formatedName = pick_up_agency.name.trim().toLowerCase()  ;
      const formatedAgence = pick_up_agency.address.trim().toLowerCase()   ;
     
      console.log("car.agencies. formatedName", formatedName);
      state.filteredCars = state.cars.filter(car => {
 
        console.log("car.agencies.city_agence.toLowerCase()", car.agencies.city_agence.toLowerCase());
        console.log("car.agencies.address_agence.toLowerCase()", car.agencies.address_agence.toLowerCase());
        const userPickUpDate = new Date(pick_up_time);
        const userDropOffDate = new Date(drop_off_time);
    
        // Check car's availability for the selected dates
        const isAvailable = car.availabilities.every(range => {
          const carStartDate = new Date(range.date_start);
          const carEndDate = new Date(range.date_end);
    
          // If the availability flag is 1 (meaning available), we skip the blocked range
          if (range.availability === 0) {
            // Check if the user's pick-up or drop-off date falls within the blocked range
            if (
              (userPickUpDate >= carStartDate && userPickUpDate <= carEndDate) ||
              (userDropOffDate >= carStartDate && userDropOffDate <= carEndDate)
            ) {
              return false; // If any date clashes, the car is unavailable
            }
          }
          return true; // Car is available if there's no clash with the blocked range
        });
    
        // Match location details
        const valideCity = 
        formatedName.toLowerCase().includes(car.agencies.city_agence.toLowerCase()) ||
          formatedName.toLowerCase().includes(car.agencies.address_agence.toLowerCase()) ||
           car.agencies.city_agence.toLowerCase().includes(formatedName) ||
          car.agencies.address_agence.toLowerCase().includes(formatedName);
    
        return valideCity && isAvailable;
      });
    },
    resetFilters: (state) => {
      state.filteredCars = state.cars;
      state.filters = initialState.filters;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        console.log("fetchCars.fulfilled action.payload", action.payload);
        state.cars = action.payload.all_cars; // Store all fetched cars
      
        // If bookingDetails exist, apply the filtering logic
        const { pick_up_agency, drop_off_agency, pick_up_time, drop_off_time } = state.filters.bookingDetails || {};
      
        if (pick_up_agency && pick_up_time && drop_off_agency && drop_off_time) {
          const userCity = pick_up_agency.name.toLowerCase();  // Assuming name is the city
          const userAddress = pick_up_agency.address.toLowerCase();
      
          console.log("Filtering based on booking details...");
      
          state.filteredCars = state.cars.filter(car => {
            const carCity = car.agencies.city_agence.toLowerCase();
            const carAddress = car.agencies.address_agence.toLowerCase();
      
            const userPickUpDate = new Date(pick_up_time);
            const userDropOffDate = new Date(drop_off_time);
      
            // Check car's availability for the selected dates
            const isAvailable = car.availabilities.every(range => {
              const carStartDate = new Date(range.date_start);
              const carEndDate = new Date(range.date_end);
      
              // If the availability flag is 1 (meaning available), skip the blocked range
              if (range.availability === 0) {
                // Check if the user's pick-up or drop-off date falls within the blocked range
                if (
                  (userPickUpDate >= carStartDate && userPickUpDate <= carEndDate) ||
                  (userDropOffDate >= carStartDate && userDropOffDate <= carEndDate)
                ) {
                  return false; // If any date clashes, the car is unavailable
                }
              }
              return true; // Car is available if there's no clash with the blocked range
            });
      
            // Match city or address
            const valideCity = carCity.includes(userCity) || userCity.includes(carCity);
            const valideAddress = carAddress.includes(userAddress) || userAddress.includes(carAddress);
      
            return (valideCity || valideAddress) && isAvailable;
          });
        } else {
          // If no booking details, show all cars
          console.log("No booking details available, showing all cars.");
          state.filteredCars = state.cars;
        }
        state.isLoading = false;
      })
      .addCase(fetchCars.rejected, (state , action) => {
        console.error("fetchCars.rejected ", action.error)
        state.isLoading = false;
      });
  },
});

export const { setPriceFilter, setBookingDetails, resetFilters } = carSlice.actions;

export default carSlice.reducer;
