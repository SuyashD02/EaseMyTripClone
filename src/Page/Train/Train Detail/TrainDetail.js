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
      <div className="w-[100%] h-[100%] bg-[#e8f2fa] border border-black border-500 border-solid flex justify-center">
        <div className="w-[80%] h-[100%] border border-blue-500 border-solid flex flex-row gap-[20px]">
            <div className="w-[20%] border border-orange-500 border-solid flex flex-col"></div>
            <div className="w-[79%] h-[100%]">
                <TrainData searchResultsTrain={searchResultsTrain}/>
            </div>
        </div>

      </div>
        </div>
    )
}
export default TrainDetail;