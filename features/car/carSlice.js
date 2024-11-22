import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCars, fetchFilteredCars, reserveCar } from "./thunk";

const initialState = {
  itemsPerPage: 5,
  totalPages: 0,
  currentPage: 1,
 
  
  cars: [],
  filteredCars: [],
  initialFilteredCars: [], // 
  isLoading: null,
  
  filters: {
    isAscending: true,
    categories: [],
    transmission: [],
    specifications: {
      gps: null,
      bluetooth: null,
      climate_control: null,
      remote_start: null,
      backup_camera: null,
      keyless_entry: null,
      heated_seats: null,
      abs: null,
      airbags: null,
      power_steering: null,
      power_windows: null,
      cruise_control: null,
      parking_sensors: null,
    },
    selectedFuelTypes: null,
    price: null,
    bookingDetails: null
  },
  activeCarExtras: [],
  reservationLoading: false,
  carReservationReturnedData :null,
  reservationCouponcode: null,
  
};

export const carSlice = createSlice({
  name: "car-slice",
  initialState,
  reducers: {
    filterCarByApi:(state,action) => {
      // console.log("filterCarByApi:", action);

    },
    filterAll: (state, action) => {
          // console.log("filterAll called with action:", JSON.stringify(action.payload, null, 2));



      if (!action.payload.reqSort) {
        state.filters = { ...state.filters, ...action.payload };
      }
 
      const {
        categories, transmission, selectedFuelTypes, specifications, price, bookingDetails
      } = state.filters;
 
    //  console.log("transmission ", transmission);
 
      if (state.initialFilteredCars.length === 0) {
        state.initialFilteredCars = [...state.filteredCars];
      }
    
      state.filteredCars = state.initialFilteredCars.filter(car => {

        // Category Filter
        const categoryMatch = categories.length === 0 || categories.includes(car.categorie_id);
 
        
        // Transmission Filter
        const isTransmissionValid = Array.isArray(transmission) || transmission === null;
const transmissionMatch = 
  (isTransmissionValid && (transmission?.length === 0 || transmission?.includes(car.transmission)));
        // console.log(" transmissionMatch ", transmissionMatch);
        

        // Fuel Type Filter
        const selectedFuelTypesMatch =   selectedFuelTypes?.length === 0  || selectedFuelTypes?.includes(car.fuel_type); //Causing errors

        // Specification Filter
        const specificationMatch = Object.keys(specifications || {}).every(key => {
          if (Array.isArray(specifications[key])) {
            return specifications[key].length === 0 || specifications[key].includes(car[key]);
          }
          // Ensure that if the value is not an array, it is handled correctly
          if (typeof specifications[key] === 'number') {
            return car[key] === specifications[key];
          }
          return true;
        });
        

        // Price Filter
        const priceMatch = !price || (car.car_price >= price.min && car.car_price <= price.max);   

        // Booking Details Filter (if booking details like city match)
        let bookingMatch = true;
        if (bookingDetails) {
          const formattedName = bookingDetails.pick_up_agency?.name?.trim().toLowerCase();
          const pickUpCityMatch = formattedName.includes(car.agencies.city_agence.toLowerCase());
          const pickUpAddressMatch = formattedName.includes(car.agencies.address_agence.toLowerCase());

          const isAvailable = car.availabilities.every(range => {
            const userPickUpDate = new Date(bookingDetails.pick_up_time);
            const userDropOffDate = new Date(bookingDetails.drop_off_time);
            const carStartDate = new Date(range.date_start);
            const carEndDate = new Date(range.date_end);

            if (range.availability === 0 &&
              (userPickUpDate >= carStartDate && userPickUpDate <= carEndDate ||
                userDropOffDate >= carStartDate && userDropOffDate <= carEndDate)) {
              return false;
            }
            return true;
          });

          bookingMatch = (pickUpCityMatch || pickUpAddressMatch) && isAvailable;
        }

        // Combine all matches
        return categoryMatch && transmissionMatch && selectedFuelTypesMatch && specificationMatch && priceMatch && bookingMatch;
      });
      // console.log("still thre filtred ", state.filteredCars);

      if (action.payload.reqSort) {
        const sorted = [...state.filteredCars].sort((a, b) =>
          state.filters.isAscending ? a.car_price - b.car_price : b.car_price - a.car_price
        );
        state.filteredCars = sorted;
        state.filters.isAscending = !state.filters.isAscending;
      }

      state.totalPages = Math.ceil(state.filteredCars.length / state.itemsPerPage);
    },
  
    setActiveCarExtras: (state, action) => {
      state.activeCarExtras = action.payload;
    },

    resetFilters: (state) => {
      state.filteredCars = state.cars;
      state.filters = initialState.filters;
    },

    setCoupon:(state, action) => {
      state.reservationCouponcode = action.payload;
    } ,
  
  },

  extraReducers: (builder) => { 
 
  
    builder
      .addCase(fetchCars.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.cars = action.payload.all_cars;
        // console.log("last chapter  state.filters.bookingDetails ",  state.filters.bookingDetails);
        const { pick_up_agency, pick_up_time, drop_off_agency, drop_off_time } = state.filters.bookingDetails || {};
        // console.log("sfs ",  pick_up_agency && pick_up_time && drop_off_agency && drop_off_time);
        if (pick_up_agency && pick_up_time && drop_off_agency && drop_off_time) {
          // console.log("boba ios   ")
          const userCity = pick_up_agency.name.toLowerCase();
          const userAddress = pick_up_agency.address.toLowerCase();

          state.filteredCars = state.cars.filter(car => {
            const carCity = car.agencies.city_agence.toLowerCase();
            const carAddress = car.agencies.address_agence.toLowerCase();

            const userPickUpDate = new Date(pick_up_time);
            const userDropOffDate = new Date(drop_off_time);

            const isAvailable = car.availabilities.every(range => {
              const carStartDate = new Date(range.date_start);
              const carEndDate = new Date(range.date_end);

              if (range.availability === 0 &&
                (userPickUpDate >= carStartDate && userPickUpDate <= carEndDate ||
                  userDropOffDate >= carStartDate && userDropOffDate <= carEndDate)) {
                return false;
              }
              return true;
            });

            return (carCity.includes(userCity) || userCity.includes(carCity)) && isAvailable;
          });
        } else {
          state.filteredCars = state.cars;
        }

        state.totalPages = Math.ceil(state.filteredCars.length / state.itemsPerPage);
        state.isLoading = false;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.isLoading = false;
        console.error("fetchCars.rejected: ", action.error);
      })
      .addCase(fetchFilteredCars.pending, (state) => {
        state.filteredCars = [];
        state.totalPages = Math.ceil(state.filteredCars.length / state.itemsPerPage);
        state.isLoading = true;
      })
      .addCase(fetchFilteredCars.fulfilled, (state, action) => {
        // console.log('filtred cars ' , action )
        state.filteredCars = action.payload;
        state.totalPages = Math.ceil(state.filteredCars.length / state.itemsPerPage);
        state.isLoading = false;
      })
      .addCase(fetchFilteredCars.rejected, (state, action) => {
        state.isLoading = false;
        console.error(action.payload);
      })
      .addCase(reserveCar.pending , (state)=>{
        state.reservationLoading = true;
      })
      .addCase(reserveCar.fulfilled , (state, action)=>{
        // console.log("reserve car success  act.pay" , action.payload)
        state.carReservationReturnedData = action.payload.data;
        state.reservationLoading = false;
      })
      .addCase(reserveCar.rejected , (state, action)=>{
        state.reservationLoading = false;
      })
      ;
  },
});

