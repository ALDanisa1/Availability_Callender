import React, { useState } from 'react';

const TimeSlider = ({ onChange }) => {
  const [selectedTime, setSelectedTime] = useState(1); // Default selected time is 1 hour

  const handleSliderChange = (event) => {
    const newSelectedTime = parseInt(event.target.value, 10);
    setSelectedTime(newSelectedTime);
    onChange(newSelectedTime); 
  };

  return (
    <div>
      <label htmlFor="timeSlider">Select Job Duration (hours): {selectedTime}</label>
      <input
        type="range"
        id="timeSlider"
        min={1}
        max={5} 
        step={1}
        value={selectedTime}
        onChange={handleSliderChange}
      />
    </div>
  );
};

export default TimeSlider;
