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



import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CategorieFilters = ({ onCategoryChange }) => {  
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/get-all-categories-for-client');
        console.log('Données reçues:', response.data);
        setCategories(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des catégories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    onCategoryChange(selectedCategories);
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
              <div className="text-15 ml-10">{category.category_name}</div>
            </div>
          </div>
          <div className="col-auto">
            <div className="text-15 text-light-1">{category.cars.length}</div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CategorieFilters;
