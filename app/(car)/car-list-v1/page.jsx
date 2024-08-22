"use client";
import CallToActions from "@/components/common/CallToActions";
import Header11 from "@/components/header/header-11";
import DefaultFooter from "@/components/footer/default";
import MainFilterSearchBox from "@/components/car-list/car-list-v1/MainFilterSearchBox";
import TopHeaderFilter from "@/components/car-list/car-list-v1/TopHeaderFilter";
import Pagination from "@/components/car-list/common/Pagination";
import Sidebar from "@/components/car-list/car-list-v1/Sidebar";

import Header3 from "@/components/header/header-3";
import { useState, useEffect } from 'react';
import CarProperties from "@/components/car-list/car-list-v1/CarPropertes";

// export const metadata = {
//   title: "Car List v1 || GoTrip - Travel & Tour React NextJS Template",
//   description: "GoTrip - Travel & Tour React NextJS Template",
// };
  

  // const [sortedCars, setSortedCars] = useState([]);
  // const response = await fetch('http://127.0.0.1:8000/api/get-all-cars-for-client');
  // const data = await response.json();
  // console.log(data);
  // let sortedCars = data;

  // const sortCarsByPrice = () => {
  //   console.log('calling sortCarsByPrice:');
  //   console.log('before: ', sortedCars);
    
  //   const sorted = [...data.all_cars].sort((a, b) => a.car_price - b.car_price);
  //   sortedCars = sorted;
  //   console.log('after: ', sortedCars);
  
  // };

  const Index = () => {
    const [sortedCars, setSortedCars] = useState([]);
    const [sortedCarsCopy, setSortedCarsCopy] = useState([]);
    const [isAscending, setIsAscending] = useState(true); 
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(99);
  const itemsPerPage = 1;
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getCurrentPageCars = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedCars.slice(startIndex, endIndex);
  };

  // const [sortedCars, setSortedCars] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost/car-rental-api/public/api/get-all-cars-for-client');
      console.log(response);
      if(response.status === 201) {
      const data = await response.json();
      console.log(data);
      setSortedCars(data.all_cars);
      setSortedCarsCopy(data.all_cars);
      console.log('bedf Total pages:', totalPages);
  setTotalPages(Math.ceil(data.all_cars.length / itemsPerPage));
  console.log('after Total pages:', totalPages);

    }else{
      console.error("Erreur lors de l'appel de getCars:", response.statusText);
    }

  };
  fetchData();
  }, []);
  const sortCarsByPrice = () => {
    console.log('calling sortCarsByPrice:');
    console.log('before: ', sortedCars);

    const sorted = [...sortedCars].sort((a, b) =>
      isAscending ? a.car_price - b.car_price : b.car_price - a.car_price
    );
 
    setSortedCars(sorted);
    console.log('after: ', sorted);

    setIsAscending(!isAscending); // Basculer l'ordre de tri
  };

  const filterCarsByPrice = ( minPrice, maxPrice) => {
    console.log('min - max ' + minPrice + ' ' + maxPrice)
    console.log('bef filter: ', sortedCars);
    const filtered = sortedCarsCopy.filter(car => car.car_price >= minPrice && car.car_price <= maxPrice);
    console.log('qf filter: ', filtered);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    setSortedCars(filtered);
  };

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
                <h1 className="text-30 fw-600">Réservez votre Voiture, Soyez Satisfaits !</h1>
              </div>
              {/* End text-center */}
              <MainFilterSearchBox />
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
                <Sidebar cars={sortedCarsCopy} filterCarsByPrice={filterCarsByPrice} />
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
                    <Sidebar  cars={sortedCars} filterCarsByPrice={filterCarsByPrice}/>
                  </aside>
                </div>
                {/* End offcanvas body */}
              </div>
              {/* End mobile menu sidebar */}
            </div>
            {/* End col */}
            { sortedCars.length == 0 ?  
     <div>
           <div className="spinner-grow text-danger" role="status"> </div>
           <div className="spinner-grow text-danger" role="status"> </div>
           <div className="spinner-grow text-danger" role="status"> </div>
           <div className="spinner-grow text-danger" role="status"> </div>
           <div className="spinner-grow text-danger" role="status"> </div></div>
      
          :

            <div className="col-xl-9 ">
            <TopHeaderFilter onSort={sortCarsByPrice} isAscending={isAscending} />
              <div className="mt-30"></div>
              {/* End mt--30 */}
              <div className="row y-gap-30">
              <CarProperties cars={getCurrentPageCars()} />
              </div>
              {/* End .row */}
              <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
            </div>
  }
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
// "use client";
// import CallToActions from "@/components/common/CallToActions";
// import Header11 from "@/components/header/header-11";
// import DefaultFooter from "@/components/footer/default";
// import MainFilterSearchBox from "@/components/car-list/car-list-v1/MainFilterSearchBox";
// import TopHeaderFilter from "@/components/car-list/car-list-v1/TopHeaderFilter";
// import Pagination from "@/components/car-list/common/Pagination";
// import Sidebar from "@/components/car-list/car-list-v1/Sidebar";
// import CarPropertes from "@/components/car-list/car-list-v1/CarPropertes";
// import Header3 from "@/components/header/header-3";
// import { useState, useEffect } from 'react';

