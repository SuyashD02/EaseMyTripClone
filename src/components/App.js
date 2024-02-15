import "../styles/App.css";
import React, { useState,useContext } from "react";




const App = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleCheckboxChange = (value) => {
    setSelectedOption(value === selectedOption ? null : value);
  };
  
  return (
    <div>      
    </div>
  );
};

export default App;
