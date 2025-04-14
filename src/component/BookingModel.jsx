
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext';
import Swal from 'sweetalert2'
const IconClose = () => <span className="icon icon-close">✖</span>;

const doctors = [ "Dr. Smith", "Dr. Johnson", "Dr. Lee", "Dr. Brown", "Dr. Garcia" ];

const BookingModel = ({selectedDate,setSelectedDate ,setIsEdite , isEdite }) => {
  const [appointmentDetails, setappointmentDetails] = useState({name: '',
    date: selectedDate,
     category: '', doctor: '', startTime: '', endTime: '' , id:Math.random()*100*100});
  const {setShowMorePopup  ,setBookingAppointment} = useContext(AppContext); 
     

  useEffect(() => {
if(isEdite) {
setappointmentDetails(isEdite)
}
  },[isEdite])


     const handelChange = (key,value) => {
      if(value === "Select category" || value === "Select doctor") {
        setappointmentDetails((prevDetails) => ({
          ...prevDetails,
          [key]: "",
        }));
      }
      else{
        setappointmentDetails((prevDetails) => ({
        ...prevDetails,
        [key]: value,
      }));
     }}

    

     const handelSubmit = () => {
      if(!appointmentDetails.name || !appointmentDetails.category || !appointmentDetails.doctor || !appointmentDetails.startTime || !appointmentDetails.endTime) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please fill all the fields",
        });
        return;
      }
      else if(appointmentDetails.startTime > appointmentDetails.endTime) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "please select valid time",
          
        });
        return;
      }
      else if(appointmentDetails.startTime === appointmentDetails.endTime) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "please select valid time",
         
        }); 
      }
      else {
        if(isEdite) {
          setBookingAppointment(prev => {
            const updatedAppointments = prev.map((item) => {
              if(item.id === appointmentDetails.id) {
                return appointmentDetails;
              }
              return item;
            });
            return updatedAppointments;
          })
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Appointment update successfully",
            
          });
          setSelectedDate(null);
          setIsEdite(false);
          setShowMorePopup(false)
         }
          else{
            setBookingAppointment(prev => [...prev, appointmentDetails]);
        
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Appointment booked successfully",
              
            });
            setSelectedDate(null);
          }
        
      }
     }

    

  return (
    <div className="modal-overlay">
    <div className="modals ">
      <div className="modal-header">
        {isEdite ? <h3>EDIT APPOINTMENT</h3> :<h3>MAKE NEW APPOINTMENT</h3>
        }
        <button className="close-btn" onClick={() =>{
          setSelectedDate(null);
          setIsEdite &&  setIsEdite(false);} 
        }>
          <IconClose />
        </button>
      </div>
      
      <div className="form-group">
        <label>NAME</label>
        <input
          value={appointmentDetails.name}
          type="text"
          className="form-input"
          onChange={(e) => handelChange("name" ,e.target.value)}
        />
      </div>
      
      <div className="form-group">
        <label>CATEGORIES</label>
        <div className="select-wrapper">
          <select value={appointmentDetails.category} className="form-select" onChange={(e) => handelChange("category" ,e.target.value)}>
            <option value={""}>Select category</option>
            <option value={"Emergency"}>Emergency</option>
            <option value={"Examination"}>Examination</option>
            <option value={"Consultation"}>Consultation</option>
            <option value={"Routine_Checkup"}>Routine_Checkup</option>
            <option value={"Sick_Visit"}>Sick_Visit</option>
          </select>
        </div>
      </div>
      
      <div className="form-group">
        <label>DOCTORS</label>
        <div className="select-wrapper">
          <select value={appointmentDetails.doctor} className="form-select" onChange={(e) => handelChange("doctor" ,e.target.value)}>
            <option>Select doctor</option>
            {doctors.map((doctor, index) => (
              <option key={index} value={doctor}>
                {doctor}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="time-inputs d-flex justify-content-around align-items-center">
        <div className="form-group half">
          <label>START TIME</label>
         <input defaultValue={appointmentDetails.startTime} type="time"  onChange={(e) => handelChange("startTime" ,e.target.value)}/>

        </div>
        
        <div className="form-group half">
          <label>END TIME</label>
          <input defaultValue={appointmentDetails.endTime} type="time"  onChange={(e) => handelChange("endTime" ,e.target.value)} />

        </div>
      </div>
      
      <div className='d-flex'>
        {isEdite ? <button 
        className="submit-btn border-0 mx-auto p-2 bg-info text-white rounded-3 shadow"
        onClick={() => handelSubmit()}
      >
        UPDATE APPOINTMENT
      </button> :
        <button 
        className="submit-btn border-0 mx-auto p-2 bg-info text-white rounded-3 shadow"
        onClick={() => handelSubmit()}
      >
        MAKE NEW APPOINTMENT
      </button>} </div>
     
    </div>
  </div>
  )
}

export default BookingModel