import Map from "../sidebar/Map";
import LocationFilters from "../sidebar/LocationFilters";
import PirceSlider from "../sidebar/PirceSlider";
import CategorieFilters from "../sidebar/CategorieFilters";
import SupplierFilters from "../sidebar/SupplierFilters";
import SpecificationsFilter from "../sidebar/SpecificationsFilter";
import MileageFilter from "../sidebar/MileageFilter";
import TransmissionFilter from "../sidebar/TransmissionFilter";
import FuelPolicyFilter from "../sidebar/FuelPolicyFilter";
import React, { useState, useEffect } from 'react';
import {setFuelTypeFilter} from '@/features/car/carSlice'
import { useDispatch } from 'react-redux';


const filterCarsByFuelType = (cars, fuelType) => {
  return cars.filter(car => car.fuel_type === fuelType);
};

const FuelTypeFilter = ({ cars , handleFuelTypeChange }) => {
  const dispatch = useDispatch();
  const [selectedFuelTypes, setSelectedFuelTypes] = useState([]);
  const [gasolineCars, setGasolineCars] = useState([]);
  // const [dieselCars, setDieselCars] = useState([]);
  // const [electricCars, setElectricCars] = useState([]);
  const [hybridCars, setHybridCars] = useState([]);

  useEffect(() => {
    setGasolineCars(filterCarsByFuelType(cars, 'Gasoline'));
    setHybridCars(filterCarsByFuelType(cars, 'Hybrid'));
  }, [cars]);

  useEffect(() => {
    dispatch(setFuelTypeFilter(selectedFuelTypes));
  }, [selectedFuelTypes]);

  const handleCheckboxChange = (fuelType) => {
    console.log('car fuelType ',fuelType);
    console.log('selected fuelTypes bef: ' ,selectedFuelTypes)
    setSelectedFuelTypes(prevSelectedFuelTypes =>
      prevSelectedFuelTypes.includes(fuelType)
        ? prevSelectedFuelTypes.filter(type => type !== fuelType)
        : [...prevSelectedFuelTypes, fuelType]
    );
    console.log('selected fuelTypes aft: ' ,selectedFuelTypes)
  };
  return (
    <>
      <div className="row y-gap-10 items-center justify-between">
        <div className="col-auto">
          <div className="form-checkbox d-flex items-center">
            <input
              type="checkbox"
              onChange={() => handleCheckboxChange('Gasoline')}
              checked={selectedFuelTypes.includes('Gasoline')}
            />
            <div className="form-checkbox__mark">
              <div className="form-checkbox__icon icon-check" />
            </div>
            <div className="text-15 ml-10">Gasoline</div>
          </div>
        </div>
        <div className="col-auto">
          <div className="text-15 text-light-1">{gasolineCars.length}</div>
        </div>
      </div>
      {/* End .row */}
      {/* <div className="row y-gap-10 items-center justify-between">
        <div className="col-auto">
          <div className="form-checkbox d-flex items-center">
            <input
              type="checkbox"
              onChange={() => handleCheckboxChange('Diesel')}
              checked={selectedFuelTypes.includes('Diesel')}
            />
            <div className="form-checkbox__mark">
              <div className="form-checkbox__icon icon-check" />
            </div>
            <div className="text-15 ml-10">Diesel</div>
          </div>
        </div>
        <div className="col-auto">
          <div className="text-15 text-light-1">{dieselCars.length}</div>
        </div>
      </div> */}
      {/* End .row */}
      {/* <div className="row y-gap-10 items-center justify-between">
        <div className="col-auto">
          <div className="form-checkbox d-flex items-center">
            <input
              type="checkbox"
              onChange={() => handleCheckboxChange('Electric')}
              checked={selectedFuelTypes.includes('Electric')}
            />
            <div className="form-checkbox__mark">
              <div className="form-checkbox__icon icon-check" />
            </div>
            <div className="text-15 ml-10">Electric</div>
          </div>
        </div>
        <div className="col-auto">
          <div className="text-15 text-light-1">{electricCars.length}</div>
        </div>
      </div> */}
      {/* End .row */}
      <div className="row y-gap-10 items-center justify-between">
        <div className="col-auto">
          <div className="form-checkbox d-flex items-center">
            <input
              type="checkbox"
              onChange={() => handleCheckboxChange('Hybrid')}
              checked={selectedFuelTypes.includes('Hybrid')}
            />
            <div className="form-checkbox__mark">
              <div className="form-checkbox__icon icon-check" />
            </div>
            <div className="text-15 ml-10">Hybrid</div>
          </div>
        </div>
        <div className="col-auto">
          <div className="text-15 text-light-1">{hybridCars.length}</div>
        </div>
      </div>
      {/* End .row */}
    </>
  );
};
const CommentairesFilters = () => {
  return (
    <div>
      <div className="form-checkbox d-flex items-center">
        <input type="checkbox" />
        <div className="form-checkbox__mark">
          <div className="form-checkbox__icon icon-check" />
        </div>
        <div className="text-15 ml-10">Très bien : 8 et plus</div>
        <div className="text-15 text-light-1 ml-20">0</div>
      </div>
      <div className="form-checkbox d-flex items-center">
        <input type="checkbox" />
        <div className="form-checkbox__mark">
          <div className="form-checkbox__icon icon-check" />
        </div>
        <div className="text-15 ml-10">Bien : 7 et plus</div>
        <div className="text-15 text-light-1 ml-10">0</div>
      </div>
    </div>
  );
};
const Sidebar = ({ cars,filterCarsByPrice, handleCategoryChange ,handleFuelTypeChange ,
  handleTransmissionChange ,handleMileageChange ,handleSpecificationsChange}) => {
  return (
    <>
      <div className="sidebar__item -no-border position-relative">
        <Map />
      </div>
      {/* End find map */}
      <div className="sidebar__item">
        <h5 className="text-18 fw-500 mb-10">Location</h5>
        <div className="sidebar-checkbox">
          <LocationFilters />
        </div>
        {/* End Sidebar-checkbox */}
      </div>
      {/* End Location filter */}
      <div className="sidebar__item">
        <h5 className="text-18 fw-500 mb-10">Categorie</h5>
        <div className="sidebar-checkbox">
        <CategorieFilters onCategoryChange={handleCategoryChange} />
        </div>
        {/* End Sidebar-checkbox */}
      </div>
      {/* End Category filter */}
      <div className="sidebar__item pb-30">
        <h5 className="text-18 fw-500 mb-10">Prix</h5>
        <div className="row x-gap-10 y-gap-30">
          <div className="col-12">
            <PirceSlider/>
          </div>
        </div>
      </div>
      {/* End Price filter */}
      {/* <h5 className="text-18 fw-500 mb-10">Supplier</h5>
<div className="sidebar-checkbox">
  <SupplierFilters />
</div> */}
<div className="sidebar__item">
  <h5 className="text-18 fw-500 mb-10">Note des commentaires</h5>
  <div className="sidebar-checkbox">
    <CommentairesFilters />
  </div>
  {/* End Sidebar-checkbox */}
</div>
      {/* End Supplier filter */}
      <div className="sidebar__item">
        <h5 className="text-18 fw-500 mb-10">Specifications</h5>
        <div className="sidebar-checkbox">
          <SpecificationsFilter cars={cars} handleSpecificationsChange={handleSpecificationsChange} />
        </div>
      </div>
      {/* End Specifications filter */}
      {/* <div className="sidebar__item">
        <h5 className="text-18 fw-500 mb-10">Mileage/Kilometres</h5>
        <div className="sidebar-checkbox">
          <MileageFilter  cars={cars} handleMileageChange={handleMileageChange}/>
        </div> */}
        {/* End Sidebar-checkbox */}
      {/* </div> */}
      {/* End Kilometres filter */}
      <div className="sidebar__item">
        <h5 className="text-18 fw-500 mb-10">Transmission</h5>
        <div className="sidebar-checkbox">
        <TransmissionFilter cars={cars} handleTransmissionChange={handleTransmissionChange}  />
        </div>
        {/* End Sidebar-checkbox */}
      </div>
      {/* End Transmission filter */}
{/* 
      <div className="sidebar__item"> */}
        {/* <h5 className="text-18 fw-500 mb-10">Fuel Policy</h5>
        <div className="sidebar-checkbox">
          <FuelPolicyFilter />
        </div> */}
        {/* End Sidebar-checkbox */}
      {/* </div> */}
      {/* End Fuel Policy filter */}
      
      {/* <div className="sidebar__item">
        <h5 className="text-18 fw-500 mb-10">Votre Fournisseurs</h5>
        <div className="sidebar-checkbox">
          <FournisseurFilter />
        </div>
      </div> */}
      {/* End Fournisseur filter */}
      {/* <div className="sidebar__item">
        <h5 className="text-18 fw-500 mb-10">Dépôt de garantie à la prise en charge</h5>
        <div className="sidebar-checkbox">
          <DepotGarantieFilter />
        </div>  */}
        {/* End Sidebar-checkbox */}
      {/* </div> */}
      {/* End Depot de garantie filter */}
      <div className="sidebar__item">
        <h5 className="text-18 fw-500 mb-10">Voiture carburant</h5>
        <div className="sidebar-checkbox">
          <FuelTypeFilter cars={cars} handleFuelTypeChange={handleFuelTypeChange}/>
        </div>
      </div>
      {/* End Voiture Electronique filter */}
    </>
  );
};
export default Sidebar;
