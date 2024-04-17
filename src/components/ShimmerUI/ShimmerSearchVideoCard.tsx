import React from 'react'

const ShimmerSearchVideoCard: React.FC = () => {
  return (
    <div className="w-[90%] h-fit flex flex-col gap-1 sm:flex-row sm:w-[80%] sm:h-72 animate-pulse sm:gap-5">
        <div className="w-full h-52 sm:h-full sm:w-4/6 rounded-lg bg-gray-500 "></div>
        <div className="sm:h-full sm:w-2/6 p-1 pt-4 sm:p-2 flex flex-col gap-4 h-full w-full ">
          <div className="h-4 bg-gray-500 rounded w-full"></div>
          <div className="h-2 bg-gray-500 rounded w-full"></div>
          <div className="h-2 bg-gray-500 rounded w-2/3"></div>
          <div className="h-2 bg-gray-500 rounded w-2/3"></div>
        </div>
      </div>
  )
}

export default ShimmerSearchVideoCard