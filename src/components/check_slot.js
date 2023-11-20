// components/CheckSlot.js
import React from 'react';

const checkSlotAvailability = (time, jobLength, date, availability) => {
  const timeString = '11:27:00';
  const [hours, minutes, seconds] = timeString.split(':').map(Number);

  // Calculate total hours
  const totalHours = hours + minutes / 60 + seconds / 3600;

  console.log("Availability data:", availability);

  // Functional Requirements
  const start = time - jobLength;
  const end = time + jobLength;
  const startbound = time - 1;
  const endbound = time + 1;
  let element_inside = 0;

  if (availability.indexOf(time) !== -1) {
    element_inside = 1;
  }

  if (!availability.some(item => item === time)) {
    return 'Full';
  } else if (element_inside === 1 && !availability.some(item => item === startbound) && !availability.some(item => item === endbound)) {
    return 'unavailable';
  } else if (!availability.some(item => item === end)) {
    return 'unavailable';
  } else {
    return 'available';
  }
};

export default checkSlotAvailability;
