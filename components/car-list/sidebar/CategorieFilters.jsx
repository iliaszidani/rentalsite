// const CategorieFilters = () => {
//   return (
//     <>
//       <div className="row y-gap-10 items-center justify-between">
//         <div className="col-auto">
//           <div className="form-checkbox d-flex items-center">
//             <input type="checkbox" />
//             <div className="form-checkbox__mark">
//               <div className="form-checkbox__icon icon-check" />
//             </div>
//             <div className="text-15 ml-10">Small</div>
//           </div>
//         </div>
//         <div className="col-auto">
//           <div className="text-15 text-light-1">92</div>
//         </div>
//       </div>
//       {/* End .row */}
//       <div className="row y-gap-10 items-center justify-between">
//         <div className="col-auto">
//           <div className="form-checkbox d-flex items-center">
//             <input type="checkbox" />
//             <div className="form-checkbox__mark">
//               <div className="form-checkbox__icon icon-check" />
//             </div>
//             <div className="text-15 ml-10">Medium</div>
//           </div>
//         </div>
//         <div className="col-auto">
//           <div className="text-15 text-light-1">45</div>
//         </div>
//       </div>
//       {/* End .row */}
//       <div className="row y-gap-10 items-center justify-between">
//         <div className="col-auto">
//           <div className="form-checkbox d-flex items-center">
//             <input type="checkbox" />
//             <div className="form-checkbox__mark">
//               <div className="form-checkbox__icon icon-check" />
//             </div>
//             <div className="text-15 ml-10">Large</div>
//           </div>
//         </div>
//         <div className="col-auto">
//           <div className="text-15 text-light-1">21</div>
//         </div>
//       </div>
//       {/* End .row */}
//       <div className="row y-gap-10 items-center justify-between">
//         <div className="col-auto">
//           <div className="form-checkbox d-flex items-center">
//             <input type="checkbox" />
//             <div className="form-checkbox__mark">
//               <div className="form-checkbox__icon icon-check" />
//             </div>
//             <div className="text-15 ml-10">Premium</div>
//           </div>
//         </div>
//         <div className="col-auto">
//           <div className="text-15 text-light-1">78</div>
//         </div>
//       </div>
//       {/* End .row */}
//       <div className="row y-gap-10 items-center justify-between">
//         <div className="col-auto">
//           <div className="form-checkbox d-flex items-center">
//             <input type="checkbox" />
//             <div className="form-checkbox__mark">
//               <div className="form-checkbox__icon icon-check" />
//             </div>
//             <div className="text-15 ml-10">SUV</div>
//           </div>
//         </div>
//         <div className="col-auto">
//           <div className="text-15 text-light-1">679</div>
//         </div>
//       </div>
//       {/* End .row */}
//     </>
//   );
// };

// export default CategorieFilters;


'use client'
import React, { useEffect, useState } from 'react';
 
import { useDispatch, useSelector } from 'react-redux';
import { filterAll, setCategoryFilter } from '@/features/car/carSlice';
import axiosInstance from '@/lib/axiosConfig';


const CategorieFilters = () => {  
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const filteredCars = useSelector(state => state.car.filteredCars); // Get filtered cars
  const dispatch = useDispatch();
  const [dir, setDir] = useState('ltr');
  
  useEffect(() => {
    const direction = document.documentElement.getAttribute("dir");
    setDir(direction);
  }, []);


    function getFiltredCarsLengthForThisCategory(CategoryId){

    const cars = filteredCars?.filter((car)=>car.categorie_id === CategoryId)

    return cars?.length;
  }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get('/api/get-all-categories-for-client'); // removed http://localhost/car-rental-api/public
        console.log('Données reçues:', response.data);
        setCategories(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des catégories:', error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    // dispatch(setCategoryFilter(selectedCategories));
    // console.log("selected categories ", selectedCategories)
    dispatch(filterAll({categories: selectedCategories }));
    // onCategoryChange(selectedCategories);
    
  }, [selectedCategories]);

  const handleCheckboxChange = (categoryId) => {
    setSelectedCategories(prevSelected => 
      prevSelected.includes(categoryId) 
        ? prevSelected.filter(id => id !== categoryId)
        : [...prevSelected, categoryId]
    );
  };
  return (
    <>
      {categories.map((category) => (
        <div key={category.id} className="row y-gap-10 items-center justify-between">
          <div className="col-auto">
            <div className="form-checkbox d-flex items-center">
              <input
                type="checkbox"
                onChange={() => handleCheckboxChange(category.id)}
                checked={selectedCategories.includes(category.id)}
              />
              <div className="form-checkbox__mark">
                <div className="form-checkbox__icon icon-check" />
              </div>
              <div className={`text-15 ${dir === "ltr"? "ml-10":"mr-10"} `}>{category.category_name}</div>
            </div>
          </div>
          <div className="col-auto">
            <div className="text-15 text-light-1">{getFiltredCarsLengthForThisCategory(category.id)}</div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CategorieFilters;
