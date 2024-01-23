import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Navbar from "./NavBar/Navbar";
import App from "./App";
import Flights from "../Page/Flights/Flights";
import HotelHome from "../Page/Hotels/HotelHome";
import Train from "../Page/Train/Train";
import Bus from "../Page/Bus/Bus";
import HotelDetail from "../Page/Hotels/Hotel Detail/HotelDetail";
import Hotels from "../Page/Hotels/Hotels Record/Hotels";
import FlightsRecords from "../Page/Flights/Flights Records/FlightsRecords";
import TrainDetail from "../Page/Train/Train Detail/TrainDetail";
function Routing(){
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/App" element={<App/>} />
            <Route path="/navbar" element={<Navbar/>}/>
            <Route path="/" element={<Flights/>}/>
            <Route path="/hotels" element={<Hotels/>} />
            <Route path="/hotelhome" element={<HotelHome/>} />
            <Route path="/hoteldetails" element={<HotelDetail/>}/>
            <Route path="/flightrecord" element={<FlightsRecords/>}/>
            <Route path="/train" element={<Train/>} />
            <Route path="/trainrecord" element={<TrainDetail/>} />
            <Route path="/bus" element={<Bus/>}/>
        </Routes>
        </BrowserRouter>
    )
}
export default Routing;