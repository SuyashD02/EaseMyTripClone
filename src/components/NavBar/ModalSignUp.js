import React,{useState} from "react";
import Classes from "./Navbar.module.css";
import { useAuth } from "../Context";
import Modal from "@mui/material/Modal";
function ModalSignUp(){
    const {openSignUp, setOpenSignUp } = useAuth();
    const handleCloseSignUp = () => setOpenSignUp(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLasttName] = useState("");
    const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
    function mailInput(e) {
        const mailSet = e.target.value;
        setMail(mailSet);
      }
    
      function passwordInput(e) {
        const passwordSet = e.target.value;
        setPassword(passwordSet);
      }
    
      function firstNameInput(e) {
        const firstNameSet = e.target.value;
        setFirstName(firstNameSet);
      }
      function lastNameInput(e) {
        const lastNameSet = e.target.value;
        setLasttName(lastNameSet);
      }
    return(
        <div>
            <Modal
        open={openSignUp}
       
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={Classes.modalSignUpSection}>
        <div className="w-[95%] flex flex-col gap-[10px]">
        <div className="text-[22px] text-[#000] font-bold bg-[#fff] mt-[15px]">
              <p>SignUp or Create an account</p>
            </div>
            <div className={Classes.closeBtnSignUp} onClick={handleCloseSignUp}></div>
            <div className="w-[100%] flex gap-[2%] mt-[10px]">
            <input
                type="text"
                className="w-[49%] p-[10px] rounded-[5px] border-[0.5px] border-solid border-gray-200 focus:outline-none"
                value={firstName}
                onChange={firstNameInput}
                placeholder="First name"
              />
              <input
                type="text"
                className="w-[49%] p-[10px] rounded-[5px] border-[0.5px] border-solid border-gray-200 focus:outline-none"
                value={lastName}
                onChange={lastNameInput}
                placeholder="Last name"
              />
            </div>
            <div className="flex flex-col  gap-[10px]">
            <input
                type="email"
                className="w-[100%] p-[10px] rounded-[5px] border-[0.5px] border-solid border-gray-200 focus:outline-none"
                value={mail}
                onChange={mailInput}
                placeholder="Email address"
              />
              
              <input
                type="password"
                className="w-[100%] p-[10px] rounded-[5px] border-[0.5px] border-solid border-gray-200 focus:outline-none"
                value={password}
                onChange={passwordInput}
                placeholder="New password"
              />
            </div>
            <div className="w-[100%] flex items-center justify-center mt-[10px]">
              <div className="text-[18px] text-[#fff] w-[100%] h-[43px] font-[600] rounded-[40px] bg-[#EF6614] cursor-pointer flex items-center justify-center">Continue</div>
            </div>
            <div className="w-[100%] flex justify-center items-center mt-[10px] mb-[15px]">
              <p className="w-[100%] text-[11px] text-[#8A8686] flex items-center">By logging in, I understand & agree to EaseMyTrip terms of use  and privacy policy</p>
            </div>
        </div>
        </div>
      </Modal>

        </div>
    )
}
export default ModalSignUp;