import { useEffect } from 'react';

const Alert = ({ time, errorList = {} }) => {
  useEffect(() => {
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => {
      const progressBar = alert.querySelector('.progress-bar');
      if (progressBar) {
        let width = 0;
        const interval = setInterval(() => {
          width += 100 / (time / 100);
          progressBar.style.width = `${width}%`;
          if (width >= 100) {
            clearInterval(interval);
          }
        }, 100);

        setTimeout(() => {
          if (alert) {
            alert.classList.remove('show');
            clearInterval(interval);
          }
        }, time);
      }
    });
  }, [time, errorList]);

  return (
    <div className="alerts-container position-fixed top-0 end-0" style={{ zIndex: 9999, maxWidth: '500px' }}>
      {Object.entries(errorList).map(([key, value], index) => (
        <div key={index} className="alert alert-danger alert-dismissible fade show" role="alert">
          <strong>{key}:</strong> {value.join(', ')}
          <div className="progress" style={{ height: '5px', marginTop: '10px' }}>
            <div className="progress-bar" role="progressbar" style={{ width: '0%' }}></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Alert;
