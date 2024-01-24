import React, { useState } from "react";
import { useAuth } from "../../../components/Context";
import ListItemButton from "@mui/material/ListItemButton";
const BusDetailFrom = ({ onClose }) => {
  const busCity = [
    "Delhi",
"Dhanbad Junction",
"Surat",
"Katpadi Junction",
"Kanpur Central",
"Kharagpur Junction",
"Thiruvananthapuram Central",
"Indore Junction",
"Chandigarh",
"Gwalior Junction",
"Agra Cantonment",
"Ambala Cantonment",
"Bhusaval Junction",
"Manmad Junction",
"Thrissur",
"Visakhapatnam Junction",
"Khurda Road Junction",
"Ahmedabad Junction",
"Moradabad Junction",
"Secunderabad Junction",
"Nagpur Junction",
"Howrah Junction",
"Mysuru Junction",
"Amritsar Junction",
"Pune Junction",
"Raipur Junction",
"New Delhi",
"Jhansi Junction",
"Varanasi Junction",
"Guwahati",
"Asansol Junction",
"Nadiad Junction",
"Bhopal Junction",
"Yesvantpur Junction",
"Kollam Junction",
"Ludhiana Junction",
"Bengaluru Cantt",
"Vijayawada Junction",
"Warangal",
"Anand Junction",
"Hubli Junction",
"Jodhpur Junction",


  ];
  
  const [inputValue, setInputValue] = useState("");
  const [filteredCities, setFilteredCities] = useState(busCity); // Initialize with all cities
  const {setBusCity } = useAuth();

  const [isHotelInputOpen, setIsHotelInputOpen] = useState(false);

  const handleChange = (e) => {
    const input = e.target.value;
    setInputValue(input);
    // Filter cities based on input
    const filtered = busCity.filter((city) =>
      city.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredCities(filtered.length > 0 ? filtered : busCity);
  };

  const handleInputChange = (selectedCity) => {
    setInputValue(selectedCity);
    setFilteredCities(busCity); // Reset filteredCities to all cities
   
    // Find the index of the selected city in the original list
    const index = busCity.findIndex((city) => city === selectedCity);
   
    // Set the hotel city based on the selected city from the original list
    setBusCity(busCity[index]);
   
    setIsHotelInputOpen(true);
    onClose(isHotelInputOpen);
  };

  return (
    <div className="w-[20em] h-55 absolute bg-slate-50 mt-10 p-2 rounded shadow-[0_8px_30px_rgb(0,0,0,0.12)] z-10">
      <input
        className="mb-3 w-full p-2"
        value={inputValue}
        onChange={handleChange}
      />
      <div className="w-80 h-40 overflow-auto scrollbar">
        <ul className="cursor-pointer">
          {filteredCities?.map((data, index) => (
            <ListItemButton
              onClick={() => {
                handleInputChange(data);
              }}
              className="mt-2"
              key={index}
            >
              {data}
            </ListItemButton>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BusDetailFrom;