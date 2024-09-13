
 import { useState } from "react";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const maxPagesToShow = 1; // Number of pages to show around the current page

  const handlePageClick = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      onPageChange(pageNumber);
    }
  };

  const renderPage = (pageNumber, isActive = false) => {
    const className = `size-40 flex-center rounded-full cursor-pointer ${
      isActive ? "bg-dark-1 text-white" : ""
    }`;
    return (
      <div key={pageNumber} className="col-auto">
        <div className={className} onClick={() => handlePageClick(pageNumber)}>
          {pageNumber}
        </div>
      </div>
    );
  };

  const renderEllipsis = (key) => (
    <div key={key} className="col-auto">
      <div className="size-40 flex-center rounded-full">...</div>
    </div>
  );

  const renderPages = () => {
    const pageNumbers = [];

    // Always render the first page
    pageNumbers.push(renderPage(1, currentPage === 1));

    // Ellipsis if current page is far from the first page
    if (currentPage > maxPagesToShow + 2) {
      pageNumbers.push(renderEllipsis("ellipsis-start"));
    }

    // Render pages around the current page
    for (
      let i = Math.max(currentPage - maxPagesToShow, 2);
      i <= Math.min(currentPage + maxPagesToShow, totalPages - 1);
      i++
    ) {
      pageNumbers.push(renderPage(i, i === currentPage));
    }

    // Ellipsis if current page is far from the last page
    if (currentPage < totalPages - maxPagesToShow - 1) {
      pageNumbers.push(renderEllipsis("ellipsis-end"));
    }

    // Always render the last page
    if (totalPages > 1) {
      pageNumbers.push(renderPage(totalPages, currentPage === totalPages));
    }

    return pageNumbers;
  };

  return (
        <div className="border-top-light mt-30 pt-30">
          <div className="row x-gap-10 y-gap-20 justify-between md:justify-center">
          <div className="col-auto md:order-1">
          <button
            className="button -blue-1 size-40 rounded-full border-light"
            onClick={() => handlePageClick(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <i className="icon-chevron-left text-12" />
          </button>
        </div>
            <div className="col-md-auto md:order-3">
              <div className="row x-gap-20 y-gap-20 items-center md:d-none">
                {renderPages()}
              </div>
              <div className="row x-gap-10 y-gap-20 justify-center items-center d-none md:d-flex">
                {renderPages()}
              </div>
            </div>
            <div className="col-auto md:order-2">   
          <button
            className="button -blue-1 size-40 rounded-full border-light"
            onClick={() => handlePageClick(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <i className="icon-chevron-right text-12" />
          </button>
        </div>
          </div>
        </div>
      );
    };
    

export default Pagination;


// 'use client'
// import { useState } from "react";
// itemPerPage = 5;
// const Pagination = ({totalPages,currentPage,onPageChange}) => {
// const [currentPage, setCurrentPage] = useState(1);
//   console.log('totalPages',totalPages);
//   console.log('currentPage',currentPage);
//   const handlePageClick = (pageNumber) => {
//     onPageChange(pageNumber);
//   };
//   const renderPage = (pageNumber, isActive = false) => {
//     const className = `size-40 flex-center rounded-full cursor-pointer ${
//       isActive ? "bg-dark-1 text-white" : ""
//     }`;
//     return (
//       <div key={pageNumber} className="col-auto">
//         <div className={className} onClick={() => handlePageClick(pageNumber)}>
//           {pageNumber}
//         </div>
//       </div>
//     );
//   };
//   const renderPages = () => {
 // const totalPages = 5; // Change this to the actual total number of pages
//     const pageNumbers = [];
//     for (let i = 1; i <= totalPages; i++) {
//       pageNumbers.push(i);
//     }
//     const pages = pageNumbers.map((pageNumber) =>
//       renderPage(pageNumber, pageNumber === currentPage)
//     );
//     return pages;
//   };

//   return (
//     <div className="border-top-light mt-30 pt-30">
//       <div className="row x-gap-10 y-gap-20 justify-between md:justify-center">
//         <div className="col-auto md:order-1">
//           <button className="button -blue-1 size-40 rounded-full border-light">
//             <i className="icon-chevron-left text-12" />
//           </button>
//         </div>

//         <div className="col-md-auto md:order-3">
//           <div className="row x-gap-20 y-gap-20 items-center md:d-none">
//             {renderPages()}
//             {/* <div className="col-auto">
//               <div className="size-40 flex-center rounded-full">...</div>
//             </div>
//             <div className="col-auto">
//               <div className="size-40 flex-center rounded-full">20</div>
//             </div> */}
//           </div>

//           <div className="row x-gap-10 y-gap-20 justify-center items-center d-none md:d-flex">
//             {renderPages()}
//           </div>

//           {/* <div className="text-center mt-30 md:mt-10">
//             <div className="text-14 text-light-1">
//               1 – 20 of 300+ properties found
//             </div>
//           </div> */}
//         </div>

//         <div className="col-auto md:order-2">
//           <button className="button -blue-1 size-40 rounded-full border-light">
//             <i className="icon-chevron-right text-12" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Pagination;
