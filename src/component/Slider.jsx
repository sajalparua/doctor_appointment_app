import React from 'react'
const IconCalendar = () => <span className="icon icon-calendar">📅</span>;
const IconUser = () => <span className="icon icon-user">👤</span>;
const IconFile = () => <span className="icon icon-file">📄</span>;
const IconChat = () => <span className="icon icon-chat">💬</span>;
const IconSettings = () => <span className="icon icon-settings">⚙️</span>;
const IconLogout = () => <span className="icon icon-logout">🚪</span>;
const IconPhone = () => <span className="icon icon-phone">📞</span>;

const Slider = () => {
  return (
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
  )
}

export default Slider