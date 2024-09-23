const PropertyHighlights = ({car}) => {
  console.log("car", car)
  const propertyContent = [
    {
      id: 1,
      icon: "icon-user-2",
      name: "Seating capacity",
      content: car.car.seating_capacity,
    },    
    {
      id: 2,
      icon: "icon-luggage",
      name: "Luggage",
      content: car.car.small_bag + car.car.large_bag,
    },
    {
      id: 3,
      icon: "icon-transmission",
      name: "Transmission",
      content: car.car.transmission,
    },
    {
      id: 4,
      icon: "icon-speedometer",
      name: "Mileage",
      content: `${car.car.mileage} `,
    },
    {
      id: 5,
      icon: "icon-fuel",
      name: "Fuel",
      content:car.car.fuel_type,
    },
  ];
  return (
    <div className="row y-gap-30 justify-between pt-20">
      {propertyContent.map((item) => (
        <div className="col-md-auto col-6" key={item.id}>
          <div className="d-flex">
            <i className={`${item.icon} text-22 text-dark-1 mr-10`} />
            <div className="text-15 lh-15">
              {item.name}
              <br /> {item.content}
              
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default PropertyHighlights;
