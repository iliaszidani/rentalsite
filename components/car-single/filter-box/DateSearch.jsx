'use client'

import React, { useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import { useSelector } from "react-redux";

const DateSearch = ({ carAvailabilities , setDays,setDataToSend }) => {
  const [dates, setDates] = useState([
    // new DateObject().setDay(15),
    // new DateObject().setDay(14).add(1, "month"),
  ]);

 

  const isDateDisabled = (date) => {
    
    const today = new Date();
   
    // minDate={new Date()} already handled this :
    // if (date < today) return true;

    for (let reservation of carAvailabilities) {
      if (reservation.availability === 0) {
        const startDate = new Date(reservation.date_start);
        const endDate = new Date(reservation.date_end);
        if (date >= startDate && date <= endDate) return true;
      }//also shoudl i verify if  == 1
    }
    return false;
  };

  const validateRange = (start, end) => {
    let currentDate = new Date(start);
    while (currentDate <= end) {
      if (isDateDisabled(currentDate)) return false;
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return true;
  };

  const handleDateChange = (newDates) => {
    console.log(" handleDateChange = (newDates) ", newDates)
    console.log("before : ",dates);
    if (newDates.length === 2) {
      const [start, end] = newDates.map(date => date.toDate());
      const timeDifference = end.getTime() - start.getTime();
      const daysDifference = timeDifference / (1000 * 3600 * 24);
      if (!validateRange(start, end)) {
        alert("Selected range includes disabled dates. Please choose a different range !");
        setDays(1);
        return false;
      }else if(daysDifference===0){
        alert("Select a valid range, you can't book the car for 0 days");
        setDates([]); // Clear the selected dates
        setDays(1);
        return false;
        
      }else{
        console.log("entred here")
        setDates(newDates);
      
          console.log("difference : ",end.getTime()," - ",start.getTime()," = " , timeDifference);
          console.log("nbr des jours" , daysDifference);
          setDays(daysDifference);
          setDataToSend((prev)=>({...prev,pickUpDate:start,dropOffDate:end}));
      }
    }
  
   
    console.log("after : ",dates);
  };

  return (
    <div className="text-15 text-light-1 ls-2 lh-16 custom_dual_datepicker">
      <DatePicker
        inputClass="custom_input-picker"
        containerClassName="custom_container-picker"
        value={dates}
        onChange={handleDateChange}
        numberOfMonths={2}
        offsetY={10}
        range
        rangeHover
        format="MMMM DD"
        minDate={new Date()}
        mapDays={({ date }) => {
          const isDisabled = isDateDisabled(date.toDate());
          return {
            disabled: isDisabled,
            style: isDisabled ? { color: "#ccc", textDecoration: "line-through" } : {},
          };
        }}
      />
    </div>
  );
};

export default DateSearch;
