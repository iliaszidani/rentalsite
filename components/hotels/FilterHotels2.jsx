"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import "swiper/swiper-bundle.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import isTextMatched from "../../utils/isTextMatched";
import Link from "next/link";
import axiosInstance from "@/lib/axiosConfig";

const     FilterHotels2 = ({ filterOption, cars, t }) => {
  const [filteredItems, setFilteredItems] = useState([]);

  const [initialeRange, setInitialeRange] = useState(8); // initial number for cars to show
  const [rangeIcreaseValue, setRangeIcreaseValue] = useState(8); //  number for cars to add
  const [visibleRange, setVisibleRange] = useState(initialeRange); // State to manage visible range
  const [selectedBrand, setSelectedBrand] = useState(t("CarsByBrandSection.all")); // Marque par défaut
  const [brands, setBrands] = useState([]);
  const [direction, setDirection] = useState('ltr');

  useEffect(() => {
    const dir = document.documentElement.getAttribute('dir');
    setDirection(dir);
  }, []);
  
  useEffect(() => {
    // Récupération des marques depuis l'API
    axiosInstance.get("/api/get-all-brands-for-client")  //removed: http://localhost/car-rental-api/public
      .then((response) => {
        const data = response.data;
        const carBrands = new Set(cars.map((car) => car.brands.brand_name));
        const filteredBrands = [
          t("CarsByBrandSection.all"),
          ...data
            .map((brand) => brand.brand_name)
            .filter((brand) => carBrands.has(brand)),
        ];
        setBrands(filteredBrands);
      }).catch((error) =>
        console.error("Erreur lors de la récupération des marques :", error)
      );
  }, [cars]);
  useEffect(() => { 
    // Filtrage par marque
    const brandFilteredItems = (cars || []).filter((item) => {
      // console.log("selectedBrand", selectedBrand);
      return (
        selectedBrand === t("CarsByBrandSection.all") || item?.brands?.brand_name === selectedBrand
      );
    });
    setVisibleRange(initialeRange); // Reset range when brand changes

    setFilteredItems(brandFilteredItems);
  }, [cars, selectedBrand, filterOption]);
 


  // Navigation personnalisée
  function ArrowSlick(props) {
    let className =
      props.type === "next"
        ? "slick_arrow-between slick_arrow -next arrow-md flex-center button -blue-1 bg-white shadow-1 size-30 rounded-full sm:d-none js-next"
        : "slick_arrow-between slick_arrow -prev arrow-md flex-center button -blue-1 bg-white shadow-1 size-30 rounded-full sm:d-none js-prev";
    className += " arrow";
    const char =
      props.type === "next" ? (
        <>
          <i className="icon icon-chevron-right text-12"></i>
        </>
      ) : (
        <>
          <span className="icon icon-chevron-left text-12"></span>
        </>
      );
    return (
      <button className={className} onClick={props.onClick}>
        {char}
      </button>
    );
  }

  return (
    
    <div>
      {cars.length === 0 ?<div style={{ marginBottom: "10px", textAlign: "center" }}> {t('CarsByBrandSection.noDataFound')} </div>: 
      <>
        {/* Texte pour la sélection des marques */}
        <div style={{ marginBottom: "10px", textAlign: "center" }}>
        <label htmlFor="brandSelect"> {t('CarsByBrandSection.selectBrand')} </label>
      </div>

      <div className="tabs_controls row x-gap-15 justify-center js-tabs-controls">
       {brands.map((brand) => (
       <div className="col-auto" key={brand}><button className="tabs_button text-14 fw-500 px-20 py-10 rounded-4  js-tabs-button mb-10 is-tab-el-active"  
       onClick={() => {
        // console.log('brand',brand);
        // console.log('selectedBrand',selectedBrand);
        setSelectedBrand(brand)}}
        

       style={{
        margin: "0 5px",
        padding: "10px 20px",
        backgroundColor: selectedBrand === brand ? "#F7C83E" : "#051036",
        color: selectedBrand === brand ? "#051036" : "#F7C83E",
        border: "1px solid #F7C83E",
        borderRadius: "4px",
        cursor: "pointer",
        outline: "none",
        fontWeight: "bold",
      }}

       >
         {brand}
       </button></div>
       ))}
     </div>

 
      <div
       className="row y-gap-30"
      >
        {filteredItems.slice(0, visibleRange).map((item) => 
        {
          // console.log("item ", item)
          var rateBasedOnRatings =  'Good';
          if(item?.ratings < 2 ){rateBasedOnRatings = "VeryPoor"}else
          if(item?.ratings < 4 ){rateBasedOnRatings = "Poor"}else
          if(item?.ratings < 6 ){rateBasedOnRatings = "Average"}else
          if(item?.ratings < 8 ){rateBasedOnRatings = "Good"}else
          if(item?.ratings <= 10 ){rateBasedOnRatings = "Excellent"}else{
            rateBasedOnRatings = 'Good' //now for test, make it null 
          }
        return (
          <div
            className="col-xl-3 col-lg-3 col-sm-6"
            key={item?.id}
            data-aos="fade"
            data-aos-delay={item.delayAnimation}
           
          >
            <Link
              href={`/car/${item.id}`}
              className="hotelsCard -type-1 hover-inside-slider"
            >
              
            <div className="hotelsCard__image">
              <div className="cardImage w-250 md:w-1/1 rounded-4 border-light">
                <div className="custom_inside-slider">
                  <Swiper
                    className="mySwiper"
                    modules={[Pagination, Navigation]}
                    pagination={{ clickable: true }}
                    navigation={true}
                  >
                    <img
                      src={item.image_url}
                      alt=""
                      style={{ objectFit: "cover", maxWidth: "100%" }}
                    />
                      <img src={item.vendors.vendor_logo_url} alt="logo_partner"  className='car-properties-image-logo'  style={{objectFit:"cover"}}/>
                    {item?.slideImg?.map((slide, i) => (
                      <SwiperSlide key={i}>
                        <div className="ratio ratio-1:1">
                          <div className="cardImage__content">
                            <Image
                              width={250}
                              height={250}
                              className="rounded-4 col-12 js-lazy"
                              src={slide}
                              priority
                              alt={`Image ${i}`}
                            />
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
              <div className="cardImage__leftBadge">
                <div
                  className={`py-5 px-15 rounded-right-4 text-12 lh-16 fw-500 uppercase  ${
                    isTextMatched(item?.tag, "best seller")
                      ? "bg-blue-1 text-white"
                      : ""
                  } ${
                    isTextMatched(item?.tag, "-25% today")
                      ? "bg-brown-1 text-white"
                      : ""
                  } ${
                    isTextMatched(item?.tag, "top rated")
                      ? "bg-yellow-1 text-dark-1"
                      : ""
                  }`}
                >
                  {item?.tag}
                </div>
              </div>
            </div>
            <div className="hotelsCard__content mt-10">
              <h4 className="hotelsCard__title text-dark-1 text-18 lh-16 fw-500">
                <span>{item?.car_name}</span>
              </h4>
              <p className="text-light-1 lh-14 text-14 mt-5">
              {item?.agencies.location.location_city}, {item?.agencies.location.location_country}  
              </p>
              <div className="d-flex items-center mt-20">
                <div className="flex-center bg-blue-1 rounded-4 size-30 text-12 fw-600 text-white">
                  {item?.ratings ?? 7.8}
                </div>
                <div className={`text-14 text-dark-1 fw-500 ${direction === 'ltr' ? 'ml-10' : 'mr-10'}`} >
                  {t(`CarCard.reviewsType.${rateBasedOnRatings}`)}
                </div>
                {item?.numberOfReviews || 1===1 &&   <div className={`text-14 text-light-1 ${direction === 'ltr' ? 'ml-10' : 'mr-10'}  `}  >
                  {item?.numberOfReviews ?? "2,322"}&nbsp;
                   {t("CarCard.reviews")}
                </div>}
              
              </div>

              {/* Ajout des informations sur l'adresse et la ville de l'agence */}
              {item?.agencies?.address_agence &&
                item?.agencies?.city_agence && (
                  <>
                    <div className="col-auto mt-10">
                      <div className="text-14 text-light-1">
                        {item?.agencies.address_agence},{" "}
                        {item?.agencies.city_agence.toUpperCase()}
                      </div>
                    </div>
                    <div className="col-auto">
                      <div className="size-3 rounded-full bg-light-1" />
                    </div>
                  </>
                )}

              <div className="mt-5">
                <div className="fw-500">
                {t("CarCard.priceStarts")}{" "}
                  <span className="text-blue-1">   {t("CarCard.currency_DH")}{" "}{item?.car_price}</span>
                </div>
              </div>
            </div>
            </Link>

          </div>
        )}
        )}
          {/* Load More Button */}
          {visibleRange < filteredItems.length && (
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <button
                onClick={() => setVisibleRange(visibleRange + rangeIcreaseValue)}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#F7C83E",
                  color: "#051036",
                  border: "1px solid #051036",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                {t("CarsByBrandSection.loadMore")}
              </button>
            </div>
          )}
      </div>
      </> 
      }
    
    </div>
  );
};
export default FilterHotels2;
