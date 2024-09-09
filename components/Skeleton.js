import React from 'react';

const Skeleton = () => {
  // Array to map over and create multiple skeleton items
  const skeletonItems = Array(5).fill(0);

  return (
    <div className="skeletonWrapper placeholder-glow  col-xl-9 "    >
      {skeletonItems.map((_, index) => (
        <div key={index} className="skeletonItem">
          <div className="skeletonImage"></div>
          <div className="skeletonContent">
            <div className="skeletonTitle"></div>
            <div className="skeletonDetails"></div>
            <div className="skeletonDetails"></div>
            <div className="skeletonPrice"></div>
            <div className="skeletonButton"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Skeleton;
