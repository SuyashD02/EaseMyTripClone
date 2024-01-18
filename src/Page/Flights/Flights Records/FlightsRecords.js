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
  const CustomInput = ({ value, onClick }) => (
    <input
      type="text"
      className={Classes.inputFlightRecord}
      value={moment(value).format("dddd")}
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
      const apiUrl = `https://academics.newtonschool.co/api/v1/bookingportals/flight?search={"source":"${AirportFrom[2]}","destination":"${AirportTo[2]}"}&day=${dayAbbreviation}`;
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
  }, []);
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
      <div className="w-[100%] h-[100%] bg-[#e8f2fa] border border-black border-500 border-solid flex justify-center">
        <div className="w-[80%] h-[100%] border border-blue-500 border-solid flex flex-row gap-[20px]">
            <div className="w-[20%] border border-orange-500 border-solid flex flex-col"></div>
            <div className="w-[79%] h-[100%] border border-red-500 border-solid">
                <FlightLists searchResults={searchResults}/>
            </div>
        </div>

      </div>
    </div>
  );
}
export default FlightsRecords;
