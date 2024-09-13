import { useEffect, useState } from 'react';

const Alert = ({ time, errorList = {} }) => {
  const [visibleAlerts, setVisibleAlerts] = useState(errorList);
  const [progress, setProgress] = useState({});

  useEffect(() => {
    if (Object.keys(errorList).length > 0) {
      setVisibleAlerts(errorList);
      
      // Set progress bar for each alert
      const newProgress = Object.fromEntries(
        Object.keys(errorList).map((key) => [key, 0])
      );
      setProgress(newProgress);

      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          const updatedProgress = { ...prevProgress };
          let allCompleted = true;

          Object.keys(updatedProgress).forEach((key) => {
            if (updatedProgress[key] < 100) {
              updatedProgress[key] += 100 / (time / 100);
              allCompleted = false;
            }
          });

          if (allCompleted) {
            clearInterval(interval);
          }

          return updatedProgress;
        });
      }, 100);

      const timer = setTimeout(() => {
        setVisibleAlerts({});
      }, time);

      return () => {
        clearInterval(interval);
        clearTimeout(timer);
      };
    }
  }, [errorList, time]);

  return (
    <div className="alerts-container position-fixed top-0 end-0" style={{ zIndex: 9999, maxWidth: '500px' }}>
      {Object.entries(visibleAlerts).map(([key, value], index) => (
        <div key={index} className="alert alert-danger alert-dismissible fade show" role="alert">
          <strong>{key}:</strong> {value.join(', ')}
          <div className="progress" style={{ height: '5px', marginTop: '10px' }}>
            <div className="progress-bar" role="progressbar" style={{ width: `${progress[key] || 0}%` }}></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Alert;
