import React from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import {Divider} from "@mui/material";
import Classes from "./Hotels.module.css";
import { useAuth } from "../../components/Context";
import "react-datepicker/dist/react-datepicker.css";

function HotelSearchbar(){
    const{
        setHotelLocation,
        hotelLocation,
        setHotelDepartureDate,
        hotelDepartureDate,
        searchHotelResults, setSearchHotelResults,
        isSelectedDayCheckOut, setSelectedDayCheckOut
    }=useAuth();

    const CustomInput = ({ value, onClick }) => (
        <input
          className={Classes.hotelInputDatepickIn}
          type="text"
          value={moment(value).format("DD MMM YYYY")}
          onClick={onClick}
          readOnly
        />
      );
      const CustomInputCheckout = ({ value, onClick }) => (
        <input
          className={Classes.hotelinputDatepickOut}
          type="text"
          value={moment(value).format("DD MMM YYYY")}
          onClick={onClick}
          readOnly
        />
      );

    const handleSetLocation = (e) => {
        setHotelLocation(e.target.value);
      };

      const handleSearch=()=>{
        setSearchHotelResults([]);
      }
    return(
        <div className={Classes.searchBarHotelHeaders}>
        <div className={Classes.searchBarHotel}>
          <div className={Classes.searchBHedersHotel}>
            <div className={Classes.searchFromHotel}>
              <p className={Classes.headingInputHotel}>
                Enter City name,Location or Specific hotel
              </p>
              <div className={Classes.inputFormSectionHotel}>
                <input
                  className={Classes.formSearchBoxHotel}
                  placeholder="Enter City name,Location"
                  value={hotelLocation}
                  onChange={handleSetLocation}
                ></input>
              </div>
            </div>
          </div>
          <div className={Classes.hotelDatesSection}>
          <div className={Classes.searchCheckIn}>
            <div className={Classes.searchCheckInClick}>
              <p className={Classes.headingCheckIn}>Check-in</p>
              <div className={Classes.searchDateInput}>
                <DatePicker
                  className={Classes.datePickerCalender}
                  selected={hotelDepartureDate}
                  onChange={(date) => setHotelDepartureDate(date)}
                  customInput={<CustomInput />}
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
                onChange={(date) => setSelectedDayCheckOut(date)}
                customInput={<CustomInputCheckout />}
              />
            </div>
          </div>
          </div>
          <div className={Classes.searchRooms}>
            <div className={Classes.searchRoomsClick}>
              <p className={Classes.headingCheckOut}>Rooms & Guests</p>
            </div>
          </div>

          <div
            className={Classes.searchButtonHotel}
            onClick={handleSearch}
          >
            <h3>Modify Search</h3>
          </div>
        </div>
      </div>
    )
}
export default HotelSearchbar;