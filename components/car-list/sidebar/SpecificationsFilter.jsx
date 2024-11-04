'use client'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterAll } from '@/features/car/carSlice';

const SpecificationsFilter = ({t}) => {
  const dispatch = useDispatch();
  const filters = useSelector(state => state.car.filters); // Get current filters
  const filteredCars = useSelector(state => state.car.filteredCars); // Get filtered cars

  const [selectedSpecifications, setSelectedSpecifications] = useState({
    climate_control: [],
    gps: [],
    doors: [],
  });

  const [dir, setDir] = useState('ltr');
  
    useEffect(() => {
      const direction = document.documentElement.getAttribute("dir");
      setDir(direction);
    }, []);

  // Handle filter change dynamically
  const handleCheckboxChange = (spec, value) => {
    setSelectedSpecifications(prevState => {
      const newSpecValues = prevState[spec].includes(value)
        ? prevState[spec].filter(v => v !== value)
        : [...prevState[spec], value];

      const updatedSpecifications = {
        ...prevState,
        [spec]: newSpecValues,
      };

      // Dispatch updated filters to Redux
      dispatch(filterAll({
    
        specifications:updatedSpecifications , // Pass updated specifications
      }));

      return updatedSpecifications;
    });
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
            <div className={`text-15   ${dir === "ltr"? "ml-10":"mr-10"} `}>{t("CarsPage.SideFilter.Specifications.climateControl")}</div>
          </div>
        </div>
        <div className="col-auto">
          <div className="text-15 text-light-1">
            {filteredCars.filter(car => car.climate_control === 1).length}
          </div>
        </div>
      </div>

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
            <div className={`text-15   ${dir === "ltr"? "ml-10":"mr-10"} `}>GPS</div>
          </div>
        </div>
        <div className="col-auto">
          <div className="text-15 text-light-1">
            {filteredCars.filter(car => car.gps === 1).length}
          </div>
        </div>
      </div>

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
            <div className={`text-15   ${dir === "ltr"? "ml-10":"mr-10"} `}>5 {t("CarsPage.SideFilter.Specifications.doors")}</div>
          </div>
        </div>
        <div className="col-auto">
          <div className="text-15 text-light-1">
            {filteredCars.filter(car => car.doors === 5).length}
          </div>
        </div>
      </div>
    </>
  );
};

export default SpecificationsFilter;
