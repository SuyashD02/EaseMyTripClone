import { useState } from "react";
import React from "react";
import Classes from "./Navbar.module.css";
import Avatar from '@mui/material/Avatar';
import { Box, Divider, Modal } from "@mui/material";
import { Link,NavLink } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import { Height } from "@mui/icons-material";

function Navbar() {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isDropdownhelpOpen, setDropdownhelpOpen] = useState(false);
    const openDropdown = () => {
      setDropdownOpen(true);
    };
  
    const closeDropdown = () => {
      setDropdownOpen(false);
    };
    const openDropdownhelp = () => {
        setDropdownhelpOpen(true);
      };
    
      const closeDropdownhelp = () => {
        setDropdownhelpOpen(false);
      };
  return (
    <div className={Classes.navbarEase}>
      <div className={Classes.navClickSection}>
        <div className={Classes.navContent}>
          <div className={Classes.navLogoSection}>
            <NavLink to="/">
            <img
              className={Classes.logoEase}
              src="https://www.easemytrip.com/images/brandlogo/emtlogo_new6.svg"
              alt="logo Image"
            />
            </NavLink>
          </div>
          <div className={Classes.navRouteContent}>
            <div className={Classes.clickSection}>
              <Link className={Classes.linkSection} to={"/flights"}>
              <h3 className={Classes.clickFLIGHTSH3}>FLIGHTS</h3>
              </Link>
              <Divider orientation="vertical"  style={{"height":"40%"}} />
              <Link className={Classes.linkSection} to={"/"}>
              <h3 className={Classes.clickHOTELSH3}>HOTELS</h3>
              </Link>
              <Divider orientation="vertical" style={{"height":"40%"}} />
              <Link className={Classes.linkSection} to={"/train"}>
              <h3 className={Classes.clickTRAINSH3}>TRAINS</h3>
              </Link>
              <Divider orientation="vertical" style={{"height":"40%"}} />
              <Link className={Classes.linkSection} to={"/bus"}>
              <h3 className={Classes.clickBUSH3}>BUS</h3>
              </Link>
            </div>
          </div>
          <div className={Classes.navJoinSection}>
            <img
              className={Classes.joinIcon}
              src="https://www.easemytrip.com/emt-pro/img/emtpro-header-icon.svg"
              alt="Join Icon"
            />
          </div>
        </div>
      </div>
      <div className={Classes.navUser}>
        <div className={Classes.myAcount}
        onMouseEnter={openDropdown}
        onMouseLeave={closeDropdown}
        >
            
          <div className={Classes.userIconNav}>
            <img
              className={Classes.iconMan}
              src="https://www.easemytrip.com/images/common/home-sub-sprite.png"
              alt="profile"
            />
          </div>
          <div className={Classes.navAcount}>
          <p>My Account</p>
                {isDropdownOpen && (
                  <div className={Classes.dropdownContent}
                  onMouseEnter={openDropdown}
                    onMouseLeave={closeDropdown}
                    >
                    <div className={Classes.accountBox}>
                      <div className={Classes.avatar}>
                      <Avatar/>
                        </div>  
                    <div className={Classes.loginBtnSection}>
                    <button className={Classes.btnLogin}>LOGIN OR SIGNUP</button>
                    </div>
                    
                    <Divider className={Classes.dividerLogin}/>
                    <div className={Classes.dropMyBookings}>
                      <ListItemButton>
                      <p className={Classes.bookingP}>My Booking</p>
                      </ListItemButton>
                    <ListItemButton>
                    <p className={Classes.bookingP}>Log Out</p>
                    </ListItemButton>
                    
                    </div>
                    </div> 
                  </div>
                )}
          </div>
        </div>
      </div>
      
    </div>
  );
}
export default Navbar;