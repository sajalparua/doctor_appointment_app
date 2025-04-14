import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import BookingStrip from './BookingStrip';
import Swal from 'sweetalert2';
import MoreModel from './MoreModel';
import BookingModel from './BookingModel';

const Calendar = ({ selectedDate, setSelectedDate }) => {
  // State to manage the current date displayed in the calendar
  const [currentDate, setCurrentDate] = useState(new Date());

  // Context values for appointments, user type, and popup visibility
  const { bookingAppointment, isDoctor, showMorePopUp, setShowMorePopup } = useContext(AppContext);

  // State to manage data for the "More" popup and edit mode
  const [moreData, setMoreData] = useState([]);
  const [isEdite, setIsEdite] = useState(false);

  // Get details of the current month (e.g., days, first day, etc.)
  const getCurrentMonthData = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();

    // First and last days of the month
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    // Day of the week for the first day and total days in the month
    const firstDayWeekday = firstDayOfMonth.getDay();
    const daysInMonth = lastDayOfMonth.getDate();

    // Total days in the previous month
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    return {
      year,
      month,
      firstDayWeekday,
      daysInMonth,
      daysInPrevMonth,
      prevMonth: new Date(year, month - 1, 1),
      nextMonth: new Date(year, month + 1, 1),
    };
  };

  // Change the displayed month by incrementing or decrementing
  const changeMonth = (increment) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + increment);
    setCurrentDate(newDate);
  };

  // Generate all the days to be displayed in the calendar grid
  const generateCalendarDays = () => {
    const { firstDayWeekday, daysInMonth, daysInPrevMonth, month, year } = getCurrentMonthData(currentDate);
    const days = [];

    // Add days from the previous month
    for (let i = 0; i < firstDayWeekday; i++) {
      const day = daysInPrevMonth - firstDayWeekday + i + 1;
      const prevMonth = month === 0 ? 11 : month - 1;
      const prevYear = month === 0 ? year - 1 : year;
      const date = new Date(prevYear, prevMonth, day);
      days.push({
        day,
        month: prevMonth,
        year: prevYear,
        isCurrentMonth: false,
        isToday: isSameDay(date, new Date()),
        fullDate: date,
      });
    }

    // Add days from the current month
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      days.push({
        day: i,
        month,
        year,
        isCurrentMonth: true,
        isToday: isSameDay(date, new Date()),
        fullDate: date,
      });
    }

    // Add days from the next month
    const totalCells = Math.ceil((firstDayWeekday + daysInMonth) / 7) * 7;
    const daysFromNextMonth = totalCells - (firstDayWeekday + daysInMonth);

    for (let i = 1; i <= daysFromNextMonth; i++) {
      const nextMonth = month === 11 ? 0 : month + 1;
      const nextYear = month === 11 ? year + 1 : year;
      const date = new Date(nextYear, nextMonth, i);
      days.push({
        day: i,
        month: nextMonth,
        year: nextYear,
        isCurrentMonth: false,
        isToday: isSameDay(date, new Date()),
        fullDate: date,
      });
    }

    return days;
  };

  // Check if two dates are the same day
  const isSameDay = (date1, date2) => {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  };

  // Check if a date is selected
  const isSelected = (date) => {
    return selectedDate && isSameDay(date, selectedDate);
  };

  // Handle date selection (only for non-doctor users)
  const handleDateClick = (date) => {
    if (!isDoctor) {
      setSelectedDate(date);
    }
  };

  // Get the name of a month by its index
  const getMonthName = (monthIndex) => {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'];
    const safeIndex = ((monthIndex % 12) + 12) % 12; // Ensure valid index
    return monthNames[safeIndex];
  };

  // Show the "More" popup for additional appointments
  const showMore = (e, filterData) => {
    e.stopPropagation();
    setShowMorePopup(true);
    setMoreData(filterData);
  };

  const days = generateCalendarDays(); // Generate calendar days
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']; // Weekday labels

  return (
    <div className="calendar">
      {/* Calendar Header */}
      <div className="calendar-header">
        <h2 className="current-month">{getMonthName(currentDate.getMonth())} {currentDate.getFullYear()}</h2>
        <div className="nav-buttons">
          {/* Navigation buttons for previous and next months */}
          <button onClick={() => changeMonth(-1)} className="nav-button" aria-label="Previous month">
            <svg className="chevron" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button onClick={() => changeMonth(1)} className="nav-button" aria-label="Next month">
            <svg className="chevron" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>

      {/* Weekday Labels */}
      <div className="weekdays-header">
        {weekdays.map(day => (
          <div key={day} className="weekday">{day}</div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="calendar-grid">
        {days.map((day, index) => {
          const isDateSelected = isSelected(day.fullDate);
          const filterData = bookingAppointment.filter((apt) => apt.date.toString() === day.fullDate.toString());

          return (
            <button
              key={index}
              onClick={() => handleDateClick(day.fullDate)}
              className={`day-cell ${day.isCurrentMonth ? 'current-month' : 'other-month'} 
                         ${day.isToday ? 'today' : ''} 
                         ${isDateSelected ? 'selected' : ''}`}
            >
              <div className="date-content">
                <span className="day-number">{day.day}</span>
                {day.isToday && <span className="today-indicator"></span>}
                {!day.isCurrentMonth && (
                  <span className="month-label">
                    {getMonthName(day.month).substring(0, 3)}
                  </span>
                )}
              </div>

              {/* Appointment Overlay */}
              {filterData.length > 0 && 
                <div className="apmon_overlay">
                  <BookingStrip setIsEdite={setIsEdite} setShowMorePopup item={filterData?.[0]} index={0} />
                  {filterData.length > 1 && 
                    <div onClick={(e) => showMore(e, filterData)} className="more_box">
                      +{filterData.length - 1}
                    </div>
                  }
                </div>
              }
            </button>
          );
        })}
      </div>

      {/* More Popup */}
      {showMorePopUp && <MoreModel setIsEdite={setIsEdite} moreData={moreData} setShowMorePopup={setShowMorePopup} />}
      
      {/* Booking Modal */}
      {isEdite && <BookingModel selectedDate={selectedDate} setSelectedDate={setSelectedDate} isEdite={isEdite} setIsEdite={setIsEdite} />}
    </div>
  );
};

export default Calendar;





