// components/home/ClientSideContent.jsx

"use client"; // Mark this component as client-side

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCars } from "@/features/car/thunk";
import FilterHotels2 from "@/components/hotels/FilterHotels2";

const ClientSideContent = ({ t }) => {
  const [direction, setDirection] = useState("ltr");
  const dispatch = useDispatch();
  const { filteredCars, isLoading } = useSelector((state) => state.car);

  useEffect(() => {
    const dir = document.documentElement.getAttribute("dir");
    setDirection(dir);
    dispatch(fetchCars());
  }, [dispatch]);

  return (
    <section className="layout-pt-md layout-pb-lg">
      <div className="container">
        <div className="row justify-center text-center">
          <div className="col-auto">
            <div className="sectionTitle -md">
              <h2 className="sectionTitle__title">{t("CarsByBrandSection.title")}</h2>
            </div>
          </div>
        </div>
        {!isLoading ? <FilterHotels2 cars={filteredCars} t={t} /> : <p>{t("LoadingMessage")}</p>}
      </div>
    </section>
  );
};

export default ClientSideContent;
