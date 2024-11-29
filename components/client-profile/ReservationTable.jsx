const { default: Link } = require("next/link");

const ReservationTable = ({ reservations }) => {
    // console.log("ReservationTable", reservations)
    
    const formatDateForDisplay = (date) => {
      const d = new Date(date);   
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = d.getFullYear();
      const hour = String(d.getHours()).padStart(2, '0');  
      const minute = String(d.getMinutes()).padStart(2, '0');  
      return `${year}-${month}-${day} ${hour}:${minute}`;
    };
    const getStatusClasses = (status) => {
      switch (status) {
        case 'cancelled':
          return 'badge bg-danger-subtle text-danger text-uppercase';
        case 'pending':
          return 'badge bg-warning-subtle text-danger text-uppercase';
        case 'completed':
          return 'badge bg-success-subtle text-success text-uppercase';
        case 'processing':
          return'badge bg-info-subtle text-info text-uppercase';
        default:
          return '';
      }
      };
    
      return (
        <div className="table-responsive">
          <table className="table table-bordered table-striped align-middle">
            <thead className="table-light">
              <tr>
                <th className="w-auto text-center">Reservation ID</th>
                <th className="w-auto">Car</th>
                <th className="text-nowrap text-center">Reservation Date</th>
                <th className="w-auto text-center">Car Day Price</th>
                <th className="text-nowrap text-center">Dates</th>
                <th className="w-auto text-center">Car Total Price</th>
                <th className="w-auto text-center">Extras Cost</th>
                <th className="w-auto text-center">Total Price</th>
                <th className="w-auto text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation) => {
                const reservationDateTime = formatDateForDisplay(reservation.created_at);
                const pickUpDateTime = formatDateForDisplay(reservation.date_start);
                const dropOffDateTime = formatDateForDisplay(reservation.date_end);
                const statusClasses = getStatusClasses(reservation.reservation_status);
                return (
                  <tr key={reservation.id}>
                    <td className="px-3 text-center">{reservation.id}</td>
                    <td className="px-3">
                      <Link href={`/car/${reservation.car.id}`} className="text-decoration-none text-primary">
                        {reservation.car.car_name}
                      </Link>
                    </td>
                    <td className="px-3 text-center">{reservationDateTime}</td>
                    <td className="px-3 text-center">{reservation.car_unit_price}</td>
                    <td className="px-3 text-center">{pickUpDateTime} - {dropOffDateTime}</td>
                    <td className="px-3 text-center">{reservation.car_total_price}</td>
                    <td className="px-3 text-center">{reservation.options_price}</td>
                    <td className="px-3 text-center">{reservation.total_price}</td>
                    <td className={`px-3 text-center`}><span   className={`${statusClasses}`}>{reservation.reservation_status}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
      
  };
  