export const { filterAll, resetFilters, setActiveCarExtras, filterCarByApi , setCoupon} = carSlice.actions;

export default carSlice.reducer;

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { fetchCars } from "./thunk";

// const initialState = {
//    itemsPerPage: 5,
//    totalPages: 0,
//    currentPage: 1,
//    isAscending: true,   
//   cars: [],
//   filteredCars: [],
//   isLoading: null,
//   filters: {
//     categories: [],
//     transmission: null,
//     SpecificationFilter: null,
//     selectedFuelTypes: null,
//     price: null,
//     bookingDetails: null
//   },
//   activeCarExtras : []
 
// };
 
// export const carSlice = createSlice({
//   name: "car-slice",
//   initialState,
//   reducers: {
//     showCityCars: (state, action) => {
//       state.isLoading = true;
//       console.log("showCityCars action.payload", action.payload);
//       state.filters.bookingDetails = action.payload;
//       const formatedName = action.payload.pick_up_agency.name.trim().toLowerCase();
//       console.log("filtred cars before  : ", state.filteredCars)
//       console.log("carsssss ", state.cars);
//       state.filteredCars = state.cars.filter(car => { 
//         console.log("car ",car );
//         const valideCity = 
//         formatedName.toLowerCase().includes(car.agencies.city_agence.toLowerCase()) ||
//         formatedName.toLowerCase().includes(car.agencies.address_agence.toLowerCase()) ||
//         car.agencies.city_agence.toLowerCase().includes(formatedName) ||
//         car.agencies.address_agence.toLowerCase().includes(formatedName);    
//         console.log("status  ",valideCity  );
//         return valideCity ;
//       });
//       state.totalPages = Math.ceil(state.filteredCars.length / state.itemsPerPage); 
//       state.isLoading = false;
//       console.log("filtred cars after : ", state.filteredCars)
//     },

