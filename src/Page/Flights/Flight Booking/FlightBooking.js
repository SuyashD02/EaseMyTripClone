import React,{useState,useEffect} from "react";
import Navbar from "../../../components/NavBar/Navbar";
import { useAuth } from "../../../components/Context";
import moment from "moment";
import Classes from "../Flights.module.css";

function FlightBooking(){
    const [hotelDetailError, setHotelDetailError] = useState(null);
    const [flightBookingDetailData, setFlightBookingDetailData] = useState([]);
    const {flightBookingId,AirportFrom,AirportTo,flightdepartureDate,} = useAuth();
    const departureDay= moment(flightdepartureDate).format("ddd");
    const departureDate= moment(flightdepartureDate).format("DD MMM YYYY");

    const fetchSingleFlightData = async () => {
        try {
          const projectID = "2zqsmiro66wm";
          const response = await fetch(
            `https://academics.newtonschool.co/api/v1/bookingportals/flight/${flightBookingId}`,
            {
              method: "GET",
              headers: {
                projectID,
              },
            }
          );
  
          if (response.ok) {
            const data = await response.json();
            console.log(data);
            setFlightBookingDetailData(data?.data);
          } else {
            const errorData = await response.json();
            setHotelDetailError(errorData.message);
          }
        } catch (error) {
          console.error("Error fetching hotel data:", error);
          setHotelDetailError("Failed to fetch hotel data");
        }
      };
      useEffect(() => {
        fetchSingleFlightData();
      }, []);
    return(
        <div>
            <Navbar/>
            <div className="w-[100%] h-[100vh] bg-[#e8f2fa] flex justify-center">
            <div className=" border border-red-500 border-solid w-[90%] h-[100%] flex flex-row gap-[20px] justify-between">
               <div className="border border-red-500 border-solid w-[70.5%] mt-[20px]">
                <div className={Classes.bookingFlightData}>
                    <div className={Classes.bookingHeader}>
                        <div className={Classes.flightbookingImg}></div>
                        <span>Flight Detail</span>
                    </div>
                    <div className="w-[96%]">
                        <div className={Classes.flightBookingDetails}>
                            <div className=" w-[98%] mt-[30px] mb-[30px] flex flex-col gap-[5px]">
                                <div className="text-[15px] text-[#1a1a1a] flex gap-[10px]">
                                    <div className={Classes.flightbookDetailImg}></div>
                                    <div className="flex gap-[7px] items-center ">
                                    <span className="text-[20px] text-[#1a1a1a] ">{flightBookingDetailData?.source} - {flightBookingDetailData?.destination} </span> |<span className="text-[12px] text-[#6a6868]">{departureDay} - {departureDate}</span>
                                    </div>
                                </div>
                                <div className=" w-[100%] flex">
                                    
                    <div className=" w-[25%] h-[100%] flex ">
                            <span className="text-[16px] text-[#1e1f1f]">{flightBookingDetailData?.flightID}</span>
                    </div>
                    <div className=" w-[75%] h-[100%] flex gap-[10px]">
                        <div className="w-[32%] h-[100%] flex flex-col items-center">
                            <div className="w-[80%]">
                            <div className="text-[24px] text-[#1a1a1a] font-[600] ">{flightBookingDetailData?.departureTime}</div>
                            <div className="text-[12px]  text-[#6a6868] font-[600]">
                             <span>{AirportFrom[0]}</span> <span>({AirportFrom[2]})</span>
                            </div>
                            <div className="text-[12px] text-[#6a6868]">
                                <span>{departureDay}</span>-<span>{departureDate}</span>
                            </div>
                            </div>
                        </div>
                        <div className=" w-[32%] h-[100%] flex flex-col items-center">
                        <div className="text-[12px] text-[#6a6868] mt-[5px] items-center">
                                <span>{flightBookingDetailData?.duration}h 10m</span>
                            </div>
                            
                            <div className={Classes.flightFromToImg}>
                                <div className={Classes.leftDotFlightBooking}></div>
                                <div className={Classes.arrowImgFlightBooking}></div>
                                <div className={Classes.rightDotFlightBooking}></div>
                            </div>
                           
                        </div>
                        <div className="w-[32%] h-[100%] flex flex-col items-center">
                        <div className="w-[45%]">
                            <div className="w-[90%]  text-[24px] text-[#1a1a1a] font-[600] ">{flightBookingDetailData?.arrivalTime}</div>
                            <div className="text-[12px]  text-[#6a6868] font-[600]">
                             <span>{AirportTo[0]}</span> <span>({AirportTo[2]})</span>
                            </div>
                            <div className="text-[12px] text-[#6a6868]">
                                <span>{departureDay}</span>-<span>{departureDate}</span>
                            </div>
                            </div>
                        </div>
                    </div>
                    
                
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
               </div>
               <div className="border border-blue-500 border-solid w-[26%] mt-[20px]">
                <div className={Classes.flightBookingAmont}>
                    <div className={Classes.flighBokkingAmountHeader}>
                        <div className="text-[18px] text-[#1a1a1a] h-[50px] flex items-center ml-[10px]">
                            <p>Price Summary</p>
                        </div>
                    </div>
                    <div className="border border-red-500 border-solid w-[100%]"></div>
                </div>
               </div>
            </div>

            </div>
        </div>
    )
}
export default FlightBooking;