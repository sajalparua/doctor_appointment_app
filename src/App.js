import React, { useContext, useEffect, useState } from 'react';
import './App.css';
import BookingModel from './component/BookingModel';
import Slider from './component/Slider';
import CalanderGride from './component/CalanderGride';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUserDoctor } from "react-icons/fa6";
import { CiUser } from "react-icons/ci";
import ToggleSwitch from './component/ToggleSwitch';
import { AppContext } from './context/AppContext';

// Icon components for various UI elements
const IconSearch = () => <span className="icon icon-search">🔍</span>;
const IconSun = () => <span className="icon">☀️</span>;
const IconMoon = () => <span className="icon">🌙</span>;
const IconChevronLeft = () => <span className="icon icon-chevron-left">◀</span>;

export default function App() {
  // State to manage the selected date in the calendar
  const [selectedDate, setSelectedDate] = useState(null);

  // State to manage the theme mode (light or dark)
  const [viewMode, setViewMode] = useState('light');

  // State to manage the calendar view (day, week, or month)
  const [calanderView, setCalanderView] = useState('month');

  // Context to determine if the user is a doctor or a patient
  const { isDoctor, SetIsDoctor } = useContext(AppContext);

  // Effect to toggle the dark mode class on the body element based on viewMode
  useEffect(() => {
    if (viewMode === 'dark') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [viewMode]);

  return (
    <div className="app-container">
      {/* Sidebar component */}
      <Slider />

      {/* Main Content */}
      <div className="main-content">
        {/* Header Section */}
        <header className="main-header">
          <div className="header-left">
            {/* Back button */}
            <button className="back-button">
              <IconChevronLeft />
            </button>

            {/* Search bar */}
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
            {/* Toggle switch to switch between doctor and patient */}
            <ToggleSwitch isDoctor={isDoctor} SetIsDoctor={SetIsDoctor} />

            {/* User profile section */}
            <div className="user-profile ms-3">
              <div className="avatar"></div>
              <div className="user-info">
                <div className="user-name">{isDoctor ? "Ola Boluwatife" : "carry combod"}</div>
                <div className="user-role">{isDoctor ? "DOCTOR" : "PATIENT"}</div>
              </div>
            </div>
          </div>
        </header>

        {/* Appointments Header */}
        <div className="appointments-header">
          <h2>Appointments</h2>

          {/* Theme toggle buttons */}
          <div className="theme-toggle">
            <button
              onClick={() => setViewMode("dark")}
              className={`theme-btn ${viewMode === 'dark' ? 'active' : ''}`}
            >
              <IconMoon />
            </button>
            <div className="divider"></div>
            <button
              onClick={() => setViewMode("light")}
              className={`theme-btn ${viewMode === 'light' ? 'active' : ''}`}
            >
              <IconSun />
            </button>
          </div>
        </div>

        {/* Calendar View Selector */}
        <div className="d-flex align-items-center justify-content-between px-3 calander-header">
          {/* <div className="view-selector">
            <button
              className={`view-btn ${calanderView === 'day' ? 'active' : ''}`}
              onClick={() => setCalanderView('day')}
            >
              DAY
            </button>
            <button
              className={`view-btn ${calanderView === 'week' ? 'active' : ''}`}
              onClick={() => setCalanderView('week')}
            >
              WEEK
            </button>
            <button
              className={`view-btn ${calanderView === 'month' ? 'active' : ''}`}
              onClick={() => setCalanderView('month')}
            >
              MONTH
            </button>
          </div> */}

          {/* Display selected date information */}
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
        <CalanderGride selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

        {/* Appointment Legend */}
        <div className="appointment-legend">
          {/* Legend items for different appointment types */}
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

      {/* Booking Modal for new appointments */}
      {selectedDate && (
        <BookingModel selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      )}
    </div>
  );
}