//     setActiveCarExtras: (state, action) => {
//       state.activeCarExtras = action.payload;
//     },

 
//     sortCarsByPrice: (state) => {
//       console.log('calling sortCarsByPrice:');
//       console.log('before: ', state.filteredCars);
//       const sorted = [...state.filteredCars].sort((a, b) =>
//         state.isAscending ? a.car_price - b.car_price : b.car_price - a.car_price
//       );
//       state.filteredCars = sorted;
//       console.log('after: ', state.filteredCars);
//       state.isAscending = !state.isAscending; // Basculer l'ordre de tri
//     },
//     setCarsByPrice: (state, action) => {
//       console.log('action',action)
//       const { min, max } = action.payload;
//       console.log('min - max ' + min + ' ' + max);
//       console.log('bef filter: ', state.sortedCars);
//       const filtered = state.cars.filter(car => car.car_price >= min && car.car_price <= max);
//       console.log('qf filter: ', filtered);
//       state.totalPages = Math.ceil(filtered.length / state.itemsPerPage);
//       state.filteredCars = filtered;
//     },

//     setBookingDetails: (state, action) => {
//       console.log("setBookingDetails action.payload", action.payload);
//       state.filters.bookingDetails = action.payload;
//       console.log("setBookingDetails action.payload", action.payload);
//       const { pick_up_agency, drop_off_agency, pick_up_time, drop_off_time } = action.payload;
//       const formatedName = pick_up_agency.name.trim().toLowerCase()  ;
//       const formatedAgence = pick_up_agency.address.trim().toLowerCase()   ;
//       console.log("car.agencies. formatedName", formatedName);
//       state.filteredCars = state.cars.filter(car => {
//         console.log("car.agencies.city_agence.toLowerCase()", car.agencies.city_agence.toLowerCase());
//         console.log("car.agencies.address_agence.toLowerCase()", car.agencies.address_agence.toLowerCase());
//         const userPickUpDate = new Date(pick_up_time);
//         const userDropOffDate = new Date(drop_off_time);
//         // Check car's availability for the selected dates
//         const isAvailable = car.availabilities.every(range => {
//           const carStartDate = new Date(range.date_start);
//           const carEndDate = new Date(range.date_end);
//           // If the availability flag is 1 (meaning available), we skip the blocked range
//           if (range.availability === 0) {
//             // Check if the user's pick-up or drop-off date falls within the blocked range
//             if (
//               (userPickUpDate >= carStartDate && userPickUpDate <= carEndDate) ||
//               (userDropOffDate >= carStartDate && userDropOffDate <= carEndDate)
//             ) {
//               return false; // If any date clashes, the car is unavailable
//             }
//           }
//           return true; // Car is available if there's no clash with the blocked range
//         });    
//         // Match location details
//         const valideCity = 
//         formatedName.toLowerCase().includes(car.agencies.city_agence.toLowerCase()) ||
//         formatedName.toLowerCase().includes(car.agencies.address_agence.toLowerCase()) ||
//         car.agencies.city_agence.toLowerCase().includes(formatedName) ||
//         car.agencies.address_agence.toLowerCase().includes(formatedName);    
//         return valideCity && isAvailable;
//       });
//     },
//     setCategoryFilter: (state, action) => {
//       state.filters.categories = action.payload;
//       if (action.payload.length === 0) {
//         state.filteredCars = state.cars;
//       } else {
//         state.filteredCars = state.cars.filter(car => action.payload.includes(car.categories.id));
//       }
//       state.totalPages = Math.ceil(state.filteredCars.length / state.itemsPerPage); 
//     },
//     setFuelTypeFilter: (state, action) => {
//       state.filters.selectedFuelTypes = action.payload;
//       if (action.payload.length === 0) {
//         state.filteredCars = state.cars;
//       } else {
//         state.filteredCars = state.cars.filter(car => action.payload.includes(car.fuel_type));
//       }
//       state.totalPages = Math.ceil(state.filteredCars.length / state.itemsPerPage); 

