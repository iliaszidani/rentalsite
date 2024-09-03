
// 'use client'

// import React, { useState } from "react";
// import DatePicker, { DateObject } from "react-multi-date-picker";
// import TimePicker from "react-multi-date-picker/plugins/time_picker";
// import DatePanel from "react-multi-date-picker/plugins/date_panel";

// const DateSearch = () => {
//   // const [dates, setDates] = useState([
//   //   new DateObject({ year: 2023, month: 1, day: 22 }),
//   //   "December 09 2020",
//   //   1597994736000, //unix time in milliseconds (August 21 2020)
//   // ]);
//   const [dates, setDates] = useState([
//     new DateObject().setDay(5),
//     new DateObject().setDay(14).add(1, "month"),
//   ]);

//   return (
//     <div className="text-15 text-light-1 ls-2 lh-16 custom_dual_datepicker">
//       <DatePicker
//         inputClass="custom_input-picker"
//         containerClassName="custom_container-picker"
//         value={dates}
//         onChange={setDates}
//         numberOfMonths={2}
//         offsetY={10}
//         range
//         minDate={new Date()}
//         rangeHover
//         format="DD/MM/YYYY  hh:mm"
//         plugins={[
//           <TimePicker position="bottom"   hideSeconds />,
//           <DatePanel markFocused color="red" />
//         ]}
//       />
//     </div>
//   );
// };

// export default DateSearch;



'use client'

import React, { useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/analog_time_picker";
import "react-multi-date-picker/styles/colors/red.css";
import DatePanel from "react-multi-date-picker/plugins/date_panel";

const DateSearch = ({changeDataFilter ,initialData ,isDropOff, searchData} ) => {
  // const [dates, setDates] = useState([
  //   new DateObject({ year: 2023, month: 1, day: 22 }),
  //   "December 09 2020",
  //   1597994736000, //unix time in milliseconds (August 21 2020)
  // ]);
  const [date, setDate] = useState(null);

  const handleChange=(e)=>{
    // console.log("me2 ", e.toDate())
    console.log("change for date called , before : ", date)
    const selectedDate = e.toDate();
    setDate(selectedDate);;
    console.log("after : ", date)
    let name = isDropOff ? "drop_off_time":"pick_up_time"
    changeDataFilter(name,e.toDate());

    // onChange of pick date setSetate off dropOff to the new date + 1
  }

  console.log("intial data ", initialData);
  const getMinDate = () => {
    if (isDropOff && searchData.pick_up_time) {

      const minDate = new Date(searchData.pick_up_time);
      minDate.setDate(minDate.getDate() + 1);
      return minDate;

    }else if(isDropOff ) {

      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      return tomorrow;

    }
    return new Date();
  };

  return (
    <div className="text-15 text-light-1 ls-2 lh-16 custom_dual_datepicker">
      <DatePicker 
      value={date ||new Date( isDropOff ? initialData?.dropOffTime: initialData?.pickUpTime  )}
      placeholder="Select time"
      className="red" 
  format="DD/MM/YYYY HH:mm"
   minDate={getMinDate()}
  plugins={[
    <TimePicker hideSeconds minDate={new Date()}  />

  ]} 
  onChange={handleChange}
  required
/>
 
    </div>
  );
};

export default DateSearch;
