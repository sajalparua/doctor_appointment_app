import React, { useContext } from 'react';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { LuAlarmClockCheck } from "react-icons/lu";
import { AppContext } from '../context/AppContext';

const BookingStrip = ({ item, index, setIsEdite }) => {
  // Extract necessary functions and state from AppContext
  const { handelDelete, isDoctor, setShowMorePopup } = useContext(AppContext);

  // Handle the deletion of an appointment
  const deleteHandler = (id) => {
    handelDelete(id); // Call the delete function from context
    setShowMorePopup(false); // Close the "More" popup after deletion
  };

  // Handle editing of an appointment
  const handelEdite = (item) => {
    setIsEdite(item); // Set the item to be edited
  };

  return (
    // Main container for the booking strip
    <div onClick={(e) => e.stopPropagation()} key={index} className={`appointment my-2 ${item.category}`}>
      {/* Display the category and start time of the appointment */}
      <section>{item.category}</section>
      <section>{item.startTime}</section>

      {/* Appointment content section */}
      <div className='appointment-content'>
        {/* SVG curve for visual styling */}
        <svg className='curve' xmlns="http://www.w3.org/2000/svg" width="100%" height="100" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polygon points="50,0 0,53 100,53" fill="white" stroke="none" />
          <path d="M50,0 L0,53 M50,0 L100,53" stroke="black" stroke-width="2" fill="none" />
        </svg>

        {/* Popup details for the appointment */}
        <div className={`detailspopup`}>
          {/* Header section of the popup */}
          <div className="popheader">
            <section className='d-flex'>
              {/* Display the first letter of the name as a logo */}
              <section className='name_logo'><span>{item.name?.[0]}</span></section>
              {/* Display the name and doctor details */}
              <section className='mx-2 text-left'>
                <section className='fs-6'>{item.name}</section>
                <span>{item.doctor}</span>
              </section>
            </section>

            {/* Edit and delete icons */}
            <div className="editesection d-flex">
              {/* Show edit icon only if the user is not a doctor */}
              {isDoctor ? "" : (
                <section onClick={() => handelEdite(item)} className='icons_wrap'>
                  <MdEdit />
                </section>
              )}
              {/* Delete icon */}
              <section onClick={() => deleteHandler(item.id)} className='icons_wrap'>
                <MdDelete />
              </section>
            </div>
          </div>

          {/* Footer section with time and category */}
          <div className='d-flex justify-content-between fs-6 py-1'>
            {/* Display the start time */}
            <section className='d-flex align-items-center'>
              <LuAlarmClockCheck />
              <span>{item.startTime}</span>
            </section>
            {/* Display the category with a colored dot */}
            <section className='d-flex align-items-center'>
              <section className={`doti ${item.category}`}></section>
              <span>{item.category}</span>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingStrip;