"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import "swiper/swiper-bundle.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import isTextMatched from "../../utils/isTextMatched";
import Link from "next/link";

const FilterHotels2 = ({ filterOption, cars }) => {
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("All"); // Marque par défaut
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    // Récupération des marques depuis l'API
    fetch("http://localhost/car-rental-api/public/api/get-all-brands-for-client")
      .then((response) => response.json())
      .then((data) => {
        const carBrands = new Set(cars.map((car) => car.brands.brand_name));
        const filteredBrands = [
          "All",
          ...data
            .map((brand) => brand.brand_name)
            .filter((brand) => carBrands.has(brand)),
        ];
        setBrands(filteredBrands);
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération des marques :", error)
      );
  }, [cars]);
  useEffect(() => {
    // Filtrage par marque
    const brandFilteredItems = (cars || []).filter((item) => {
      console.log("selectedBrand", selectedBrand);
      return (
        selectedBrand === "All" || item?.brands?.brand_name === selectedBrand
      );
    });
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
      {/* Texte pour la sélection des marques */}
      <div style={{ marginBottom: "10px", textAlign: "center" }}>
        <label htmlFor="brandSelect"> Sélectionner une marque </label>
      </div>

      <div class="tabs_controls row x-gap-15 justify-center js-tabs-controls">
       {brands.map((brand) => (
       <div class="col-auto"><button class="tabs_button text-14 fw-500 px-20 py-10 rounded-4  js-tabs-button mb-10 is-tab-el-active"  key={brand}
       onClick={() => {
        console.log('brand',brand);
        console.log('selectedBrand',selectedBrand);
        setSelectedBrand(brand)}}
        

       style={{
        margin: "0 5px",
        padding: "10px 20px",
        backgroundColor: selectedBrand === brand ? "#dc3545" : "#f8f9fa",
        color: selectedBrand === brand ? "#fff" : "#dc3545",
        border: "1px solid #dc3545",
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


      {/* <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        {brands.map((brand) => (
          <button
            key={brand}
            onClick={() => setSelectedBrand(brand)}
            style={{
              margin: "0 5px",
              padding: "10px 20px",
              backgroundColor: selectedBrand === brand ? "#dc3545" : "#f8f9fa",
              color: selectedBrand === brand ? "#fff" : "#dc3545",
              border: "1px solid #dc3545",
              borderRadius: "4px",
              cursor: "pointer",
              outline: "none",
              fontWeight: "bold",
            }}
          >
            {brand}
          </button>
        ))}
      </div> */}

      {/* Affichage des éléments filtrés */}
      <div
       className="row y-gap-30"
      >
        {filteredItems.slice(0, 10).map((item) => (
          <div
            className="col-xl-3 col-lg-3 col-sm-6 aos-init aos-animate"
            key={item?.id}
            data-aos="fade"
            data-aos-delay={item.delayAnimation}
           
          >
            <Link
              href={`/car-single/${item.id}`}
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
                      src={item.image}
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
                  className={`py-5 px-15 rounded-right-4 text-12 lh-16 fw-500 uppercase ${
                    isTextMatched(item?.tag, "breakfast included")
                      ? "bg-dark-1 text-white"
                      : ""
                  } ${
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
                {item?.location}
              </p>
              <div className="d-flex items-center mt-20">
                <div className="flex-center bg-blue-1 rounded-4 size-30 text-12 fw-600 text-white">
                  {item?.ratings}
                </div>
                <div className="text-14 text-dark-1 fw-500 ml-10">
                  Exceptionnel
                </div>
                <div className="text-14 text-light-1 ml-10">
                  {item?.numberOfReviews} reviews
                </div>
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
                  Starting from{" "}
                  <span className="text-blue-1">US${item?.car_price}</span>
                </div>
              </div>
            </div>
            </Link>

          </div>
        ))}
      </div>
    </div>
  );
};
export default FilterHotels2;
