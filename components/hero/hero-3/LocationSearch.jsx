
'use client'

import { useState } from "react";
import { locationSearchContent } from '../../../data/locations';
const LocationSearch = ({isDropOff,changeDataFilter,initialData = {}}) => {
  console.log("location search ", initialData)
  const [searchValue, setSearchValue] = useState(isDropOff ? initialData?.dropOffAgency?.name || "" : initialData?.pickUpAgency?.name || "");
  const [selectedItem, setSelectedItem] = useState(null);

  // const locationSearchContent = [
  //   {
  //     id: 1,
  //     name: "London",
  //     type:"city",
  //     address: "Greater London, United Kingdom",
  //   },
  //   {
  //     id: 2,
  //     name: "New York",
  //      type:"city",
  //     address: "New York State, United States",
  //   },
  //   {
  //     id: 3,
  //     name: "Aéroport Mohammed V de Casablanca (CMN)",
  //      type:"airport",
  //     address: "Casablanca, Maroc",
  //   },
  //   {
  //     id: 4,
  //     name: "Madrid",
  //      type:"city",
  //     address: "Spain",
  //   },
  //   {
  //     id: 5,
  //     name: "Santorini",
  //      type:"city",
  //     address: "Greece",
  //   },
  // ];

  const filteredLocations = locationSearchContent
  .filter((item) => {
    const formatedName = item.name.replace(/î|ï/g, "i").replace(/é|è/g, "e");
 
   return formatedName.toLowerCase().includes(searchValue.toLowerCase());
  }
  )
  .slice(0, 5); // Limit the displayed items to 5


  const handleOptionClick = (item) => {
    setSearchValue(item.name);
    setSelectedItem(item);
    let name = isDropOff ? "drop_off_agency":"pick_up_agency"
    changeDataFilter(name,item);

  };

  return (
    <>
      <div className="searchMenu-loc px-30 lg:py-20 lg:px-0 js-form-dd js-liverSearch">
        <div
          data-bs-toggle="dropdown"
          data-bs-auto-close="true"
          data-bs-offset="0,22"
        >
          <h4 className="text-15 fw-500 ls-2 lh-16">{isDropOff ? "Drop off Location":"Pick up Location"}</h4>
          <div className="text-15 text-light-1 ls-2 lh-16">
            <input
              autoComplete="off"
              type="search"
              placeholder="City or Airport"
              className="js-search js-dd-focus"
              value={searchValue || initialData?.pickUpAgency?.name}
              onChange={(e) => setSearchValue(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="shadow-2 dropdown-menu min-width-400">
          <div className="bg-white px-20 py-20 sm:px-0 sm:py-15 rounded-4">
            <ul className="y-gap-5 js-results">
              {filteredLocations.length>0 ? filteredLocations.map((item) => (
                <li
                  className={`-link d-block col-12 text-left rounded-4 px-20 py-15 js-search-option mb-1 ${
                    selectedItem && selectedItem.id === item.id ? "active" : ""
                  }`}
                  key={item.id}
                  role="button"
                  onClick={() => handleOptionClick(item)}
                  // if(!isHome) onChange call function same as filteredLocations initialisation
                >
                  <div className="d-flex">
                    {
                      item.type === 'city' ?
                      <div className="icon-location-2 text-light-1 text-20 pt-4" /> : <div className="icon-airplane text-light-1 text-20 pt-4 bg-infos" />
                    }
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
              ) ): "No Results Found"}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default LocationSearch;
