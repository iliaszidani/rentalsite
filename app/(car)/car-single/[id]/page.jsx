'use client';

import dynamic from "next/dynamic";
import "photoswipe/dist/photoswipe.css";
import { useState, useEffect } from "react";
import Header3 from "@/components/header/header-3";
import Overview from "@/components/car-single/Overview";
import PropertyHighlights from "@/components/car-single/PropertyHighlights";
import TopBreadCrumb from "@/components/car-single/TopBreadCrumb";
import ReviewProgress2 from "@/components/car-single/guest-reviews/ReviewProgress2";
import DetailsReview2 from "@/components/car-single/guest-reviews/DetailsReview2";
import ReplyForm from "@/components/car-single/ReplyForm";
import ReplyFormReview2 from "@/components/car-single/ReplyFormReview2";
import CallToActions from "@/components/common/CallToActions";
import DefaultFooter from "@/components/footer/default";
import FilterBox from "@/components/car-single/filter-box";
import Faq from "@/components/faq/Faq";
import MapPropertyFinder from "@/components/car-single/MapPropertyFinder";
import notFound from "@/app/not-found";
import { getCarData } from "@/lib/getCarData";
import MainFilterSearchBox from "@/components/hero/hero-3/MainFilterSearchBox";
import SignlePageSkeleton from "@/components/SignlePageSkeleton";
import { differenceInDays } from 'date-fns';
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { getUserFromStorage } from "@/features/user/userSlice";

