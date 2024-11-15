
'use client'

// import { useState, useEffect } from "react";
// import InputRange from "react-input-range";

// const PirceSlider = ({cars, filterCarsByPrice}) => {



//   const [isLoading, setIsLoading] = useState(true);
//   const [min, setMin] = useState(0);
//   const [max, setMax] = useState(500);
//   const [price, setPrice] = useState({
//     value: { min: min, max: max },
//   });
//   const [initPrice, setInitPrice] = useState({
//     value: { min: min, max: max },
//   });

//   useEffect(() => {
//     setMin(Math.min(...cars.map(car => car.car_price)));
//     setMax(Math.max(...cars.map(car => car.car_price)));
//     setIsLoading(false);
//     setPrice({ value: { min: min, max: max } });
//     setInitPrice({ value: { min: min, max: max } });
//   }, [cars]);

//   console.log('min ',min);
//   console.log('max ',max);
//   console.log('loading ',isLoading);

//   const handleOnChange = (value) => {
//     setPrice(value);
//     console.log('val ',value);
//     filterCarsByPrice(value.min, value.max);
//     console.log('price ',price);
//     console.log('init ',initPrice);
//   };

//   return (
//     <div className="js-price-rangeSlider">
//       <div className="text-14 fw-500"></div>

//       <div className="d-flex justify-between mb-20">
//         <div className="text-15 text-dark-1">
//           <span className="js-lower mx-1">${price.value.min}</span>-
//           <span className="js-upper mx-1">${price.value.max}</span>
//         </div>
//       </div>

//       {!isLoading && 
//       <div className="px-5">
//         <InputRange
         
//           minValue={initPrice.value.min}
//           maxValue={initPrice.value.max}
//           value={price.value}
//           onChange={(value) => handleOnChange(value)}
//         />
//       </div>}
//     </div>
//   );
// };

// export default PirceSlider;




import React, { useState, useEffect } from 'react';
import InputRange from 'react-input-range';
import { useDispatch, useSelector } from "react-redux";
import {filterAll, setCarsByPrice} from "@/features/car/carSlice";

const PriceSlider = () => {
  const { cars} = useSelector((state) => state.car);
  const dispatch = useDispatch();
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(2000);
  const [price, setPrice] = useState({ min: 0, max: 0 });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const carPrices = cars.map(car => car.car_price);
    setMinPrice(Math.min(...carPrices));
    setMaxPrice(Math.max(...carPrices));
    setPrice({ min: Math.min(...carPrices), max: Math.max(...carPrices) });
  }, [cars]);

  return (
    <div>
       <div className="d-flex justify-between mb-20">
        <div className="text-15 text-dark-1">
          <span className="js-lower mx-1">{price.min} MAD</span>-
          <span className="js-upper mx-1">{price.max} MAD</span>
        </div>
       </div>
      <div>
        <InputRange
          maxValue={maxPrice || 0}
          minValue={minPrice || 0}
          value={price}
          onChange={value => {
            setPrice(value)
            // filterCarsByPrice(value.min, value.max);
            // dispatch(setCarsByPrice(value))
            dispatch(filterAll({price:value}));
          } }
        />
      </div> 
    </div>
  );
};
export default PriceSlider;
