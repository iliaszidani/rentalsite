
'use client'

import { setSearchData } from "@/features/searchData/searchDataSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
 

const LocationSearch = ({setDataToSend,  isDropOff ,searchData , carDetails}) => {
  console.log('LocationSearchcar ', carDetails)
  const [selectedItem, setSelectedItem] = useState(null);
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState(isDropOff ? searchData.drop_off_agency.name : searchData.pick_up_agency.name);

  const locationSearchContent = [
    {
      id: 1,
      name: "London",
      address: "Greater London, United Kingdom",
    },
    {
      id: 2,
      name: "New York",
      address: "New York State, United States",
    },
    {
      id: 3,
      name: "Paris",
      address: "France",
    },
    {
      id: 4,
      name: "Madrid",
      address: "Spain",
    },
    {
      id: 5,
      name: "Santorini",
      address: "Greece",
    },
  ];

  useEffect(() => {
    if (carDetails?.agencies?.city_agence) {
      dispatch(
        setSearchData({
          ...searchData,
          pick_up_agency: {
            ...searchData.pick_up_agency, // Spread the existing pick_up_agency object
            name: carDetails.agencies.city_agence, // Update the name property
          },
        })
      );
    }
  },  []);
  
  const handleOptionClick = (item) => {
    setSearchValue(item.name);
    setSelectedItem(item);
    setDataToSend((prev)=>({...prev,[isPickUp?"pickUpAgence":"dropOffAgence"  ]:item.name+", "+item.address}));
    
  };



  return (
    <>
    <div
  className="searchMenu-loc px-20 py-10 border-light rounded-4 js-form-dd js-liverSearch"
  style={{
    backgroundColor: !isDropOff ? "#e9ecef" : "transparent",   
    cursor: !isDropOff ? "not-allowed" : "auto",             
    opacity: !isDropOff ? 0.65 : 1,                           
    pointerEvents: !isDropOff ? "none" : "auto"                
  }}
>
 

        <div
          data-bs-toggle="dropdown"
          data-bs-auto-close="true"
          data-bs-offset="0,22"
        >
          <h4 className="text-15 fw-500 ls-2 lh-16">{!isDropOff ?"Pick up Location": "Drop off Location"}</h4>
          <div className="text-15 text-light-1 ls-2 lh-16">
            <input

              autoComplete="off"
              type="search"
              placeholder="City or Airport"
              className="js-search js-dd-focus disabled"
              // value={searchValue  }
              value={isDropOff ?  searchData.drop_off_agency.name : carDetails.agencies.city_agence  }
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </div>
        {/* End location Field */}

        <div className="shadow-2 dropdown-menu min-width-400"  >
          <div className="bg-white px-20 py-20 sm:px-0 sm:py-15 rounded-4">
            <ul className="y-gap-5 js-results">
              {locationSearchContent.map((item) => (
                
               <li
                  className={`-link d-block col-12 text-left rounded-4 px-20 py-15 js-search-option mb-1 ${
                    selectedItem && selectedItem.id === item.id ? "active" : ""
                  }`}
                  key={item.id}
                  role="button"
                  onClick={() => handleOptionClick(item)}
                >
                  <div className="d-flex">
                    <div className="icon-location-2 text-light-1 text-20 pt-4" />
                    <div className="ml-10">
                      <div className="text-15 lh-12 fw-500 js-search-option-target">
                        {item.name}
                      </div>
                      <div className="text-14 lh-12 text-light-1 mt-5">
                        {item.address}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default LocationSearch;
