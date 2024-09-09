import React, { useState, useEffect } from 'react';

// Fonction pour filtrer les voitures en fonction du kilométrage
const filterCarsByMileage = (cars, mileageType) => {
  if (!cars) return [];
  if (mileageType === 'Limited') {
    return cars.filter(car => car.mileage <= 10000); 
  } else if (mileageType === 'Unlimited') {
    return cars.filter(car => car.mileage > 10000); 
  }
  return cars;
};

const MileageFilter = ({ cars, handleMileageChange }) => {
  const [selectedMileages, setSelectedMileages] = useState([]);
  const [limitedCars, setLimitedCars] = useState([]);
  const [unlimitedCars, setUnlimitedCars] = useState([]);

  useEffect(() => {
    setLimitedCars(filterCarsByMileage(cars, 'Limited'));
    setUnlimitedCars(filterCarsByMileage(cars, 'Unlimited'));
  }, [cars]);

  useEffect(() => {
    handleMileageChange(selectedMileages);
  }, [selectedMileages]);

  const handleCheckboxChange = (mileageType) => {
    setSelectedMileages(prevSelectedMileages =>
      prevSelectedMileages.includes(mileageType)
        ? prevSelectedMileages.filter(type => type !== mileageType)
        : [...prevSelectedMileages, mileageType]
    );
  };

  return (
    <>
      <div className="row y-gap-10 items-center justify-between">
        <div className="col-auto">
          <div className="form-checkbox d-flex items-center">
            <input
              type="checkbox"
              onChange={() => handleCheckboxChange('Limited')}
              checked={selectedMileages.includes('Limited')}
            />
            <div className="form-checkbox__mark">
              <div className="form-checkbox__icon icon-check" />
            </div>
            <div className="text-15 ml-10">Limited</div>
          </div>
        </div>
        <div className="col-auto">
          <div className="text-15 text-light-1">{limitedCars.length}</div>
        </div>
      </div>
      {/* End .row */}
      <div className="row y-gap-10 items-center justify-between">
        <div className="col-auto">
          <div className="form-checkbox d-flex items-center">
            <input
              type="checkbox"
              onChange={() => handleCheckboxChange('Unlimited')}
              checked={selectedMileages.includes('Unlimited')}
            />
            <div className="form-checkbox__mark">
              <div className="form-checkbox__icon icon-check" />
            </div>
            <div className="text-15 ml-10">Unlimited</div>
          </div>
        </div>
        <div className="col-auto">
          <div className="text-15 text-light-1">{unlimitedCars.length}</div>
        </div>
      </div>
      {/* End .row */}
    </>
  );
};

export default MileageFilter;
