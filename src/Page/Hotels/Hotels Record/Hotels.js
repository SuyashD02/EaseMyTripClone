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
    searchHotelResults, setSearchHotelResults,
    isSelectedDayCheckOut, setSelectedDayCheckOut
  } = useAuth();
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [initialApiCallMade, setInitialApiCallMade] = useState(false);
 
  const [originalHotelData, setOriginalHotelData] = useState([]);
  const [hotelErrorPost, setHotelErrorPost] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [selectedRating, setSelectedRating] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
const [selectedPriceRange, setSelectedPriceRange] = useState("");
const [selectedRoomTypes, setSelectedRoomTypes] = useState([]);
var lowerPrice;
var highPrice;

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

  // const getPrice = (item) =>
  //   item.rooms[0]?.costDetails?.baseCost || item.rooms[0]?.costPerNight;
  const getPrice = (item) =>
  item.rooms[0]?.price;

  async function handleHotelSearch() {
    console.log("Hotel Search Function Called");
    if (isFetching || (initialApiCallMade && page < 1)) {
      return;
    }
    try {
      setIsFetching(true);
      const projectID = "2zqsmiro66wm";
      const formattedDate = moment(hotelDepartureDate).format("dddd");
      const filterOptions = {};

    // if (selectedRating !== null) {
    //   filterOptions.rating = selectedRating;
    // }

    // if (selectedPriceRange !== null) {
    //   filterOptions.rooms = [{}]; 
    //   filterOptions.rooms.price= {
    //     $gte: selectedPriceRange.min,
    //     $lte: selectedPriceRange.max,
    //   };
    // }

    // if (selectedRoomTypes.length > 0) {
    //   filterOptions.roomType = { $in: selectedRoomTypes };
    // }

      let apiUrlHotel = `https://academics.newtonschool.co/api/v1/bookingportals/hotel?limit=10&page=${page}&search={"location":"${hotelLocation}"}&day="${formattedDate}"`;
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
        setSearchHotelResults((prevData) => [...prevData, ...hotelData.data.hotels]);
      
        console.log(hotelData.data.hotels);
        if (!initialApiCallMade) {
          setInitialApiCallMade(true);
        }
      } else {
        const errorData = await response.json();
        setHotelErrorPost(errorData.message);
      }
      s
    } catch (error) {
      console.error("Error fetching data:", error);
      setHotelErrorPost("An error occurred. Please try again.");
    }finally {
      setIsFetching(false);
    }
  };
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

  const handleRatingFilter = () => {
    setSelectedRating(selectedRating === null ? 5 : null); // Change 5 to the desired default rating
  };

  const handleSelectClick = () => {
    setIsOpen(!isOpen);
  };

  const handlePriceFilter = (low,high) => {
    
  };

  const handleRoomTypeFilter = () => {
    // Implement logic to fetch room types from the API and update the state
    // Example: setSelectedRoomTypes(["Single", "Double"]);
  };

  function handleCheckboxChange(e) {
    const checkboxId = e.target.id;
    const isChecked = e.target.checked;

    switch (checkboxId) {
      case "priceCheckbox1":
        isChecked ? filterByPriceRange(0, 3000) : resetFilters();
        break;
      case "priceCheckbox2":
        isChecked ? filterByPriceRange(3001, 5000) : resetFilters();
        break;
      case "priceCheckbox3":
        isChecked ? filterByPriceRange(5001, 10000) : resetFilters();
        break;
      default:
        resetFilters();
        break;
    }
  }
  function filterByPriceRange(minPrice, maxPrice) {
    lowerPrice=minPrice;
    highPrice=maxPrice;
    setSearchHotelResults(
      searchHotelResults.filter(
        (a) => getPrice(a) >= minPrice && getPrice(a) <= maxPrice
      )
    );
  }
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
  }, []);

  const handleOpenDropdown=()=>{
    setIsOpen(true);
  }
  const handleSearch=()=>{
    setSearchHotelResults([]);
    handleHotelSearch();
  }
  
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

          <div
            className={Classes.searchButtonHotel}
            onClick={handleSearch}
          >
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
           {/* <select name="selectedFruit" defaultValue="orange">
        <option value="apple">Apple</option>
        <option value="banana">Banana</option>
        <option value="orange">Orange</option>
      </select> */}
        
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
                <p className={Classes.resetAllHotel} onClick={resetFilters}>Reset All</p>
              </div>
              <div className={Classes.filterPriceSection}>
                <div className={Classes.filterPriceHeading}>
                  <h3>Price per night</h3>
                </div>
                <div className={Classes.filterHotelPriceCheckBoxDiv}>
                  <label className={Classes.lableHotelPrice}>
                    <input
                      type="checkbox"
                      id="priceCheckbox1"
                      onChange={handleCheckboxChange}
                    />{" "}
                    <img className={Classes.hotelINRLogo} src="https://hotels.easemytrip.com/newhotel/Content/img/rupee_new_grey.svg"/> 0 - ₹ 3000
                  </label>
                  <label className={Classes.lableHotelPrice}>
                    <input
                      type="checkbox"
                      id="priceCheckbox2"
                      onChange={handleCheckboxChange}
                    />{" "}
                    <img className={Classes.hotelINRLogo} src="https://hotels.easemytrip.com/newhotel/Content/img/rupee_new_grey.svg"/> 3001 - ₹ 5000
                  </label>
                  
                  <label className={Classes.lableHotelPrice}>
                    <input
                      type="checkbox"
                      id="priceCheckbox3"
                      onChange={handleCheckboxChange}
                    />{" "}
                    <img className={Classes.hotelINRLogo} src="https://hotels.easemytrip.com/newhotel/Content/img/rupee_new_grey.svg"/> 5001 - ₹ 10000
                  </label>
                 
                  <label className={Classes.lableHotelPrice}>
                    <input
                      type="checkbox"
                      id="priceCheckbox5"
                      onChange={handleCheckboxChange}
                    />{" "}
                    <img className={Classes.hotelINRLogo} src="https://hotels.easemytrip.com/newhotel/Content/img/rupee_new_grey.svg"/> 10001 - ₹ 15000
                  </label>
                  
                  <label className={Classes.lableHotelPrice}>
                    <input
                      type="checkbox"
                      id="priceCheckbox6"
                      onChange={handleCheckboxChange}
                    />{" "}
                    <img className={Classes.hotelINRLogo} src="https://hotels.easemytrip.com/newhotel/Content/img/rupee_new_grey.svg"/> 15001 - ₹ 20000
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
