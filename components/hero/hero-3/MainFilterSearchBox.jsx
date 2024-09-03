'use client'

import { useSelector, useDispatch } from "react-redux";
import { addCurrentTab } from "../../../features/hero/findPlaceSlice";
import DateSearch from "../DateSearch";
import GuestSearch from "./GuestSearch";
import LocationSearch from "./LocationSearch";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const MainFilterSearchBox = ({isHome , initialData}) => {
  const { tabs, currentTab } = useSelector((state) => state.hero) || {};
  const dispatch = useDispatch();
  const Router = useRouter();
  const [differentLocations, setDifferentLocations] = useState(initialData?.isDifferentLocations  || false);
  const [searchData, setSearchData] = useState({
    isFilled: initialData?.isFilled || false,
    isDifferentLocations: initialData?.isDifferentLocations || false,
    pick_up_agency: initialData?.pickUpAgency || "",
    drop_off_agency: initialData?.dropOffAgency || "",
    pick_up_time: initialData?.pickUpTime || "",
    drop_off_time: initialData?.dropOffTime || "",
  });

  // handleInitialDataChange // this is for date 2 should be date 1 plus 1
  useEffect(() => {
    setDifferentLocations(initialData?.isDifferentLocations || false);
  }, [initialData]);

  const handleFilterChange = (name, value) => {
    setSearchData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    if (!differentLocations) {
      searchData.drop_off_agency = searchData.pick_up_agency;
    }
    searchData.isFilled = true;
    const url = `/car-list-v1?isFilled=${searchData.isFilled}&isDifferentLocations=${differentLocations}&pick_up_agency=${encodeURIComponent(JSON.stringify(searchData.pick_up_agency))}&drop_off_agency=${encodeURIComponent(JSON.stringify(searchData.drop_off_agency))}&pick_up_time=${encodeURIComponent(searchData.pick_up_time.toString())}&drop_off_time=${encodeURIComponent(searchData.drop_off_time.toString())}`;

    // Navigate to the target page with query parameters
    Router.push(url);
  };

  return (
    <>
      {isHome && (
        <div className="tabs -bookmark js-tabs">
          <div className="tabs__controls d-flex items-center js-tabs-controls">
            <button
              key={1}
              className="tabs__button px-30 py-20 rounded-4 fw-600 text-white js-tabs-button is-tab-el-active"
            >
              <i className="icon-car text-20 mr-10"></i>
              Car
            </button>
          </div>
        </div>
      )}

      <div className="tabs__content js-tabs-content ">
        <form
          onSubmit={handleSubmit}
          className={`mainSearch ${!isHome && 'border-light'} bg-white pr-20 py-20 lg:px-20 lg:pt-5 lg:pb-20 rounded-4`}
        >
          <div className="button-grid items-center d-lg-flex justify-content-between">
            <LocationSearch
              isDropOff={false}
              changeDataFilter={handleFilterChange}
              initialData={initialData}
              required
            />
            {searchData.isFilled ? (
              initialData?.isDifferentLocations && (
                <LocationSearch
                  changeDataFilter={handleFilterChange}
                  isDropOff={true}
                  initialData={initialData}
                  required
                />
              )
            ) : (
              differentLocations && (
                <LocationSearch
                  changeDataFilter={handleFilterChange}
                  isDropOff={true}
                  initialData={initialData}
                  required
                />
              )
            )}

            <div className="searchMenu-date px-30 lg:py-20 lg:px-0 js-form-dd js-calendar">
              <div>
                <h4 className="text-15 fw-500 ls-2 lh-16">Check in</h4>
                <DateSearch
                  changeDataFilter={handleFilterChange}
                  initialData={initialData}
                  required
                />
              </div>
            </div>
            <div className="searchMenu-date px-30 lg:py-20 lg:px-0 js-form-dd js-calendar">
              <div>
                <h4 className="text-15 fw-500 ls-2 lh-16">Check out</h4>
                <DateSearch
                  changeDataFilter={handleFilterChange}
                  isDropOff={true}
                  searchData={searchData}
                  initialData={initialData}
                  required
                />
              </div>
            </div>

            <div className="button-item">
              <button
                type="submit"
                className="mainSearch__submit button -dark-1 py-15 px-35 h-60 col-12 rounded-4 bg-blue-1 text-white"
              >
                <i className="icon-search text-20 mr-10" />
                Chercher
              </button>
            </div>
          </div>
        </form>

        <div className="home-checkbox">
          <input
            id="searchbox-toolbox-drop-off-checkbox-desktop"
            type="checkbox"
            name="Je souhaite restituer la voiture à un autre endroit"
            value="in-range"
            style={{ width: "50px" }}
            checked={differentLocations}
            onChange={() => setDifferentLocations(!differentLocations)}
          />
          <label htmlFor="searchbox-toolbox-drop-off-checkbox-desktop">
            <span className={`checkbox-label ${!isHome && 'text-dark'} `}>
              Drop car off at different location
            </span>
          </label>
        </div>
      </div>
    </>
  );
};

export default MainFilterSearchBox;