const CarSinglePage = ({ params }) => {
  const [car, setCar] = useState(null);
  const dispatch = useDispatch();
  // Redux state
  const activeCarExtras = useSelector((state) => state.car.activeCarExtras);
  const searchData = useSelector((state) => state.searchData.searchData);
  const user = useSelector((state) => state.user);


  useEffect(() => {
    // Check if there is a user in localStorage on page load
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      dispatch(getUserFromStorage(storedUser)); // Sync Redux with stored user
    }

    // Listen for storage events from other windows/tabs
    const handleStorageChange = (event) => {
      if (event.key === "user") {
        const newUser = JSON.parse(event.newValue);
        dispatch(getUserFromStorage(newUser)); // Sync Redux with updated user from another tab/window
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [dispatch]);
  
  useEffect(() => {
    const fetchCarData = async () => {
      const id = params.id;
      if (!/^\d+$/.test(id)) {
        return notFound();
      }

      try {
        console.log("Fetching car with id", id);
        const carData = await getCarData(id);
        setCar(carData);
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    };

    fetchCarData();
  }, [params.id]);

  // Calculate number of days
  const pickUpDate = new Date(searchData.pick_up_time);
  const dropOffDate = new Date(searchData.drop_off_time);
  const nbrDays = Math.max(1, differenceInDays(dropOffDate, pickUpDate));

  // Calculate extras cost
  const calculateExtrasCost = () => {
    if (!car || !car.vendor_options) return 0;

    return activeCarExtras.reduce((total, extra) => {
      const option = car.vendor_options.find(opt => opt.id === extra.id);
      if (!option) return total;

      const price = parseFloat(option.option_price);
      const isPerDay = option.option_type == 0; // 0: per day, 1: per rental
      console.log("isPerDay ", isPerDay, " for ", option.option_name);
      const extraCost = isPerDay ? price * nbrDays * extra.quantity : price * extra.quantity;
      return total + extraCost;
    }, 0);
  };

  const extrasCost = calculateExtrasCost();

// const TourSingleV1Dynamic = async ({ params }) => {
//   const id = params.id;
//   // const car = carsData.find((item) => item.id == id) || carsData[0];
//   console.log("id ",id);
//     const response = await fetch(`http://localhost/car-rental-api/public/api/show-car-for-client/${id}`, {cache: 'no-store'} );
//     const data = await response.json();
//     const car2 = data.car;
//     console.log('data ',data);
  return (
    <>
      <div className="header-margin"></div>
      <Header3 />
      <TopBreadCrumb />
      {
        !car ?
      <SignlePageSkeleton/>
        :    <>
      <section className="pt-40">
        <div className="container">  
          <div className="row y-gap-30">
            <div className="col-lg-8">
              <div className="row y-gap-20 justify-between items-end">
                <div className="col-auto">
                  <h1 className="text-30 sm:text-24 fw-600">
                    {car.car.brands.brand_name} {car.car.series.serie_name}
                  </h1>
                  <div className="row x-gap-10 items-center pt-10">
                    <div className="col-auto">
                      <div className="d-flex x-gap-5 items-center">
                        <i className="icon-location text-16 text-light-1" />
                      </div>
                    </div>
                    <div className="col-auto">
                      <button
                        data-x-click="mapFilter"
                        className="text-blue-1 text-15 underline"
                      >
                        Show on map  
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-auto">
                  <div className="row x-gap-10 y-gap-10">
                    <div className="col-auto">
                      <button className="button px-15 py-10 -blue-1">
                        <i className="icon-share mr-10" />
                        Share
                      </button>
                    </div>
                    <div className="col-auto">
                      <button className="button px-15 py-10 -blue-1 bg-light-2">
                        <i className="icon-heart mr-10" />
                        Save
                      </button>
                    </div>
                    <div className="col-auto   ">
                      <div className="d-flex items-center">
                        <div className="text-14 text-right mr-10">
                          <div className="lh-15 fw-500">Exceptional</div>
                          <div className="lh-15 text-light-1">
                            {car.car.numberOfReviews || 0} reviews
                          </div>
                        </div>
                        <div className="size-40 flex-center bg-yellow-1 rounded-4">
                          <div className="text-14 fw-600 text-dark-1">
                            {car.car.ratings || 0}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                </div>
              </div>
              <div className="mt-40">
                <div className="text-center">
                  {car.car.image_url ? (
                    <img src={car.car.image_url} alt="" />
                  ) : (
                    "image not found"
                  )}
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="">    {/* d-flex justify-end */}
          
                <div className="px-30 py-30 rounded-4 border-light shadow-4 bg-white w-360 lg:w-full mb-20">
                  <div className="row y-gap-15 items-center justify-between position-relative">
                 
                  <div className="col-auto">
                        <div className="text-14 text-light-1">
                          <span className="text-20 fw-500 text-dark-1 ml-5">
                            {car.car.car_price * nbrDays} MAD
                          </span>
                          &nbsp; For {nbrDays} day(s)
                        </div>
                        <hr />
                        {activeCarExtras.length > 0 && (
                          <>
                            <div className="strong text-16 text-dark-1">
                              To pay for Extras
                            </div>
                            {activeCarExtras.map((extra) => {
                              const option = car.vendor_options.find(opt => opt.id === extra.id);
                              return (
                                <div key={extra.id} className="small text-14 text-light-1">
                                  + {parseFloat(option.option_price) * extra.quantity} MAD (
                                  {extra.quantity}x {option.option_name})  per { option.option_type ? 'rental' : "day"}
                                </div>
                              );
                            })}
                            <hr />
                          </>
                        )}
                        <div className="text-18 fw-500 text-dark-1">
                          Total: {car.car.car_price * nbrDays + extrasCost} MAD
                        </div>
                      </div>
                 
                  </div>
                  </div>
                  
                  <div className="px-30 py-30 rounded-4 border-light shadow-4 bg-white w-360 lg:w-full">
                  <div className="row y-gap-15 items-center justify-between position-relative">
                  <div className="row y-gap-20 pt-20">
                    <FilterBox  carDetails={car}  /> {/* setDays={handleDaysChange}  setExtras={handleExtrasChange} ExtrasValues={extras} />*/}
                    {/* <MainFilterSearchBox/> */}
                  </div>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="pt-40">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div>
                <h3 className="text-22 fw-500">Property highlights</h3>
                <PropertyHighlights car={car} />
                <Overview car={car} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-40 pt-40">
        <div className="container">
          <h3 className="text-22 fw-500 mb-20">Car Location</h3>
          <div className="rounded-4 overflow-hidden map-500">
            <MapPropertyFinder />
          </div>
        </div>
      </section>
      <section className="pt-40">
        <div className="container ">
          <div className="row y-gap-20">
            <div className="col-lg-4">
              <h2 className="text-22 fw-500">
                FAQs about
                <br /> The New Car Model
              </h2>
            </div>
            <div className="col-lg-8">
              <div className="accordion -simple row y-gap-20 js-accordion" id="Faq1">
                <Faq />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-40 border-top-light pt-40">
        <div className="container">
          <div className="row y-gap-40 justify-between">
            <div className="col-xl-3">
              <h3 className="text-22 fw-500">Guest reviews</h3>
              <ReviewProgress2 />
            </div>
            <div className="col-xl-8">
              <DetailsReview2 />
            </div>
          </div>
        </div>
      </section>
      {/* End Review section */}

      <section className="mt-40 border-top-light pt-40 layout-pb-lg">
        <div className="container">
          <div className="row y-gap-30 justify-between">
            <div className="col-xl-3">
              <div className="row">
                <div className="col-auto">
                  <h3 className="text-22 fw-500">Leave a Reply</h3>
                  <p className="text-15 text-dark-1 mt-5">
                    Your email address will not be published.
                  </p>
                </div>
              </div>
              {/* End .row */}

              <ReplyFormReview2 />
              {/* End ReplyFormReview */}
            </div>
            {/* End .col-xl-3 */}

            <div className="col-xl-8">
              <ReplyForm />
            </div>
            {/* End .col-xl-8 */}
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </section>
      {/* End Reply Comment box section */}
      </> 
      }
                  
      <CallToActions />
      {/* End Call To Actions Section */}

      <DefaultFooter />
    </>
  );
};
 
export default dynamic(() => Promise.resolve(CarSinglePage), {
  ssr: false,
});
