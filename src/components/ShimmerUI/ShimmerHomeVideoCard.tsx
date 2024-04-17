import React from 'react';

const ShimmerVideoCard: React.FC = () => {
  return (
    <>
      <div className="w-full sm:w-96 h-fit animate-pulse">
        <div className="w-full max-w-full h-60 bg-gray-500 rounded-lg"></div>
        <div className="p-2 pt-4">
          <div className="h-4 bg-gray-500 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-500 rounded w-1/2"></div>
        </div>
      </div>
    </>
  );
};

export default ShimmerVideoCard;
