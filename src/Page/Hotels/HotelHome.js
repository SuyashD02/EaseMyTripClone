import { useState, useEffect } from "react";
import Classes from "./HotelHome.module.css";
import Navbar from "../../components/NavBar/Navbar";
import Divider from "@mui/material/Divider";
import DatePicker from "react-datepicker";
import moment from "moment";
import { useAuth } from "../../components/Context";
import ListItemButton from "@mui/material/ListItemButton";
import {useNavigate } from "react-router-dom";

function HotelHome() {
  const {
    setHotelLocation,
    hotelLocation,
    hotelDepartureDate,
    setHotelDepartureDate,
    isSelectedDayCheckOut, setSelectedDayCheckOut
  } = useAuth();
  const navigate = useNavigate();
  const [offers, setOffers] = useState([]);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOfferType, setSelectedOfferType] = useState("HOTELS");
  const [loading, setLoading] = useState(true);
  const locations = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Kolkata",
    "Chennai",
    "Hyderabad",
    "Pune",
    "Ahmedabad",
    "Surat",
    "Jaipur",
    "Lucknow",
    "Kanpur",
    "Nagpur",
    "Indore",
    "Thane",
    "Bhopal",
    "Visakhapatnam",
    "Pimpri-Chinchwad",
    "Patna",
    "Vadodara",
    "Ghaziabad",
    "Jodhpur",
    "Dhanbad",
    "Gwalior",
    "Rajkot",
    "Kalyan-Dombivali",
    "Vasai-Virar",
    "Ludhiana",
    "Meerut",
    "Amritsar",
    "Agra",
    "Faridabad",
    "Coimbatore",
    "Varanasi",
    "Allahabad",
    "Vijayawada",
    "Jabalpur",
    "Raipur",
    "Srinagar",
  ];
  const [filteredLocations, setFilteredLocations] = useState([]);

  const CustomInput = ({ value, onClick }) => (
    <input
      type="text"
      className={Classes.inputhotel}
      value={moment(value).format("DD MMM YYYY")}
      onClick={onClick}
      readOnly
    />
  );
  const CustomInputReturn = ({ value, onClick }) => (
    <input
      type="text"
      className={Classes.inputhotel}
      value={moment(value).format("DD MMM YYYY")}
      onClick={onClick}
      readOnly
    />
  );
  const handleSearch = () => {
    navigate("/hotels");
  };
  const openDropdown = () => {
    setDropdownOpen(true);
  };

  const closeDropdown=()=>{
    console.log("Closing dropdown");
    setDropdownOpen(false);
  };
  const handleLocationClick = (location) => {
    setHotelLocation(location);
   
  };
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setHotelLocation(inputValue);

    const filtered = inputValue ==="" ? locations :locations.filter((location) =>
    location.toLowerCase().includes(inputValue.toLowerCase())
    );

    setFilteredLocations(filtered);
  };

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const yourProjectID = "wan6hnsnhwfn";
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
  return (
    <div className={Classes.flightsSection}>
      <Navbar />

      <div className={Classes.hotelSearchSection}>
        <div className={Classes.headSearchbar}>
          <div className={Classes.captionHotel}>
            <h1 className={Classes.searchLowestH1}>
              Same hotel, Cheapest price. Guaranteed!
            </h1>
          </div>
        </div>
        <div className={Classes.searchBar}>
          <div className={Classes.mainDivSearch}>
            <div className={Classes.searchFrom}>
              <div className={Classes.inputHeading}>
                <img src="https://www.easemytrip.com/images/hotel-img/hp_icon_1.png" />
                <p className={Classes.pInput}>Enter City name, Location</p>
              </div>
              <div className={Classes.inputFormSection} onClick={openDropdown}>
                <input
                  className={Classes.formSearchBox}
                  placeholder="FROM"
                  value={hotelLocation}
                  onChange={handleInputChange}
                ></input>
                {isDropdownOpen && (
                  <div className={Classes.dropMyLocation}onMouseLeave={closeDropdown}>
                    {filteredLocations.map((location, index) => (
                      <ListItemButton
                        key={index}
                        onClick={() =>{handleLocationClick(location);}
                        }
                      >
                        <p className={Classes.locationP}>{location}</p>
                        
                      </ListItemButton>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <Divider orientation="vertical" />
          <div className={Classes.hotelhomesSectionCheckIn}>
            <div className={Classes.hotelhomeCheckIn}>
              <div className={Classes.checkInHeading}>
                <img src="https://www.easemytrip.com/images/hotel-img/hp_icon_2.png" />
                <p className={Classes.pInput}>Check-in</p>
              </div>

              <DatePicker
                selected={hotelDepartureDate}
                onChange={(date) => setHotelDepartureDate(date)}
                customInput={<CustomInput />}
              />
            </div>
          </div>
          <Divider orientation="vertical" />
          <div className={Classes.searchReturn}>
            <div className={Classes.hotelCheckOut}>
              <div className={Classes.checkOutHeading}>
                <img src="https://www.easemytrip.com/images/hotel-img/hp_icon_2.png" />
                <p className={Classes.pInput}>Check-out</p>
              </div>
              <DatePicker
                selected={isSelectedDayCheckOut}
                onChange={(date) => setSelectedDayCheckOut(date)}
                customInput={<CustomInputReturn />}
              />
            </div>
          </div>
          <Divider orientation="vertical" />
          <div className={Classes.searchTraveller}>
            <div className={Classes.hotelChooseRooms}>
              <div>
                <p className={Classes.pInput}>Rooms & Guests</p>
              </div>
            </div>
          </div>

          <div className={Classes.searchButton} onClick={handleSearch}>
            <h3>SEARCH</h3>
          </div>
        </div>
      </div>
      <div className={Classes.hotelHomeQr}>
        <div className={Classes.qrImageDiv}>
          <img
            className={Classes.imageQr}
            src="https://www.easemytrip.com/images/hotel-img/app-download-strip3.png"
          />
        </div>
      </div>
      <div className={Classes.offerHeading}>
        <div className={Classes.headingDiv}>
          <h3 className={Classes.headingOffers}>Exclusive Offers</h3>
        </div>
      </div>
      <div className={Classes.hotelOffersSection}>
        {loading ? (
          <p>Loading offers...</p>
        ) : (
          offers.map((offer) => (
            <div className={Classes.hotelOfersBoxes} key={offer.id}>
              <div className={Classes.offersImagediv}>
                <div className={Classes.hotelOffersImage}>
                  <img
                    className={Classes.imageOffersHotel}
                    src={offer.heroUrl}
                    alt={offer.title}
                  />
                </div>

                <div className={Classes.descriptionHoteloffer}>
                  <p>
                    {offer.pTl} {offer.pTx}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
export default HotelHome;