//     },
//     setTransmissionFilter: (state, action) => {
//       state.filters.transmission = action.payload;
//       if (action.payload.length === 0) {
//         state.filteredCars = state.cars;
//       } else {
//         state.filteredCars = state.cars.filter(car => action.payload.includes(car.transmission));
//       }
//       state.totalPages = Math.ceil(state.filteredCars.length / state.itemsPerPage); 
//     },
//     setSpecificationFilter: (state, action) => {
//       state.filters.specification = action.payload;
//       const specifications = action.payload;
//       state.filteredCars = state.cars.filter(car => {
//         return Object.keys(specifications).every(key => {
//           return Array.isArray(specifications[key]) && specifications[key].length > 0
//             ? specifications[key].includes(car[key])
//             : true;
//         });
//       });
//       state.totalPages = Math.ceil(state.filteredCars.length / state.itemsPerPage); 
//     },
//     resetFilters: (state) => {
//       state.filteredCars = state.cars;
//       state.filters = initialState.filters;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCars.pending, (state) => {
//         state.isLoading = true;
//       })




// .addCase(fetchCars.fulfilled, (state, action) => {
//   console.log("fetchCars.fulfilled action.payload", action.payload);
//   state.cars = action.payload.all_cars; // Store all fetched cars  
//   // If bookingDetails exist, apply the filtering logic
//   const { pick_up_agency, drop_off_agency, pick_up_time, drop_off_time } = state.filters.bookingDetails || {};
//   if (pick_up_agency && pick_up_time && drop_off_agency && drop_off_time) {
//     const userCity = pick_up_agency.name.toLowerCase();  // Assuming name is the city
//     const userAddress = pick_up_agency.address.toLowerCase();
//     console.log("Filtering based on booking details...");
//     state.filteredCars = state.cars.filter(car => {
//       const carCity = car.agencies.city_agence.toLowerCase();
//       const carAddress = car.agencies.address_agence.toLowerCase();
//       const userPickUpDate = new Date(pick_up_time);
//       const userDropOffDate = new Date(drop_off_time);
//       // Check car's availability for the selected dates
//       const isAvailable = car.availabilities.every(range => {
//         const carStartDate = new Date(range.date_start);
//         const carEndDate = new Date(range.date_end);
//         // If the availability flag is 1 (meaning available), skip the blocked range
//         if (range.availability === 0) {
//           // Check if the user's pick-up or drop-off date falls within the blocked range
//           if (
//             (userPickUpDate >= carStartDate && userPickUpDate <= carEndDate) ||
//             (userDropOffDate >= carStartDate && userDropOffDate <= carEndDate)
//           ) {
//             return false; // If any date clashes, the car is unavailable
//           }
//         }
//         return true; // Car is available if there's no clash with the blocked range
//       });
//       // Match city or address
//       const valideCity = carCity.includes(userCity) || userCity.includes(carCity);
//       const valideAddress = carAddress.includes(userAddress) || userAddress.includes(carAddress);
//       return (valideCity || valideAddress) && isAvailable;
//     });
//   } else {
//     // If no booking details, show all cars
//     console.log("No booking details available, showing all cars.");
//     state.filteredCars = state.cars;
//   }
//   state.totalPages = Math.ceil(state.filteredCars.length / state.itemsPerPage); 
//   state.isLoading = false;
// })
// .addCase(fetchCars.rejected, (state , action) => {
//   console.error("fetchCars.rejected ", action.error)
//   state.isLoading = false;
// });
// },
// });


// export const { sortCarsByPrice, setBookingDetails,  setPriceFilter,  setActiveCarExtras,
// resetFilters ,   setCategoryFilter, setFuelTypeFilter, 
// setTransmissionFilter, setSpecificationFilter, setCarsByPrice, showCityCars } = carSlice.actions;
// export default carSlice.reducer;


