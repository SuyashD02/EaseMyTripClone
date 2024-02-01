import React,{useState,useEffect} from "react";
import Navbar from "../../../components/NavBar/Navbar";
import { useAuth } from "../../../components/Context";
import Classes from "../Hotels.module.css";
import moment from "moment";

import Divider from "@mui/material/Divider";

function HotelBooking(){
    const [hotelDetailError, setHotelDetailError] = useState(null);
    const [hotelBookingDetailData, setHotelBookingDetailData] = useState([]);
    const {hotelBookingId,hotelDepartureDate,seatCount} = useAuth();
    const departureDay= moment(hotelDepartureDate).format("ddd");
    const departureDate= moment(hotelDepartureDate).format("DD MMM YYYY");

    const fetchSingleFlightData = async () => {
        try {
          const projectID = "2zqsmiro66wm";
          const response = await fetch(
            `https://academics.newtonschool.co/api/v1/bookingportals/hotel/${hotelBookingId}`,
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
            setHotelBookingDetailData(data?.data);
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
      }, [hotelBookingId]);
    return(
        <div>
            <Navbar/>
            <div className="w-[100%] h-[100vh] bg-[#e8f2fa] flex justify-center">
            <div className=" w-[90%] h-[100%] flex flex-row gap-[20px] justify-between">
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
                                    <span className="text-[20px] text-[#1a1a1a] ">{hotelBookingDetailData?.location}</span> |<span className="text-[12px] text-[#6a6868]">{departureDay} - {departureDate}</span>
                                    </div>
                                </div>
                                <div className=" w-[100%] flex">
                                    {/* tiil Yet Edited */}
                    {/* <div className=" w-[25%] h-[100%] flex ">
                            <span className="text-[16px] text-[#1e1f1f]">{hotelBookingDetailData?.flightID}</span>
                    </div>
                    <div className=" w-[75%] h-[100%] flex gap-[10px]">
                        <div className="w-[32%] h-[100%] flex flex-col items-center">
                            <div className="w-[80%]">
                            <div className="text-[24px] text-[#1a1a1a] font-[600] ">{hotelBookingDetailData?.departureTime}</div>
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
                                <span>{hotelBookingDetailData?.duration}h 10m</span>
                            </div>
                            
                            <div className={Classes.flightFromToImg}>
                                <div className={Classes.leftDotFlightBooking}></div>
                                <div className={Classes.arrowImgFlightBooking}></div>
                                <div className={Classes.rightDotFlightBooking}></div>
                            </div>
                           
                        </div>
                        <div className="w-[32%] h-[100%] flex flex-col items-center">
                        <div className="w-[45%]">
                            <div className="w-[90%]  text-[24px] text-[#1a1a1a] font-[600] ">{hotelBookingDetailData?.arrivalTime}</div>
                            <div className="text-[12px]  text-[#6a6868] font-[600]">
                             <span>{AirportTo[0]}</span> <span>({AirportTo[2]})</span>
                            </div>
                            <div className="text-[12px] text-[#6a6868]">
                                <span>{departureDay}</span>-<span>{departureDate}</span>
                            </div>
                            </div>
                        </div>
                    </div> */}
                    
                
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className={Classes.personalDetailFlight}>
                <div className={Classes.bookingHeader}>
                        <div className={Classes.PersbookingImg}></div>
                        <span>Travellers Details</span>
                    </div>
                <div className={Classes.personalDetail}>
                
              <h3>Add Contact Details</h3>
              <div className="w-[100%] h-[100%] mt-[20px] flex flex-row gap-[30px]">
                <div style={{ display: "flex", flexDirection: "column" }} className="w-[30%] gap-[5px]">
                  <label className="text-[11px] font-bold">(First Name & (Middle name, if any)</label>
                  <input type="text" className={Classes.persnolDataFlightMobileNo}/>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }} className="w-[35%] gap-[5px]">
                  <label className="text-[11px] font-bold">Last Name</label>
                  <input type="text" className={Classes.persnolDataFlightEmail}/>
                </div>
              </div>
            </div>
                </div> */}
               

               </div>
               {/* <div className="w-[26%] mt-[20px] flex flex-col">
                <div className={Classes.flightBookingAmont}>
                    <div className={Classes.flighBokkingAmountHeader}>
                        <div className="text-[18px] text-[#1a1a1a] h-[50px] flex items-center ml-[10px]">
                            <p>Price Summary</p>
                        </div>
                    </div>
                    <div className=" w-[100%]">
                        <div className="w-[100%] border-b-2  border-b-[#e5e3e3] flex justify-between">
                            <div className="w-[66%] pl-[4%] text-[13px] text-[#1a1a1a] h-[35px] flex items-center">Adult x 1</div>
                            <div className="w-[30%] text-[#1a1a1a] text-[12px] h-[35px] font-[600] flex items-center gap-[5px]"><i>₹</i>{" "}{hotelBookingDetailData?.ticketPrice}</div>
                        </div>
                        <Divider flexItem />
                        <div className="w-[100%] border-b-2  border-b-[#e5e3e3] flex justify-between">
                            <div className="w-[66%] pl-[4%] text-[13px] text-[#1a1a1a] h-[35px] flex items-center">Travelare</div>
                            <div className="w-[30%] text-[#1a1a1a] text-[12px] h-[35px] font-[600] flex items-center gap-[5px]">{seatCount} Traveller(s)</div>
                        </div>
                        <Divider flexItem />
                        <div className="w-[100%] flex justify-between">
                                  <div className="w-[66%] pl-[4%] text-[18px] text-[#d63b05] h-[35px] font-bold flex items-center">Grand Total</div>
                                  <div className="w-[30%] text-[18px] text-[#d63b05] font-bold h-[35px] flex items-center gap-[5px]">
                                    <i>₹</i>{" "}
                                    {hotelBookingDetailData?.ticketPrice * seatCount}
                                   
                                  </div>
                                </div>
                    </div>
                    
                </div>
                <div className="w-[100%] mt-[7px]">
                      <p className="bg-[#ef6614] text-[#fff] text-[19px] h-[45px] cursor-pointer rounded-[40px] flex justify-center items-center">Continue Booking</p>
                    </div> 
               </div> */}
            </div>
            
            

            </div>
        </div>
    )
}
export default HotelBooking;