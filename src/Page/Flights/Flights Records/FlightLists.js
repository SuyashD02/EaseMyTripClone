import React from "react";
import Classes from "./FlightRecord.module.css";
function FlightLists({searchResults}){
    return(
        <div className="border border-black border-500 border-solid h-[100%] w-[100%]">
            {searchResults &&
          searchResults.map((flightApidata)=>(
            
             <div className={Classes.flightDataBox} key={flightApidata._id}>
              <div className="border border-red-500 border-solid w-[100%] h-[80%] flex justify-center items-center">
                <div className="border border-yellow-500 border-solid w-[95%] h-[93%] flex flex-row gap-[15px]">
                    <div className="border border-blue-500 border-solid h-[100%] w-[15%]"></div>
                    <div className="border border-blue-500 border-solid h-[100%] w-[40%]"></div>
                    <div className="border border-blue-500 border-solid h-[100%] w-[20%]"></div>
                    <div className="border border-blue-500 border-solid h-[100%] w-[20%] flex justify-center items-center">
                        <p className="bg-[#ef6614] rounded-[40px] text-[14px] text-[#fff] w-[90%] h-[40%] flex justify-center items-center cursor-pointer">Book Now</p>
                    </div>
                </div>
              </div>
              <div className="border border-yellow-500 border-solid w-[100%] h-[20%] flex justify-center items-center bg-[#EFF3F6]">
                <div className="w-[98%] h-[100%] text-[#2196f3] text-[12px] font-[600] flex items-center">
                    <p>Flight Detail</p>
                </div>
              </div>
             </div>
              ))
            }

        </div>
    )
}
export default FlightLists;