//       // .addCase(fetchCars.fulfilled, (state, action) => {
//       //   console.log("fetchCars.fulfilled action.payload", action.payload);
//       //   state.cars = action.payload.all_cars; // Store all fetched cars  
//       //   // If bookingDetails exist, apply the filtering logic
//       //   const { pick_up_agency, drop_off_agency, pick_up_time, drop_off_time } = state.filters.bookingDetails || {};
//       //   if (pick_up_agency && pick_up_time && drop_off_agency && drop_off_time) {
//       //     const userCity = pick_up_agency.name.toLowerCase();  // Assuming name is the city
//       //     const userAddress = pick_up_agency.address.toLowerCase();
//       //     console.log("Filtering based on booking details...");
//       //     state.filteredCars = state.cars.filter(car => {
//       //       const carCity = car.agencies.city_agence.toLowerCase();
//       //       const carAddress = car.agencies.address_agence.toLowerCase();
//       //       const userPickUpDate = new Date(pick_up_time);
//       //       const userDropOffDate = new Date(drop_off_time);
//       //       // Check car's availability for the selected dates
//       //       const isAvailable = car.availabilities.every(range => {
//       //         const carStartDate = new Date(range.date_start);
//       //         const carEndDate = new Date(range.date_end);
//       //         // If the availability flag is 1 (meaning available), skip the blocked range
//       //         if (range.availability === 0) {
//       //           // Check if the user's pick-up or drop-off date falls within the blocked range
//       //           if (
//       //             (userPickUpDate >= carStartDate && userPickUpDate <= carEndDate) ||
//       //             (userDropOffDate >= carStartDate && userDropOffDate <= carEndDate)
//       //           ) {
//       //             return false; // If any date clashes, the car is unavailable
//       //           }
//       //         }
//       //         return true; // Car is available if there's no clash with the blocked range
//       //       });
//       //       // Match city or address
//       //       const valideCity = carCity.includes(userCity) || userCity.includes(carCity);
//       //       const valideAddress = carAddress.includes(userAddress) || userAddress.includes(carAddress);
//       //       return (valideCity || valideAddress) && isAvailable;
//       //     });
//       //   } else {
//       //     // If no booking details, show all cars
//       //     console.log("No booking details available, showing all cars.");
//       //     state.filteredCars = state.cars.concat(state.cars, state.cars, state.cars, state.cars, state.cars, state.cars, state.cars, state.cars);         
//       //     state.totalPages = Math.ceil(state.filteredCars.length / state.itemsPerPage); 
//       //   }
//       //   state.totalPages = Math.ceil(state.filteredCars.length / state.itemsPerPage); 
//       //   state.isLoading = false;
//       // })

// // .addCase(fetchCars.fulfilled, (state, action) => {
// //   console.log("fetchCars.fulfilled action.payload", action.payload);
// //   state.cars = action.payload.all_cars; // Store all fetched cars  
// //   // If bookingDetails exist, apply the filtering logic
// //   const { pick_up_agency, drop_off_agency, pick_up_time, drop_off_time } = state.filters.bookingDetails || {};
// //   if (pick_up_agency && pick_up_time && drop_off_agency && drop_off_time) {
// //     const userCity = pick_up_agency.name.toLowerCase();  // Assuming name is the city
// //     const userAddress = pick_up_agency.address.toLowerCase();
// //     console.log("Filtering based on booking details...");
// //     state.filteredCars = state.cars.filter(car => {
// //       const carCity = car.agencies.city_agence.toLowerCase();
// //       const carAddress = car.agencies.address_agence.toLowerCase();
// //       const userPickUpDate = new Date(pick_up_time);
// //       const userDropOffDate = new Date(drop_off_time);
// //       // Check car's availability for the selected dates
// //       const isAvailable = car.availabilities.every(range => {
// //         const carStartDate = new Date(range.date_start);
// //         const carEndDate = new Date(range.date_end);
// //         // If the availability flag is 1 (meaning available), skip the blocked range
// //         if (range.availability === 0) {
// //           // Check if the user's pick-up or drop-off date falls within the blocked range
// //           if (
// //             (userPickUpDate >= carStartDate && userPickUpDate <= carEndDate) ||
// //             (userDropOffDate >= carStartDate && userDropOffDate <= carEndDate)
// //           ) {
// //             return false; // If any date clashes, the car is unavailable
// //           }
// //         }
// //         return true; // Car is available if there's no clash with the blocked range
// //       });
// //       // Match city or address
// //       const valideCity = carCity.includes(userCity) || userCity.includes(carCity);
// //       const valideAddress = carAddress.includes(userAddress) || userAddress.includes(carAddress);
// //       return (valideCity || valideAddress) && isAvailable;
// //     });
// //   } else {
// //     // If no booking details, show all cars
// //     console.log("No booking details available, showing all cars.");
// //     state.filteredCars = state.cars;
// //   }
// //   state.totalPages = Math.ceil(state.filteredCars.length / state.itemsPerPage); 
// //   state.isLoading = false;
// // })





//    // setPriceFilter: (state, action) => {
//     //   state.filters.price = action.payload;
//     //   state.filteredCars = state.cars.filter(car => car.price <= action.payload);},

//         // setPriceFilter: (state, action) => {
//     //   state.filters.price = action.payload;
//     //   state.filteredCars = state.cars.filter(car => car.price <= action.payload);
//     //   state.totalPages = Math.ceil(state.filteredCars.length / state.itemsPerPage); 
//     // },
