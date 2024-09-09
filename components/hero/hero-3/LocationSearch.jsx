// 'use client'
// import { setSearchData } from "@/features/searchData/searchDataSlice";
// import { useEffect, useRef, useState } from "react";
// import { locationSearchContent } from '../../../data/locations';
// import { useDispatch, useSelector } from "react-redux";

// const LocationSearch = ({isDropOff, changeDataFilter, initialData = {} }) => {
//   const { searchData } = useSelector((state) => state.searchData);
//   const [searchValue, setSearchValue] = useState(isDropOff ? searchData.drop_off_agency.name : searchData.pick_up_agency.name);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const dropdownRef = useRef(null);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     setSearchValue(isDropOff ? searchData.drop_off_agency.name : searchData.pick_up_agency.name);
//   }, [isDropOff, searchData]);

//   const filteredLocations = locationSearchContent
//     .filter((item) => {
//       const formatedName = item.name.replace(/î|ï/g, "i").replace(/é|è/g, "e");
//       return formatedName.toLowerCase().includes(searchValue.toLowerCase());
//     })
//     .slice(0, 5); // Limit the displayed items to 5

//   const handleOptionClick = (item) => {
//     setSearchValue(item.name);
//     setSelectedItem(item);

//     const updatedSearchData = isDropOff
//       ? { ...searchData, drop_off_agency: item }
//       : { ...searchData, pick_up_agency: item };

//     dispatch(setSearchData(updatedSearchData));
//   };

//   useEffect(() => {
//     if (dropdownRef.current) {
//       if (searchValue) {
//         dropdownRef.current.classList.add('show'); // Show dropdown when typing
//       } else {
//         dropdownRef.current.classList.remove('show'); // Hide if the input is cleared
//       }
//     }
//   }, [searchValue]);

//   return (
//     <>
//       <div className="searchMenu-loc px-30 lg:py-20 lg:px-0 js-form-dd js-liverSearch">
//         <div
//           data-bs-toggle="dropdown"
//           data-bs-auto-close="true"
//           data-bs-offset="0,22"
//         >
//           <h4 className="text-15 fw-500 ls-2 lh-16">{isDropOff ? "Drop off Location":"Pick up Location"}</h4>
//           <div className="text-15 text-light-1 ls-2 lh-16">
//             <input
//               autoComplete="off"
//               type="search"
//               placeholder="City or Airport"
//               className="js-search js-dd-focus"
//               value={searchValue}
//               onChange={(e) =>  {  
//                 setSearchValue(e.target.value); // Update local state
//                 const updatedSearchData = isDropOff
//                   ? { ...searchData, drop_off_agency: { ...searchData.drop_off_agency, name: e.target.value } }
//                   : { ...searchData, pick_up_agency: { ...searchData.pick_up_agency, name: e.target.value } };
//                 dispatch(setSearchData(updatedSearchData)); // Update Redux state
//               }}
//               required
//             />
//           </div>
//         </div>

//         <div ref={dropdownRef} className="shadow-2 dropdown-menu min-width-400">
//           <div className="bg-white px-20 py-20 sm:px-0 sm:py-15 rounded-4">
//             <ul className="y-gap-5 js-results">
//               {filteredLocations.length > 0 ? filteredLocations.map((item) => (
//                 <li
//                   className={`-link d-block col-12 text-left rounded-4 px-20 py-15 js-search-option mb-1 ${
//                     selectedItem && selectedItem.id === item.id ? "active" : ""
//                   }`}
//                   key={item.id}
//                   role="button"
//                   onClick={() => handleOptionClick(item)}
//                 >
//                   <div className="d-flex">
//                     {item.type === 'city' ?
//                       <div className="icon-location-2 text-light-1 text-20 pt-4" /> :
//                       <div className="icon-airplane text-light-1 text-20 pt-4 bg-infos" />
//                     }
//                     <div className="ml-10">
//                       <div className="text-15 lh-12 fw-500 js-search-option-target">
//                         {item.name}
//                       </div>
//                       <div className="text-14 lh-12 text-light-1 mt-5">
//                         {item.address}
//                       </div>
//                     </div>
//                   </div>
//                 </li>
//               )) : "No Results Found"}
//             </ul>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default LocationSearch;
'use client'
import { setSearchData } from "@/features/searchData/searchDataSlice";
import { useEffect, useRef, useState } from "react";
import { locationSearchContent } from '../../../data/locations';
import { useDispatch, useSelector } from "react-redux";

