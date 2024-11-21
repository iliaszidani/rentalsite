 
import Map from "../sidebar/Map";
import LocationFilters from "../sidebar/LocationFilters";
import PirceSlider from "../sidebar/PirceSlider";
import CategorieFilters from "../sidebar/CategorieFilters";
// import SupplierFilters from "../sidebar/SupplierFilters";
import SpecificationsFilter from "../sidebar/SpecificationsFilter";
// import MileageFilter from "../sidebar/MileageFilter";
import TransmissionFilter from "../sidebar/TransmissionFilter";
// import FuelPolicyFilter from "../sidebar/FuelPolicyFilter";
import React, { useState, useEffect } from 'react';
import {filterAll, setFuelTypeFilter} from '@/features/car/carSlice'
import { useDispatch, useSelector } from 'react-redux';
import { useTranslations } from "next-intl";




const FuelTypeFilter = ({cars , t}) => {
  
  const dispatch = useDispatch();
  const [selectedFuelTypes, setSelectedFuelTypes] = useState([]);
  const [gasolineCars, setGasolineCars] = useState(0);
  const [dieselCars, setDieselCars] = useState(0);
  const [electricCars, setElectricCars] = useState(0);
  const [hybridCars, setHybridCars] = useState(0);

  const [dir, setDir] = useState('ltr');
  
  useEffect(() => {
    const direction = document.documentElement.getAttribute("dir");
    setDir(direction);  
  }, []);

  const filterCarsByFuelType = ( fuelType) => {
    const filtredCars = cars.filter(car => car.fuel_type === fuelType)
    console.log("fuelType ("+fuelType+"): ", filtredCars.length);
    return  filtredCars.length;
  };

  useEffect(() => {
    setGasolineCars(filterCarsByFuelType( 'Petrol'));
    setDieselCars(filterCarsByFuelType( 'Diesel'));  
    setElectricCars(filterCarsByFuelType( 'Electric'));
    setHybridCars(filterCarsByFuelType( 'Hybrid'));
  }, [cars]);

  useEffect(() => {
    // dispatch(setFuelTypeFilter(selectedFuelTypes));
    dispatch(filterAll({selectedFuelTypes}));
  }, [selectedFuelTypes]);

  const handleCheckboxChange = (fuelType) => {
    // console.log('car fuelType ',fuelType);
    // console.log('selected fuelTypes bef: ' ,selectedFuelTypes)
    setSelectedFuelTypes(prevSelectedFuelTypes =>
      prevSelectedFuelTypes.includes(fuelType)
        ? prevSelectedFuelTypes.filter(type => type !== fuelType)
        : [...prevSelectedFuelTypes, fuelType]
    );
    // console.log('selected fuelTypes aft: ' ,selectedFuelTypes)
  };
  return (
    <>
      <div className="row y-gap-10 items-center justify-between">
        <div className="col-auto">
          <div className="form-checkbox d-flex items-center">
            <input
              type="checkbox"
              onChange={() => handleCheckboxChange('Petrol')}
              checked={selectedFuelTypes.includes('Petrol')}
            />
            <div className="form-checkbox__mark">
              <div className="form-checkbox__icon icon-check" />
            </div>
            <div className={`text-15  ${dir === "ltr"? "ml-10":"mr-10"} `}>{t("CarsPage.Fuel.gasoline")}</div>
          </div>
        </div>
        <div className="col-auto">
          <div className="text-15 text-light-1">{gasolineCars}</div>
        </div>
      </div>
      {/* End .row */}
      <div className="row y-gap-10 items-center justify-between">
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
            <div className={`text-15  ${dir === "ltr"? "ml-10":"mr-10"} `}>{t("CarsPage.Fuel.diesel")}</div>
          </div>
        </div>
        <div className="col-auto">
          <div className="text-15 text-light-1">{dieselCars}</div>
        </div>
      </div>
      {/* End .row */}
      <div className="row y-gap-10 items-center justify-between">
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
            <div className={`text-15  ${dir === "ltr"? "ml-10":"mr-10"} `}>{t("CarsPage.Fuel.electrical")}</div>
          </div>
        </div>
        <div className="col-auto">
          <div className="text-15 text-light-1">{electricCars}</div>
        </div>
      </div>
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
            <div className={`text-15  ${dir === "ltr"? "ml-10":"mr-10"} `}>{t("CarsPage.Fuel.hybrid")}</div>
          </div>
        </div>
        <div className="col-auto">
          <div className="text-15 text-light-1">{hybridCars}</div>
        </div>
      </div>
      {/* End .row */}
    </>
  );
};
const CommentairesFilters = ({t}) => {
  const [dir, setDir] = useState('ltr');
  
  useEffect(() => {
    const direction = document.documentElement.getAttribute("dir");
    setDir(direction);
  }, []);
  return (
    <div>
      {/* <div className="form-checkbox d-flex items-center">
        <input type="checkbox" />
        <div className="form-checkbox__mark">
          <div className="form-checkbox__icon icon-check" />
        </div>
        <div className={`"text-15 ${dir === "ltr"? "ml-10":"mr-10"} `}>{t("CarsPage.SideFilter.ReviewsType.veryGood")}</div>
        <div className={`text-15 text-light-1  ${dir === "ltr"? "ml-20":"mr-20"} `}>0</div>
      </div>
      <div className="form-checkbox d-flex items-center">
        <input type="checkbox" />
        <div className="form-checkbox__mark">
          <div className="form-checkbox__icon icon-check" />
        </div>
        <div className={`"text-15 ${dir === "ltr"? "ml-10":"mr-10"} `}>{t("CarsPage.SideFilter.ReviewsType.good")}</div>
        <div className="col-auto bg-primary">
        <div className={`text-15 text-light-1  ${dir === "ltr"? "ml-10":"mr-10"} `}>0</div>
          </div>
      </div> */}

      <div className="row y-gap-10 items-center justify-between" >
          <div className="col-auto">
            <div className="form-checkbox d-flex items-center">
              <input type="checkbox" />
              <div className="form-checkbox__mark">
                <div className="form-checkbox__icon icon-check" />
              </div>
              <div className={`text-15 ${dir === "ltr"? "ml-10":"mr-10"} `}>{t("CarsPage.SideFilter.ReviewsType.veryGood")}</div>
            </div>
          </div>
          <div className="col-auto">
            <div className="text-15 text-light-1">0</div>
          </div>
        </div>
      <div className="row y-gap-10 items-center justify-between" >
          <div className="col-auto">
            <div className="form-checkbox d-flex items-center">
              <input type="checkbox" />
              <div className="form-checkbox__mark">
                <div className="form-checkbox__icon icon-check" />
              </div>
              <div className={`text-15 ${dir === "ltr"? "ml-10":"mr-10"} `}>{t("CarsPage.SideFilter.ReviewsType.good")}</div>
            </div>
          </div>
          <div className="col-auto">
            <div className="text-15 text-light-1">0</div>
          </div>
        </div>
    </div>
  );
};

