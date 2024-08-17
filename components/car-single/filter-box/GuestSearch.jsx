
'use client'

import React, { useState } from "react";
const counters = [
  { name: "AdditionalDriver", defaultValue: 0, price:500 },
  { name: "BabySeat", defaultValue: 0, price:180 },
  // { name: "Rooms", defaultValue: 1 },
];

const Counter = ({ name, defaultValue, onCounterChange , price }) => {
  const [count, setCount] = useState(defaultValue);
  const incrementCount = () => {
    console.log()
    setCount(count + 1);
    onCounterChange(name, count + 1);
  };
  const decrementCount = () => {
    if (count > 0) {
      setCount(count - 1);
      onCounterChange(name, count - 1);
    }
  };

  return (
    <>
      <div className="row y-gap-10 justify-between items-center">
        <div className="col-auto">
          <div className="text-15 lh-12 fw-500">{name === "AdditionalDriver" ? "Additional Driver":name === "BabySeat" ? "Baby Seat":name }
          <br/>
           <span className=" small text-secondary"> {price} MAD each per rental</span> </div>
          {name === "Children" && (
            <div className="text-14 lh-12 text-light-1 mt-5">Ages 0 - 17</div>
          )}
        </div>
        {/* End .col-auto */}
        <div className="col-auto">
          <div className="d-flex items-center js-counter">
            <button
              // className="button -outline-blue-1 text-blue-1 size-38 rounded-4 js-down"
              className={ count === 0 ?" btn btn-secondary  size-38 rounded-4 js-down  opacity-25" :"button -outline-blue-1 text-blue-1 size-38 rounded-4 js-down"}
              onClick={decrementCount}
              disabled={ count === 0 }
            >
              <i className="icon-minus text-12" />
            </button>
            {/* decrement button */}
            <div className="flex-center size-20 ml-15 mr-15">
              <div className="text-15 js-count">{count}</div>
            </div>
            {/* counter text  */}
             
             
               <button
                           className={name =='BabySeat' && count >= 2 ||name =='AdditionalDriver' && count >= 2 ?" btn btn-secondary  size-38 rounded-4 js-up  opacity-25" :"button -outline-blue-1 text-blue-1   size-38 rounded-4 js-up   "}

              onClick={incrementCount}
              disabled={ name =='BabySeat' && count >= 2 ||name =='AdditionalDriver' && count >= 2}
            >
              <i className="icon-plus text-12" />
            </button>
            
            {/* increment button */}
          </div>
        </div>
        {/* End .col-auto */}
      </div>
      {/* End .row */}
      <div className="border-top-light mt-24 mb-24" />
    </>
  );
};

const GuestSearch = ( {setExtras} ) => {
  const [guestCounts, setGuestCounts] = useState({
    AdditionalDriver: 0,
    BabySeat:0,
  
  });

  const handleCounterChange = (name, value) => {

    setGuestCounts((prevState) => ({ ...prevState, [name]: value }));
    setExtras(name,value);
    //3yt lchi function mn lfo9
  };
  return (
    <div className="searchMenu-guests px-20 py-10 border-light rounded-4 js-form-dd js-form-counters">
      <div
        data-bs-toggle="dropdown"
        data-bs-auto-close="outside"
        aria-expanded="false"
        data-bs-offset="0,22"
      >
        <h4 className="text-15 fw-500 ls-2 lh-16">Extras (optional)</h4>
        <div className="text-15 text-light-1 ls-2 lh-16">
          <span className="js-count-adult">{guestCounts.AdditionalDriver}</span> Additional driver -{" "}
          <span className="js-count-child">{guestCounts.BabySeat}</span>{" "}
          Baby seat 
        </div>
      </div>
      {/* End guest */}

      <div className="shadow-2 dropdown-menu min-width-400">
        <div className="bg-white px-30 py-30 rounded-4 counter-box">
          {counters.map((counter) => (
            <Counter
              key={counter.name}
              name={counter.name}
              price={counter.price}
              defaultValue={counter.defaultValue}
              onCounterChange={handleCounterChange}
              
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default GuestSearch;