// // export const metadata = {
// //   title: "Car List v1 || GoTrip - Travel & Tour React NextJS Template",
// //   description: "GoTrip - Travel & Tour React NextJS Template",
// // };


   // const [sortedCars, setSortedCars] = useState([]);
   // const response = await fetch('http://127.0.0.1:8000/api/get-all-cars-for-client');
   // const data = await response.json();
   // console.log(data);
  // let sortedCars = data;

   // const sortCarsByPrice = () => {
   //   console.log('calling sortCarsByPrice:');
   //   console.log('before: ', sortedCars);
    
   //   const sorted = [...data.all_cars].sort((a, b) => a.car_price - b.car_price);
//   //   sortedCars = sorted;
//   //   console.log('after: ', sortedCars);
  
//   // };

//   const Index = () => {
//     const [sortedCars, setSortedCars] = useState([]);
//     const [sortedCarsCopy, setSortedCarsCopy] = useState([]);
//     const [isAscending, setIsAscending] = useState(true); 

//   // const [sortedCars, setSortedCars] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await fetch('http://127.0.0.1:8000/api/get-all-cars-for-client');
//       const data = await response.json();
//       console.log(data);
//       setSortedCars(data.all_cars);
//       setSortedCarsCopy(data.all_cars);
//     };

//     fetchData();
//   }, []);
//   const sortCarsByPrice = () => {
//     console.log('calling sortCarsByPrice:');
//     console.log('before: ', sortedCars);

//     const sorted = [...sortedCars].sort((a, b) =>
//       isAscending ? a.car_price - b.car_price : b.car_price - a.car_price
//     );

//     setSortedCars(sorted);
//     console.log('after: ', sorted);

//     setIsAscending(!isAscending); // Basculer l'ordre de tri
//   };

//   const filterCarsByPrice = ( minPrice, maxPrice) => {
//     console.log('min - max ' + minPrice + ' ' + maxPrice)
//     console.log('bef filter: ', sortedCars);
//     const filtered = sortedCarsCopy.filter(car => car.car_price >= minPrice && car.car_price <= maxPrice);
//     console.log('qf filter: ', filtered);
//     setSortedCars(filtered);
//   };

//   return (
//     <>
//       {/* End Page Title */}

//       <div className="header-margin"></div>
//       {/* header top margin */}

//       <Header3 />
//       {/* End Header 1 */}

//       <section className="pt-60">
//         <div className="container">
//           <div className="row">
//             <div className="col-12">
//               <div className="text-center">
//                 <h1 className="text-30 fw-600">Réservez votre Voiture, Soyez Satisfaits !</h1>
//               </div>
//               {/* End text-center */}
//               <MainFilterSearchBox />
//             </div>
//             {/* End col-12 */}
//           </div>
//         </div>
//       </section>
//       {/* Top SearchBanner */}

//   <section className="layout-pt-md layout-pb-lg">
    
//         <div className="container">
//           <div className="row y-gap-30">
//             <div className="col-xl-3">
//               <aside className="sidebar y-gap-40 xl:d-none">
//                 <Sidebar cars={sortedCarsCopy} filterCarsByPrice={filterCarsByPrice} />
//               </aside>
//               {/* End sidebar for desktop */}

//               <div
//                 className="offcanvas offcanvas-start"
//                 tabIndex="-1"
//                 id="listingSidebar"
//               >
//                 <div className="offcanvas-header">
//                   <h5 className="offcanvas-title" id="offcanvasLabel">
//                     Filter Hotels
//                   </h5>
//                   <button
//                     type="button"
//                     className="btn-close"
//                     data-bs-dismiss="offcanvas"
//                     aria-label="Close"
//                   ></button>
//                 </div>
//                 {/* End offcanvas header */}

//                 <div className="offcanvas-body">
//                   <aside className="sidebar y-gap-40  xl:d-block">
//                     <Sidebar  cars={sortedCars} filterCarsByPrice={filterCarsByPrice}/>
//                   </aside>
//                 </div>
//                 {/* End offcanvas body */}
//               </div>
//               {/* End mobile menu sidebar */}
//             </div>
//             {/* End col */}
//             { sortedCars.length == 0 ?  
//      <div>
//            <div className="spinner-grow text-danger" role="status"> </div>
//            <div className="spinner-grow text-danger" role="status"> </div>
//            <div className="spinner-grow text-danger" role="status"> </div>
//            <div className="spinner-grow text-danger" role="status"> </div>
//            <div className="spinner-grow text-danger" role="status"> </div></div>
      
//           :

//             <div className="col-xl-9 ">
//               <TopHeaderFilter onSort={sortCarsByPrice} isAscending={isAscending} />
//               <div className="mt-30"></div>
//               {/* End mt--30 */}
//               <div className="row y-gap-30">
//                 <CarPropertes cars={sortedCars}/>
//               </div>
//               {/* End .row */}
//               <Pagination />
//             </div>
//   }
//             {/* End .col for right content */}
//           </div>
//           {/* End .row */}
//         </div>
//         {/* End .container */}
//       </section>

      
//       {/* End layout for listing sidebar and content */}

//       <CallToActions />
//       {/* End Call To Actions Section */}

//       <DefaultFooter />
//     </>
//   );
// };

// export default Index;
