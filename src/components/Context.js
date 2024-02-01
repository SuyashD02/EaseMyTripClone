import { createContext, useContext, useState } from "react";
const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [hotelLocation, setHotelLocation] = useState("Mumbai");
  const [hotelDepartureDate, setHotelDepartureDate] = useState("");
  const [flightdepartureDate, setFlightDepartureDate] = useState("");
  const [traindepartureDate, setTrainDepartureDate] = useState("");
  const [busdepartureDate, setBusDepartureDate] = useState("");
  const [hotelId, setHotelId] = useState("");
  const [flightId, setFlightId] = useState("");

  const [trainCity, setTrainCity] = useState(["New Delhi"]);
  const [trainToCity, setTrainToCity] = useState(["Pune Junction"]);
  const [busCity, setBusCity] = useState(["Mumbai, Maharashtra"]);
  const [busToCity, setBusToCity] = useState(["Pune, Maharashtra"]);
  const [AirportFrom, setAriportFrom] = useState([
    "Delhi",
    "Indira Gandhi International Airport",
    "DEL",
  ]);
  const [AirportTo, setAriportTo] = useState([
    "Goa",
    "Goa International Airport",
    "GOI",
  ]);
  const [searchHotelResults, setSearchHotelResults] = useState([]);
  const [isSelectedDayCheckOut, setSelectedDayCheckOut] = useState("");
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [flightBookingId, setFlightBookingId] = useState("");
  const [hotelBookingId, setHotelBookingId] = useState("");
  const [seatCount, setSeatCount] = useState(1);
  const [seatHotelCount, setSeatHotelCount] = useState(1);
  const [seatAdultsCount, setSeatAdultsCount] = useState(1);
  const [seatChildrenCount, setSeatChildrenCount] = useState(0);
  const [seatInfantCount, setSeatInfantCount] = useState(0);
  const [seatHotelAdultsCount, setSeatHotelAdultsCount] = useState(1);
  const [seatHotelChildrenCount, setSeatHotelChildrenCount] = useState(0);
  return (
    <AuthContext.Provider
      value={{
        setHotelLocation,
        hotelLocation,
        hotelDepartureDate,
        setHotelDepartureDate,
        AirportFrom,
        setAriportFrom,
        AirportTo,
        setAriportTo,
        hotelId,
        setHotelId,
        searchHotelResults,
        setSearchHotelResults,
        isSelectedDayCheckOut,
        setSelectedDayCheckOut,
        flightdepartureDate,
        setFlightDepartureDate,
        flightId, setFlightId,
        traindepartureDate, setTrainDepartureDate,
        trainCity, setTrainCity,
        trainToCity, setTrainToCity,
        busCity, setBusCity,
        busToCity, setBusToCity,
        busdepartureDate, setBusDepartureDate,
        selectedSeats, setSelectedSeats,
        openLogin, setOpenLogin,
        openSignUp, setOpenSignUp,
        isLoggedIn, setIsLoggedIn,
        flightBookingId, setFlightBookingId,
        seatCount, setSeatCount,
        seatHotelCount, setSeatHotelCount,
        seatAdultsCount, setSeatAdultsCount,seatChildrenCount, setSeatChildrenCount,
        seatInfantCount, setSeatInfantCount,
        seatHotelAdultsCount, setSeatHotelAdultsCount,
        seatHotelChildrenCount, setSeatHotelChildrenCount,
        hotelBookingId, setHotelBookingId,

      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
