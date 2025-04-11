import React, { useState } from 'react';
import './App.css';
import BookingModel from './component/BookingModel';

// For a production app, you'd want to use a proper icon library
// This is a simplified version for demo purposes
const IconCalendar = () => <span className="icon icon-calendar">📅</span>;
const IconUser = () => <span className="icon icon-user">👤</span>;
const IconFile = () => <span className="icon icon-file">📄</span>;
const IconChat = () => <span className="icon icon-chat">💬</span>;
const IconSettings = () => <span className="icon icon-settings">⚙️</span>;
const IconLogout = () => <span className="icon icon-logout">🚪</span>;
const IconPhone = () => <span className="icon icon-phone">📞</span>;
const IconSearch = () => <span className="icon icon-search">🔍</span>;
const IconSun = () => <span className="icon">☀️</span>;
const IconMoon = () => <span className="icon">🌙</span>;
const IconPlus = () => <span className="icon icon-plus">+</span>;
const IconChevronLeft = () => <span className="icon icon-chevron-left">◀</span>;
const IconChevronRight = () => <span className="icon icon-chevron-right">▶</span>;
const IconChevronDown = () => <span className="icon icon-chevron-down">▼</span>;


export default function AppointmentScheduler() {
  const [showModal, setShowModal] = useState(false);
  const [appointmentName, setAppointmentName] = useState('');
  const [dateRange, setDateRange] = useState('This week: October 10 - October 16');
  const [viewMode, setViewMode] = useState('week');

  const days = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
  const hours = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '1:00', '1:30', '2:00', '2:30', '3:00', '3:30', '4:00'];

  const appointments = [
    { day: 0, startTime: '09:00', endTime: '09:30', title: 'DRUG TEST', type: 'examination' },
    { day: 2, startTime: '09:30', endTime: '10:00', title: 'MALARIA REVIEW', type: 'consultation' },
    { day: 0, startTime: '10:30', endTime: '11:30', title: 'HOW TO GET PREGNANT', type: 'consultation' },
    { day: 5, startTime: '10:00', endTime: '10:30', title: 'COVID REFILLS', type: 'prescription' },
    { day: 5, startTime: '02:00', endTime: '03:00', title: 'BREAST CANCER', type: 'consultation' },
    { day: 4, startTime: '04:00', endTime: '04:30', title: 'LIVER X-RAY/ROUTINE CHECKUP', type: 'routine' },
    { day: 6, startTime: '03:30', endTime: '04:00', title: 'URINE TEST', type: 'examination' }
  ];

  const getAppointmentTypeClass = (type) => {
    switch(type) {
      case 'emergency': return 'appointment-emergency';
      case 'examination': return 'appointment-examination';
      case 'consultation': return 'appointment-consultation';
      case 'routine': return 'appointment-routine';
      case 'prescription': return 'appointment-prescription';
      default: return 'appointment-default';
    }
  };

  return (
    <div className="app-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo-container">
          <div className="logo">+</div>
          <h1 className="logo-text">Iwosan</h1>
        </div>
        
        <nav className="sidebar-nav">
          <div className="nav-item">
            <IconCalendar />
            <span>Overview</span>
          </div>
          
          <div className="nav-item active">
            <IconCalendar />
            <span>Appointments</span>
          </div>
          
          <div className="nav-item">
            <IconUser />
            <span>Doctors</span>
          </div>
          
          <div className="nav-item">
            <IconFile />
            <span>Pathology Results</span>
          </div>
          
          <div className="nav-item">
            <IconChat />
            <span>Chats</span>
            <span className="notification-badge">2</span>
          </div>
        </nav>
        
        <div className="account-section">
          <div className="section-title">ACCOUNT</div>
          
          <div className="nav-item">
            <IconSettings />
            <span>Settings</span>
          </div>
          
          <div className="nav-item logout">
            <IconLogout />
            <span>Logout</span>
          </div>
        </div>
        
        <div className="emergency-hotline">
          <div className="hotline-title">Emergency Hotlines:</div>
          <div className="hotline-number">
            <IconPhone />
            <span>234 123 456 7890</span>
          </div>
          <div className="hotline-number">
            <IconPhone />
            <span>234 901 234 56 7890</span>
          </div>
        </div>
      </div>
      
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
            <button className="menu-button">
              <span>•••</span>
            </button>
            <div className="user-profile">
              <div className="avatar"></div>
              <div className="user-info">
                <div className="user-name">Ola Boluwatife</div>
                <div className="user-role">PATIENT</div>
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
        
        {/* Calendar Controls */}
        <div className="calendar-controls">
          <div className="date-selector">
            <select 
              className="date-range-select"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option>{dateRange}</option>
            </select>
            <IconChevronDown />
          </div>
          
          <div className="month-navigation">
            <div className="month-display">OCTOBER</div>
            <button className="nav-btn">
              <IconChevronLeft />
            </button>
            <button className="nav-btn">
              <IconChevronRight />
            </button>
            <button className="add-btn">
              <IconPlus />
            </button>
          </div>
        </div>
        
        {/* View Selector */}
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
        
        {/* Calendar Grid */}
        <div className="calendar-grid-container">
          <div className="calendar-grid">
            {days.map((day, index) => (
              <div key={day} className="day-column">
                <div className="day-header">{day}</div>
                <div className="day-content">
                  {appointments
                    .filter(apt => apt.day === index)
                    .map((apt, i) => {
                      const hourIndex = hours.indexOf(apt.startTime);
                      const topPosition = hourIndex * 60;
                      
                      return (
                        <div 
                          key={i}
                          className={`appointment-card ${getAppointmentTypeClass(apt.type)}`}
                          style={{ 
                            top: `${topPosition}px`,
                            height: '40px'
                          }}
                        >
                          <div className="appointment-content">
                            <span className="appointment-title">{apt.title}</span>
                            <span className="appointment-time">9:30</span>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            ))}
          </div>
        </div>
        
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
      {showModal && (
        <BookingModel setShowModal={setShowModal}  setAppointmentName={setAppointmentName} appointmentName={appointmentName}/>
      )}
      
      {/* Add Appointment Button */}
      <button 
        className="book-btn"
        onClick={() => setShowModal(true)}
      >
        BOOK CONSULTATION
      </button>
    </div>
  );
}