import React,{useState} from "react";
import Classes from "../Bus.module.css";
import { useAuth } from "../../../components/Context";
// import FlightDetail from "../Flight Detail/FlightDetail";
function BusList({ searchResultsBus }) {
  const [busDetailOpen, setBusDetailOpen] = useState(false);
  const {setBusId,busCity, busToCity} = useAuth();
  const handleBusDetailOpen = (id) => {
    setBusDetailOpen((prevOpen) => ({
      ...prevOpen,
      [id]: !prevOpen[id] || false,
    }));
  };
  return (
    <div className="border border-black border-500 border-solid h-[100%] w-[100%]">
      {searchResultsBus.length > 0 ? (searchResultsBus.map((BusApidata,index) => (
          <div className={Classes.BusDataBox} key={index}>
            <div className="border border-blue-500 border-solid w-[100%] h-[100%] flex flex-col justify-center items-center">
              <div className="border border-red-500 border-solid w-[98%] h-[93%] flex flex-row gap-[15px]  mt-[5px]">
                <div className="h-[100%] w-[30%] flex flex-col">
                  <div className="w-[100%]">
                    <span className="text-[16px] text-[#000] font-[600]">{BusApidata?.name}
                    </span>
                  </div>
                  <span className="text-[12px] text-[#737373] w-[100%]">{BusApidata?.type}</span>
                  <div className="mt-[5px]">
                    <img src="https://bus.easemytrip.com/images/recmmed-icn.svg"/>
                  </div>
                
                </div>
                <div className="h-[100%] w-[35%] flex justify-evenly">
                  <div className="w-[28%] flex flex-col ">
                  <div className="text-[18px] text-[#333] font-[600] ">{BusApidata?.departureTime}</div>
                            <div className="text-[13px]  text-[#737373] font-[500]">
                             <span>{busCity}</span>
                            </div>
                  </div>
                  <div className="w-[9%] flex  justify-center">
                    <div className="w-[100%] h-[40%] flex items-center justify-center">
                    <img className="w-[15px] h-[15px]"  src="https://bus.easemytrip.com/new_img/right-arrow.svg"/>
                    </div>
                             
                  </div>
                  <div className="w-[28%] flex flex-col">
                  <div className="text-[18px] text-[#333] font-[600] ">{BusApidata?.arrivalTime}</div>
                            <div className="text-[13px]  text-[#737373] font-[500]">
                             <span>{busToCity}</span>
                            </div>
                  </div>
                </div>
                <div className="w-[15%] h-[100%] flex flex-col">
                  <div className="w-[100%] text-[11px] text-[#737373] flex justify-end mt-[5px]">
                    <p>Starting from</p>
                  </div>
                  <div className=" w-[100%] text-[20px] text-[#d63b05] font-[600] flex justify-end gap-[5px] mt-[2px]">
                  <i>₹</i><span> {BusApidata?.fare}</span>
                  </div>
                </div>
                
                <div className=" h-[100%] w-[15%] flex flex-col items-center">
                  <p className="bg-[#ef6614] rounded-[40px] text-[14px] text-[#fff] w-[100%] h-[35%] mt-[7px] flex justify-center items-center cursor-pointer">
                    Book Now
                  </p>
                  <p className="text-[11px] text-[#737373] w-[100%] mt-[5px] flex justify-center items-center">{BusApidata?.seats} Seat left </p>
                </div>
              </div>
              <div className="border border-red-500 border-solid w-[98%] h-[3vh] mt-[10px]">

              </div>
            </div>
            <div className="w-[100%] h-[32px] flex justify-center items-center bg-[#f9f9f9]">
              <div
                className="w-[98%] h-[100%] text-[#737373] text-[12px] font-[600] flex items-center"
              >
                <p onClick={() => handleBusDetailOpen(BusApidata._id)} className={Classes.aminity}>{"Amenities"}</p>
              </div>
            </div>
            {busDetailOpen[BusApidata._id] && 
            <div className="border border-red-500 border-solid w-[98%] h-[100%] flex items-center gap-[12px]">
              {BusApidata?.amenities?.map((Amini, i) => (
                  <div key={i} className="border border-red-500 border-solid w-[14%] h-[5vh] flex justify-center items-center">
                    <div className="text-[13px] w-[98%] text-[#000] flex justify-center items-center">
                      <p>{Amini}</p>
                    </div>
                  </div>
                ))}

            </div>
            }
          </div>
        ))):(
          <p className="font-[600] text-[#000] text-[22px] flex justify-center items-center" >No Trains Available For the Selected Day</p>
        )}
    </div>
  );
}
export default BusList;
