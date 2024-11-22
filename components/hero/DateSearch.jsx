
// "use client";

// import { setSearchData } from "@/features/searchData/searchDataSlice";
// import React, { useEffect, useState } from "react";
// import DatePicker from "react-multi-date-picker";
// import TimePicker from "react-multi-date-picker/plugins/analog_time_picker";
// import { useDispatch, useSelector } from "react-redux";

// const DateSearch = ({
//   // changeDataFilter,
//   // initialData,
//   isDropOff,
//   carAvailabilities = null
// }) => {
//   const dispatch = useDispatch();
//   const { searchData } = useSelector((state) => state.searchData);
  
//   // const [date, setDate] = useState(isDropOff ? searchData.drop_off_time : searchData.pick_up_time || null); // Local date state

//   // Handle date change from DatePicker
//   const handleChange = (e) => {
//     const selectedDate = e?.toDate(); // Convert to Date object
//     // setDate(selectedDate);

//     // Update the searchData in the Redux store
//     const updatedSearchData = isDropOff
//       ? { ...searchData, drop_off_time: selectedDate }
//       : { ...searchData, pick_up_time: selectedDate };

//     dispatch(setSearchData(updatedSearchData));
//   };

//   // Calculate the minimum selectable date
//   const getMinDate = () => { 
//     if (isDropOff && searchData.pick_up_time) {
//       const minDate = new Date(searchData.pick_up_time);
//       minDate.setDate(minDate.getDate() + 1); // Drop-off must be 1 day after pick-up
//       return minDate;
//     } else if (isDropOff) {
//       const tomorrow = new Date();
//       tomorrow.setDate(tomorrow.getDate() + 1);
//       return tomorrow;
//     }
//     return new Date(); // Default min date is today for pick-up
//   };

 
//   return (
//     <div className="text-15 text-light-1 ls-2 lh-16 custom_dual_datepicker">
//       <DatePicker
//         value={isDropOff ? searchData.drop_off_time : searchData.pick_up_time || null} // Use local state for the selected date
//         placeholder="Select time"
//         format="DD/MM/YYYY HH:mm"
//         minDate={getMinDate()} // Apply minimum date
//         plugins={[<TimePicker hideSeconds />]} // Use the time picker plugin
//         onChange={handleChange} // Update state on date change
//         required
//       />
//     </div>
//   );
// };

// export default DateSearch;
"use client";

import { setSearchData } from "@/features/searchData/searchDataSlice";
import React, { useEffect, useState } from "react";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/analog_time_picker";
import { useDispatch, useSelector } from "react-redux";

const DateSearch = ({
  isDropOff,
  carAvailabilities = null , t ,  outerFilter= false
}) => {
  const dispatch = useDispatch();
  const { searchData } = useSelector((state) => state.searchData);
  const [initialDate, setInitialDate] = useState("");


  // this logic inside useEffect will get the first valid date to fill the pick up by  a valid initial value ( cauuse today date could be unavailable)
  useEffect(() => {
    
    if (carAvailabilities) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const validDates = carAvailabilities
      .filter(availability => availability.availability === 1)
      .map(availability => new Date(availability.date_start))
      .filter(date => date >= today); // Exclude past dates
      if (validDates.length > 0) {
        const minValidDate = new Date(Math.min(...validDates)).toISOString();
        if(!searchData.pick_up_time){
        
          dispatch(setSearchData({...searchData,  pick_up_time: minValidDate}))
        }
        setInitialDate(minValidDate);
      }
    }
  }, [carAvailabilities]);

  const handleChange = (e) => {
    const selectedDate = e?.toDate();
    const className = getClassName(e);  
    const offset = selectedDate.getTimezoneOffset(); // in minutes
 

    if (className === "unavailable") {
      return; // Do not update state if the date is unavailable
    }

    const updatedSearchData = isDropOff
      ? { ...searchData, drop_off_time:  new Date(selectedDate.getTime() - offset * 60 * 1000).toISOString() } //was drop_off_time:selectedDate
      : { ...searchData, pick_up_time:  new Date(selectedDate.getTime() - offset * 60 * 1000).toISOString() };

    dispatch(setSearchData(updatedSearchData));
  };

  const getMinDate = () => { 
    if (isDropOff && searchData.pick_up_time) {
      const minDate = new Date(searchData.pick_up_time);
      minDate.setDate(minDate.getDate() + 1);
      return minDate;
    } else if (isDropOff) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      return tomorrow;
    }
    return new Date();
  };

  const getClassName = (date) => {
    if (!carAvailabilities) return "";
  
    const formattedDate = date.format("YYYY-MM-DD HH:mm");  // Format the date to include time
    const today = new Date().toISOString().split("T")[0] + " " + new Date().toTimeString().split(" ")[0].slice(0, 5);  // Current date and time
  
    // Ensure the date is not in the past
    if (formattedDate < today) return "";
  
    // Find if any availability object matches the date range
    const availability = carAvailabilities.find(
      (availability) => formattedDate >= availability.date_start && formattedDate <= availability.date_end
    );
  
    // Check the availability status
    if (availability) {
      return availability.availability === 1 ? "available" : "unavailable";
    } else {
      return "unavailable";
    }
  };

  return (
    <div className="text-15 text-light-1 ls-2 lh-16 custom_dual_datepicker">
      <DatePicker
        
        value={isDropOff ? searchData.drop_off_time : searchData.pick_up_time || initialDate}
        placeholder={outerFilter ?t("selectDateAndTime") : t("HomePage.BookingForm.selectDateAndTime") }  
        format="DD/MM/YYYY HH:mm"
        minDate={getMinDate()}
        plugins={[<TimePicker hideSeconds key="time-picker" />]}
        onChange={handleChange}
        required
        mapDays={({ date }) => {
          const className = getClassName(date);
          const isUnavailable = className === "unavailable";

          return {
            className,
            disabled:isUnavailable,
            attributes: {
              title: isUnavailable ? "Unavailable" : "Available",
              style: {
                cursor: isUnavailable ? "not-allowed" : "pointer  ",
              },
            },
          };
        }}
      />
    </div>
  );
};

export default DateSearch;