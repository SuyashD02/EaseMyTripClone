import { createContext, useContext, useState } from "react";
const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [hotelLocation, setHotelLocation] = useState("");
  const [hotelDepartureDate, setHotelDepartureDate] = useState("");
  const[AirportFrom,setAriportFrom] = useState(["Delhi","Indira Gandhi International Airport"]);
  const[AirportTo,setAriportTo] = useState(["Goa","Goa International Airport"]);
  return (
    <AuthContext.Provider value={{ setHotelLocation, hotelLocation,hotelDepartureDate, setHotelDepartureDate,AirportFrom,setAriportFrom,AirportTo,setAriportTo}}>
      {children}
    </AuthContext.Provider>
  );
}