const LocationSearch = ({ isDropOff , disabled = false
  // , changeDataFilter, initialData = {} 
}) => {
  const { searchData } = useSelector((state) => state.searchData);
  const [searchValue, setSearchValue] = useState(isDropOff ? searchData.drop_off_agency.name : searchData.pick_up_agency.name);
  const [selectedItem, setSelectedItem] = useState(null);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setSearchValue(isDropOff ? searchData.drop_off_agency.name : searchData.pick_up_agency.name);
  }, [isDropOff, searchData]);

  const filteredLocations = locationSearchContent
    .filter((item) => {
      const formatedName = item.name.replace(/î|ï/g, "i").replace(/é|è/g, "e");
      return formatedName.toLowerCase().includes(searchValue.toLowerCase());
    })
    .slice(0, 5); // Limit the displayed items to 5

  const handleOptionClick = (item) => {
    setSearchValue(item.name);
    setSelectedItem(item);

    const updatedSearchData = isDropOff
      ? { ...searchData, drop_off_agency: item }
      : { ...searchData, pick_up_agency: item };

    dispatch(setSearchData(updatedSearchData));
    dropdownRef.current.classList.remove('show'); // Hide dropdown after selecting
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && !inputRef.current.contains(event.target)) {
        dropdownRef.current.classList.remove('show'); // Hide dropdown on outside click
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (dropdownRef.current) {
      if (searchValue && document.activeElement === inputRef.current) {
        dropdownRef.current.classList.add('show'); // Show dropdown when typing
      } else {
        dropdownRef.current.classList.remove('show'); // Hide if the input is cleared
      }
    }
  }, [searchValue]);

  return (
    <>
      <div className="searchMenu-loc px-30 lg:py-20 lg:px-0 js-form-dd js-liverSearch">
        <div>
          <h4 className="text-15 fw-500 ls-2 lh-16">{isDropOff ? "Drop off Location" : "Pick up Location"}</h4>
          <div className="text-15 text-light-1 ls-2 lh-16">
            <input
              ref={inputRef}
              autoComplete="off"
              type="search"
              placeholder="City or Airport"
              className="js-search js-dd-focus"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value); // Update local state
                const updatedSearchData = isDropOff
                  ? { ...searchData, drop_off_agency: { ...searchData.drop_off_agency, name: e.target.value } }
                  : { ...searchData, pick_up_agency: { ...searchData.pick_up_agency, name: e.target.value } };
                dispatch(setSearchData(updatedSearchData)); // Update Redux state
              }}
              onFocus={() => {
                if (searchValue) {
                  dropdownRef.current.classList.add('show'); // Show dropdown on focus
                }
              }}
              onBlur={() => {
                if (!searchValue) {
                  dropdownRef.current.classList.remove('show'); // Hide dropdown on blur if input is empty
                }
              }}
              required
              disabled={disabled}
            />
          </div>
        </div>

        <div ref={dropdownRef} className="shadow-2 dropdown-menu min-width-400">
          <div className="bg-white px-20 py-20 sm:px-0 sm:py-15 rounded-4">
            <ul className="y-gap-5 js-results">
              {filteredLocations.length > 0 ? filteredLocations.map((item) => (
                <li
                  className={`-link d-block col-12 text-left rounded-4 px-20 py-15 js-search-option mb-1 ${
                    selectedItem && selectedItem.id === item.id ? "active" : ""
                  }`}
                  key={item.id}
                  role="button"
                  onClick={() => handleOptionClick(item)}
                >
                  <div className="d-flex">
                    {item.type === 'city' ?
                      <div className="icon-location-2 text-light-1 text-20 pt-4" /> :
                      <div className="icon-airplane text-light-1 text-20 pt-4 bg-infos" />
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
              )) : "No Results Found"}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default LocationSearch;
