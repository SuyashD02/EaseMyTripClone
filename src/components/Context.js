import { createContext, useContext, useState } from "react";
const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [hotelLocation, setHotelLocation] = useState("");
  const [hotelDepartureDate, setHotelDepartureDate] = useState("");
  return (
    <AuthContext.Provider value={{ setHotelLocation, hotelLocation,hotelDepartureDate, setHotelDepartureDate}}>
      {children}
    </AuthContext.Provider>
  );
}
