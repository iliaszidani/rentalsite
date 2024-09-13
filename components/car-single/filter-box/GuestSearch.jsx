'use client'

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setActiveCarExtras } from "@/features/car/carSlice";

// Counter component to handle the increment and decrement of extras
const Counter = ({ options, defaultValue, onCounterChange }) => {
  const { id, option_name, option_price, option_type } = options;
  const [count, setCount] = useState(defaultValue);

  const incrementCount = () => {
    setCount(count + 1);
    onCounterChange(id, count + 1);
  };

  const decrementCount = () => {
    if (count > 0) {
      setCount(count - 1);
      onCounterChange(id, count - 1);
    }
  };

  return (
    <>
      <div className="row y-gap-10 justify-between items-center">
        <div className="col-auto">
          <div className="text-15 lh-12 fw-500">
            {option_name.replace(/([A-Z])/g, ' $1')}
            <br />
            <span className="small text-secondary">{option_price} MAD each per { option_type ? 'rental' : "day"} </span>
          </div>
        </div>
        <div className="col-auto">
          <div className="d-flex items-center js-counter">
            <button
 type="button"              className={
                count === 0
                  ? "btn btn-secondary size-38 rounded-4 js-down opacity-25"
                  : "button -outline-blue-1 text-blue-1 size-38 rounded-4 js-down"
              }
              onClick={decrementCount}
              disabled={count === 0}
            >
              <i className="icon-minus text-12" />
            </button>
            <div className="flex-center size-20 ml-15 mr-15">
              <div className="text-15 js-count">{count}</div>
            </div>
            <button type="button"
              className={
                count >= 2
                  ? "btn btn-secondary size-38 rounded-4 js-up opacity-25"
                  : "button -outline-blue-1 text-blue-1 size-38 rounded-4 js-up"
              }
              onClick={incrementCount}
              disabled={count >= 2}
            >
              <i className="icon-plus text-12" />
            </button>
          </div>
        </div>
      </div>
      <div className="border-top-light mt-24 mb-24" />
    </>
  );
};

// GuestSearch component for managing the selection of extras
const GuestSearch = ({ optionsDetails }) => {
  const dispatch = useDispatch();

  // State to store the quantity of each extra selected
  const [guestCounts, setGuestCounts] = useState(
    optionsDetails.reduce((acc, option) => {
      acc[option.id] = 0; // Initialize all extras to 0 quantity
      return acc;
    }, {})
  );

  // Function to handle the change in quantity of extras
  const handleCounterChange = (id, value) => {
    setGuestCounts((prevState) => ({ ...prevState, [id]: value }));
  };

  // useEffect to dispatch active extras to Redux whenever guestCounts changes
  useEffect(() => {
    const activeExtras = Object.entries(guestCounts)
      .filter(([_, quantity]) => quantity > 0) // Filter only selected extras (quantity > 0)
      .map(([id, quantity]) => ({
        id: parseInt(id),
        quantity
      }));

    // Dispatch active extras to Redux
    dispatch(setActiveCarExtras(activeExtras));
  }, [guestCounts, dispatch]);

  return (
    <div className="searchMenu-guests rounded-4 js-form-dd js-form-counters">
      <div
        data-bs-toggle="dropdown"
        data-bs-auto-close="outside"
        aria-expanded="false"
        data-bs-offset="0,22"
      >
        <h4 className="text-15 fw-500 ls-2 lh-16">Extras (optional)</h4>
        <div className="text-15 text-light-1 ls-2 lh-16">
          {/* Display the current selection */}
          {Object.keys(guestCounts).map((key) => (
            <span key={key}>
              {guestCounts[key]} {optionsDetails.find((option) => option.id == key)?.option_name} -{" "}
            </span>
          ))}
        </div>
      </div>

      <div className="shadow-2 dropdown-menu min-width-400">
        <div className="bg-white px-30 py-30 rounded-4 counter-box">
          {/* Render the counter for each extra */}
          {optionsDetails.map((option) => (
            <Counter
              options={option}
              key={option.id}
              id={option.id}
              name={option.option_name}
              price={option.option_price}
              defaultValue={0}
              onCounterChange={handleCounterChange}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GuestSearch;