const Sidebar = ({ cars,
  handleTransmissionChange    }) => {
    const t=useTranslations();
    const filteredCars = useSelector(state => state.car.filteredCars); // Get filtered cars
  return (
    <>
      <div className="sidebar__item -no-border position-relative">
        <Map />
      </div>
      {/* End find map */}
      {/* <div className="sidebar__item">
        <h5 className="text-18 fw-500 mb-10">{t("CarsPage.SideFilter.location")}</h5>
        <div className="sidebar-checkbox">
          <LocationFilters />
        </div>
        {/* End Sidebar-checkbox  
      </div> */}
      {/* End Location filter */}
      <div className="sidebar__item">
        <h5 className="text-18 fw-500 mb-10">{t("CarsPage.SideFilter.categories")}</h5>
        <div className="sidebar-checkbox">
        <CategorieFilters   />
        </div>
        {/* End Sidebar-checkbox */}
      </div>
      {/* End Category filter */}
      {
        filteredCars.length >1&&
      <div className="sidebar__item pb-30">
        <h5 className="text-18 fw-500 mb-10">{t("CarsPage.SideFilter.price")}</h5>
        <div className="row x-gap-10 y-gap-30">
          <div className="col-12" dir="ltr">
            <PirceSlider/>
          </div>
        </div>
      </div>
      } 
      {/* End Price filter */}
      {/* <h5 className="text-18 fw-500 mb-10">Supplier</h5>
<div className="sidebar-checkbox">
  <SupplierFilters />
</div> */}
<div className="sidebar__item">
  <h5 className="text-18 fw-500 mb-10">{t("CarsPage.SideFilter.reviews")}</h5>
  <div className="sidebar-checkbox">
    <CommentairesFilters t={t} />
  </div>
  {/* End Sidebar-checkbox */}
</div>
      {/* End Supplier filter */}
      <div className="sidebar__item">
        <h5 className="text-18 fw-500 mb-10">{t("CarsPage.SideFilter.Specifications.title")}</h5>
        <div className="sidebar-checkbox">
          <SpecificationsFilter  t={t} />
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
        <h5 className="text-18 fw-500 mb-10">{t("CarsPage.SideFilter.transmission")}</h5>
        <div className="sidebar-checkbox">
        <TransmissionFilter cars={cars} handleTransmissionChange={handleTransmissionChange}  t={t}/>
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
        <h5 className="text-18 fw-500 mb-10">{t("CarsPage.SideFilter.fuel")}</h5>
        <div className="sidebar-checkbox">
          <FuelTypeFilter cars={cars} t={t} />
        </div>
      </div>
      {/* End Voiture Electronique filter */}
    </>
  );
};
export default Sidebar;
