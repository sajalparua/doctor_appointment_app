import React, { useState } from 'react';
import './App.css';
import BookingModel from './component/BookingModel';
import Slider from './component/Slider';
import CalanderGride from './component/CalanderGride';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUserDoctor } from "react-icons/fa6";
import { CiUser } from "react-icons/ci";
import ToggleSwitch from './component/ToggleSwitch';



// For a production app, you'd want to use a proper icon library
// This is a simplified version for demo purposes

const IconSearch = () => <span className="icon icon-search">🔍</span>;
const IconSun = () => <span className="icon">☀️</span>;
const IconMoon = () => <span className="icon">🌙</span>;
const IconChevronLeft = () => <span className="icon icon-chevron-left">◀</span>;


export default function AppointmentScheduler() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [appointmentName, setAppointmentName] = useState('');
  const [dateRange, setDateRange] = useState('This week: October 10 - October 16');
  const [viewMode, setViewMode] = useState('week');
  const [isDoctor, SetIsDoctor] = useState(false);



 

;

  return (
    <div className="app-container ">
      {/* Sidebar */}
     <Slider/>
      
      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <header className="main-header">
          <div className="header-left">
            <button className="back-button">
              <IconChevronLeft />
            </button>
            <div className="search-container">
              <IconSearch />
              <input
                type="text"
                placeholder="Search pathology results"
                className="search-input"
              />
            </div>
          </div>
          
          <div className="header-right">
                  <ToggleSwitch isDoctor={isDoctor} SetIsDoctor={SetIsDoctor}/>
            <div className="user-profile ms-3">
              <div className="avatar"></div>
              <div className="user-info">
                <div className="user-name">{isDoctor?"Ola Boluwatife":"carry combod"}</div>
                <div className="user-role">{isDoctor?"DOCTOR":"PATIENT"}</div>
              </div>
            </div>
          </div>
        </header>
        
        {/* Appointments Header */}
        <div className="appointments-header">
          <h2>Appointments</h2>
          <div className="theme-toggle">
            <button className={`theme-btn ${viewMode === 'dark' ? 'active' : ''}`}>
              <IconMoon />
            </button>
            <div className="divider"></div>
            <button className={`theme-btn ${viewMode === 'light' ? 'active' : ''}`}>
              <IconSun />
            </button>
          </div>
        </div>
        
   
        
        {/* View Selector */}
        <div className="d-flex align-items-center justify-content-between px-3">
          <div className="view-selector">
          <button 
            className={`view-btn ${viewMode === 'day' ? 'active' : ''}`}
            onClick={() => setViewMode('day')}
          >
            DAY
          </button>
          <button 
            className={`view-btn ${viewMode === 'week' ? 'active' : ''}`}
            onClick={() => setViewMode('week')}
          >
            WEEK
          </button>
          <button 
            className={`view-btn ${viewMode === 'month' ? 'active' : ''}`}
            onClick={() => setViewMode('month')}
          >
            MONTH
          </button>
          </div>
         
          <div className="selected-date-info">
          {selectedDate && (
       
          <p>
            Selected: <span className="selected-date-text">{selectedDate.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</span>
          </p>
        
      )}
      </div>
        </div>
        
        
        {/* Calendar Grid */}
        <CalanderGride setSelectedDate={setSelectedDate}/>
        
        
        {/* Legend */}
        <div className="appointment-legend">
          <div className="legend-item">
            <div className="legend-color emergency"></div>
            <span>EMERGENCY</span>
          </div>
          <div className="legend-item">
            <div className="legend-color examination"></div>
            <span>EXAMINATION</span>
          </div>
          <div className="legend-item">
            <div className="legend-color consultation"></div>
            <span>CONSULTATION</span>
          </div>
          <div className="legend-item">
            <div className="legend-color routine"></div>
            <span>ROUTINE CHECKUP</span>
          </div>
          <div className="legend-item">
            <div className="legend-color sick-visit"></div>
            <span>SICK VISIT</span>
          </div>
        </div>
      </div>
      
      {/* New Appointment Modal */}
      {selectedDate && (
        <BookingModel selectedDate={selectedDate} setSelectedDate={setSelectedDate}  setAppointmentName={setAppointmentName} appointmentName={appointmentName}/>
      )}
      
     
    </div>
  );
}