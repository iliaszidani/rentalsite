
"use client";

import { useDispatch } from "react-redux";
import {filterAll, sortCarsByPrice} from "@/features/car/carSlice";
const TopHeaderFilter = ({  isAscending, sortedCarsLength , t }) => {
  // increment 
  const dispatch = useDispatch();
  const messageCarsCount =  sortedCarsLength === 0 ?t("CarsPage.noCarsFound") : sortedCarsLength ===1 ? `${sortedCarsLength} ${t("CarsPage.carFound")}`: `${sortedCarsLength}  ${t("CarsPage.carsFound")}` ;
  return (
    <>
      <div className="row y-gap-10 items-center justify-between">
        <div className="col-auto">
          <div className="text-18">
            <span className="fw-500">{messageCarsCount}  </span> 
          </div>
        </div>
        {/* End .col */}
        <div className="col-auto">
          <div className="row x-gap-20 y-gap-20">
            <div className="col-auto">
            </div>
            <div className="dropdown">
  <button className="button-blue-1 h-40 px-20 rounded-100 bg-blue-1-05 text-15 text-blue-1" 
  type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
  <i className="icon-up-down text-14 mr-10" />
  {t("CarsPage.sortBtn")}
  </button>
  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
  <li><button className="dropdown-item bg-blue-1-05 text-15 text-blue-1" 
   onClick={()=>dispatch(filterAll({reqSort:true}))} > {t("CarsPage.sortContent")} {isAscending ? 
    <p className="p-icon">   
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 18.75 7.5-7.5 7.5 7.5" />
  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 7.5-7.5 7.5 7.5" />
</svg>
</p> :  <p className="p-icon"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} 
stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
</svg>
</p>}</button></li>
    {/* <li><a className="dropdown-item bg-blue-1-05 text-15 text-blue-1"onClick={onSort} >dec-</a></li> */}
  </ul> 
</div>
            {/* End .col */}
            <div className="col-auto d-none xl:d-block">
              <button
                data-bs-toggle="offcanvas"
                data-bs-target="#listingSidebar"
                className="button -blue-1 h-40 px-20 rounded-100 bg-blue-1-05 text-15 text-blue-1"
              >
                <i className="icon-up-down text-14 mr-10" />
                {t("CarsPage.filterBtn")}
              </button>
            </div>
            {/* End .col */}
          </div>
          {/* End .row */}
        </div>
        {/* End .col */}
      </div>
      {/* End .row */}
    </>
  );
};

export default TopHeaderFilter;
