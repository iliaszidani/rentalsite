"use client";
import CallToActions from "@/components/common/CallToActions";
import Header11 from "@/components/header/header-11";
import DefaultFooter from "@/components/footer/default";
import MainFilterSearchBox from "@/components/hero/hero-3/MainFilterSearchBox";
import TopHeaderFilter from "@/components/car-list/car-list-v1/TopHeaderFilter";
import Pagination from "@/components/car-list/common/Pagination";
import Sidebar from "@/components/car-list/car-list-v1/Sidebar";
import Header3 from "@/components/header/header-3";
import { useState, useEffect, Suspense, lazy } from "react";
// import CarProperties from "@/components/car-list/car-list-v1/CarPropertes";
import { useRouter, useSearchParams } from "next/navigation";
import Skeleton from "@/components/Skeleton";
import { fetchCars } from "@/features/car/thunk";
import { useDispatch, useSelector } from "react-redux";
// const CarProperties = lazy(() => import('@/components/car-list/car-list-v1/CarPropertes'));
import CarProperties from "@/components/car-list/car-list-v1/CarPropertes";

const Index = () => {
  // const [selectedCategories, setSelectedCategories] = useState([]);
  // const [selectedFuelType, setSelectedFuelType] = useState(null); 
  // const [selectedTransmission, setSelectedTransmission] = useState(null);
  // const [selectedMileage, setSelectedMileage] = useState(null);
  // const [selectedSpecification, setSelectedSpecification] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({});
  const [sortedCars, setSortedCars] = useState([]);
  const [sortedCarsLength, setSortedCarsLength] = useState(0);
  const [sortedCarsCopy, setSortedCarsCopy] = useState([]);
  // const [isAscending, setIsAscending] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  
  const searchParams = useSearchParams();
  const Router = useRouter();
  const dispatch = useDispatch();
  const { cars, filteredCars, isLoading , isAscending, totalPages, itemsPerPage} = useSelector((state) => state.car);

  useEffect(() => {
    dispatch(fetchCars());
  }, []);

  // const handleSpecificationsChange = (specification) => {
  //   console.log('handleSpecificationChange', specification);
  //   setSelectedSpecification(specification);
  //   console.log('cars before ', sortedCars);
  
  //   const filteredCars = sortedCarsCopy.filter(car => {
  //     return Object.keys(specification).every(key => {
  //       return Array.isArray(specification[key]) && specification[key].length > 0
  //         ? specification[key].includes(car[key])
  //         : true; 
  //     });
  //   });
  //   console.log('cars after ', filteredCars);
  //   setSortedCars(filteredCars);
  //   setTotalPages(Math.ceil(filteredCars.length / itemsPerPage)); 
  //   console.log('filteredCars', filteredCars);
  //   console.log('Total pages:', totalPages);  
  // };
  

  // const handleMileageChange = (mileage) => {
  //   console.log('handleMileageChange', mileage);
  //   setSelectedMileage(mileage);
  //   console.log('cars before ', sortedCars)
  //   const filteredCars = sortedCarsCopy.filter(car => mileage.includes(car.mileage));
  //   console.log('cars after ', filteredCars);
  //   setSortedCars(filteredCars);
  //   console.log('setSortedCars', filteredCars);
  //   setTotalPages(Math.ceil(filteredCars.length / itemsPerPage)); 
  //   console.log('Total pages:', totalPages);
  // };



  // const handleTransmissionChange = (transmission) => {
  //   setSelectedTransmission(transmission);
  //   if (transmission.length === 0) {
  //     setSortedCars(sortedCarsCopy);
  //     setTotalPages(Math.ceil(sortedCarsCopy.length / itemsPerPage));
  //   } else {
  //     const filteredCars = sortedCarsCopy.filter(car => transmission.includes(car.transmission));
  //     if (filteredCars.length === 0) {
  //       setSortedCars(sortedCarsCopy);
  //       setTotalPages(Math.ceil(sortedCarsCopy.length / itemsPerPage));
  //     } else {
  //       setSortedCars(filteredCars);
  //       setTotalPages(Math.ceil(filteredCars.length / itemsPerPage));
  //     }
  //   }    
  // };
  

  // const handleFuelTypeChange = (fuelType) => {
  //   console.log('handleFuelTypeChange', fuelType);
  //   setSelectedFuelType(fuelType);
  //   if (fuelType.length === 0) {
  //     setSortedCars(sortedCarsCopy);
  //     setTotalPages(Math.ceil(sortedCarsCopy.length / itemsPerPage));
  //   } else {
  //     const filteredCars = sortedCarsCopy.filter(car => fuelType.includes(car.fuel_type));  
  //     if (filteredCars.length === 0) {
  //       setSortedCars(sortedCarsCopy);
  //       setTotalPages(Math.ceil(sortedCarsCopy.length / itemsPerPage));
  //     } else {
  //       setSortedCars(filteredCars);
  //       setTotalPages(Math.ceil(filteredCars.length / itemsPerPage));
  //     }
  //   }    
  // };
  

  // const resetFilters = () => {
  //   setSelectedCategories([]);
  
  //   setSortedCars(sortedCarsCopy);
  //   setTotalPages(Math.ceil(sortedCarsCopy.length / itemsPerPage));
  // };
  // const handleCategoryChange = (categories) => {
  //   console.log('handleCategoryChange', categories);
  //   setSelectedCategories(categories);
    
  //   if (categories.length === 0) {
  //     resetFilters();
  //     return;
  //   }
    
  //   const newCars = sortedCarsCopy.filter(car => categories.includes(car.categories.id));
  //   setSortedCars(newCars);
  //   console.log('setSortedCars', newCars);  
  //   setTotalPages(Math.ceil(newCars.length / itemsPerPage)); 
  // };
  
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // const getCurrentPageCars = () => {
  //   const startIndex = (currentPage - 1) * itemsPerPage;
  //   const endIndex = startIndex + itemsPerPage;
  //   return sortedCars.slice(startIndex, endIndex);
  // };
 
  const getCurrentPageCars = () => {
    console.log("called  getCurrentPageCars filteredCars", filteredCars);
    console.log("called  getCurrentPageCars cars", cars);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    // return sortedCars.slice(startIndex, endIndex);
    return filteredCars.slice(startIndex, endIndex);
  };

  // const [sortedCars, setSortedCars] = useState([]);

  useEffect(() => {
    setSortedCarsLength(sortedCars.length);
  }, [sortedCars]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch('http://localhost:8000/api/get-all-cars-for-client');
  //     console.log(response);
  //     if (response.status === 201) {
  //       let data = await response.json();
  //       console.log(data);

  //       // const pickUpAgency =  JSON.parse(searchParams.get('pick_up_agency') );
  //       // const dropOffAgency =  JSON.parse(searchParams.get('drop_off_agency') );
  //       // const pickUpTime = searchParams.get('pick_up_time');
  //       // const dropOffTime = searchParams.get('drop_off_time');
  //       const bookingDls = {
  //         isFilled: JSON.parse(searchParams.get("isFilled")),
  //         isDifferentLocations: JSON.parse(
  //           searchParams.get("isDifferentLocations")
  //         ),
  //         pickUpAgency: JSON.parse(searchParams.get("pick_up_agency")),
  //         dropOffAgency: JSON.parse(searchParams.get("drop_off_agency")),
  //         pickUpTime: searchParams.get("pick_up_time"),
  //         dropOffTime: searchParams.get("drop_off_time"),
  //       };
  //       setBookingDetails(bookingDls);

  //       if (
  //         bookingDls.pickUpAgency &&
  //         bookingDls.dropOffAgency &&
  //         bookingDls.pickUpAgency &&
  //         bookingDls.dropOffTime
  //       ) {
  //         console.log("from filter ", true);
  //         data.all_cars = data.all_cars.filter((item) => {
  //           const detailedName =
  //             bookingDls.pickUpAgency.name +
  //             " " +
  //             bookingDls.pickUpAgency.address;
  //           if (
  //             detailedName
  //               .toLocaleLowerCase()
  //               .includes(
  //                 item.agencies.city_agence.toLocaleLowerCase() ||
  //                   item.agencies.adresse.toLocaleLowerCase()
  //               )
  //           )
  //             return true;
  //         });
  //       } else {
  //         console.log("from filter ", false);
  //       }

  //       console.log(
  //         "q: pi up a",
  //         bookingDetails.pickUpAgency,
  //         " dr off a",
  //         bookingDetails.dropOffAgency
  //       );
  //       console.log(
  //         "q: pi up t",
  //         bookingDetails.pickUpTime,
  //         " dr off t",
  //         bookingDetails.dropOffTime
  //       );

  //       setSortedCars(data.all_cars);
  //       setSortedCarsCopy(data.all_cars);
  //       console.log("bedf Total pages:", totalPages);
  //       setTotalPages(Math.ceil(data.all_cars.length / itemsPerPage));
  //       console.log("after Total pages:", totalPages);
  //     } else {
  //       console.error(
  //         "Erreur lors de l'appel de getCars:",
  //         response.statusText
  //       );
  //     }
  //   };
  //   fetchData();
  // }, []);

  // const sortCarsByPrice = () => {
  //   console.log("calling sortCarsByPrice:");
  //   console.log("before: ", sortedCars);

  //   const sorted = [...sortedCars].sort((a, b) =>
  //     isAscending ? a.car_price - b.car_price : b.car_price - a.car_price
  //   );

  //   setSortedCars(sorted);
  //   console.log("after: ", sorted);

  //   setIsAscending(!isAscending); // Basculer l'ordre de tri
  // };

  // const filterCarsByPrice = (minPrice, maxPrice) => {
  //   console.log("min - max " + minPrice + " " + maxPrice);
  //   console.log("bef filter: ", sortedCars);
  //   const filtered = sortedCarsCopy.filter(
  //     (car) => car.car_price >= minPrice && car.car_price <= maxPrice
  //   );
  //   console.log("qf filter: ", filtered);
  //   setTotalPages(Math.ceil(filtered.length / itemsPerPage));
  //   setSortedCars(filtered);
  // };
  

  return (
    <>
      {/* End Page Title */}
      <div className="header-margin"></div>
      {/* header top margin */}
      <Header3 />
      {/* End Header 1 */}
      <section className="pt-60">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="text-center">
                <h1 className="text-30 fw-600">
                  Réservez votre Voiture, Soyez Satisfaits !
                </h1>
              </div>
              {/* End text-center */}
              <MainFilterSearchBox
                isHome={false}
                initialData={bookingDetails}
              />
            </div>
            {/* End col-12 */}
          </div>
        </div>
      </section>
      {/* Top SearchBanner */}
      <section className="layout-pt-md layout-pb-lg">
        <div className="container">
          <div className="row y-gap-30">
            <div className="col-xl-3">
              <aside className="sidebar y-gap-40 xl:d-none">
                <Sidebar 
                cars={filteredCars}
                //  filterCarsByPrice={filterCarsByPrice}  
                // handleCategoryChange={handleCategoryChange} 
                // handleFuelTypeChange={handleFuelTypeChange} 
                // handleTransmissionChange={handleTransmissionChange}
                // handleMileageChange={handleMileageChange}
                // handleSpecificationsChange={handleSpecificationsChange}
                />
                {/* <Sidebar
                  cars={sortedCarsCopy}
                   filterCarsByPrice={filterCarsByPrice}
                />{" "} */}
                {/*hadi 3atiha sortedCars copy o lakhra la */}
              </aside>
              {/* End sidebar for desktop */}
              <div
                className="offcanvas offcanvas-start"
                tabIndex="-1"
                id="listingSidebar"
              >
                <div className="offcanvas-header">
                  <h5 className="offcanvas-title" id="offcanvasLabel">
                    Filter Hotels
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  ></button>
                </div>
                {/* End offcanvas header */}
                <div className="offcanvas-body">
                  <aside className="sidebar y-gap-40  xl:d-block">
                    <Sidebar  cars={filteredCars} 
                    // filterCarsByPrice={filterCarsByPrice} 
                    // handleCategoryChange={handleCategoryChange} 
                    // handleFuelTypeChange={handleFuelTypeChange} 
                    // handleTransmissionChange={handleTransmissionChange}
                    // handleMileageChange={handleMileageChange}
                    // handleSpecificationsChange={handleSpecificationsChange}
                    />
                    {/* <Sidebar
                      cars={sortedCarsCopy}
                      filterCarsByPrice={filterCarsByPrice}
                    /> */}
                  </aside>
                </div>
                {/* End offcanvas body */}
              </div>
              {/* End mobile menu sidebar */}
            </div>
            {/* End col */}
            {/* {sortedCars.length === 0 ? (
              <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-grow text-danger" role="status"></div>
                <div className="spinner-grow text-danger" role="status"></div>
                <div className="spinner-grow text-danger" role="status"></div>
                <div className="spinner-grow text-danger" role="status"></div>
                <div className="spinner-grow text-danger" role="status"></div>
              </div>
              ) : (
              <div className="col-xl-9">
                <TopHeaderFilter onSort={sortCarsByPrice} isAscending={isAscending} />
                <div className="mt-30"></div>
                <div className="row y-gap-30">
                  <CarProperties cars={getCurrentPageCars()} />
                </div>
                <Pagination
                  totalPages={totalPages}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              </div>
              )} */}

            {/* { sortedCars.length == 0 ?  
            <div>
                  <div className="spinner-grow text-danger" role="status"> </div>
                  <div className="spinner-grow text-danger" role="status"> </div>
                  <div className="spinner-grow text-danger" role="status"> </div>
                  <div className="spinner-grow text-danger" role="status"> </div>
                  <div className="spinner-grow text-danger" role="status"> </div></div>
              
                  : */}

            {/* <Suspense  fallback={<Skeleton/>}  > */}
         
            {isLoading == null || isLoading  ? (
              <Skeleton/>
            ) : (
              <div className="col-xl-9 ">
                <TopHeaderFilter
                  // onSort={sortCarsByPrice}
                  isAscending={isAscending}
                  sortedCarsLength={filteredCars.length}
                />
                <div className="mt-30"></div>
                {/* End mt--30 */}
                <div className="row y-gap-30">
                  {!isLoading && <CarProperties cars={getCurrentPageCars()} />}
                </div>
                {/* End .row */}
                <Pagination
                  totalPages={totalPages}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
            {/* </Suspense> */}
            {/* } */}
            {/* End .col for right content */}
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </section>
      {/* End layout for listing sidebar and content */}
      <CallToActions />
      {/* End Call To Actions Section */}
      <DefaultFooter />
    </>
  );
};

export default Index;
