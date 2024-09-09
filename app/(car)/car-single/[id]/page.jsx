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

const CarSinglePage = ({ params }) => {
  const [nbrDays, setNbrDays] = useState(1);
  const [extras, setExtras] = useState({
    nbrAdditionalDriver: 0,
    nbrBabySeat: 0,
  });
  const additionalDriverPrice = 500;
  const babySeatPrice = 180;
  const [car, setCar] = useState(null);

  useEffect(() => {
    const fetchCarData = async () => {
      const id = params.id;
      if (!/^\d+$/.test(id)) {
        return notFound();
      }

      try {
        console.log("...fetching car with id ", params.id);
        const carData = await getCarData(id);
        setCar(carData);
        console.log("car Data  ", carData);
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    };

    

    fetchCarData();
 
 
 
  }, [params.id]);

  const handleDaysChange = (nbr) => {
    console.log("nbr ", nbr);
    setNbrDays(nbr);
  };

  const handleExtrasChange = (name,value) => {
    console.log("val ", value);
    console.log("name ",name)
    const formatedName = name === 'BabySeat' ? 'nbrBabySeat' : name ==='AdditionalDriver' ?'nbrAdditionalDriver' : name;
    setExtras((prev)=> ({...prev , [formatedName]:value}));
  };
  
 

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
                        &nbsp; For {nbrDays} day
                      </div>
                      <hr/>
                      { ( extras.nbrAdditionalDriver != 0 || extras.nbrBabySeat !=0 ) &&

                        <>
                     <div className="strong text-16 text-dark-1">
                       To pay at pick-up
                      </div>
                      { extras.nbrAdditionalDriver != 0 &&

                        <div className="small text-14 text-light-1">
                        + {additionalDriverPrice * extras.nbrAdditionalDriver} MAD ({extras.nbrAdditionalDriver}x Additional Driver)
                      </div>
                      }
                      { extras.nbrBabySeat != 0 &&

                        <div className="small text-14 text-light-1">
                        + {babySeatPrice* extras.nbrBabySeat} MAD ({extras.nbrBabySeat}x Baby Seat)
                        </div>
                      }
                      <hr/>
                      </>
                      }
                      { 
                        nbrDays > 1 &&

                        <div className="small text-14 text-light-1">
                      {car.car.car_price } MAD For one day
                      <hr/>
                      </div>
                      }
                      <div className="text-18 fw-500 text-dark-1">
                      Total: {car.car.car_price * nbrDays + additionalDriverPrice * extras.nbrAdditionalDriver + babySeatPrice* extras.nbrBabySeat} MAD
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
