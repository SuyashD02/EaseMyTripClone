import React, { useState, useEffect } from "react";
import moment from "moment";
import Classes from "./Flights.module.css";
import Navbar from "../../components/NavBar/Navbar";
import Divider from "@mui/material/Divider";
import DatePicker from "react-datepicker";
import { Avatar, Box, ListItemButton, Modal, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Settings, Style } from "@mui/icons-material";
import { useAuth } from "../../components/Context";
import FlightsTo from "./Flight DropDown/FlightsTo";
import FlightFrom from "./Flight DropDown/FlightsFrom";
import { useNavigate } from "react-router-dom";
function Flights() {
  const [open, setOpen] = useState(false);
  const [openToModal, setOpenToModal] = useState(false);
  const [flightFromOpen, setFlightFromOpen] = useState(false);
  const [flightToOpen, setFlightToOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [errorPost, setErrorPost] = useState("");
  const [offers, setOffers] = useState([]);
  const [selectedOfferType, setSelectedOfferType] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const { AirportFrom, AirportTo, travellersCount,flightdepartureDate,setFlightDepartureDate } = useAuth();
  const navigate = useNavigate();
  const CustomInput = ({ value, onClick }) => (
    <input
      type="text"
      className={Classes.inputFlight}
      value={moment(value).format("DD MMM YYYY")}
      onClick={onClick}
      readOnly
    />
  );
  const handleSearch = () => {
    navigate("/flightrecord");
  };
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const yourProjectID = "2zqsmiro66wm";
        const response = await fetch(
          `https://academics.newtonschool.co/api/v1/bookingportals/offers?filter={"type":"${selectedOfferType}"}`,
          {
            method: "GET",
            headers: {
              projectID: yourProjectID,
            },
          }
        );
        const data = await response.json();
        setOffers(data.data.offers);
        console.log(data);
      } catch (error) {
        console.error("Error fetching offers:", error);
        setOffers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, [selectedOfferType]);

  const handleFlightToOpen = () => {
    setFlightToOpen(!flightToOpen);
  };
  const handleFlightFormOpen = () => {
    setFlightFromOpen(!flightFromOpen);
  };
  const handleOfferTypeChange = (type) => {
    setSelectedOfferType(type);
    setLoading(true);
  };
  return (
    <div className={Classes.flightsSection}>
      <Navbar />
      <div className={Classes.flightBooking}>
        <div className={Classes.headSearchbar}>
          <div className={Classes.captionFlight}>
            <h1 className={Classes.searchLowestFlightH1}>
              Search Lowest Price
            </h1>
          </div>
        </div>
        <div className={Classes.searchBarFlight}>
          <div className={Classes.mainDivFlightSearch}>
            <div
              onClick={handleFlightFormOpen}
              className={Classes.searchFromFlight}
            >
              <div className={Classes.inputHeading}>
                <p className={Classes.pInputFlight}>From</p>
              </div>
              <div className={Classes.inputToSection}>
                <span className="text-xl font-semibold cursor-pointer">
                  {AirportFrom[0]}
                </span>
                <div className="text-sm cursor-pointer flex gap-[5px]">
                  <span>[{AirportFrom[2]}]</span>
                  <span>{AirportFrom[1]}</span>
                </div>
              </div>
            </div>
          </div>
          {flightFromOpen && <FlightFrom onclose={handleFlightFormOpen} />}
          <Divider orientation="vertical" />
          <img
            className={Classes.swapIcon}
            src="https://www.easemytrip.com/Content/img/swipe_icon.svg"
          />
          <div className={Classes.mainDivFlightSearch}>
            <div
              onClick={handleFlightToOpen}
              className={Classes.searchToFlight}
            >
              <div className={Classes.inputHeading}>
                <p className={Classes.pInputFlight}>To</p>
              </div>
              <div className={Classes.inputToSection}>
                <span className="text-xl font-semibold cursor-pointer">
                  {AirportTo[0]}
                </span>
                <div className="text-sm cursor-pointer flex gap-[5px]">
                  <span>[{AirportTo[2]}]</span>
                  <span>{AirportTo[1]}</span>
                </div>
              </div>
            </div>
          </div>
          {flightToOpen && <FlightsTo onclose={handleFlightToOpen} />}

          <Divider orientation="vertical" />
          <div className={Classes.searchDepartureFlight}>
            <div className={Classes.flighthomeDeparture}>
              <div className={Classes.departureHeading}>
                <img src="https://www.easemytrip.com/images/hotel-img/hp_icon_2.png" />
                <p className={Classes.pInputFlight}>DEPARTURE DATE</p>
              </div>
              <DatePicker
                selected={flightdepartureDate}
                onChange={(date) => setFlightDepartureDate(date)}
                customInput={<CustomInput />}
              />
            </div>
          </div>
          <Divider orientation="vertical" />
          <div className={Classes.searchTravellerFlight}>
            <div className={Classes.hotelChooseTraveller}>
              <div>
                <p className={Classes.pInput}>TRAVELLER & CLASS</p>
              </div>
            </div>
          </div>

          <div className={Classes.searchButtonFlight} onClick={handleSearch}>
            <h3>SEARCH</h3>
          </div>
        </div>
      </div>
      <div className={Classes.offerHeadingFlight}>
        <div className={Classes.headingDivFlight}>
          <h3 className={Classes.headingOffers}>Exclusive Offers</h3>
        </div>
      </div>
      <div className={Classes.listOffers}>
        <p
          className={Classes.listOffersFlight}
          onClick={() => handleOfferTypeChange("ALL")}
        >
          All Offers
        </p>
        <p
          className={Classes.listOffersFlight}
          onClick={() => handleOfferTypeChange("FLIGHTS")}
        >
          Flights
        </p>
        <p
          className={Classes.listOffersFlight}
          onClick={() => handleOfferTypeChange("HOTELS")}
        >
          Hotels
        </p>
        <p
          className={Classes.listOffersFlight}
          onClick={() => handleOfferTypeChange("RAILS")}
        >
          Rails
        </p>
        {/* <p onClick={() => handleOfferTypeChange("BUS")}>Bus</p> */}
      </div>
      <div className={Classes.flightOffersSection}>
        {loading ? (
          <p>Loading offers...</p>
        ) : (
          offers.map((offer) => (
            <div className={Classes.flightOfersBoxes} key={offer.id}>
              <div className={Classes.offersFlightImagediv}>
                <div className={Classes.flightOffersImage}>
                  <img
                    className={Classes.imageOffersFlight}
                    src={offer.heroUrl}
                    alt={offer.title}
                  />
                </div>

                <div className={Classes.descriptionFlightoffer}>
                  <p>
                    {offer.pTl} {offer.pTx}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {/* same as hotel */}
    </div>
  );
}
export default Flights;
