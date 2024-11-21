'use client'
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {filterAll, setTransmissionFilter} from '@/features/car/carSlice'

const filterCarsByTransmission = (cars, transmission) => {
  return cars.filter(car => car.transmission === transmission);
};

const TransmissionFilter = ({ cars, handleTransmissionChange, t }) => { 
  const dispatch = useDispatch(); 
  const [selectedTransmissions, setSelectedTransmissions] = useState([]);
  const [automaticCars, setAutomaticCars] = useState([]);
  const [manualCars, setManualCars] = useState([]);

  const [dir, setDir] = useState('ltr');
  
  useEffect(() => {
    const direction = document.documentElement.getAttribute("dir");
    setDir(direction);
  }, []);

  useEffect(() => {
    setAutomaticCars(filterCarsByTransmission(cars, 'Automatic'));
    setManualCars(filterCarsByTransmission(cars, 'Manual'));
  }, [cars]);

  useEffect(() => {
    
    dispatch(filterAll({transmission:selectedTransmissions}));
  }, [selectedTransmissions]);

  const handleCheckboxChange = (transmission) => {
    setSelectedTransmissions(prevSelectedTransmissions =>
      prevSelectedTransmissions.includes(transmission)
        ? prevSelectedTransmissions.filter(type => type !== transmission)
        : [...prevSelectedTransmissions, transmission]
    );
  };

  return (
    <>
      <div className="row y-gap-10 items-center justify-between">
        <div className="col-auto">
          <div className="form-checkbox d-flex items-center">
            <input
              type="checkbox"
              onChange={() => handleCheckboxChange('Automatic')}
              checked={selectedTransmissions.includes('Automatic')}
            />
            <div className="form-checkbox__mark">
              <div className="form-checkbox__icon icon-check" />
            </div>
            <div className={`text-15  ${dir === "ltr"? "ml-10":"mr-10"} `}>{t("CarsPage.Gear.automatic")}</div>
          </div>
        </div>
        <div className="col-auto">
          <div className="text-15 text-light-1">{automaticCars.length}</div>
        </div>
      </div>
      {/* End .row */}
      <div className="row y-gap-10 items-center justify-between">
        <div className="col-auto">
          <div className="form-checkbox d-flex items-center">
            <input
              type="checkbox"
              onChange={() => handleCheckboxChange('Manual')}
              checked={selectedTransmissions.includes('Manual')}
            />
            <div className="form-checkbox__mark">
              <div className="form-checkbox__icon icon-check" />
            </div>
            <div className={`text-15  ${dir === "ltr"? "ml-10":"mr-10"} `}>{t("CarsPage.Gear.manual")}</div>
          </div>
        </div>
        <div className="col-auto">
          <div className="text-15 text-light-1">{manualCars.length}</div>
        </div>
      </div>
      {/* End .row */}
    </>
  );
};

export default TransmissionFilter;
