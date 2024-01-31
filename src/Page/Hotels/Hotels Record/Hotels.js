import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";

import Classes from "../Hotels.module.css";
import Navbar from "../../../components/NavBar/Navbar";

import "react-datepicker/dist/react-datepicker.css";
import _debounce from "lodash/debounce";
import { Box, Divider, Modal } from "@mui/material";

import { useAuth } from "../../../components/Context";
import HotelResult from "./HotelResult";

function Hotels() {
  const {
    setHotelLocation,
    hotelLocation,
    hotelDepartureDate,
    setHotelDepartureDate,
    searchHotelResults,
    setSearchHotelResults,
    isSelectedDayCheckOut,
    setSelectedDayCheckOut,
  } = useAuth();
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [initialApiCallMade, setInitialApiCallMade] = useState(false);

  const [originalHotelData, setOriginalHotelData] = useState([]);
  const [hotelErrorPost, setHotelErrorPost] = useState("");
  const [sortOption, setSortOption] = useState("");
  
  const [selectedOption, setSelectedOption] = useState(0);
  const [value, setValue] = useState("$gte");
  const [field, setField] = useState("rating");
  

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

  async function handleHotelSearch() {
    console.log("Hotel Search Function Called");
    if (isFetching || (initialApiCallMade && page < 1)) {
      return;
    }
    try {
      setIsFetching(true);
      const projectID = "2zqsmiro66wm";
      const formattedDate = moment(hotelDepartureDate).format("dddd");
      let apiUrlHotel = `https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"location":"${hotelLocation}"}&day="${formattedDate}"&filter={"${field}":{"${value}":${selectedOption}}}&limit=10&page=${page}`;
      const response = await fetch(apiUrlHotel, {
        method: "GET",
        headers: {
          projectID: projectID,
        },
      });
      if (response.ok) {
        setPage((prevPage) => prevPage + 1);
        console.log("Hotel data :");
        const hotelData = await response.json();
        console.log(hotelData);
        setSearchHotelResults((prevData) => [
          ...prevData,
          ...hotelData.data.hotels,
        ]);

        console.log(hotelData.data.hotels);
        if (!initialApiCallMade) {
          setInitialApiCallMade(true);
        }
      } else {
        const errorData = await response.json();
        setHotelErrorPost(errorData.message);
      }
      s;
    } catch (error) {
      console.error("Error fetching data:", error);
      setHotelErrorPost("An error occurred. Please try again.");
    } finally {
      setIsFetching(false);
    }
  }
  const handleScroll = _debounce(() => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 100) {
      handleHotelSearch();
      // filterByPriceRange(lowerPrice,highPrice);
    }
  }, 200);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const handleSetLocation = (e) => {
    setHotelLocation(e.target.value);
  };
  const handleCheckboxRatingChange = (value) => {
    setSelectedOption(value === selectedOption ? 0 : value);
  };

  const handleClickSet = (type, key, data) => {
    setField(type);
    setValue(key === value ? "$gte":key);
    setSelectedOption(data);
    setPage(1);
    setSearchHotelResults([]);
    // handleHotelSearch();
  };
  
  function resetFilters() {
    setSearchHotelResults([...originalHotelData]);
  }
  useEffect(() => {
    console.log(searchHotelResults);
    if (!originalHotelData && searchHotelResults) {
      setOriginalHotelData([...searchHotelResults]);
    }
  }, [searchHotelResults, originalHotelData]);
  // const resetFilters = () => {
  //   setSelectedRating(null);
  //   setSelectedPriceRange(null);
  //   setSelectedRoomTypes([]);
  // };
  useEffect(() => {
    handleHotelSearch();
    setPage(1);
  }, [selectedOption,field,value]);

  const handleSearch = () => {
    setSearchHotelResults([]);
    handleHotelSearch();
  };

  return (
    <div className={Classes.hotelsParent}>
      <Navbar />
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

          <div className={Classes.searchButtonHotel} onClick={handleSearch}>
            <h3>SEARCH</h3>
          </div>
        </div>
      </div>
      <div className={Classes.rightHeaderHotel}>
        <div>
          <h5>hotel</h5>
        </div>
        <div className={Classes.hotelSorting}>
          <input></input>
          <p>Sort By:</p>
          <select
            onChange={(e) => handleSort(e.target.value)}
            value={sortOption}
            // open={isOpen}
            name="selectedFruit"
          >
            <option value="">-- Select Option --</option>
            <option value="price">Price (Low to High)</option>
            <option value="priceDesc">Price (High to Low)</option>
            <option value="rating">Customer Ratings</option>
          </select>
        </div>
      </div>

      <div className={Classes.hotelbackgroundSection}>
        <div className={Classes.hotelMainSection}>
          <div className={Classes.leftSideDataHotel}>
            <div className={Classes.hotelMap}>
              <div className={Classes.hotelMapImageDiv}>
                <img src="https://www.easemytrip.com/hotels/images/maplocico.svg" />
                <button className={Classes.mapButton}>Show on Map</button>
              </div>
            </div>
            <div className={Classes.filterSection}>
              <div className={Classes.filterHotelReset}>
                <p className={Classes.resetAllHotel} onClick={resetFilters}>
                  Reset All
                </p>
              </div>
              <div className={Classes.filterPriceSection}>
                <div className={Classes.filterPriceHeading}>
                  <h3>Price per night</h3>
                </div>
                <div className={Classes.filterHotelPriceCheckBoxDiv}>
                  <label className={Classes.lableHotelPrice}>
                    <input
                      type="checkbox"
                      value="2000"
                      checked={selectedOption === 2000}
                      onChange={() => handleCheckboxRatingChange(2000)}
                      onClick={() => handleClickSet("avgCostPerNight", "$lte", 2000)}
                    />{" "}
                    <img
                      className={Classes.hotelINRLogo}
                      src="https://hotels.easemytrip.com/newhotel/Content/img/rupee_new_grey.svg"
                    />{" "}
                    Below - ₹ 2000
                  </label>
                  <label className={Classes.lableHotelPrice}>
                    <input
                      type="checkbox"
                      value="3000"
                      checked={selectedOption === 3000}
                      onChange={() => handleCheckboxRatingChange(3000)}
                      onClick={() => handleClickSet("avgCostPerNight", "$lte", 3000)}
                    />{" "}
                    <img
                      className={Classes.hotelINRLogo}
                      src="https://hotels.easemytrip.com/newhotel/Content/img/rupee_new_grey.svg"
                    />{" "}
                    ₹ 2001 - ₹ 3000
                  </label>

                  <label className={Classes.lableHotelPrice}>
                    <input
                      type="checkbox"
                      value="5000"
                      checked={selectedOption === 5000}
                      onChange={() => handleCheckboxRatingChange(5000)}
                      onClick={() => handleClickSet("avgCostPerNight", "$lte", 5000)}
                    />{" "}
                    <img
                      className={Classes.hotelINRLogo}
                      src="https://hotels.easemytrip.com/newhotel/Content/img/rupee_new_grey.svg"
                    />{" "}
                    ₹ 3001 - ₹ 5000
                  </label>

                  <label className={Classes.lableHotelPrice}>
                    <input
                      type="checkbox"
                      value="5001"
                      checked={selectedOption === 5001}
                      onChange={() => handleCheckboxRatingChange(5001)}
                      onClick={() => handleClickSet("avgCostPerNight", "$gte", 5001)}
                    />{" "}
                    <img
                      className={Classes.hotelINRLogo}
                      src="https://hotels.easemytrip.com/newhotel/Content/img/rupee_new_grey.svg"
                    />{" "}
                    ₹ 5001 - ₹ 8000
                  </label>

                  <label className={Classes.lableHotelPrice}>
                    <input
                      type="checkbox"
                      value="8000"
                      checked={selectedOption === 8000}
                      onChange={() => handleCheckboxRatingChange(8000)}
                      onClick={() => handleClickSet("avgCostPerNight", "$gte", 8000)}
                    />{" "}
                    <img
                      className={Classes.hotelINRLogo}
                      src="https://hotels.easemytrip.com/newhotel/Content/img/rupee_new_grey.svg"
                    />{" "}
                    above - ₹ 8000
                  </label>
                </div>
              </div>
              <div className={Classes.filterPriceSection}>
                <div className={Classes.filterPriceHeading}>
                  <h3>User Rating</h3>
                </div>
                <div className={Classes.filterHotelPriceCheckBoxDiv}>
                <label className={Classes.lableHotelPrice}>
                    <input
                      type="checkbox"
                      value="5"
                      checked={selectedOption === 5}
                      onChange={() => handleCheckboxRatingChange(5)}
                      onClick={() => handleClickSet("rating", "$eq", 5)}
                    />{" "}
                    Excellent: 5
                  </label>
                  <label className={Classes.lableHotelPrice}>
                    <input
                      type="checkbox"
                      value="4.5"
                      checked={selectedOption === 4.5}
                      onChange={() => handleCheckboxRatingChange(4.5)}
                      onClick={() => handleClickSet("rating", "$eq", 4.5)}
                    />{" "}
                    Excellent: 4.5+
                  </label>
                  <label className={Classes.lableHotelPrice}>
                    <input
                      type="checkbox"
                      value="4"
                      checked={selectedOption === 4}
                      onChange={() => handleCheckboxRatingChange(4)}
                      onClick={() => handleClickSet("rating", "$eq", 4)}
                    />{" "}
                    Very Good: 4+
                  </label>
                  <label className={Classes.lableHotelPrice}>
                    <input
                      type="checkbox"
                      value="3.5"
                      checked={selectedOption === 3.5}
                      onChange={() => handleCheckboxRatingChange(3.5)}
                      onClick={() => handleClickSet("rating", "$eq", 3.5)}
                    />{" "}
                    Good: 3.5+
                  </label>

                  <label className={Classes.lableHotelPrice}>
                    <input
                      type="checkbox"
                      value="3"
                      checked={selectedOption === 3}
                      onChange={() => handleCheckboxRatingChange(3)}
                      onClick={() => handleClickSet("rating", "$eq", 3)}
                    />{" "}
                    Average: 3+
                  </label>
                </div>
              </div>
              <div>
                {/* <select
            onChange={(e) => handleSort(e.target.value)}
            value={sortOption}
            // open={isOpen}
            name="selectedFruit"
          >
            <option value="">-- Select Option --</option>
            <option value="price">Price (Low to High)</option>
            <option value="priceDesc">Price (High to Low)</option>
            <option value="rating">Customer Ratings</option>
          </select> */}
              </div>
            </div>
          </div>

          <div className={Classes.rightSideDataHotel}>
            <HotelResult searchHotelResults={searchHotelResults} />
          </div>
        </div>
      </div>
      {isFetching && <p>Loading...</p>}
    </div>
  );
}
export default Hotels;
