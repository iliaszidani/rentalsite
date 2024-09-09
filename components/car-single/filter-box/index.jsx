"use client";
import { useEffect, useState } from "react";
import DateSearch from "../../hero/DateSearch";
import GuestSearch from "./GuestSearch";
import LocationSearch from "./LocationSearch";
import { useDispatch, useSelector } from "react-redux";
import { setSearchData } from "@/features/searchData/searchDataSlice";

const index = ({ carDetails, setDays, setExtras, ExtrasValues }) => {
  console.log(" ExtrasValues ", ExtrasValues);
  const { searchData } = useSelector((state) => state.searchData);
  const dispatch = useDispatch();
  const [dataToSend, setDataToSend] = useState({
    pickUpAgence: "",
    dropOffAgence: "",
    pickUpDate: "",
    dropOffDate: "",
    extras: ExtrasValues || {
      name: "",
      value: "",
    },
  });
  useEffect(() => {
    setDataToSend((prev) => ({ ...prev, ["extras"]: ExtrasValues }));
  }, [ExtrasValues]);
  const handleBookSubmit = (val) => {
    console.log("clicked sub", searchData);
  };
  console.log("carDetails ", carDetails)

  return (
    <>
    <div className="col-12  " 
   
    >
    <LocationSearch
    searchData={searchData}
      //if ( carSinglePage ){
      disabled={true}
      // }
      isDropOff={false}
      carDetails={carDetails.car}
      // changeDataFilter={handleFilterChange}
      // initialData={initialData}
      required
    />
    </div>

   {

     searchData?.isDifferentLocations &&
    <div className="col-12"> <LocationSearch
            //if ( carSinglePage ){
              searchData={searchData}
            disabled={true}
            // }

            // changeDataFilter={handleFilterChange}
            isDropOff={true}
            // initialData={initialData}
            required
          />
    
    </div>
}
    <div className="col-12">
      <div className="searchMenu-date px-20 py-10 border-light rounded-4 -right js-form-dd js-calendar">
        <div>
          <h4 className="text-15 fw-500 ls-2 lh-16">Date</h4>
          <DateSearch
          carAvailabilities={carDetails.availabilities}
          // changeDataFilter={handleFilterChange}
          // initialData={initialData}
          isDropOff={false}
          required
        />
        </div>
      </div>
    </div>
    <div className="col-12">
      <div className="searchMenu-date px-20 py-10 border-light rounded-4 -right js-form-dd js-calendar">
        <div>
          <h4 className="text-15 fw-500 ls-2 lh-16">Date</h4>
          <DateSearch 
          carAvailabilities={carDetails.availabilities}
          // changeDataFilter={handleFilterChange}
          // initialData={initialData}
          isDropOff={true}
          required
        />
        </div>
      </div>
    </div>
    <div className="col-12">
      <GuestSearch     optionsDetails={carDetails.vendor_options} />
    </div>
    {
      searchData.isFilled &&
    <div className="home-checkbox">
          <input
            id="searchbox-toolbox-drop-off-checkbox-desktop"
            type="checkbox"
            name="Je souhaite restituer la voiture à un autre endroit"
            value="in-range"
            style={{ width: "50px" }}
            checked={searchData.isDifferentLocations}
            onChange={() => { 

              dispatch( setSearchData({...searchData, isDifferentLocations: !searchData.isDifferentLocations}))
              
              // setDifferentLocations(!differentLocations)
             }}
          />
          <label htmlFor="searchbox-toolbox-drop-off-checkbox-desktop">
            <span className={`checkbox-label text-dark  `}>
              Drop car off at different location
            </span>
          </label>
        </div>
    }
   

    <div className="col-12">
      <button
        className="button -dark-1 py-15 px-35 h-60 col-12 rounded-4 bg-yellow-1 text-dark-1"
        onClick={(val) => handleBookSubmit(val)}
      >
        <i className="icon-search text-20 mr-10" />
        Book Now
      </button>
    </div>
  </>
  );
};

export default index;
