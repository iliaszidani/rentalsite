import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSpecificationFilter } from '@/features/car/carSlice';

const filterCarsBySpecification = (cars, spec, values) => {
  return cars.filter(car => values.includes(car[spec]));
};

const SpecificationsFilter = ({ cars, handleSpecificationsChange }) => {
  const dispatch = useDispatch();
  const [selectedSpecifications, setSelectedSpecifications] = useState({
    climate_control: [],
    gps: [],
    doors: [],
  });
  
  const [filteredCars, setFilteredCars] = useState({
    climate_control: [],
    gps: [],
    doors: [],
  });

  useEffect(() => {
    setFilteredCars({
      climate_control: filterCarsBySpecification(cars, 'climate_control', [1]),
      gps: filterCarsBySpecification(cars, 'gps', [1]),
      doors: filterCarsBySpecification(cars, 'doors', [5]),
    });
    console.log('filteredCars', filteredCars);
  }, [cars]);
  useEffect(() => {
    dispatch(setSpecificationFilter(selectedSpecifications));
    // setSpecificationFilter(selectedSpecifications);
  }, [selectedSpecifications]);

  const handleCheckboxChange = (spec, value) => {
    console.log('handleCheckboxChange', spec, value);
    setSelectedSpecifications(prevSelectedSpecifications => {
      const specValues = prevSelectedSpecifications[spec];
      console.log('specValues', specValues);
      const newSpecValues = specValues.includes(value)
      
        ? specValues.filter(v => v !== value)
        : [...specValues, value];
        console.log('newSpecValues', newSpecValues);
      return {
        ...prevSelectedSpecifications,
        [spec]: newSpecValues,
      };
    });
    console.log('selectedSpecifications', selectedSpecifications);
  };
  return (
    <>
      <div className="row y-gap-10 items-center justify-between">
        <div className="col-auto">
          <div className="form-checkbox d-flex items-center">
            <input
              type="checkbox"
              onChange={() => handleCheckboxChange('climate_control', 1)}
              checked={selectedSpecifications.climate_control.includes(1)}
            />
            <div className="form-checkbox__mark">
              <div className="form-checkbox__icon icon-check" />
            </div>
            <div className="text-15 ml-10">Climate Control</div>
          </div>
        </div>
        <div className="col-auto">
          <div className="text-15 text-light-1">{filteredCars.climate_control.length}</div>
        </div>
      </div>
      {/* End .row */}
      <div className="row y-gap-10 items-center justify-between">
        <div className="col-auto">
          <div className="form-checkbox d-flex items-center">
            <input
              type="checkbox"
              onChange={() => handleCheckboxChange('gps', 1)}
              checked={selectedSpecifications.gps.includes(1)}
            />
            <div className="form-checkbox__mark">
              <div className="form-checkbox__icon icon-check" />
            </div>
            <div className="text-15 ml-10">GPS</div>
          </div>
        </div>
        <div className="col-auto">
          <div className="text-15 text-light-1">{filteredCars.gps.length}</div>
        </div>
      </div>
      {/* End .row */}
      <div className="row y-gap-10 items-center justify-between">
        <div className="col-auto">
          <div className="form-checkbox d-flex items-center">
            <input
              type="checkbox"
              onChange={() => handleCheckboxChange('doors', 5)}
              checked={selectedSpecifications.doors.includes(5)}
            />
            <div className="form-checkbox__mark">
              <div className="form-checkbox__icon icon-check" />
            </div>
            <div className="text-15 ml-10">5 Doors</div>
          </div>
        </div>
        <div className="col-auto">
          <div className="text-15 text-light-1">{filteredCars.doors.length}</div>
        </div>
      </div>
      {/* End .row */}
    </>
  );
};

export default SpecificationsFilter;
