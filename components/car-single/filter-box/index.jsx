"use client";
import { useEffect, useState } from "react";
import DateSearch from "../../hero/DateSearch";
import GuestSearch from "./GuestSearch";
import LocationSearch from "./LocationSearch";
import { useDispatch, useSelector } from "react-redux";
import { setSearchData } from "@/features/searchData/searchDataSlice";
import Alert from "@/components/common/Alert";
import axiosInstance from "@/lib/axiosConfig";
import Cookies from "js-cookie";
import { setCoupon } from "@/features/car/carSlice";
import { useTranslations } from "next-intl";

const Index = ({
  carDetails,
  setDays,
  setExtras,
  ExtrasValues,
  t,
  handleScrollToDriverInfoForm,
}) => {
  // console.log(" ExtrasValues ", ExtrasValues);
  const { searchData } = useSelector((state) => state.searchData);
  const { activeCarExtras } = useSelector((state) => state.car);
  const { user } = useSelector((state) => state.user);

  const [couponCode, setCouponCode] = useState("");
  const dispatch = useDispatch();
  const [dataToSend, setDataToSend] = useState({
    pickUpAgence: "",
    dropOffAgence: "",
    pickUpDate: "",
    dropOffDate: "",
    extras: ExtrasValues || {
      name: "",
      value: "",
    },
  });

 
  useEffect(() => {
    setDataToSend((prev) => ({ ...prev, ["extras"]: ExtrasValues }));
  }, [ExtrasValues]);

  const [errorList, setErrorList] = useState({});

  const formatDateForMySQL = (date) => {
    const localDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    );
    const isoString = localDate.toISOString();
    return isoString.slice(0, 19).replace("T", " ");
  };

  const handleBookSubmit = async (e) => {
    e.preventDefault();

    dispatch(setCoupon(couponCode));

    setErrorList({});
    const pickUpTime = new Date(searchData.pick_up_time);
    const dropOffTime = new Date(searchData.drop_off_time);
    const errors = {};

    if (!pickUpTime || !dropOffTime) {
      errors["Time Error"] = [t("Errors.pickOffOrDropOffMissing")]//["Pick-up or drop-off time is missing"];
    }

    const isWithinAvailability = carDetails.car.availabilities.some(
      (availability) => {
        const availabilityStart = new Date(availability.date_start);
        const availabilityEnd = new Date(availability.date_end);
        return (
          availability.availability === 1 &&
          pickUpTime >= availabilityStart &&
          pickUpTime <= availabilityEnd &&
          dropOffTime >= availabilityStart &&
          dropOffTime <= availabilityEnd
        );
      }
    );

    const hasUnavailableDates = carDetails.car.availabilities.some(
      (availability) => {
        const availabilityStart = new Date(availability.date_start);
        const availabilityEnd = new Date(availability.date_end);
        return (
          availability.availability === 0 &&
          ((pickUpTime >= availabilityStart && pickUpTime <= availabilityEnd) ||
            (dropOffTime >= availabilityStart &&
              dropOffTime <= availabilityEnd) ||
            (pickUpTime <= availabilityStart && dropOffTime >= availabilityEnd))
        );
      }
    );

    if (!isWithinAvailability || hasUnavailableDates) {
      errors["Availability Error"] = [t("Errors.outsideAvailable")]
      //  [
      //   "Either pick-up or drop-off date is outside available date ranges or falls within unavailable dates",
      // ];
    }
    if (Object.keys(errors).length > 0) {
      setErrorList({});
      // Update errorList after clearing to force the component to re-render
      setTimeout(() => {
        setErrorList(errors);
      }, 0);
    } else {
      handleScrollToDriverInfoForm();

      // console.log("All dates are valid, proceed with booking.");
      // const token = Cookies.get("token");

      // if(Object.keys(user).length == 0 || !token ||!user.token){
      //   setErrorList({});
      //   errors["Login Error"] = ["Please log in or create an account to proceed with your reservation."];

      // // Update errorList after clearing to force the component to re-render
      // setTimeout(() => {
      //   setErrorList(errors);
      // }, 0);
      //   console.log("not logged ")
      //   const width = 600;
      //   const height = 700;
      //   const left = (window.innerWidth - width) / 2;
      //   const top = (window.innerHeight - height) / 2;

      //   window.open('/login?close=true', 'Login', `width=${width},height=${height},top=${top},left=${left}`);

      //   // window.open('/login', "_blank")
      // }else{
      //   console.log("logged ")

      //   const dataToSend = {
      //     date_start: formatDateForMySQL(new Date(searchData.pick_up_time)),
      //     date_end: formatDateForMySQL(new Date(searchData.drop_off_time)),
      //     car_options: activeCarExtras, // Include selected extras
      //   };
      //   console.log("reservation dataToSend  ", dataToSend)

      //   try{
      //     const response = await axiosInstance.post(`/api/cars/reserve/${carDetails.car.id}`, dataToSend)
      //     console.log('response ', response)
      //   }catch(e){
      //     console.error('error /cars/reserve catch ', e )
      //     if(e.response.message){

      //       errors["API Error"] = [e.response.message]; // Add the error message to the errors object
      //     }else{

      //       errors["API Error"] = [e.message]; // Add the error message to the errors object
      //     }
      //     setErrorList({});
      //     setTimeout(() => {
      //       setErrorList(errors);
      //     }, 0);
      //   }
      // }
    }
    setErrorList({});
  };

  return (
    <form className="  y-gap-20 pt-20 col-12 " onSubmit={handleBookSubmit}>
      <Alert time={5000} errorList={errorList} />{" "}
      {/* Add the Alert component here */}
      <div className="col-12  ">
        <LocationSearch
          searchData={searchData}
          //if ( carSinglePage ){
          disabled={true}
          // }
          isDropOff={false}
          carDetails={carDetails.car}
          // changeDataFilter={handleFilterChange}
          // initialData={initialData}
          required
        />
      </div>
      {searchData?.isDifferentLocations && (
        <div className="col-12">
          <LocationSearch
            //if ( carSinglePage ){
            searchData={searchData}
            disabled={false}
            // }
            carDetails={carDetails.car}
            // changeDataFilter={handleFilterChange}
            isDropOff={true}
            // initialData={initialData}
            required
          />
        </div>
      )}
      <div className="col-12">
        <div className="searchMenu-date px-20 py-10 border-light rounded-4 -right js-form-dd js-calendar">
          <div>
            <h4 className="text-15 fw-500 ls-2 lh-16"> {t("HomePage.BookingForm.pickUpDate")}</h4>
            <DateSearch
              t={t}
              carAvailabilities={carDetails.car.availabilities}
              // changeDataFilter={handleFilterChange}
              // initialData={initialData}
              isDropOff={false}
              required
            />
          </div>
        </div>
      </div>
      <div className="col-12">
        <div className="searchMenu-date px-20 py-10 border-light rounded-4 -right js-form-dd js-calendar">
          <div>
            <h4 className="text-15 fw-500 ls-2 lh-16"> { t("HomePage.BookingForm.dropOffdate")}</h4>
            <DateSearch
              t={t}
              carAvailabilities={carDetails.car.availabilities}
              // changeDataFilter={handleFilterChange}
              // initialData={initialData}
              isDropOff={true}
              required
            />
          </div>
        </div>
      </div>
      <div className="col-12">
        <GuestSearch optionsDetails={carDetails.vendor_options} />
      </div>
      {/* {
      check if vendor allow drop off in diffrent locations if true you should use the drop off locations
      searchData.isFilled && */}
      {searchData.drop_off_agency.id && (
        <div className="home-checkbox">
          <input
            id="searchbox-toolbox-drop-off-checkbox-desktop"
            type="checkbox"
            name="differentLocations"
            value="in-range"
            style={{ width: "50px" }}
            checked={searchData.isDifferentLocations}
            onChange={() => {
              dispatch(
                setSearchData({
                  ...searchData,
                  isDifferentLocations: !searchData.isDifferentLocations,
                })
              );

              // setDifferentLocations(!differentLocations)
            }}
          />
          <label htmlFor="searchbox-toolbox-drop-off-checkbox-desktop">
            <span className={`checkbox-label text-dark  `}>
               {t("HomePage.BookingForm.dropOffDifferentLocations")}
            </span>
          </label>
        </div>
      )}
      {/* } */}
      <div className="col-12">
        <div className="searchMenu-date px-20 py-10 border-light rounded-4 -right js-form-dd js-calendar">
          <div>
            <h4 className="text-15 fw-500 ls-2 lh-16">{t("carDetails.couponCode")}</h4>
            <input
              type="text"
              onChange={(e) => {
                // console.log("e = ", e.target.value);
                setCouponCode(e.target.value);
              }}
            />
          </div>
        </div>
      </div>
      <div className="col-12">
        <button
          className="button -dark-1 py-15 px-35 h-60 col-12 rounded-4 bg-yellow-1 text-dark-1"
          type="submit"
        
        >
          <i className="icon-search text-20 mr-10" />
          {t("carDetails.bookNow")}
        </button>
      </div>
    </form>
  );
};

export default Index;
