import React, { useState, useEffect } from "react";
import Navbar from "../../../components/NavBar/Navbar";
import moment from "moment";
import Classes from "./FlightRecord.module.css";
import { useAuth } from "../../../components/Context";
import FlightFrom from "../Flight DropDown/FlightsFrom";
import Divider from "@mui/material/Divider";
import FlightsTo from "../Flight DropDown/FlightsTo";
import DatePicker from "react-datepicker";
import FlightLists from "./FlightLists";

function FlightsRecords() {
  const [flightRecordFromOpen, setFlightRecordFromOpen] = useState(false);
  const [flightRecordToOpen, setFlightRecordToOpen] = useState(false);
  const {
    AirportFrom,
    AirportTo,
    travellersCount,
    flightdepartureDate,
    setFlightDepartureDate,
  } = useAuth();
  const [searchResults, setSearchResults] = useState([]);
  const [errorPost, setErrorPost] = useState("");
  const [sliderValue, setSliderValue] = useState(1000);
  const [value, setValue] = useState("");
  const [field, setField] = useState("");

  const CustomInput = ({ value, onClick }) => (
    <input
      type="text"
      className={Classes.inputFlightRecord}
      value={moment(value).format("DD MMM YYYY")}
      onClick={onClick}
      readOnly
    />
  );

  const handleFlightFormOpen = () => {
    setFlightRecordFromOpen(!flightRecordFromOpen);
  };
  const handleFlightToOpen = () => {
    setFlightRecordToOpen(!flightRecordToOpen);
  };

  async function handleSearch() {
    try {
      const projectID = "2zqsmiro66wm";
      const dayAbbreviation = moment(flightdepartureDate).format("ddd");
      const apiUrl = `https://academics.newtonschool.co/api/v1/bookingportals/flight?day=${dayAbbreviation}&search={"source":"${AirportFrom[2]}","destination":"${AirportTo[2]}"}&filter={"${field}":{"${value}":${sliderValue}}}`;
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          projectID: projectID,
        },
      });
      if (response.ok) {
        console.log("Flight Function called");
        const data = await response.json();
        console.log(data);
        setSearchResults(data.data.flights);
      } else {
        const errorData = await response.json();
        setErrorPost(errorData.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setErrorPost("An error occurred. Please try again.");
    }
  }
  useEffect(() => {
    handleSearch();
  }, [sliderValue]);

  const handleSliderChange = (event) => {
    setSliderValue(event.target.value);
  };
  const handleCheckboxRatingChange = (value) => {
    setSliderValue(value === sliderValue ? null : value);
  };

  const handleClickSet = (type, key, data) => {
    setField(type);
    setValue(key);
    setSliderValue(data);
  };
  return (
    <div>
      <Navbar />
      <div className={Classes.flightSearchSection}>
        <div className={Classes.searchBarFlightDiv}>
          <div className={Classes.mainDivFlightRecordSearch}>
            <div
              onClick={handleFlightFormOpen}
              className={Classes.searchFromFlightRecord}
            >
              <div className="h-[100%]">
                <span className="text-[18px] font-[600] text-[#fff] cursor-pointer">
                  {AirportFrom[0]}
                </span>
                <div className="text-sm text-[#fff] cursor-pointer flex gap-[5px]">
                  <span>[{AirportFrom[2]}]</span>
                  <span>{AirportFrom[1]}</span>
                </div>
              </div>
            </div>
          </div>
          {flightRecordFromOpen && (
            <FlightFrom onclose={handleFlightFormOpen} />
          )}

          <div className="h-[100%] w-[2%] flex flex-col justify-center items-center">
            <div className="w-[100%] h-[30%] flex justify-center">
              <Divider orientation="vertical" />
            </div>
            <img
              className="h-[40%]"
              src="https://flight.easemytrip.com/Content/img/modify_img/swap-nw-icn.png"
            />
            <div className="w-[100%] h-[30%] flex justify-center">
              <Divider orientation="vertical" />
            </div>
          </div>
          <div className={Classes.mainDivFlightRecordSearch}>
            <div
              onClick={handleFlightToOpen}
              className={Classes.searchToFlightRecord}
            >
              <div className="h-[100%]">
                <span className="text-[18px] font-[600] text-[#fff] cursor-pointer">
                  {AirportTo[0]}
                </span>
                <div className="text-sm text-[#fff] cursor-pointer flex gap-[5px]">
                  <span>[{AirportTo[2]}]</span>
                  <span>{AirportTo[1]}</span>
                </div>
              </div>
            </div>
          </div>
          {flightRecordToOpen && <FlightsTo onclose={handleFlightToOpen} />}

          <div className="flex justify-center items-center h-[100%] w-[17%]">
            <div className="w-[95%] h-[90%]">
              <div className="flex h-[40%]">
                <p className="text-[14px] font-[500] text-[#fff]">
                  DEPARTURE DATE
                </p>
              </div>
              <DatePicker
                selected={flightdepartureDate}
                onChange={(date) => setFlightDepartureDate(date)}
                customInput={<CustomInput />}
              />
            </div>
          </div>
          <div className="flex justify-center items-center h-[100%] w-[17%]">
            <div className="w-[95%] h-[90%]">
              <div>
                <p className="text-[14px] font-[500] text-[#fff]">
                  TRAVELLER & CLASS
                </p>
              </div>
            </div>
          </div>
          <div className="w-[10%] h-[100%] flex justify-center items-center">
            <div
              className={Classes.searchButtonFlightRecords}
              onClick={handleSearch}
            >
              <h3>SEARCH</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[100%] h-[100%] bg-[#e8f2fa] flex justify-center">
        <div className="w-[80%] h-[100%] flex flex-row gap-[20px]">
          <div className="w-[20%] flex flex-col">
            <div className={Classes.flightDataPage}>
              <div className="text-[#000] text-[14px] font-[600] ">
                <p> FILTER </p>
              </div>

              <div className="mt-[20px] flex flex-col">
                <label
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    marginBottom: "20px",
                  }}
                  for="slider"
                >
                  One Way Price
                </label>
                <input
                  type="range"
                  id="slider"
                  name="slider"
                  min="0"
                  max="2500"
                  value={sliderValue}
                  onChange={handleSliderChange}
                  onClick={() => handleClickSet("ticketPrice", "$gte")}
                />
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                    marginTop: "10px",
                  }}
                >
                  <p>Min: 0</p> <p>&#8377; {sliderValue}</p> <p>Max: 2500</p>
                </div>
              </div>
              <div className="mt-[30px]">
                <p className="text-[#000] text-[14px] font-[600] ">
                  Stops From {AirportFrom[0]}
                </p>
                <div className="flex justify-between">
                  <div className="mt-[10px] flex gap-[5px] text-[12px] font-[400] text-[#333] cursor-pointer">
                    <input
                      type="checkbox"
                      value="0"
                      checked={sliderValue === "0"}
                      onChange={() => handleCheckboxRatingChange("0")}
                      onClick={() => handleClickSet("stops", "$eq", "0")}
                    />
                    <label>Non Stop</label>
                  </div>
                  <p style={{ marginTop: "10px" }}></p>
                </div>
                <div className="flex justify-between">
                  <div className="mt-[10px] flex gap-[5px] text-[12px] font-[400] text-[#333] cursor-pointer">
                    <input
                      type="checkbox"
                      value="1"
                      checked={sliderValue === "1"}
                      onChange={() => handleCheckboxRatingChange("1")}
                      onClick={() => handleClickSet("stops", "$eq", "1")}
                    />
                    <label>1 Stop</label>
                  </div>
                  <p style={{ marginTop: "10px" }}></p>
                </div>
                <div className="flex justify-between">
                  <div className="mt-[10px] flex gap-[5px] text-[12px] font-[400] text-[#333] cursor-pointer">
                    <input
                      type="checkbox"
                      value="2"
                      checked={sliderValue === "2"}
                      onChange={() => handleCheckboxRatingChange("2")}
                      onClick={() => handleClickSet("stops", "$eq", "2")}
                    />
                    <label>2 Stop</label>
                  </div>
                  <p style={{ marginTop: "10px" }}></p>
                </div>
              </div>
              <div className="mt-[30px]">
                <p className="text-[#000] text-[14px] font-[600] ">Duration</p>
                <div className="flex justify-between">
                  <div className="mt-[10px] flex gap-[5px] text-[12px] font-[400] text-[#333] cursor-pointer">
                    <input
                      type="checkbox"
                      value="1"
                      checked={sliderValue === "1"}
                      onChange={() => handleCheckboxRatingChange("1")}
                      onClick={() => handleClickSet("duration", "$eq", "1")}
                    />
                    <label>1 hour</label>
                  </div>
                  <p style={{ marginTop: "10px" }}></p>
                </div>
                <div className="flex justify-between">
                  <div className="mt-[10px] flex gap-[5px] text-[12px] font-[400] text-[#333] cursor-pointer">
                    <input
                      type="checkbox"
                      value="2"
                      checked={sliderValue === "2"}
                      onChange={() => handleCheckboxRatingChange("2")}
                      onClick={() => handleClickSet("duration", "$eq", "2")}
                    />
                    <label>2 hour</label>
                  </div>
                  <p style={{ marginTop: "10px" }}></p>
                </div>
                <div className="flex justify-between">
                  <div className="mt-[10px] flex gap-[5px] text-[12px] font-[400] text-[#333] cursor-pointer">
                    <input
                      type="checkbox"
                      value="3"
                      checked={sliderValue === "3"}
                      onChange={() => handleCheckboxRatingChange("3")}
                      onClick={() => handleClickSet("duration", "$eq", "3")}
                    />
                    <label>3 hour</label>
                  </div>
                  <p style={{ marginTop: "10px" }}></p>
                </div>
                <div className="flex justify-between">
                  <div className="mt-[10px] flex gap-[5px] text-[12px] font-[400] text-[#333] cursor-pointer">
                    <input
                      type="checkbox"
                      value="4"
                      checked={sliderValue === "4"}
                      onChange={() => handleCheckboxRatingChange("4")}
                      onClick={() => handleClickSet("duration", "$eq", "4")}
                    />
                    <label>4 hour</label>
                  </div>
                  <p style={{ marginTop: "10px" }}></p>
                </div>
                <div className="flex justify-between">
                  <div className="mt-[10px] flex gap-[5px] text-[12px] font-[400] text-[#333] cursor-pointer">
                    <input
                      type="checkbox"
                      value="5"
                      checked={sliderValue === "5"}
                      onChange={() => handleCheckboxRatingChange("5")}
                      onClick={() => handleClickSet("duration", "$eq", "5")}
                    />
                    <label>5 hour</label>
                  </div>
                  <p style={{ marginTop: "10px" }}></p>
                </div>
                <div className="flex justify-between">
                  <div className="mt-[10px] flex gap-[5px] text-[12px] font-[400] text-[#333] cursor-pointer">
                    <input
                      type="checkbox"
                      value="6"
                      checked={sliderValue === "6"}
                      onChange={() => handleCheckboxRatingChange("6")}
                      onClick={() => handleClickSet("duration", "$eq", "6")}
                    />
                    <label>6 hour</label>
                  </div>
                  <p style={{ marginTop: "10px" }}></p>
                </div>
              </div>
              <div className="mt-[30px]">
                <p className="text-[#000] text-[14px] font-[600] ">
                  Departure From {AirportFrom[0]}
                </p>
                <div className="w-[100%]">
                  <div className="w-[100%] border border-solid border-[#e0e0e0] bg-[#fff] mt-[5px] rounded-[5px] flex">
                    <div
                      className="w-[25%] border border-solid border-[#e0e0e0] cursor-pointer flex flex-col justify-center items-center"
                      onClick={() =>
                        handleClickSet("departureTime", "$lt", "6")
                      }
                    >
                      <div className={Classes.filterImageSun}></div>
                      <div className="w-[100%] text-[#737373] text-[10px] items-center flex flex-col justify-center">
                        <span> Before </span>
                        <span> 6 AM</span>
                      </div>
                    </div>
                    <div
                      className="w-[25%] border border-solid border-[#e0e0e0] cursor-pointer flex flex-col justify-center items-center"
                      onClick={() =>
                        handleClickSet("departureTime", "$lte", "12")
                      }
                    >
                      <div className={Classes.filterImageMid}></div>
                      <div className="w-[100%] text-[#737373] text-[10px] items-center flex flex-col justify-center">
                        <span>6 AM -</span>
                        <span> 12 PM</span>
                      </div>
                    </div>
                    <div
                      className="w-[25%] border border-solid border-[#e0e0e0] cursor-pointer flex flex-col justify-center items-center"
                      onClick={() =>
                        handleClickSet("departureTime", "$lte", "18")
                      }
                    >
                      <div className={Classes.filterImageEve}></div>
                      <div className="w-[100%] text-[#737373] text-[10px] items-center flex flex-col justify-center">
                        <span>12 PM -</span>
                        <span> 6 PM</span>
                      </div>
                    </div>
                    <div
                      className="w-[25%] border border-solid border-[#e0e0e0] cursor-pointer flex flex-col justify-center items-center"
                      onClick={() =>
                        handleClickSet("departureTime", "$gte", "18")
                      }
                    >
                      <div className={Classes.filterImageNight}></div>
                      <div className="w-[100%] text-[#737373] text-[10px] items-center flex flex-col justify-center">
                        <span> After</span>
                        <span> 6 PM</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[79%] h-[100%] ">
            <FlightLists searchResults={searchResults} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default FlightsRecords;
