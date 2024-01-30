import React,{useState,useEffect} from "react";
import Navbar from "../../../components/NavBar/Navbar";
import Classes from "./TrainDetail.module.css";
import { useAuth } from "../../../components/Context";
import DatePicker from "react-datepicker";
import moment from "moment";
import TrainFromDetail from "../DropDown/TrainFromDetail";
import TrainToDetail from "../DropDown/TrainToDetail";
import TrainData from "./TrainData";

function TrainDetail(){
    const {traindepartureDate, setTrainDepartureDate,trainCity,trainToCity} = useAuth();
    const [trainFromOpen, setTrainFromOpen] = useState(false);
    const [trainToOpen, setTrainToOpen] = useState(false);
    const [searchResultsTrain, setSearchResultsTrain] = useState([]);
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
          className={Classes.inputTrain}
          value={moment(value).format("DD MMM YYYY")}
          onClick={onClick}
          readOnly
        />
      );
      const handleTrainCityInput = () => {
        setTrainFromOpen(!trainFromOpen);
      };
    const handleTrainCityToInput = () => {
        setTrainToOpen(!trainToOpen);
      };
    async function trainSearch() {
        try {
          const projectID = "2zqsmiro66wm";
          const dayAbbreviation = moment(traindepartureDate).format("ddd");
          const apiUrl = `https://academics.newtonschool.co/api/v1/bookingportals/train?&day=${dayAbbreviation}&search={"source":"${trainCity}","destination":"${trainToCity}"}`;
          const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
              projectID: projectID,
            },
          });
          if (response.ok) {
            console.log("Flight Function called");
            const data = await response.json();
            console.log(data);
            setSearchResultsTrain(data.data.trains);
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
        trainSearch();
      }, []);
    return(
        <div>
            <Navbar/>
            <div className={Classes.TrainSearchSection}>
        <div className={Classes.searchBarTrainDiv} >
            <div className="w-[3%] h-[100%] flex items-center">
                <img className="w-[100%]" src="https://www.easemytrip.com/images/train-img/train-icon.svg"/>
            </div>
          <div className={Classes.mainDivTrainRecordSearch}>
            <div
              onClick={handleTrainCityInput}
              className={Classes.searchFromTrainRecord}
            >
              <div className="h-[100%] flex items-center">
              <span className="text-[16px] text-[#000] cursor-pointer flex items-center">
                  {trainCity}
                </span>
              </div>
            </div>
          </div>
          {trainFromOpen && <TrainFromDetail onClose={handleTrainCityInput} />}

          <div className="h-[100%] w-[3%] flex flex-col justify-center items-center">
            <img
              className="h-[90%]"
              src="https://railways.easemytrip.com/Content/Train/img/list-arrow-lr.png"
            />
          </div>
          <div className={Classes.mainDivTrainRecordSearch}>
            <div
              onClick={handleTrainCityToInput}
              className={Classes.searchToTrainRecord}
            >
              <div className="h-[100%] flex items-center">
              <span className="text-[16px] text-[#000] cursor-pointer flex items-center">
                  {trainToCity}
                </span>
              </div>
            </div>
          </div>
          {trainToOpen && <TrainToDetail onClose={handleTrainCityToInput}  />}

          <div className="flex justify-center rounded-[5px] items-center h-[100%] w-[21%] bg-[#fff]">
            <div className="w-[95%] h-[90%] flex items-center">
              <DatePicker
                selected={traindepartureDate}
                onChange={(date) => setTrainDepartureDate(date)}
                customInput={<CustomInput />}
              />
              <div className="w-[20%] h-[100%] flex items-center">
                <img className="opacity-[.3]" src="https://railways.easemytrip.com/Content/Train/img/calender-icon.png"/>
              </div>
            </div>
          </div>
          <div className="w-[16%] h-[100%] flex justify-center items-center">
            <div
              className={Classes.searchButtonTrainRecords}
              onClick={trainSearch}
            >
              <h3>Modify Search</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[100%] h-[100%] bg-[#e8f2fa] flex justify-center">
        <div className="w-[80%] h-[100%] flex flex-row gap-[20px]">
            <div className="w-[20%] flex flex-col">
              <div className={Classes.trainDataPage}>
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
                min="2000"
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
                <p className="text-[#000] text-[12px]">Min: 2000</p> <p className="text-[#000] text-[12px]">&#8377; {sliderValue}</p> <p className="text-[#000] text-[12px]">Max: 25000</p>
              </div>
            </div>
            <div className="mt-[30px]">
              <p className="text-[#000] text-[12px] font-[600] ">Stops From {trainCity}</p>
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
              <p className="text-[#000] text-[12px] font-[600] ">Journey Coach filter</p>
              <div className="flex justify-between">
                <div className="mt-[10px] flex gap-[5px] text-[12px] font-[400] text-[#333] cursor-pointer">
                  <input type="checkbox" />
                  <label>1st Class AC</label>
                </div>
                <p style={{ marginTop: "10px" }}></p>
              </div>
              <div className="flex justify-between">
                <div className="mt-[10px] flex gap-[5px] text-[12px] font-[400] text-[#333] cursor-pointer">
                  <input type="checkbox" />
                  <label>2nd Tier AC</label>
                </div>
                <p style={{ marginTop: "10px" }}></p>
              </div>
              <div className="flex justify-between">
                <div className="mt-[10px] flex gap-[5px] text-[12px] font-[400] text-[#333] cursor-pointer">
                  <input type="checkbox" />
                  <label>3rd Tier AC</label>
                </div>
                <p style={{ marginTop: "10px" }}></p>
              </div>
              <div className="flex justify-between">
                <div className="mt-[10px] flex gap-[5px] text-[12px] font-[400] text-[#333] cursor-pointer">
                  <input type="checkbox" />
                  <label>Sleeper</label>
                </div>
                <p style={{ marginTop: "10px" }}></p>
              </div>
            </div>
            <div className="mt-[30px]">
              <p className="text-[#000] text-[12px] font-[600] ">Departure From {trainToCity}</p>
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
                <TrainData searchResultsTrain={searchResultsTrain}/>
            </div>
        </div>

      </div>
        </div>
    )
}
export default TrainDetail;