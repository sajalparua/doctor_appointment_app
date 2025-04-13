import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import BookingStrip from './BookingStrip';
import Swal from 'sweetalert2';
import MoreModel from './MoreModel';





const Calendar = ({selectedDate, setSelectedDate}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
 const {bookingAppointment , showMorePopUp, setShowMorePopup ,setBookingAppointment} = useContext(AppContext);
 const [moreData, setMoreData] = useState([]);

  // Get current month details
  const getCurrentMonthData = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    
    // First day of the month
    const firstDayOfMonth = new Date(year, month, 1);
    // Last day of the month
    const lastDayOfMonth = new Date(year, month + 1, 0);
    
    // Day of the week for the first day (0 = Sunday, 1 = Monday, etc.)
    const firstDayWeekday = firstDayOfMonth.getDay();
    // Total days in current month
    const daysInMonth = lastDayOfMonth.getDate();
    
    // Previous month details
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    
    return {
      year,
      month,
      firstDayWeekday,
      daysInMonth,
      daysInPrevMonth,
      prevMonth: new Date(year, month - 1, 1),
      nextMonth: new Date(year, month + 1, 1)
    };
  };

  // Handle month change
  const changeMonth = (increment) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + increment);
    setCurrentDate(newDate);
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const { 
      firstDayWeekday, 
      daysInMonth, 
      daysInPrevMonth,
      month,
      year
    } = getCurrentMonthData(currentDate);
    
    const days = [];
    
    // Add days from previous month
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
        fullDate: date
      });
    }
    
    // Add days from current month
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      days.push({
        day: i,
        month,
        year,
        isCurrentMonth: true,
        isToday: isSameDay(date, new Date()),
        fullDate: date
      });
    }
    
    // Add days from next month
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
        fullDate: date
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

  // Handle date selection
  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  // Safe function to get month name with validation
  const getMonthName = (monthIndex) => {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                         'July', 'August', 'September', 'October', 'November', 'December'];
    
    // Ensure the index is within valid range (0-11)
    const safeIndex = ((monthIndex % 12) + 12) % 12;
    return monthNames[safeIndex];
  };

  const days = generateCalendarDays();
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];


  const showMore = (e , filterData) => {
    e.stopPropagation();
    setShowMorePopup(true);
    setMoreData(filterData);
  }

  console.log(bookingAppointment);

  
  

  return (
    <div className="calendar">
      <div className="calendar-header">
    
        <h2 className="current-month">{getMonthName(currentDate.getMonth())} {currentDate.getFullYear()}</h2>
        <div className="nav-buttons">
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
      
      <div className="weekdays-header">
        {weekdays.map(day => (
          <div key={day} className="weekday">{day}</div>
        ))}
      </div>
      
      <div className="calendar-grid">
        {days.map((day, index) => {
          const isDateSelected = isSelected(day.fullDate);
          const filterData = bookingAppointment.filter((apt)=>apt.date.toString() ===day.fullDate.toString());
          console.log(filterData[0]);
          
          
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
              
                {filterData.length > 0 && 
                    <div className="apmon_overlay">
                        {
                            
                                <>
                               <BookingStrip setShowMorePopup  item={filterData?.[0]} index={0}/> 
                                </>
                                
                        }

                    {filterData.length > 1 &&  <div onClick={(e)=>showMore(e,filterData)} className="more_box">
                            +{filterData.length - 1}
                        </div>} 
                    
                 </div>}
            </button>
          );
        })}
      </div>
      
      

      {showMorePopUp && <MoreModel moreData={moreData} setShowMorePopup={setShowMorePopup}/>}
    </div>
  );
};

export default Calendar;


















// import React from 'react'

// const CalanderGride = () => {
//     const days = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
//     const hours = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '1:00', '1:30', '2:00', '2:30', '3:00', '3:30', '4:00'];
//     const appointments = [
//         { day: 0, startTime: '09:00', endTime: '09:30', title: 'DRUG TEST', type: 'examination' },
//         { day: 2, startTime: '09:30', endTime: '10:00', title: 'MALARIA REVIEW', type: 'consultation' },
//         { day: 0, startTime: '10:30', endTime: '11:30', title: 'HOW TO GET PREGNANT', type: 'consultation' },
//         { day: 5, startTime: '10:00', endTime: '10:30', title: 'COVID REFILLS', type: 'prescription' },
//         { day: 5, startTime: '02:00', endTime: '03:00', title: 'BREAST CANCER', type: 'consultation' },
//         { day: 4, startTime: '04:00', endTime: '04:30', title: 'LIVER X-RAY/ROUTINE CHECKUP', type: 'routine' },
//         { day: 6, startTime: '03:30', endTime: '04:00', title: 'URINE TEST', type: 'examination' }
//       ];

//       const getAppointmentTypeClass = (type) => {
//         switch(type) {
//           case 'emergency': return 'appointment-emergency';
//           case 'examination': return 'appointment-examination';
//           case 'consultation': return 'appointment-consultation';
//           case 'routine': return 'appointment-routine';
//           case 'prescription': return 'appointment-prescription';
//           default: return 'appointment-default';
//         }
//       }

//   return (
//     <div className="calendar-grid-container">
//     <div className="calendar-grid">
//       {days.map((day, index) => (
//         <div key={day} className="day-column">
//           <div className="day-header">{day}</div>
//           <div className="day-content">
//             {appointments
//               .filter(apt => apt.day === index)
//               .map((apt, i) => {
//                 const hourIndex = hours.indexOf(apt.startTime);
//                 const topPosition = hourIndex * 60;
                
//                 return (
//                   <div 
//                     key={i}
//                     className={`appointment-card ${getAppointmentTypeClass(apt.type)}`}
//                     style={{ 
//                       top: `${topPosition}px`,
//                       height: '40px'
//                     }}
//                   >
//                     <div className="appointment-content">
//                       <span className="appointment-title">{apt.title}</span>
//                       <span className="appointment-time">9:30</span>
//                     </div>
//                   </div>
//                 );
//               })}
//           </div>
//         </div>
//       ))}
//     </div>
//   </div>
//   )
// }

// export default CalanderGride




