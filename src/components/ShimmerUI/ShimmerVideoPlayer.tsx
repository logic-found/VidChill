import React from "react";

const ShimmerVideoPlayer : React.FC = () => {
    return (
        <>
            <div className="flex  gap-7 md:gap-5 flex-col md:flex-row w-full px-6 animate-pulse">
                <div role="status" className="w-full md:w-3/6 flex flex-col gap-3 ">
                    <div className="flex w-full bg-gray-500 rounded h-60 sm:h-80 md:h-96"></div>
                    <div className="w-full flex flex-col gap-3">
                        <div className="h-2.5 bg-gray-500 rounded-full w-full"></div>
                        <div className="h-2 bg-gray-500 rounded-full w-full"></div>
                        <div className="h-2 bg-gray-500 rounded-full w-72 max-w-full"></div>
                        <div className="h-2 bg-gray-500 rounded-full w-96 max-w-full"></div>
                        <div className="h-2 bg-gray-500 rounded-full w-4/6 max-w-full"></div>
                    </div>
                </div>
                <div className="w-full md:w-3/6 flex flex-col gap-3">
                    <div className="w-full h-fit flex gap-2">
                        <div className="h-32 w-3/6 bg-gray-500 rounded"></div>
                        <div className="w-3/6 flex flex-col gap-3 pt-4">
                            <div className="h-2 bg-gray-500 rounded-full w-full"></div>
                            <div className="h-2 bg-gray-500 rounded-full w-72 max-w-full"></div>        
                            <div className="h-2 bg-gray-500 rounded-full w-72 max-w-full"></div>        
                        </div>
                    </div>
                    <div className="w-full h-fit flex gap-2">
                        <div className="h-32 w-3/6 bg-gray-500 rounded"></div>
                        <div className="w-3/6 flex flex-col gap-3 pt-4">
                            <div className="h-2 bg-gray-500 rounded-full w-full"></div>
                            <div className="h-2 bg-gray-500 rounded-full w-72 max-w-full"></div>        
                            <div className="h-2 bg-gray-500 rounded-full w-72 max-w-full"></div>        
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ShimmerVideoPlayer;
