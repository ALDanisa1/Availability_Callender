// components/AvailabilityTable.js

import React, { useState } from 'react';
import '../styling/Table.css'; // Import your CSS file

import CheckSlotAvailability from './check_slot';

const determineSlotTextAndClass = (slotResult, isSelected, isAdjacentSelected) => {
  switch (slotResult) {
    case 'Full':
      return { text: 'Full', className: 'full-slot' };
    case 'unavailable':
      return { text: 'Unavailable', className: 'unavailable-slot' };
    default:
      return { text: isSelected ? 'Selected' : (isAdjacentSelected ? 'Unavailable' : 'Available'), className: isSelected ? 'selected-slot' : 'available-slot' };
  }
};

const formatDate = (dateString) => {
  const options = { weekday: 'long', day: 'numeric' };
  const date = new Date(dateString);
  const day = date.getDate();
  const suffix = getDaySuffix(day);

  options.day = undefined;
  const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);

  return `${formattedDate} ${day}${suffix}`;
};

const getDaySuffix = (day) => {
  if (day >= 11 && day <= 13) {
    return 'th';
  }
  switch (day % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
};

const AvailabilityTable = ({ availabilityData, selectedTime  } ) => {
  const [selectedSlots, setSelectedSlots] = useState(new Set());

  const handleSlotClick = (day, hour) => {
    // Create a copy of the set to avoid mutating the state directly
    const newSelectedSlots = new Set(selectedSlots);

    // Toggle the clicked slot
    if (newSelectedSlots.has(`${day}-${hour}`)) {
      newSelectedSlots.delete(`${day}-${hour}`);
    } else {
      newSelectedSlots.add(`${day}-${hour}`);
    }

    // Update the state with the new set
    setSelectedSlots(newSelectedSlots);
  };

  const generateTableRows = () => {
    if (!availabilityData) {
      return null;
    }

    const days = Object.keys(availabilityData);
    const tableRows = [];

    const headerRow = [<th key="hour">Hour</th>];
    days.forEach((day) => {
      const formattedDate = formatDate(day);
      headerRow.push(<th key={day}>{formattedDate}</th>);
    });
    tableRows.push(<tr key="header">{headerRow}</tr>);

    for (let hour = 9; hour < 17; hour++) {
      const rowCells = [<td key={`hour-${hour}`}>{`${hour}-${hour + 1}`}</td>];

      days.forEach((day, index) => {
        const slotResult = CheckSlotAvailability(hour, selectedTime, day, availabilityData[day]);
        const isSelected = selectedSlots.has(`${day}-${hour}`);
        const isAboveSelected = index >= 0 && selectedSlots.has(`${day}-${hour - 1}`);
        const isBelowSelected = index < days.length - 1 && selectedSlots.has(`${day}-${hour + 1}`);
        const isAdjacentSelected = isAboveSelected || isBelowSelected;
        const { text, className } = determineSlotTextAndClass(slotResult, isSelected, isAdjacentSelected);

        // Add onClick directly to the <td> for available slots
        rowCells.push(
          <td
            key={`${day}-${hour}`}
            className={`${className} ${slotResult === 'available' ? 'clickable-cell' : ''}`}
            onClick={() => slotResult === 'available' && handleSlotClick(day, hour)}
          >
            {text}
          </td>
        );
      });

      tableRows.push(<tr key={`row-${hour}`}>{rowCells}</tr>);
    }

    return tableRows;
  };

  return (
    <table>
      <tbody>{generateTableRows()}</tbody>
    </table>
  );
};

export default AvailabilityTable;
