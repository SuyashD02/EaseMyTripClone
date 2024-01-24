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
      <div className="w-[100%] h-[100%] bg-[#e8f2fa] border border-black border-500 border-solid flex justify-center">
        <div className="w-[80%] h-[100%] border border-blue-500 border-solid flex flex-row gap-[20px]">
            <div className="w-[20%] border border-orange-500 border-solid flex flex-col"></div>
            <div className="w-[79%] h-[100%]">
                <BusList searchResultsBus={searchResultsBus}/>
            </div>
        </div>

      </div>
        </div>
    )
}
export default BusDetail;