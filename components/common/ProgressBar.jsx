const ProgressBar = ({ step }) => {
    const progress = (step / 3) * 100;
  
    return (
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>
    );
  };
  
  export default ProgressBar;
  