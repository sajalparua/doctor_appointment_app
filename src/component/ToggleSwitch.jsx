import React, { useState } from 'react';

const ToggleSwitch = ({isDoctor,SetIsDoctor}) => {

  const toggle = () => SetIsDoctor(prev => !prev);

  return (
    <div className="toggle-container">
      <label className="switch">
        <input type="checkbox" checked={isDoctor} onChange={toggle} />
        <span className="slider">
          <span className="icons sun">🧑‍⚕️</span>
          <span className="icons moon">🧑</span>
        </span>
      </label>
    </div>
  );
};

export default ToggleSwitch;
