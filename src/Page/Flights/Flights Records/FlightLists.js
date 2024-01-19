import React,{useState} from "react";
import Classes from "./FlightRecord.module.css";
import { useAuth } from "../../../components/Context";
import FlightDetail from "../Flight Detail/FlightDetail";
function FlightLists({ searchResults }) {
  const [flightDetailOpen, setFlightDetailOpen] = useState(false);
  const {setFlightId,AirportFrom,AirportTo} = useAuth();
  const handleFlightDetailOpen = (id) => {
    setFlightId(id);
    setFlightDetailOpen((prevOpen) => ({
      ...prevOpen,
      [id]: !prevOpen[id] || false,
    }));
  };
  return (
    <div className="border border-black border-500 border-solid h-[100%] w-[100%]">
      {searchResults &&
        searchResults.map((flightApidata) => (
          <div className={Classes.flightDataBox} key={flightApidata._id}>
            <div className="w-[100%] h-[100px] flex justify-center items-center">
              <div className="w-[95%] h-[93%] flex flex-row gap-[15px]">
                <div className="h-[100%] w-[15%] flex items-center">
                <span className="text-[12px] text-[#333]">{flightApidata?.flightID}</span>
                </div>
                <div className="h-[100%] w-[40%] flex gap-[7px]">
                  <div className=" w-[28%] flex flex-col justify-center items-center">
                  <div className="text-[20px] text-[#333] font-[600] ">{flightApidata?.departureTime}</div>
                            <div className="text-[13px]  text-[#737373] font-[600]">
                             <span>{AirportFrom[0]}</span>
                            </div>
                  </div>
                  <div className=" w-[40%] flex flex-col items-center justify-center">
                  <div className="text-[13px] w-[83%] text-[#333] flex justify-center">
                                <span>{flightApidata?.duration}h 10m</span>
                            </div>
                              <img  src="https://flight.easemytrip.com/Content/img/arow_main.png"/>
                              <div className="text-[11px] w-[83%] text-[#737373] flex items-center justify-center">
                                <span>{flightApidata?.stops==0 ?"Nonstop":<span>{flightApidata?.stops}-stop</span> }</span>
                                </div>
                  </div>
                  <div className=" w-[28%] flex flex-col justify-center items-center">
                  <div className="text-[20px] text-[#333] font-[600] ">{flightApidata?.arrivalTime}</div>
                            <div className="text-[13px]  text-[#737373] font-[600]">
                             <span>{AirportTo[0]}</span>
                            </div>
                  </div>
                </div>
                <div className=" h-[100%] w-[20%] flex flex-col items-center justify-center">
                  <div className="text-[20px] text-[#d63b05] w-[83%] font-[600] flex justify-center  gap-[5px]">
                    <i>₹</i> <span>{flightApidata?.ticketPrice}</span>
                  </div>
                  <div className="text-[11px] w-[83%] text-[#737373] flex justify-center">{flightApidata?.availableSeats} Seats Left</div>
                </div>
                <div className="h-[100%] w-[20%] flex justify-center items-center">
                  <p className="bg-[#ef6614] rounded-[40px] text-[14px] text-[#fff] w-[90%] h-[40%] flex justify-center items-center cursor-pointer">
                    Book Now
                  </p>
                </div>
              </div>
            </div>
            <div className="w-[100%] h-[30px] flex justify-center items-center bg-[#EFF3F6]">
              <div
                className="w-[98%] h-[100%] text-[#2196f3] text-[12px] font-[600] flex items-center"
              >
                <p onClick={() => handleFlightDetailOpen(flightApidata._id)} className=" cursor-pointer">{flightDetailOpen[flightApidata._id] ? "Hide Detail" : "Flight Detail"}</p>
              </div>
            </div>
            {flightDetailOpen[flightApidata._id] && <FlightDetail/>}
          </div>
        ))}
    </div>
  );
}
export default FlightLists;