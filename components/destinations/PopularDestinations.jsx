
'use client'

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { Scrollbar } from "swiper";
// import { destinations2 } from "../../data/desinations";
import { useDispatch, useSelector } from "react-redux";
import { filterAll, showCityCars } from "@/features/car/carSlice";
import { setSearchData } from "@/features/searchData/searchDataSlice";
import { useRouter } from "next/navigation";
 
  
const  PopularDestinations = ({t}) => {
  const dispatch = useDispatch();
  const router = useRouter();
 
  const { locations} = useSelector((state) => state.location);
  return (
    <div style={{position:"relative"}}>
      <Swiper
        spaceBetween={30}
        className="overflow-visible"
        scrollbar={{
          el: ".js-popular-destination-scrollbar",
          draggable: true,
        }}
        modules={[Scrollbar, Navigation]}
        navigation={{
          nextEl: ".js-destination-next",
          prevEl: ".js-destination-prev",
        }}
        breakpoints={{
          500: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 22,
          },
          1024: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 4,
          },
        }}
      >
        {locations.map((item) => ( (    item.location_photo!="null" && item.location_photo != null)  &&
          <SwiperSlide key={item.id}>
            <Link
              href="/cars"
              className="citiesCard -type-1 d-block rounded-4"
              key={item.id}
              onClick={  (e) =>  {
                e.preventDefault(); // Prevent default navigation to customize logic
                console.log("clicked on", item);
              
         
                
                dispatch(setSearchData(  {
                  isLoading : false,
                  isFilled: false,
                  isDifferentLocations: false,
                  pick_up_agency: item,
                  drop_off_agency: { id: null, name: "", type: "", address: "" },
                  pick_up_time: null,
                  drop_off_time: null,
                } ));
                router.push("/cars");
                // // Create the search data with the selected city
                // const searchData = {
                //   isLoading: false,
                //   isFilled: true, // Indicating data is filled
                //   isDifferentLocations: false,
                //   pick_up_agency: {
                //     id: null,
                //     name: item.city, // Set the clicked city as pick-up location
                //     type: "",
                //     address: ""
                //   },
                //   drop_off_agency: { id: null, name: "", type: "", address: "" },
                //   pick_up_time: null,
                //   drop_off_time: null
                // };
          
                // // Dispatch actions to update the store
                // // dispatch(setSearchData(searchData));
                 
                // dispatch(filterAll({ searchData})); // This action should filter cars based on the city
          
                // // Navigate to the cars page after dispatching actions
                // router.push("/cars");
              }}
        
            >
              <div className="citiesCard__image ratio ratio-3:4">
                <Image
                  width={300}
                  height={400}
                  src={item.location_photo_url}
                  alt="image"
                  className="js-lazy"
                />
              </div>
              <div className="citiesCard__content d-flex flex-column justify-between text-center pt-30 pb-20 px-20">
                <div className="citiesCard__bg" />
                <div className="citiesCard__top">
                  <div className="text-14 text-white">{item.hoverText} {t('Destinations.cars')} </div>
                </div>
                <div className="citiesCard__bottom">
                  <h4 className="text-26 md:text-20 lh-13 text-white mb-20">
                    {item.location_city}
                  </h4>
                  <button className="button col-12 h-60 -blue-1 bg-white text-dark-1" >
                    {t("Destinations.discover")}
                  </button>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      
        <button className="section-slider-nav  -prev flex-center button -blue-1 bg-white shadow-1 size-40 rounded-full sm:d-none js-destination-prev">
          <i className="icon icon-chevron-left text-12" />
        </button>
        <button className="section-slider-nav -next flex-center button -blue-1 bg-white shadow-1 size-40 rounded-full sm:d-none js-destination-next">
          <i className="icon icon-chevron-right text-12" />
        </button>
        <div className="slider-scrollbar bg-light-2 mt-40  js-popular-destination-scrollbar" />
      

    </div>
  );
};

export default PopularDestinations;
