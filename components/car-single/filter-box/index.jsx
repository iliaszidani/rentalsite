'use client';
import { useEffect, useState } from "react";
import DateSearch from "./DateSearch";
import GuestSearch from "./GuestSearch";
import LocationSearch from "./LocationSearch";

const index = ({carDetails , setDays , setExtras , ExtrasValues}) => {
  console.log(" ExtrasValues ", ExtrasValues)
  const [dataToSend ,setDataToSend]= useState({
    pickUpAgence:"",
    dropOffAgence:"",
    pickUpDate:"",
    dropOffDate:"",
    extras:ExtrasValues || {
      name:   "",
      value: ""
    }
  });
useEffect(()=>{

  setDataToSend((prev)=>({...prev,["extras"]:ExtrasValues}));
},[ExtrasValues]);
  const handleBookSubmit = (val)=>{

    console.log("clicked sub", dataToSend)
  }
 
  
  return (
    <>
      <div className="col-12">
        <LocationSearch setDataToSend={setDataToSend} isPickUp={true} />
        {/* End Pickup Location */}
      </div>
      {/* End .col-12 */}

      <div className="col-12">
        <LocationSearch  setDataToSend={setDataToSend} isPickUp={false}/>
        {/* End Drop off location  */}
      </div>
      {/* End .col-12 */}

      <div className="col-12">
        <div className="searchMenu-date px-20 py-10 border-light rounded-4 -right js-form-dd js-calendar">
          <div>
            <h4 className="text-15 fw-500 ls-2 lh-16">Pick up</h4>
            {carDetails?.availabilities && carDetails?.availabilities.length != 0 ?

<DateSearch  carAvailabilities={carDetails.availabilities} setDays={setDays} setDataToSend={setDataToSend}/>:
<DateSearch  />
            }
          </div>
        </div> 
        {/* End Pick Up Date */}
      </div>
      {/* End .col-12 */}

      <div className="col-12">
        {/* <div className="searchMenu-date px-20 py-10 border-light rounded-4 -right js-form-dd js-calendar">
          <div>
            <h4 className="text-15 fw-500 ls-2 lh-16">Drop off</h4>
            <DateSearch />
          </div>
        </div> */}
        {/* EndDrop off Date */}
      </div>
      {/* End .col-12 */}

      <div className="col-12">
        <GuestSearch setExtras={setExtras} />
        {/* End guest */}
      </div>
      {/* End .col-12 */}

      <div className="col-12">
        <button
          className="button -dark-1 py-15 px-35 h-60 col-12 rounded-4 bg-yellow-1 text-dark-1"
          // data-bs-dismiss="offcanvas"
          // aria-label="Close"
          onClick={(val)=>handleBookSubmit(val)}
        >
          <i className="icon-search text-20 mr-10" />
          Book Now
        </button>

        {/* End search button_item */}
      </div>
      {/* End .col-12 */}
    </>
  );
};

export default index;
