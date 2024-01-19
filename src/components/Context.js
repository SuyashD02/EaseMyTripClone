import { createContext, useContext, useState } from "react";
const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [hotelLocation, setHotelLocation] = useState("");
  const [hotelDepartureDate, setHotelDepartureDate] = useState("");
  const [flightdepartureDate, setFlightDepartureDate] = useState("");
  const [hotelId, setHotelId] = useState("");
  const [flightId, setFlightId] = useState("");
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
