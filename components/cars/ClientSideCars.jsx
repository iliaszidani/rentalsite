// pages/cars/[locale]/ClientSideCars.jsx

"use client"; // Indicate that this component should be rendered client-side

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCars, fetchFilteredCars } from "@/features/car/thunk";
import CarProperties from "@/components/car-list/cars/CarPropertes";
import Pagination from "@/components/car-list/common/Pagination";
import { useTranslations } from "next-intl";

import TopHeaderFilter from "@/components/car-list/cars/TopHeaderFilter";

const ClientSideCars = ({ locale }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [bookingDetails, setBookingDetails] = useState({});
  const dispatch = useDispatch();
  const { cars, filteredCars, isLoading, totalPages, itemsPerPage } = useSelector(
    (state) => state.car
  );
  const { searchData } = useSelector((state) => state.searchData);

  const t = useTranslations();

  useEffect(() => {
    if (searchData.pick_up_time && searchData.pick_up_agency && searchData.drop_off_time) {
      const formattedSearchData = {
        pickup_location: searchData.pick_up_agency.id,
        drop_off_location: searchData.drop_off_agency.id,
        date_start: searchData.pick_up_time,
        date_end: searchData.drop_off_time,
      };
      dispatch(fetchFilteredCars(formattedSearchData));
    } else if (searchData.pick_up_agency.id) {
      const formattedSearchData = {
        pickup_location: searchData.pick_up_agency.id,
      };
      dispatch(fetchFilteredCars(formattedSearchData));
    } else {
      dispatch(fetchCars());
    }
  }, [searchData]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getCurrentPageCars = () => {
    if (Array.isArray(filteredCars)) {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return filteredCars.slice(startIndex, endIndex);
    } else {
      return [];
    }
  };

  return (
    <>
      <TopHeaderFilter t={t} sortedCarsLength={filteredCars.length} />
      <div className="row y-gap-30">
        {!isLoading && <CarProperties cars={getCurrentPageCars()} t={t} />}
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default ClientSideCars;
