const Specifications = ({car}) => {
  const speciContent = [
    { id: 1, name: "Make", content: car.brands.brand_name},
    { id: 2, name: "Model", content: car.car_name },
    { id: 3, name: "Made Year", content: car.year_of_manufacture },
    { id: 4, name: "Mileage", content: car.mileage },
    { id: 5, name: "Mileage", content: car.mileage },
    { id: 6, name: "Version", content: car.engine_size  },
    { id: 7, name: "Horsepower (hp)", content: car.engine_size },
    { id: 8, name: "Transmission", content: car.transmission },
    { id: 9, name: "Condition", content: car.visible ? 'New' : 'Used' },
  ];  
  return (
    <div className="row y-gap-30 pt-15">
      {speciContent.map((item) => (
        <div className="col-sm-4" key={item.id}>
          <div className="fw-500">{item.name}</div>
          <div className="text-15">{item.content}</div>
        </div>
      ))}
    </div>
  );
};

export default Specifications;
