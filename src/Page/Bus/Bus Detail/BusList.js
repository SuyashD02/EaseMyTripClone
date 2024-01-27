import React, { useState } from "react";
import Classes from "../Bus.module.css";
import { useAuth } from "../../../components/Context";
import moment from "moment";
import Modal from "@mui/material/Modal";
function BusList({ searchResultsBus }) {
  const [busDetailOpen, setBusDetailOpen] = useState(false);
  const {
    busdepartureDate,
    busCity,
    busToCity,
    selectedSeats,
    setSelectedSeats,
  } = useAuth();
  const [open, setOpen] = useState(false);

  const handleOpen = (id) => {
    setOpen((prevState) => ({
      ...prevState,
      [id]: !prevState[id] || false,
    }));
  };
  const handleClose = () => setOpen(false);
  const handleBusDetailOpen = (id) => {
    setBusDetailOpen((prevOpen) => ({
      ...prevOpen,
      [id]: !prevOpen[id] || false,
    }));
  };
  const handleSelectSeat = (seatName) => {
    if (selectedSeats.includes(seatName)) {
      setSelectedSeats(selectedSeats.filter((name) => name !== seatName));
    } else {
      setSelectedSeats([...selectedSeats, seatName]);
    }
  };
  const handleRemoveSelectSeat = (seatRemove) => {
    if (selectedSeats.includes(seatRemove)) {
      setSelectedSeats(selectedSeats.filter((name) => name !== seatRemove));
    }
  };

  const departureDay = moment(busdepartureDate).format("ddd");
  const departureDate = moment(busdepartureDate).format("DD MMM YYYY");
  return (
    <div className="border border-black border-500 border-solid h-[100%] w-[100%]">
      {searchResultsBus.length > 0 ? (
        searchResultsBus.map((BusApidata, index) => (
          <div className={Classes.BusDataBox} key={index}>
            <div className="w-[100%] h-[100%] flex flex-col justify-center items-center">
              <div className="w-[98%] h-[93%] flex flex-row gap-[15px]  mt-[5px]">
                <div className="h-[100%] w-[30%] flex flex-col">
                  <div className="w-[100%]">
                    <span className="text-[16px] text-[#000] font-[600]">
                      {BusApidata?.name}
                    </span>
                  </div>
                  <span className="text-[12px] text-[#737373] w-[100%]">
                    {BusApidata?.type}
                  </span>
                  <div className="mt-[5px]">
                    <img src="https://bus.easemytrip.com/images/recmmed-icn.svg" />
                  </div>
                </div>
                <div className="h-[100%] w-[35%] flex justify-evenly">
                  <div className="w-[28%] flex flex-col ">
                    <div className="text-[18px] text-[#333] font-[600] ">
                      {BusApidata?.departureTime}
                    </div>
                    <div className="text-[13px]  text-[#737373] font-[500]">
                      <span>{busCity}</span>
                    </div>
                  </div>
                  <div className="w-[9%] flex  justify-center">
                    <div className="w-[100%] h-[40%] flex items-center justify-center">
                      <img
                        className="w-[15px] h-[15px]"
                        src="https://bus.easemytrip.com/new_img/right-arrow.svg"
                      />
                    </div>
                  </div>
                  <div className="w-[28%] flex flex-col">
                    <div className="text-[18px] text-[#333] font-[600] ">
                      {BusApidata?.arrivalTime}
                    </div>
                    <div className="text-[13px]  text-[#737373] font-[500]">
                      <span>{busToCity}</span>
                    </div>
                  </div>
                </div>
                <div className="w-[15%] h-[100%] flex flex-col">
                  <div className="w-[100%] text-[11px] text-[#737373] flex justify-end mt-[5px]">
                    <p>Starting from</p>
                  </div>
                  <div className=" w-[100%] text-[20px] text-[#d63b05] font-[600] flex justify-end gap-[5px] mt-[2px]">
                    <i>₹</i>
                    <span> {BusApidata?.fare}</span>
                  </div>
                </div>

                <div className=" h-[100%] w-[15%] flex flex-col items-center">
                  <p
                    className="bg-[#ef6614] rounded-[40px] text-[14px] text-[#fff] w-[100%] h-[34px] mt-[7px] flex justify-center items-center cursor-pointer"
                    onClick={() => handleOpen(BusApidata._id)}
                  >
                    Select Seats
                  </p>
                  <p className="text-[11px] text-[#737373] w-[100%] mt-[5px] flex justify-center items-center">
                    {BusApidata?.seats} Seat left{" "}
                  </p>
                </div>
                {open[BusApidata._id] && (
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <div className={Classes.modalSeatSection}>
                      <div className="w-[98%] h-[98%] flex justify-between border border-red-500 border-solid ">
                        <div className=" border border-orange-500 border-solid w-[70%] flex flex-col items-center">
                          <div className="w-[98%] flex">
                            <div className="flex items-center ">
                              <div className="text-[18px] text-[#000] font-[600] flex items-center ">
                                {busCity}
                              </div>
                            </div>
                            <div className="w-[8%] flex  justify-center items-center">
                              <div className="w-[100%] h-[40%] flex items-center justify-center">
                                <img
                                  className="w-[20px] h-[15px]"
                                  src="https://bus.easemytrip.com/new_img/right-arrow.svg"
                                />
                              </div>
                            </div>
                            <div className="flex items-center">
                              <div className="text-[18px] text-[#000] font-[600] flex items-center ">
                                {busToCity}
                              </div>
                            </div>
                          </div>
                          <div className=" w-[98%] flex justify-between ">
                            <div className="text-[12px] text-[#737373]">
                              <span>{BusApidata?.name}</span>,{" "}
                              <span>{BusApidata?.type}</span>
                            </div>
                            <div className="text-[12px] text-[#737373]">
                              <span>{departureDay}</span>,{" "}
                              <span>{departureDate}</span>
                            </div>
                          </div>
                          <div className="border-b-[#cfcdcd] border-dashed border w-[98%] mt-[10px]"></div>
                          <div className="w-[98%] flex mt-[10px] ">
                            <div className=" w-[20%] text-[11px] flex gap-[5px] items-center">
                              <div className="w-[18px] h-[20px] overflow-hidden">
                                <img
                                  className="mt-[-19px] ml-[-20px]"
                                  src="https://bus.easemytrip.com/new_img/bus-seat-sprite.png"
                                />
                              </div>
                              <p>Booked</p>
                            </div>
                            <div className=" w-[20%] text-[11px] flex gap-[5px] items-center">
                              <div className="w-[18px] h-[20px] overflow-hidden ">
                                <img
                                  className="mt-[-19px] ml-[-46px]"
                                  src="https://bus.easemytrip.com/new_img/bus-seat-sprite.png"
                                />
                              </div>
                              <p>Available</p>
                            </div>
                            <div className="w-[20%] text-[11px] flex gap-[5px] items-center">
                              <div className="w-[18px] h-[20px] overflow-hidden ">
                                <img
                                  className="mt-[-19px] ml-[-128px]"
                                  src="https://bus.easemytrip.com/new_img/bus-seat-sprite.png"
                                />
                              </div>
                              <p>Selected </p>
                            </div>
                          </div>
                          <div className="w-[98%] bg-[#eeeeee] mt-[10px] flex items-center gap-[10px]">
                            <p className="text-[13px]">Seat Price</p>
                            <div className="w-[10%] h-[30px] text-[14px] font-[600] rounded-[4px] bg-[#2196f3] text-[#fff] border border-solid border-[#2196f3] flex justify-center items-center">
                              <p>{BusApidata?.fare}</p>
                            </div>
                          </div>
                          <div className="w-[98%]">
                            <div className="bg-[#fff8c8] text-[#857400] text-[12px] font-[400] rounded-[3px] border border-solid border-[#f3e796] w-[50%] flex items-center justify-center mt-[10px]">
                              <p>
                                Select your desired seat to continue with your
                                transaction.{" "}
                              </p>
                            </div>
                          </div>
                          {/*  */}

                          <div className="w-[100%] bg-[#f5f5f5] border border-solid border-[#d3e4f5] flex items-center mt-[10px]">
                            <div className="w-[8%] h-[100%] flex items-center">
                              <img
                                className="flex items-center"
                                src="https://bus.easemytrip.com/new_img/upper-ico.png"
                              />
                            </div>
                            <div className="w-[79%] flex flex-col gap-[2px]">
                              <div className="w-[100%] flex justify-end gap-[8px] mt-[10px]">
                                <div
                                  className={Classes.selectSeatBus}
                                  onClick={() => handleSelectSeat("U 3")}
                                >
                                  U 3
                                </div>
                                <div
                                  className={Classes.selectSeatBus}
                                  onClick={() => handleSelectSeat("U 4")}
                                >
                                  U 4
                                </div>
                                <div
                                  className={Classes.selectSeatBus}
                                  onClick={() => handleSelectSeat("U 9")}
                                >
                                  U 9
                                </div>
                                <div
                                  className={Classes.selectSeatBus}
                                  onClick={() => handleSelectSeat("U 10")}
                                >
                                  U 10
                                </div>
                                <div
                                  className={Classes.selectSeatBus}
                                  onClick={() => handleSelectSeat("U 15")}
                                >
                                  U 15
                                </div>
                                <div
                                  className={Classes.selectSeatBus}
                                  onClick={() => handleSelectSeat("U 16")}
                                >
                                  U 16
                                </div>
                              </div>
                              <div className="w-[100%] flex justify-end gap-[8px]">
                                <div
                                  className={Classes.selectSeatBus}
                                  onClick={() => handleSelectSeat("U 2")}
                                >
                                  U 2
                                </div>
                                <div
                                  className={Classes.selectSeatBus}
                                  onClick={() => handleSelectSeat("U 5")}
                                >
                                  U 5
                                </div>
                                <div
                                  className={Classes.selectSeatBus}
                                  onClick={() => handleSelectSeat("U 8")}
                                >
                                  U 8
                                </div>
                                <div
                                  className={Classes.selectSeatBus}
                                  onClick={() => handleSelectSeat("U 11")}
                                >
                                  U 11
                                </div>
                                <div
                                  className={Classes.selectSeatBus}
                                  onClick={() => handleSelectSeat("U 14")}
                                >
                                  U 14
                                </div>
                                <div
                                  className={Classes.selectSeatBus}
                                  onClick={() => handleSelectSeat("U 17")}
                                >
                                  U 17
                                </div>
                              </div>
                              <div className="w-[100%] flex justify-end gap-[8px] mt-[20px] mb-[50px]">
                                <div
                                  className={Classes.selectSeatBus}
                                  onClick={() => handleSelectSeat("U 1")}
                                >
                                  U 1
                                </div>
                                <div
                                  className={Classes.selectSeatBus}
                                  onClick={() => handleSelectSeat("U 6")}
                                >
                                  U 6
                                </div>
                                <div
                                  className={Classes.selectSeatBus}
                                  onClick={() => handleSelectSeat("U 7")}
                                >
                                  U 7
                                </div>
                                <div
                                  className={Classes.selectSeatBus}
                                  onClick={() => handleSelectSeat("U 12")}
                                >
                                  U 12
                                </div>
                                <div
                                  className={Classes.selectSeatBus}
                                  onClick={() => handleSelectSeat("U 13")}
                                >
                                  U 13
                                </div>
                                <div
                                  className={Classes.selectSeatBus}
                                  onClick={() => handleSelectSeat("U 18")}
                                >
                                  U 18
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="w-[100%] bg-[#f5f5f5] border border-solid border-[#d3e4f5] flex items-center mt-[10px]">
                            <div className="w-[8%] h-[77px]">
                              <img src="https://bus.easemytrip.com/new_img/lower-ico.png" />
                            </div>
                            <div className="w-[79%] flex flex-col gap-[2px]">
                              <div className="w-[100%] flex justify-end gap-[8px] mt-[10px]">
                                <div
                                  className={Classes.selectSeatBusCh}
                                  onClick={() => handleSelectSeat("1")}
                                >
                                  1
                                </div>
                                <div
                                  className={Classes.selectSeatBusCh}
                                  onClick={() => handleSelectSeat("3")}
                                >
                                  3
                                </div>
                                <div
                                  className={Classes.selectSeatBusCh}
                                  onClick={() => handleSelectSeat("5")}
                                >
                                  5
                                </div>
                                <div
                                  className={Classes.selectSeatBusCh}
                                  onClick={() => handleSelectSeat("7")}
                                >
                                  7
                                </div>
                                <div
                                  className={Classes.selectSeatBusCh}
                                  onClick={() => handleSelectSeat("9")}
                                >
                                  9
                                </div>
                                <div
                                  className={Classes.selectSeatBusCh}
                                  onClick={() => handleSelectSeat("11")}
                                >
                                  11
                                </div>
                                <div
                                  className={Classes.selectSeatBusCh}
                                  onClick={() => handleSelectSeat("13")}
                                >
                                  13
                                </div>
                                <div
                                  className={Classes.selectSeatBusCh}
                                  onClick={() => handleSelectSeat("15")}
                                >
                                  15
                                </div>
                                <div
                                  className={Classes.selectSeatBusCh}
                                  onClick={() => handleSelectSeat("17")}
                                >
                                  17
                                </div>
                                <div
                                  className={Classes.selectSeatBusCh}
                                  onClick={() => handleSelectSeat("19")}
                                >
                                  19
                                </div>
                                <div
                                  className={Classes.selectSeatBusCh}
                                  onClick={() => handleSelectSeat("21")}
                                >
                                  21
                                </div>
                              </div>
                              <div className="w-[100%] flex justify-end gap-[8px]">
                                <div
                                  className={Classes.selectSeatBusCh}
                                  onClick={() => handleSelectSeat("2")}
                                >
                                  2
                                </div>
                                <div
                                  className={Classes.selectSeatBusCh}
                                  onClick={() => handleSelectSeat("4")}
                                >
                                  4
                                </div>
                                <div
                                  className={Classes.selectSeatBusCh}
                                  onClick={() => handleSelectSeat("6")}
                                >
                                  6
                                </div>
                                <div
                                  className={Classes.selectSeatBusCh}
                                  onClick={() => handleSelectSeat("8")}
                                >
                                  8
                                </div>
                                <div
                                  className={Classes.selectSeatBusCh}
                                  onClick={() => handleSelectSeat("10")}
                                >
                                  10
                                </div>
                                <div
                                  className={Classes.selectSeatBusCh}
                                  onClick={() => handleSelectSeat("12")}
                                >
                                  12
                                </div>
                                <div
                                  className={Classes.selectSeatBusCh}
                                  onClick={() => handleSelectSeat("14")}
                                >
                                  14
                                </div>
                                <div
                                  className={Classes.selectSeatBusCh}
                                  onClick={() => handleSelectSeat("16")}
                                >
                                  16
                                </div>
                                <div
                                  className={Classes.selectSeatBusCh}
                                  onClick={() => handleSelectSeat("18")}
                                >
                                  18
                                </div>
                                <div
                                  className={Classes.selectSeatBusCh}
                                  onClick={() => handleSelectSeat("20")}
                                >
                                  20
                                </div>
                                <div
                                  className={Classes.selectSeatBusCh}
                                  onClick={() => handleSelectSeat("22")}
                                >
                                  22
                                </div>
                              </div>
                              <div className="w-[100%] flex justify-end gap-[8px] mt-[20px] mb-[50px]">
                                <div
                                  className={Classes.selectSeatBus}
                                  onClick={() => handleSelectSeat("L 1")}
                                >
                                  L 1
                                </div>
                                <div
                                  className={Classes.selectSeatBus}
                                  onClick={() => handleSelectSeat("L 2")}
                                >
                                  L 2
                                </div>
                                <div
                                  className={Classes.selectSeatBus}
                                  onClick={() => handleSelectSeat("L 3")}
                                >
                                  L 3
                                </div>
                                <div
                                  className={Classes.selectSeatBus}
                                  onClick={() => handleSelectSeat("L 4")}
                                >
                                  L 4
                                </div>
                                <div
                                  className={Classes.selectSeatBus}
                                  onClick={() => handleSelectSeat("L 5")}
                                >
                                  L 5
                                </div>
                                <div
                                  className={Classes.selectSeatBus}
                                  onClick={() => handleSelectSeat("L 6")}
                                >
                                  L 6
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className=" border border-blue-500 border-solid w-[29.5%]">
                          <div className="w-[100%] bg-[#eee] rounded-[5px] flex flex-col items-center">
                            <div className="w-[95%] text-[15px] text-[#000] mt-[10px]">
                              <p>Boarding Point</p>
                            </div>
                            <div className="w-[95%] text-[14px] text-[#404040] flex gap-[5px] mt-[5px]">
                              <span>{BusApidata?.departureTime}</span> :{" "}
                              <span>{BusApidata?.source}</span>
                            </div>
                            <div className="w-[95%] text-[15px] text-[#000] mt-[15px]">
                              <p>Dropping Point</p>
                            </div>
                            <div className="w-[95%] text-[14px] text-[#404040] flex gap-[5px] mt-[5px]">
                              <span>{BusApidata?.arrivalTime}</span> :{" "}
                              <span>{BusApidata?.destination}</span>
                            </div>
                            <div className="w-[95%] text-[15px] text-[#000] mt-[15px]">
                              <p>Select Seats</p>
                            </div>
                            <div className="w-[95%] text-[15px] text-[#000] mt-[5px] flex flex-wrap gap-[10px]">
                              {selectedSeats?.map((seat, indexseat) => (
                                <p
                                  key={indexseat}
                                  className="w-[22%] h-[4vh] text-[13px] text-[#000] bg-[#fcf8e3] border border-solid border-[#dcd9c9] rounded-[4px] font-[600] flex justify-center items-center"
                                >
                                  {seat}{" "}
                                  <span
                                    className=" absolute text-[17px] text-[#fff] bg-[#3a3a3a] w-[17px] h-[17px] flex items-center justify-center rounded-[50%] cursor-pointer ml-[3.8em] mt-[-1.3em]"
                                    onClick={() => handleRemoveSelectSeat(seat)}
                                  >
                                    ×
                                  </span>
                                </p>
                              ))}
                            </div>
                            <div className="w-[95%] text-[15px] text-[#000] mt-[15px]">
                              <div className="bg-[#fff] w-[100%] border border-solid border-[#dedede] flex flex-col items-center">
                                <div className="text-[12px] text-[#000] flex justify-between w-[97%] mt-[10px]">
                                  <p>Base Fare(+)</p>{" "}
                                  <span>
                                    <i>₹</i> {BusApidata?.fare}
                                  </span>
                                </div>
                                <div className="text-[12px] text-[#000] flex justify-between w-[97%] mt-[10px]">
                                  <p>Selected No. Seats</p>{" "}
                                  <span>{selectedSeats.length} Seats</span>
                                </div>
                                <div className="text-[12px] text-[#000] flex justify-between mt-[15px] w-[97%]">
                                  <p>Total Amount</p>
                                  <p className="text-[20px] text-[#d63b05] font-[600]">
                                    <i>₹</i>{" "}
                                    {BusApidata?.fare * selectedSeats.length}
                                  </p>
                                </div>
                                <div className="text-[12px] text-[#000] flex justify-between w-[97%] mb-[10px]">
                                  <p className="w-[100%] text-[10px] text-[#737373] flex justify-end">
                                    (Including All Taxes)
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="w-[95%] h-[42px] bg-[#ef6614] text-[16px] text-[#fff] mt-[15px] flex justify-center items-center mb-[20px] cursor-pointer">
                              <p className="flex justify-center items-center">
                                Continue
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Modal>
                )}
              </div>
            </div>
            <div className="w-[100%] h-[32px] mt-[10px] flex justify-center items-center bg-[#f9f9f9]">
              <div className="w-[98%] h-[100%] text-[#737373] text-[12px] font-[600] flex items-center">
                <p
                  onClick={() => handleBusDetailOpen(BusApidata._id)}
                  className={Classes.aminity}
                >
                  {"Amenities"}
                </p>
              </div>
            </div>
            {busDetailOpen[BusApidata._id] && (
              <div className="w-[98%] h-[100%] mt-[5px] flex items-center">
                {BusApidata?.amenities?.map((Amini, i) => (
                  <div
                    key={i}
                    className="w-[14%] h-[5vh] flex justify-center items-center"
                  >
                    <div className="text-[13px] w-[98%] text-[#000] flex justify-center items-center">
                      <p>{Amini}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="font-[600] text-[#000] text-[22px] flex justify-center items-center">
          No Trains Available For the Selected Day
        </p>
      )}
    </div>
  );
}
export default BusList;
