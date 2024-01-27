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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
