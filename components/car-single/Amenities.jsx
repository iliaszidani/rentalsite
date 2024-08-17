const Amenities = ({car}) => {
  const amenitiesList = [
    { key: 'abs', label: 'ABS' },
    { key: 'airbags', label: 'Airbags' },
    { key: 'backup_camera', label: 'Backup Camera' },
    { key: 'bluetooth', label: 'Bluetooth' },
    { key: 'climate_control', label: 'Climate Control' },
    { key: 'cruise_control', label: 'Cruise Control' },
    { key: 'full_gas', label: 'Full Gas' },
    { key: 'gps', label: 'GPS' },
    { key: 'heated_seats', label: 'Heated Seats' },
    { key: 'keyless_entry', label: 'Keyless Entry' },
    { key: 'parking_sensors', label: 'Parking Sensors' },
    { key: 'power_steering', label: 'Power Steering' },
    { key: 'power_windows', label: 'Power Windows' },
    { key: 'remote_start', label: 'Remote Start' },
    { key: 'sunroof', label: 'Sunroof' },
     
  ];
  return (
    <>
      <div className="row y-gap-10 pt-15">
        {amenitiesList.map((item) => (
          car[item.key] ?
          <div className="col-sm-5" key={item.key}>
            <div className="d-flex items-center">
              <i className="icon-check text-10 mr-15" />
              <div className="text-15">{item.label}</div>
            </div>
          </div> : null
        ))}
      </div>
    </>
  );
};

export default Amenities;
