import React from 'react';
import { Divider } from '@mui/material';
import Classes from './Hotels.module.css';

const HotelResult=({searchHotelResults})=>(
    <div className={Classes.boxSearchdataHotel}>
             {searchHotelResults &&
          searchHotelResults.map((hotelApidata)=>(
            
             <div className={Classes.hotelDataBox} key={hotelApidata._id}>
               <div className={Classes.hotelImage}>
                 <img className={Classes.imageHotel} src={hotelApidata.images[1]}/>
               </div>
               <div className={Classes.hotelDetailSection}>
               <div className={Classes.hotelDetails}>
                <div className={Classes.nameRating}>
                <div className={Classes.dataHotel}>
                  <p>{hotelApidata.name}</p>
                </div>
                <div className={Classes.hotelDetailHeader}>
                  <p>Rating</p>
                  <div className={Classes.ratingHotel}>
                    {/* <StarRating rating={hotelApidata.rating}/> */}
                    <p className={Classes.pHotelRating}>{hotelApidata.rating}</p>
                  </div>
                </div>
                </div>
                <div className={Classes.hotelLocation}>
                  <img src="https://www.easemytrip.com/hotels/images/placeholderloc.svg"/>
                  <p>{hotelApidata.location}</p>
                </div>
                <div className={Classes.hotelAmenities}>
                  <div >
                  {hotelApidata.amenities.map((amenity, index) => (
            <span className={Classes.amenityBox} key={index}>{amenity}</span>
          ))}
                  </div>
                </div>
               </div>
               <Divider orientation="vertical" flexItem />
               <div className={Classes.hotelBooking}>
                <div className={Classes.priceTaxSection}>
                  <div className={Classes.priceHotelSection}>
                    <img src="https://hotels.easemytrip.com/newhotel/Content/img/rupee_new_black.svg"/>
                    <h3>{hotelApidata.rooms[0].price}</h3>

                  </div>
                  <div className={Classes.taxesHotelSection}>
                    <p>+ </p>
                    <img className={Classes.resIconHotel} src="https://hotels.easemytrip.com/newhotel/Content/img/rupee_new_black.svg"/>
                    <p className={Classes.taxParaHotel}> {hotelApidata.rooms[0].costDetails.taxesAndFees} Taxes & fees</p>
                  </div>
                  <p className={Classes.perNightHotel}>Per Night</p>
                </div>
                <div className={Classes.buttonsSectionHotel}>
                  <div className={Classes.buttonViewRoom}>
                    <button className={Classes.viewHotel}>View Room</button>
                  </div>
                  <div className={Classes.buttonLoginHotel}>
                      Login & Save More > 
                      </div>
                </div>
               </div>
               </div>
              
             </div>
              ))
            }
            </div>
);
export default HotelResult;