import { createContext, useContext, useState } from "react";
const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [hotelLocation, setHotelLocation] = useState("");
  const [hotelDepartureDate, setHotelDepartureDate] = useState("");
  const [hotelId, setHotelId] = useState("");
  const[AirportFrom,setAriportFrom] = useState(["Delhi","Indira Gandhi International Airport"]);
  const[AirportTo,setAriportTo] = useState(["Goa","Goa International Airport"]);
  const [searchHotelResults, setSearchHotelResults] = useState([]);
  const [isSelectedDayCheckOut, setSelectedDayCheckOut] = useState("");
  return (
    <AuthContext.Provider value={{ setHotelLocation, hotelLocation,hotelDepartureDate, setHotelDepartureDate,AirportFrom,setAriportFrom,AirportTo,setAriportTo,hotelId, setHotelId, searchHotelResults, setSearchHotelResults,isSelectedDayCheckOut, setSelectedDayCheckOut}}>
      {children}
    </AuthContext.Provider>
  );
}
