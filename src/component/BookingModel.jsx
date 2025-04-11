
import React from 'react'
const IconClose = () => <span className="icon icon-close">✖</span>;
const IconChevronDown = () => <span className="icon icon-chevron-down">▼</span>;
const IconClock = () => <span className="icon icon-clock">🕒</span>;




const BookingModel = ({setShowModal , setAppointmentName ,appointmentName}) => {
  return (
    <div className="modal-overlay">
    <div className="modal">
      <div className="modal-header">
        <h3>MAKE NEW APPOINTMENT</h3>
        <button className="close-btn" onClick={() => setShowModal(false)}>
          <IconClose />
        </button>
      </div>
      
      <div className="form-group">
        <label>NAME</label>
        <input
          type="text"
          className="form-input"
          value={appointmentName}
          onChange={(e) => setAppointmentName(e.target.value)}
        />
      </div>
      
      <div className="form-group">
        <label>CATEGORIES</label>
        <div className="select-wrapper">
          <select className="form-select">
            <option>Select category</option>
            <option>Emergency</option>
            <option>Examination</option>
            <option>Consultation</option>
            <option>Routine Checkup</option>
            <option>Sick Visit</option>
          </select>
          <IconChevronDown />
        </div>
      </div>
      
      <div className="form-group">
        <label>DOCTORS</label>
        <div className="select-wrapper">
          <select className="form-select">
            <option>Select doctor</option>
          </select>
          <IconChevronDown />
        </div>
      </div>
      
      <div className="time-inputs">
        <div className="form-group half">
          <label>START TIME</label>
          <div className="time-select">
            <IconClock />
            <span>09:00</span>
            <IconChevronDown />
          </div>
        </div>
        
        <div className="form-group half">
          <label>END TIME</label>
          <div className="time-select">
            <IconClock />
            <span>09:30</span>
            <IconChevronDown />
          </div>
        </div>
      </div>
      
      <button 
        className="submit-btn"
        onClick={() => setShowModal(false)}
      >
        MAKE NEW APPOINTMENT
      </button>
    </div>
  </div>
  )
}

export default BookingModel