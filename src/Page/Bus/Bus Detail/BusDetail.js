import React,{useState,useEffect} from "react";
import Navbar from "../../../components/NavBar/Navbar";
import Classes from "../Bus.module.css";
import { useAuth } from "../../../components/Context";
import DatePicker from "react-datepicker";
import moment from "moment";
import BusList from "./BusList";
import BusDetailFrom from "../Drop Down/BusDetailFrom";
import BusDetailTo from "../Drop Down/BusDetailTo";

function BusDetail(){
    const {busdepartureDate, setBusDepartureDate,busCity, busToCity} = useAuth();
    const [busDetailFromOpen, setBusDetailFromOpen] = useState(false);
    const [busDetailToOpen, setBusDetailToOpen] = useState(false);
    const [searchResultsBus, setSearchResultsBus] = useState([]);
  const [errorPost, setErrorPost] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [sliderValue, setSliderValue] = useState(2000);

  const handleCheckboxRatingChange = (value) => {
    setSelectedOption(value === selectedOption ? null : value);
  };

  const handleSliderChange = (event) => {
    setSliderValue(event.target.value);
  };
    const CustomInput = ({ value, onClick }) => (
        <input
          type="text"
          className={Classes.inputBusDetail}
          value={moment(value).format("DD MMM YYYY")}
          onClick={onClick}
          readOnly
        />
      );
      const handleBusDetailCityInput = () => {
        setBusDetailFromOpen(!busDetailFromOpen);
      };
    const handleBusDetailCityToInput = () => {
        setBusDetailToOpen(!busDetailToOpen);
      };
    async function BusSearch() {
        try {
          const projectID = "2zqsmiro66wm";
          const dayAbbreviation = moment(busdepartureDate).format("ddd");
          const apiUrl = `https://academics.newtonschool.co/api/v1/bookingportals/bus?&day=${dayAbbreviation}&search={"source":"${busCity}","destination":"${busToCity}"}`;
          const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
              projectID: projectID,
            },
          });
          if (response.ok) {
            console.log("Bus Function called");
            const data = await response.json();
            console.log(data);
            setSearchResultsBus(data.data.buses);
          } else {
            const errorData = await response.json();
            setErrorPost(errorData.message);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
          setErrorPost("An error occurred. Please try again.");
        }
      }
      useEffect(() => {
        BusSearch();
      }, []);
    return(
        <div>
            <Navbar/>
            <div className={Classes.BusSearchSection}>
        <div className={Classes.searchBarBusDiv} >
            
          <div className={Classes.mainDivBusRecordSearch}>
            <div
              onClick={handleBusDetailCityInput}
              className={Classes.searchFromBusRecord}
            >
              <div className="h-[100%] flex items-center">
              <span className="text-[16px] text-[#fff] cursor-pointer flex items-center">
                  {busCity}
                </span>
              </div>
            </div>
          </div>
          {busDetailFromOpen && <BusDetailFrom onClose={handleBusDetailCityInput} />}

          <div className="h-[100%] w-[3%] flex flex-col justify-center items-center">
            <img
              className="h-[90%]"
              src="https://railways.easemytrip.com/Content/Train/img/list-arrow-lr.png"
            />
          </div>
          <div className={Classes.mainDivBusRecordSearch}>
            <div
              onClick={handleBusDetailCityToInput}
              className={Classes.searchToBusRecord}
            >
              <div className="h-[100%] flex items-center">
              <span className="text-[16px] text-[#fff] cursor-pointer flex items-center">
                  {busToCity}
                </span>
              </div>
            </div>
          </div>
          {busDetailToOpen && <BusDetailTo onClose={handleBusDetailCityToInput}  />}

          <div className={Classes.departureDateBus}>
            <div className="w-[95%] h-[90%] flex items-center">
              <DatePicker
                selected={busdepartureDate}
                onChange={(date) => setBusDepartureDate(date)}
                customInput={<CustomInput />}
              />
              <div className="w-[20%] h-[100%] flex items-center">
                <img className="opacity-[.3]" src="https://railways.easemytrip.com/Content/Train/img/calender-icon.png"/>
              </div>
            </div>
          </div>
          <div className="w-[16%] h-[100%] flex justify-center items-center">
            <div
              className={Classes.searchButtonBusRecords}
              onClick={BusSearch}
            >
              <h3>Modify Search</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[100%] h-[100%] bg-[#e8f2fa] flex justify-center">
        <div className="w-[80%] h-[100%] flex flex-row gap-[20px]">
            <div className="w-[20%] flex flex-col">
            <div className={Classes.busDataPage}>
              <div className="text-[#000] text-[14px] font-[600] ">
              <p>Filter By</p>
              </div>
              
            <div className="mt-[20px] flex flex-col">
              <label
                style={{
                  fontSize: "12px",
                  fontWeight: "bold",
                  marginBottom: "20px",
                }}
                for="slider"
              >
                One Way Price
              </label>
              <input
                type="range"
                id="slider"
                name="slider"
                min="400"
                max="25000"
                value={sliderValue}
                onChange={handleSliderChange}
              />
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                  marginTop: "10px",
                }}
              >
                <p className="text-[#000] text-[12px]">Min: 400</p> <p className="text-[#000] text-[12px]">&#8377; {sliderValue}</p> <p className="text-[#000] text-[12px]">Max: 25000</p>
              </div>
            </div>
            <div className="mt-[30px]">
              <p className="text-[#000] text-[12px] font-[600] ">Stops From {busCity}</p>
              <div className="flex justify-between">
                <div className="mt-[10px] flex gap-[5px] text-[12px] font-[400] text-[#333] cursor-pointer">
                  <input type="checkbox" />
                  <label>Non Stop</label>
                </div>
                <p style={{ marginTop: "10px" }}></p>
              </div>
              <div className="flex justify-between">
                <div className="mt-[10px] flex gap-[5px] text-[12px] font-[400] text-[#333] cursor-pointer">
                  <input type="checkbox" />
                  <label>1 Stop</label>
                </div>
                <p style={{ marginTop: "10px" }}></p>
              </div>
              <div className="flex justify-between">
                <div className="mt-[10px] flex gap-[5px] text-[12px] font-[400] text-[#333] cursor-pointer">
                  <input type="checkbox" />
                  <label>2 Stop</label>
                </div>
                <p style={{ marginTop: "10px" }}></p>
              </div>
            </div>
            
            <div className="mt-[30px]">
              <p className="text-[#000] text-[12px] font-[600] ">Departure From {busToCity}</p>
              <div className="w-[100%]">
                <div className="w-[100%] bg-[#fff] mt-[5px] rounded-[5px] flex flex-col gap-[10px]">
                <div className="w-[100%] cursor-pointer flex flex-col mt-[10px]">
                  <label className="flex text-[12px] text-[#737373] items-center gap-[5px]">
                    <input
                      type="checkbox"
                      value="12"
                      checked={selectedOption === "12"}
                      onChange={() => handleCheckboxRatingChange("12")}
                    />{" "}
                    <span className="flex gap-[10px] items-center">Early Morning <span>12am - 6am</span></span>
                  </label>
                  </div>
                  <div className="w-[100%] cursor-pointer flex flex-col">
                  <label className="flex text-[12px] text-[#737373] items-center gap-[5px]">
                    <input
                      type="checkbox"
                      value="6"
                      checked={selectedOption === "6"}
                      onChange={() => handleCheckboxRatingChange("6")}
                    />{" "}
                    <span className="flex gap-[10px] items-center">Morning <span>6am - 12pm</span></span>
                  </label>
                  </div>
                  <div className="w-[100%] cursor-pointer flex flex-col">
                  <label className="flex text-[12px] text-[#737373] items-center gap-[5px]">
                    <input
                      type="checkbox"
                      value="18"
                      checked={selectedOption === "18"}
                      onChange={() => handleCheckboxRatingChange("18")}
                    />{" "}
                    <span className="flex gap-[10px] items-center">Afternoon <span>12pm - 6pm</span></span>
                  </label>
                  </div>
                  <div className="w-[100%] cursor-pointer flex flex-col">
                  <label className="flex text-[12px] text-[#737373] items-center gap-[5px]">
                    <input
                      type="checkbox"
                      value="24"
                      checked={selectedOption === "24"}
                      onChange={() => handleCheckboxRatingChange("24")}
                    />{" "}
                    <span className="flex gap-[10px] items-center">Night <span>6pm - 12am</span></span>
                    
                  </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
            </div>
            <div className="w-[79%] h-[100%]">
                <BusList searchResultsBus={searchResultsBus}/>
            </div>
        </div>

      </div>
        </div>
    )
}
export default BusDetail;