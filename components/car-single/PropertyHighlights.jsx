const PropertyHighlights = ({car}) => {
  const propertyContent = [
    {
      id: 1,
      icon: "icon-user-2",
      name: "User",
      content: car.seating_capacity,
    },
    
    {
      id: 2,
      icon: "icon-luggage",
      name: "Luggage",
      content: "2",
    },
    {
      id: 3,
      icon: "icon-transmission",
      name: "Transmission",
      content: car.transmission,
    },
    {
      id: 4,
      icon: "icon-speedometer",
      name: "Mileage",
      content: `${car.mileage} `,
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
