import React,{useState} from "react";
import DatePicker from "react-datepicker";
import moment from "moment";

import Classes from "./Hotels.module.css";
import Navbar from "../../components/NavBar/Navbar";

import "react-datepicker/dist/react-datepicker.css";

import { Box, Divider, Modal } from "@mui/material";


function Hotels(){
  const [isSelectedDay,setSelectedDay]=useState("");
  const [isSelectedDayCheckOut,setSelectedDayCheckOut]=useState("");
  const [location, setLocation] = useState("");
  const [searchHotelResults, setSearchHotelResults] = useState([]);
  const [hotelErrorPost, setHotelErrorPost] = useState("");
  const CustomInput = ({ value, onClick }) => (
    <input className={Classes.inputDatepickIn} type="text" value={moment(value).format('dddd')} onClick={onClick} readOnly />
    );
    const CustomInputCheckout = ({ value, onClick }) => (
      <input className={Classes.inputDatepickOut} type="text" value={moment(value).format('dddd')} onClick={onClick} readOnly />
      );
    async function handleHotelSearch() {
      console.log("Hotel Search Function Called")
      try {
        const projectID = 'f104bi07c490';
        const formattedDate = moment(isSelectedDay).format('dddd');      
        const apiUrlHotel = `https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"location":"${location}"}&day="${formattedDate}"`;
        const response = await fetch(apiUrlHotel, {
          method: 'GET',
          headers: {
            'projectID': projectID,
          },
        });
        if (response.ok) {
          console.log("Hotel data :")
          const hotelData = await response.json();
          console.log(hotelData);
          setSearchHotelResults(hotelData.data.hotels);
          console.log(hotelData.data.hotels);
        }else{
          const errorData = await response.json();
          setHotelErrorPost(errorData.message);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setHotelErrorPost("An error occurred. Please try again.");
      }
    }
    const handleSetLocation = (e) => {
      setLocation(e.target.value);
    };
    

    return(
        <div className={Classes.hotelsParent}>
            <Navbar/>
            <div className={Classes.searchBarHotelHeaders}>
            <div className={Classes.searchBarHotel}>
          <div className={Classes.searchBHedersHotel}>
            <div className={Classes.searchFromHotel}>
              <p className={Classes.headingInputHotel}>Enter City name,Location or Specific hotel</p>
              <div className={Classes.inputFormSectionHotel}>
              <input
                      className={Classes.formSearchBoxHotel}
                      placeholder="Enter City name,Location"
                      value={location}
                      onChange={handleSetLocation}
                    ></input>
              </div>
            </div>
          </div>
          <Divider orientation="vertical" />
          <div className={Classes.searchCheckIn}
          >
            <div className={Classes.searchCheckInClick}>
              <p className={Classes.headingCheckIn}>Check-in</p>
              <div className={Classes.searchDateInput}>
              <DatePicker
              className={Classes.datePickerCalender}
                selected={isSelectedDay}
                onChange={(date)=>setSelectedDay(date)}
                customInput={<CustomInput/>}
              />
              </div>
            </div>
            
          </div>
          <Divider orientation="vertical" />
          <div className={Classes.searchCheckOut}>
            <div className={Classes.searchCheckOutClick}>
              <p className={Classes.headingCheckOut}>Check-out</p>
              <DatePicker
                selected={isSelectedDayCheckOut}
                onChange={(date)=>setSelectedDayCheckOut(date)}
                customInput={<CustomInputCheckout/>}
              />
              
            </div>
          </div>
          <Divider orientation="vertical" />
          <div className={Classes.searchRooms}>
            <div className={Classes.searchRoomsClick}>
              <p>Rooms & Guests</p>
            </div>
          </div>

          <div className={Classes.searchButtonHotel} onClick={handleHotelSearch}>
            <h3>SEARCH</h3>
          </div>
        </div>
        </div>
        <div className={Classes.hotelbackgroundSection}>
          <div className={Classes.hotelMainSection}>
          <div className={Classes.leftSideDataHotel}>
            <h2>Left Side Hotel</h2>
          </div>
          
            <div className={Classes.rightSideDataHotel}>
             <div className={Classes.rightHeaderHotel}>
               <div>
                 <h5>hotel</h5>
               </div>
               <div className={Classes.hotelSorting}>
                 <input></input>
                 <p>Sort By:</p>
               </div>
             </div>
             <div className={Classes.boxSearchdataHotel}>
             {searchHotelResults &&
          searchHotelResults.map((hotelApidata)=>(
            
             <div className={Classes.hotelDataBox} key={hotelApidata._id}>
               <div className={Classes.hotelImage}>
                 <img className={Classes.imageHotel} src={hotelApidata.images[1]}/>
               </div>
               <div className={Classes.hotelDetailSection}>
               <div className={Classes.hotelDetails}>
                <div className={Classes.nameRating}>
                <div className={Classes.dataHotel}>
                  <p>{hotelApidata.name}</p>
                </div>
                <div className={Classes.hotelDetailHeader}>
                  <p>Rating</p>
                  <div className={Classes.ratingHotel}>
                    {/* <StarRating rating={hotelApidata.rating}/> */}
                    <p className={Classes.pHotelRating}>{hotelApidata.rating}</p>
                  </div>
                </div>
                </div>
                <div className={Classes.hotelLocation}>
                  <img src="https://www.easemytrip.com/hotels/images/placeholderloc.svg"/>
                  <p>{hotelApidata.location}</p>
                </div>
                <div className={Classes.hotelAmenities}>
                  <div >
                  {hotelApidata.amenities.map((amenity, index) => (
            <span className={Classes.amenityBox} key={index}>{amenity}</span>
          ))}
                  </div>
                </div>
               </div>
               <Divider orientation="vertical" flexItem />
               <div className={Classes.hotelBooking}>
                <div className={Classes.priceTaxSection}>
                  <div className={Classes.priceHotelSection}>
                    <img src="https://hotels.easemytrip.com/newhotel/Content/img/rupee_new_black.svg"/>
                    <h3>{hotelApidata.rooms[0].price}</h3>

                  </div>
                  <div className={Classes.taxesHotelSection}>
                    <p>+ </p>
                    <img className={Classes.resIconHotel} src="https://hotels.easemytrip.com/newhotel/Content/img/rupee_new_black.svg"/>
                    <p className={Classes.taxParaHotel}> {hotelApidata.rooms[0].costDetails.taxesAndFees} Taxes & fees</p>
                  </div>
                  <p className={Classes.perNightHotel}>Per Night</p>
                </div>
                <div className={Classes.buttonsSectionHotel}>
                  <div className={Classes.buttonViewRoom}>
                    <button className={Classes.viewHotel}>View Room</button>
                  </div>
                  <div className={Classes.buttonLoginHotel}>
                      Login & Save More > 
                      </div>
                </div>
               </div>
               </div>
              
             </div>
              ))
            }
            </div>
           </div>
         
          </div>

        </div>
        </div>
    )
}
export default Hotels;