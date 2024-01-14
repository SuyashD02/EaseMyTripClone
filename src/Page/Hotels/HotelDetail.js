import React, { useEffect, useState } from "react";
import Navbar from "../../components/NavBar/Navbar";
import HotelSearchbar from "./HotelSearchbar";
import Classes from "./Hotels.module.css";
import { Divider } from '@mui/material';
import { useAuth } from "../../components/Context";

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

                    </div>
                    <div className={Classes.hotelOtherImage}>
                      <div className={Classes.hotelImageSample1}></div>
                      <div className={Classes.hotelImageSample2}></div>
                      <div className={Classes.hotelImageSample3}></div>
                    </div>

                  </div>
                  <div className={Classes.hotelDetailPriceSection}>
                  <Divider flexItem  />
                  <div className="w-[100%] h-[42%] border-red-500 border-solid">

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
                  <div className="w-[100%] h-[23%] border-red-500 border-solid"></div>
                  <div className="w-[100%] h-[20%] border-red-500 border-solid"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className={Classes.hotelDetailNavigateSection}>
              <div className={Classes.hotelDetailNav}>
                <p>Rooms</p>
              </div>
              <div className={Classes.hotelDetailNav}>
                <p>Amenities</p>
              </div>
            </div>
      </div>
    </div>
  );
}
export default HotelDetail;
