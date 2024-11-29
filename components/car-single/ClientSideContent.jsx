// components/car-single/ClientSideContent.jsx

"use client";

import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserFromStorage } from "@/features/user/userSlice";
import { getCarData } from "@/lib/getCarData";
import DriverInfoForm from "@/components/car-single/DriverInfoForm";
import Overview from "@/components/car-single/Overview";
import FilterBox from "@/components/car-single/filter-box";
import { useTranslations } from "next-intl";

const ClientSideContent = ({ id }) => {
  const [car, setCar] = useState(null);
  const [nbrDays, setNbrDays] = useState(1);
  const driverInfoRef = useRef(null);
  const dispatch = useDispatch();

  const activeCarExtras = useSelector((state) => state.car.activeCarExtras);
  const searchData = useSelector((state) => state.searchData.searchData);
  const t = useTranslations();

  const calculateDays = () => {
    const pickUpDate = new Date(searchData.pick_up_time);
    const dropOffDate = new Date(searchData.drop_off_time);
    const diffInMs = dropOffDate - pickUpDate;
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    const threshold = 0.05;
    return Math.max(1, Math.ceil(diffInDays - threshold));
  };

  useEffect(() => {
    setNbrDays(calculateDays());
  }, [searchData]);

  useEffect(() => {
    // Fetch car data
    const fetchCarData = async () => {
      try {
        const carData = await getCarData(id);
        setCar(carData);
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    };

    fetchCarData();
  }, [id]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      dispatch(getUserFromStorage(storedUser));
    }

    const handleStorageChange = (event) => {
      if (event.key === "user") {
        const newUser = JSON.parse(event.newValue);
        dispatch(getUserFromStorage(newUser));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [dispatch]);

  const calculateExtrasCost = () => {
    if (!car || !car.vendor_options) return 0;
    return activeCarExtras.reduce((total, extra) => {
      const option = car.vendor_options.find((opt) => opt.id === extra.id);
      if (!option) return total;
      const price = parseFloat(option.option_price);
      const isPerDay = option.option_type === 0;
      return total + (isPerDay ? price * nbrDays * extra.quantity : price * extra.quantity);
    }, 0);
  };

  const scrollToDriverInfoForm = () => {
    if (driverInfoRef.current) {
      driverInfoRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!car) {
    return <p>Loading...</p>;
  }

  const extrasCost = calculateExtrasCost();
  const totalCost = car.car.car_price * nbrDays + extrasCost;

  return (
    <section className="pt-40">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <DriverInfoForm ref={driverInfoRef} carDetails={car} />
            <Overview car={car} />
          </div>
          <div className="col-lg-4">
            <div className="summary-box">
              <h4>{t("carDetails.total")}:</h4>
              <p>{totalCost} {t("HomePage.CarCard.currency_DH")}</p>
              <FilterBox carDetails={car} handleScrollToDriverInfoForm={scrollToDriverInfoForm} t={t} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientSideContent;
