import React, { useEffect, useState } from "react";
import Navbar from "../../../components/NavBar/Navbar";
import HotelSearchbar from "../HotelSearchbar";
import Classes from "../Hotels.module.css";
import { Divider } from '@mui/material';
import { useAuth } from "../../../components/Context";

function HotelDetail() {
  const [hotelDetailData, setHotelDetailData] = useState([]);
  const [hotelDetailError, setHotelDetailError] = useState(null);
  const { hotelId } = useAuth();
  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        const projectID = "2zqsmiro66wm";
        const response = await fetch(
          `https://academics.newtonschool.co/api/v1/bookingportals/hotel/${hotelId}`,
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
          setHotelDetailData(data?.data);
        } else {
          const errorData = await response.json();
          setHotelDetailError(errorData.message);
        }
      } catch (error) {
        console.error("Error fetching hotel data:", error);
        setHotelDetailError("Failed to fetch hotel data");
      }
    };

    fetchHotelData();
  }, [hotelId]);


  return (
    <div>
      <Navbar />
      <HotelSearchbar />
      <div className={Classes.hotelDetailMainDiv}>
        {/* <h3 className="text-3xl text-center font-bold">HotelDetail Section </h3> */}
            <div className={Classes.hotelDetailInfoSection}>
              <div className={Classes.hotelDetailMainInfo}>
                <div className={Classes.hotelDetailHeaders}>
                  <div className={Classes.hotelDetailName}>
                  <p className="text-[21px] font-semibold">{hotelDetailData.name}</p>
                  <p className="text-[13px] font-medium	text-[#9F9C9C] "><img src="https://www.easemytrip.com/Hotels/img/map-marker.svg"/> {hotelDetailData.location}</p>
                  </div>
                  <div className={Classes.hotelDetailRating}>
                    <div className={Classes.ratingHotelDetail}>
                      <p>{hotelDetailData.rating}</p>
                    </div>
                  </div>
                  
                </div>
                <div className={Classes.hotelDetailImgPriceSection}>
                  <div className={Classes.hotelDetailImageSection}>
                    <div className={Classes.hotelMainImage}>
                    <img className="w-[100%] h-[100%] object-cover" src={hotelDetailData?.images?.[0]}/>
                    </div>
                    <div className={Classes.hotelOtherImage}>
                      <div className={Classes.hotelImageSample1}>
                      <img className="w-[100%] h-[100%] object-cover" src={hotelDetailData?.images?.[1]}/>
                      </div>
                      <div className={Classes.hotelImageSample2}>
                      <img className="w-[100%] h-[100%] object-cover" src={hotelDetailData?.images?.[2]}/>
                      </div>
                      <div className={Classes.hotelImageSample3}>
                      <img className="w-[100%] h-[100%] object-cover" src={hotelDetailData?.images?.[3]}/>
                      </div>
                    </div>

                  </div>
                  <div className={Classes.hotelDetailPriceSection}>
                  <Divider flexItem  />
                  <div className="w-[100%] h-[42%] flex">
                    <div className="w-[50%] h-[100%]  flex flex-col">
                      <div className="flex ml-[2px] mt-[10px]  items-center gap-[5px]">
                        <p className="h-[18px] w-[4px] rounded-[3px] bg-[#0c6be9] "></p>
                        <p className="text-[17px] font-[600] text-[#446DCB]">{hotelDetailData.rooms?.[0].roomType}</p>
                      </div>
                      <div className="text-[13px] ml-[2px] font-[500] text-[#000]">
                        <p>2 x Guest | 1 x Room</p>
                      </div>
                    </div>
                    <div className="w-[50%] h-[100%]">
                      <div className="mt-[10px] flex items-center justify-end gap-[1px] w-[100%] h-[5vh] text-[24px] font-[600] ">
                        <img src="https://hotels.easemytrip.com/newhotel/Content/img/rupee_new_black.svg"/>
                        <p className="mr-[2px]">{hotelDetailData.rooms?.[0].costPerNight}</p>
                      </div>
                      <div className="flex items-center justify-end text-[12px] font-[550] text-[#000] w-[100%] h-[20%] ">
                    <p>+ </p>
                    <img className={Classes.resIconHotel} src="https://hotels.easemytrip.com/newhotel/Content/img/rupee_new_black.svg"/>
                    <p className="mr-[2px]"> {hotelDetailData.rooms?.[0].costDetails.taxesAndFees} Taxes & fees</p>
                    
                  </div>
                  <p className="text-[12px] mr-[2px] flex  justify-end ">base price(Per Night)</p>

                    </div>
                  </div>
                  <Divider flexItem  />
                  <div className="w-[100%] h-[15%] flex">
                    <div className={Classes.hotelDetailCheckIn}>
                      <img src="https://www.easemytrip.com/Hotels/img/calendar_icon.svg"/>
                      <span className="text-[14px] text-[#2196f3] font-medium	ml-[4px]">CHECK-IN: </span><span className="text-[14px] text-[#000] font-medium ml-[5px]">12:00 PM </span>
                    </div>
                    <div className={Classes.hotelDetailCheckIn}>
                    <img src="https://www.easemytrip.com/Hotels/img/calendar_icon.svg"/>
                    <span className="text-[14px] text-[#2196f3] font-medium	ml-[4px]">CHECK-OUT: </span><span className="text-[14px] text-[#000] font-medium ml-[5px]">12:00 PM </span>
                    </div>
                  </div>
                  <Divider flexItem  />
                  <div className="w-[100%] h-[23%] items-center flex">
                  <div className={Classes.hotelAmenities}>
                  <div >
                  {hotelDetailData.amenities?.map((amenity, index) => (
            <span className={Classes.amenityBox} key={index}>{amenity}</span>
          ))}
                  </div>
                </div>
                  </div>
                  <div className="w-[100%] h-[20%] flex justify-between items-center">
                    <div className=" w-[47%] h-[70%] border hover:bg-[#2196f3] text-[#2196f3] border-[#2196f3] border-500 border-solid flex justify-center items-center hover:text-[#fff] rounded-[40px] font-[600] text-[15px] cursor-pointer">
                      <p>Select Rooms</p>
                    </div>
                    <div className=" w-[47%] h-[70%] border hover:bg-[#da5200] bg-[#EF6614] text-[#fff] border-[#EF6614] border-500 border-solid flex justify-center items-center hover:text-[#fff] rounded-[40px] font-[600] text-[15px] cursor-pointer">
                      <div>
                        <p>Book Now</p>
                      </div>
                    </div>
                  </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={Classes.hotelDetailNavigateSection}>
              <div className={Classes.hotelDetailNav}>
                <p className={Classes.hotelDetailInfoNav}>Rooms</p>
              </div>
              <div className={Classes.hotelDetailNav}>
                <p className={Classes.hotelDetailInfoNav}>Amenities</p>
              </div>
            </div>
            <div className={Classes.hotelDetailRoomsSection}>
              <div className="w-[100%] h-[6vh] border border-red-500 border-solid flex bg-[#feecde] text-[13px] font-medium">
                <div className="h-[100%] w-[25%] border border-blue-500 border-solid flex items-center">
                  <p className="ml-[20px]">Room Type</p>
                </div>
                <div className="h-[100%] w-[30%] border border-blue-500 border-solid flex items-center">
                  <p className="ml-[20px]">Benefits</p>
                </div>
                <div className="h-[100%] w-[45%] border border-blue-500 border-solid flex items-center justify-center">
                  <p>Per Night Price</p>
                </div>


              </div>
              <div className="border border-red-500 border-solid w-[100%] h-[100%] flex flex-col">
                <div className="border border-blue-500 border-solid w-[100%] h-[40%] flex">
                  <div className="h-[100%] w-[25%] border border-green-500 border-solid flex justify-center items-center">
                    <div className="border border-red-500 border-solid w-[95%] h-[95%] flex flex-col gap-[10px]">
                      <div className="w-[100%] h-[15%] flex items-center">
                      <p className="text-[15px] font-[600] text-[#000]">{hotelDetailData.rooms?.[0].roomType} Room</p>
                      </div>
                      <div className="w-[100%] h-[70%] rounded-[5px]" >
                      <img className="w-[100%] h-[100%] object-cover rounded-[5px]" src={hotelDetailData?.images?.[0]}/>
                      </div>
                      <div className=" w-[100%] h-[15%] flex gap-[8px]">
                        <div className=" w-[35%] h-[100%] bg-[#D5E5FA] rounded-[5px] text-[13px] flex justify-center items-center">
                          <p>{hotelDetailData.rooms?.[0].bedDetail}</p>
                        </div>
                        <div className=" w-[30%] h-[100%] bg-[#D5E5FA] rounded-[5px] text-[13px] flex justify-center items-center">
                        <p>{hotelDetailData.rooms?.[0].roomSize} sq.ft</p>
                        </div>        
                        </div>
                    </div>
                  </div>
                  <div className="h-[100%] w-[30%] border border-yellow-500 border-solid flex justify-center items-center">
                    <div className="border border-red-500 border-solid w-[95%] h-[95%]">
                      <div className="w-[100%] h-[15%] flex items-center gap-[5px]">
                        <p className="h-[18px] w-[4px] rounded-[3px] bg-[#0c6be9] "></p>
                        <p className="text-[14px] font-[600] text-[#000]">Room Only</p>
                      </div>
                      <div className="w-[100%] h-[50%]">
                        <div className="ml-[10px] h-[30%] text-[#000] text-[13px] flex gap-[5px] items-center" >
                          <img className="w-[13px] h-[13px]" src="https://flight.easemytrip.com/Content/img/tick1.svg"/>
                          <p>{hotelDetailData.rooms?.[0].cancellationPolicy}</p>
                        </div>
                        <div className="ml-[10px] h-[30%] text-[#000] text-[13px] flex gap-[5px] items-center" >
                          <img className="w-[13px] h-[13px]" src="https://flight.easemytrip.com/Content/img/tick1.svg"/>
                          <p>Breakfast not included</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="h-[100%] w-[45%] border border-orange-500 border-solid flex items-center gap-[15px]">
                    <div className="border border-blue-500 border-solid h-[95%] w-[60%] flex">
                      <div className="h-[100%] w-[20%]">
                        <img className="w-[60px]" src="https://hotel.easemytrip.com/Images/Hotel/icon/recommded-3.svg"/>
                      </div>
                      <div className="w-[80%] h-[60%]">
                      <div className="mt-[10px] flex items-center justify-end gap-[1px] w-[100%] h-[5vh] text-[24px] font-[600] ">
                        <img src="https://hotels.easemytrip.com/newhotel/Content/img/rupee_new_black.svg"/>
                        <p className="mr-[2px]">{hotelDetailData.rooms?.[0].costPerNight}</p>
                      </div>
                      <div className="flex items-center justify-end text-[12px] font-[550] text-[#000] w-[100%] h-[20%] ">
                    <p>+ </p>
                    <img className={Classes.resIconHotel} src="https://hotels.easemytrip.com/newhotel/Content/img/rupee_new_black.svg"/>
                    <p className="mr-[2px]"> {hotelDetailData.rooms?.[0].costDetails.taxesAndFees} Taxes & fees</p>
                    
                  </div>
                  <p className="text-[12px] text-[#737373] mr-[2px] flex  justify-end ">(Per Night)</p>

                    </div>
                    </div>
                    <div className="border border-blue-500 border-solid h-[95%] w-[37%]"></div>
                  </div>
                </div>
              </div>
            </div>
      </div>
    </div>
  );
}
export default HotelDetail;
