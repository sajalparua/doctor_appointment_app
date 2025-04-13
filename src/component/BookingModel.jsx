
import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext';
import Swal from 'sweetalert2'
const IconClose = () => <span className="icon icon-close">✖</span>;
const IconChevronDown = () => <span className="icon icon-chevron-down">▼</span>;
const IconClock = () => <span className="icon icon-clock">🕒</span>;

const doctors = [ "Dr. Smith", "Dr. Johnson", "Dr. Lee", "Dr. Brown", "Dr. Garcia" ];

const BookingModel = ({selectedDate,setSelectedDate }) => {
  const [appointmentDetails, setappointmentDetails] = useState({name: '',
    date: selectedDate,
     category: '', doctor: '', startTime: '', endTime: '' , id:Math.random()*100*100});
  const {setBookingAppointment} = useContext(AppContext); 
     



     const handelChange = (key,value) => {
      setappointmentDetails((prevDetails) => ({
        ...prevDetails,
        [key]: value,
      }));
     }

    

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
        setBookingAppointment(prev => [...prev, appointmentDetails]);
        console.log(appointmentDetails);
        
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Appointment booked successfully",
          
        });
        setSelectedDate(null);
      }
     }
     console.log(appointmentDetails);
     

  return (
    <div className="modal-overlay">
    <div className="modals ">
      <div className="modal-header">
        <h3>MAKE NEW APPOINTMENT</h3>
        <button className="close-btn" onClick={() => setSelectedDate(null)}>
          <IconClose />
        </button>
      </div>
      
      <div className="form-group">
        <label>NAME</label>
        <input
          type="text"
          className="form-input"
          onChange={(e) => handelChange("name" ,e.target.value)}
        />
      </div>
      
      <div className="form-group">
        <label>CATEGORIES</label>
        <div className="select-wrapper">
          <select className="form-select" onChange={(e) => handelChange("category" ,e.target.value)}>
            <option>Select category</option>
            <option>Emergency</option>
            <option>Examination</option>
            <option>Consultation</option>
            <option>Routine_Checkup</option>
            <option>Sick_Visit</option>
          </select>
        </div>
      </div>
      
      <div className="form-group">
        <label>DOCTORS</label>
        <div className="select-wrapper">
          <select className="form-select" onChange={(e) => handelChange("doctor" ,e.target.value)}>
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
         <input type="time"  onChange={(e) => handelChange("startTime" ,e.target.value)}/>

        </div>
        
        <div className="form-group half">
          <label>END TIME</label>
          <input type="time"  onChange={(e) => handelChange("endTime" ,e.target.value)} />

        </div>
      </div>
      
      <div className='d-flex'> <button 
        className="submit-btn border-0 mx-auto p-2 bg-info text-white rounded-3 shadow"
        onClick={() => handelSubmit()}
      >
        MAKE NEW APPOINTMENT
      </button></div>
     
    </div>
  </div>
  )
}

export default BookingModel