
"use client";
const TopHeaderFilter = ({ onSort, isAscending }) => {
  // increment
  return (
    <>
      <div className="row y-gap-10 items-center justify-between">
        <div className="col-auto">
          <div className="text-18">
            <span className="fw-500">3,269 properties</span> in Europe
          </div>
        </div>
        {/* End .col */}

        <div className="col-auto">
          <div className="row x-gap-20 y-gap-20">
            <div className="col-auto">
              
              
            </div>
            <div className="dropdown">
  <button className="button-blue-1 h-40 px-20 rounded-100 bg-blue-1-05 text-15 text-blue-1" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
  <i className="icon-up-down text-14 mr-10" />
  Sort
  </button>
  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
  <li><button className="dropdown-item bg-blue-1-05 text-15 text-blue-1"  onClick={onSort} >Sort by price {isAscending ?  <p className="p-icon">   &#8593;</p> :  <p className="p-icon">&#8595;</p>}</button></li>
    {/* <li><a className="dropdown-item bg-blue-1-05 text-15 text-blue-1"onClick={onSort} >dec-</a></li> */}
    <li><a className="dropdown-item bg-blue-1-05 text-15 text-blue-1" href="#">Something else here</a></li>
  </ul>
  
</div>
            {/* End .col */}

            <div className="col-auto d-none xl:d-block">
              <button
                data-bs-toggle="offcanvas"
                data-bs-target="#listingSidebar"
                className="button -blue-1 h-40 px-20 rounded-100 bg-blue-1-05 text-15 text-blue-1"
              >
                <i className="icon-up-down text-14 mr-10" />
                Filter
              </button>
            </div>
            {/* End .col */}
          </div>
          {/* End .row */}
        </div>
        {/* End .col */}
      </div>
      {/* End .row */}
    </>
  );
};

export default TopHeaderFilter;


