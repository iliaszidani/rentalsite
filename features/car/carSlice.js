import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch car data
export const fetchCars = createAsyncThunk("cars/fetchCars", async () => {
  const response = await fetch("/api/cars"); // Replace with your API endpoint
  const data = await response.json();
  return data;
});

const initialState = {
  cars: [],
  filteredCars: [],
  isLoading: true,
  filters: {
    price: null,
    bookingDetails: {
      pickUpCity: "",
      dropOffCity: "",
      pickUpDate: "",
      dropOffDate: "",
    },
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
      state.filters.bookingDetails = action.payload;
      state.filteredCars = state.cars.filter(car => {
        const { pickUpCity, dropOffCity, pickUpDate, dropOffDate } = action.payload;
        return (
          car.pickUpCity === pickUpCity &&
          car.dropOffCity === dropOffCity &&
          car.pickUpDate === pickUpDate &&
          car.dropOffDate === dropOffDate
        );
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
        state.isLoading = false;
        state.cars = action.payload;
        state.filteredCars = action.payload;
      })
      .addCase(fetchCars.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setPriceFilter, setBookingDetails, resetFilters } = carSlice.actions;

export default carSlice.reducer;
