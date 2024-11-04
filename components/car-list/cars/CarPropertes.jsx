'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import Image from 'next/image';
import Link from 'next/link';
import { getCars } from '../../services/carService';
import 'swiper/swiper-bundle.css';
import { useEffect, useState } from 'react';

// export async function getServerSideProps() {
//   console.log('getServerSideProps est appelée');
//   try {
//     const cars = await getCars();
//     console.log('les cars getServerSideProps', cars);

//     return {
//       props: { cars },
//     };
//   } catch (error) {
//     console.error("Erreur lors de l'appel de getCars:", error);
//     return {
//       props: { cars: [] },
//     };
//   }
// }

const CarProperties = ({ cars, t }) => {
  console.log('les cars ' , cars);
   
  const [dir, setDir] = useState('ltr');
  
    useEffect(() => {
      const direction = document.documentElement.getAttribute("dir");
      setDir(direction);
    }, []);
  // if (!cars || !Array.isArray(cars) || cars.length === 0) {
  // Gérer le cas où cars est undefined ou n'est pas un tableau
  //   return (
  //     <div>
  //       {/* Aucune voiture disponible */}
      
          
  //          <div className="spinner-grow text-danger" role="status"> </div>
  //          <div className="spinner-grow text-danger" role="status"> </div>
  //          <div className="spinner-grow text-danger" role="status"> </div>
  //          <div className="spinner-grow text-danger" role="status"> </div>
  //          <div cylassName="spinner-grow text-danger" role="status"> </div>
      
          
       
        
  //     </div>
  //   );
  // }

  const carsToShow = cars ? cars.slice(0, 10) : [];
  return (
    <>
      {carsToShow.map((item) => 
      {
        console.log('nissan ', item);
        return (
        <div className="col-12" key={item?.id}>
          <div className="border-top-light pt-30">
            <div className="row x-gap-20 y-gap-20">
              <div className="col-md-auto">
                <div className="relative d-flex">
                  <div className="cardImage w-250 md:w-1/1 rounded-4 border-light">
                    <div className="custom_inside-slider">
                      <Swiper
                        className="mySwiper car-properties-image"
                        modules={[Pagination, Navigation]}
                        pagination={{
                          clickable: true,
                        }}
                        navigation={true}
                      >
                        <img src={item.image_url} alt=""  className=''  style={{objectFit:"cover"}}/>
                        {
                          item.vendors.vendor_logo_url ?
                        <img src={item.vendors.vendor_logo_url} alt="logo_partner"  className='car-properties-image-logo'  style={{objectFit:"cover"}}/>
                       : <img src="https://img.freepik.com/free-vector/red-prohibited-sign-no-icon-warning-stop-symbol-safety-danger-isolated-vector-illustration_56104-912.jpg" alt="logo_partner"  className='car-properties-image-logo'  style={{objectFit:"cover"}}/>
                        }
                        {item?.slideImg?.map((slide, i) => (
                          <SwiperSlide key={i}>
                            <div className="ratio ratio-1:1">
                              <div className="cardImage__content">
                                <Image
                                  width={250}
                                  height={250}
                                  className="rounded-4 col-12 js-lazy"
                                  src={ite}
                                  priority
                                  alt="image"
                                />
                              </div>
                              <div className="cardImage__wishlist">
                                <button className="button -blue-1 bg-white size-30 rounded-full shadow-2">
                                  <i className="icon-heart text-12"></i>
                                </button>
                              </div>
                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                    {/* End image */}
                  </div>
                  {/* End image ratio */}
                </div>
                {/* End relative */}
              </div>
              {/* End .col */}

              <div className="col-md">
                <div className="d-flex flex-column h-full justify-between">
                  <div>
                    <div className="row x-gap-5 items-center">
                      { item?.agencies &&
<>
                      <div className="col-auto">
                        <div className="text-14 text-light-1">
                          {item?.agencies.location.location_city}, {item?.agencies.location.location_country}  
                        </div>
                      </div>
                      <div className="col-auto">
                        <div className="size-3 rounded-full bg-light-1" />
                      </div>
</>
                      }
                      <div className="col-auto">
                        <div className="text-14 text-light-1">{item.body_type}</div>
                      </div>
                    </div>
                    <h3 className="text-18 lh-16 fw-500 mt-5">
                      {item["brands"]['brand_name']} {item.series?.serie_name} <span className="text-15 text-light-1">{t('CarsPage.orSimilar')}</span>
                    </h3>
                  </div>
                  <div className="col-lg-7 mt-20">
                    <div className="row y-gap-5">
                      <div className="col-sm-6">
                        <div className="d-flex items-center">
                          <i className="icon-user-2" />
                          <div className={`text-14 ${dir === "ltr" ? "ml-10" : "mr-10"}`}>{item.seating_capacity}</div>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="d-flex items-center"> 
                          <i className="icon-luggage" />
                          <div className={`text-14 ${dir === "ltr" ? "ml-10" : "mr-10"}`}>{item?.small_bag + item?.large_bag} </div>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="d-flex items-center">
                          <i className="icon-transmission" />
                          <div className={`text-14 ${dir === "ltr" ? "ml-10" : "mr-10"}`}>{item?.transmission.toLowerCase() === "automatic" || item?.transmission.toLowerCase() === "automatique" ? t("CarsPage.Gear.automatic") : t("CarsPage.Gear.manual") }</div>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="d-flex items-center">
                          <i className="icon-speedometer" />
                          <div className={`text-14 ${dir === "ltr" ? "ml-10" : "mr-10"}`}>{t('CarsPage.unlimited')}</div>
                        </div>
                      </div>
                      <div className="col-sm-6">
                       { item?.climate_control === 1  &&  <div className="d-flex items-center">
                          <i className="icon-fan" />
                          <div className={`text-14 ${dir === "ltr" ? "ml-10" : "mr-10"}`}> {t('CarsPage.airConditioning')}</div>
                        </div>}
                      </div>
                      <div className="col-sm-6">
                        <div className="d-flex items-center">
                          <i className="icon-fuel" />
                          <div className={`text-14 ${dir === "ltr" ? "ml-10" : "mr-10"}`}>
    {item?.fuel_type.toLowerCase() === "diesel" ? t("CarsPage.Fuel.diesel")
      : item?.fuel_type.toLowerCase() === "petrol" || item?.fuel_type.toLowerCase() === "gasoline" ? t("CarsPage.Fuel.gasoline")
      : item?.fuel_type.toLowerCase() === "hybride" ? t("CarsPage.Fuel.hybride")
      : item?.fuel_type}
  </div>                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-20">
                    {
                      1 == 2 &&
                    <div className="d-flex items-center">
                      <i className="icon-check text-10" />
                      <div className="text-14 fw-500 ml-10">{t('CarsPage.freeAmendments')} </div>
                    </div>
                    }
                    {/* check if this vendor support free cancelation */}
                    { 1 == 1 &&
                    <div className="d-flex   items-center">
                      <i className="icon-check text-10" />
                      <div className={`text-14 fw-500 text-green-2  ${dir === "ltr" ? "ml-10" : "mr-10"} `}>{t('CarsPage.FreeCancellation')}</div>
                    </div>
                    }
                  </div>
                </div>
              </div>
              {/* End col-md */}
              <div className="col-md-auto text-right md:text-left">
                {/* <div className="row x-gap-10 y-gap-10 justify-end items-center md:justify-start">
                  <div className="col-auto">
                    <div className="text-14 lh-14 fw-500">{t('CarsPage.reviewsType.Good')}</div>
                    <div className="text-14 lh-14 text-light-1">
                      {item?.numberOfReviews} {t('CarsPage.reviews')}
                    </div>
                  </div>
                  {/* End col  
                  <div className="col-auto">
                    <div className="flex-center text-dark-1 fw-600 text-14 size-40 rounded-4 bg-yellow-1">
                      {item?.ratings}
                    </div>
                  </div>
                  {/* End col  
                </div> */}
                {/* End .row */}
                <div className="text-22 lh-12 fw-600 mt-70 md:mt-20">
                  {item.car_price} MAD
                </div>
                {/* <div className="text-14 text-light-1 mt-5">{t('CarsPage.total')}</div> */}
                <Link
                  href={`/car/${item.id}`}
                  className="button h-50 px-24 bg-dark-1  bg-blue-1 text-white mt-24"
                >
                 {t('CarsPage.detailBtn')} <div className={`icon-arrow-top-right  ${dir === "ltr" ? "ml-15" : "mr-15"} ` }/>
                </Link>
              </div>
              {/* End col-md-auto */}
            </div>
            {/* End .row */}
          </div>
        </div>
      )})}
    </>
  );
};

export default CarProperties;
