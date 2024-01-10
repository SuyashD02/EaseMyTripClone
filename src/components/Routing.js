import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Navbar from "./NavBar/Navbar";
import App from "./App";
import Flights from "../Page/Flights/Flights";
import Hotels from "../Page/Hotels/Hotels";
import HotelHome from "../Page/Hotels/HotelHome";
import Train from "../Page/Train/Train";
import Bus from "../Page/Bus/Bus";
function Routing(){
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/App" element={<App/>} />
            <Route path="/navbar" element={<Navbar/>}/>
            <Route path="/flights" element={<Flights/>}/>
            <Route path="/hotels" element={<Hotels/>} />
            <Route path="/" element={<HotelHome/>} />
            <Route path="/train" element={<Train/>} />
            <Route path="/bus" element={<Bus/>}/>
        </Routes>
        </BrowserRouter>
    )
}
export default Routing;