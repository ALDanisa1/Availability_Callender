import React, { useState, useEffect } from 'react';
import CheckSlotAvailability from './components/check_slot';
import TimeSlider from './components/TimeSlider'; 
import AvailabilityTable from './components/AvailabilityTable';
import './styling/styles.css';
import './styling/Table.css';


const App = () => {
  const [availabilityData, setAvailabilityData] = useState(null);
  const[Available_slots, setSlots] = useState(null);
  const [selectedTime, setSelectedTime] = useState(1);
  const start = 9;
  const slot  = 1;
  const date = '2016-05-20';


  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("agvjk")
        const response = await fetch('/availability_slots.json');
        const data = await response.json();
        const filteredData = data[date];
        
        console.log("filtered data = ", filteredData)
       
        setSlots(data);
        
        setAvailabilityData(filteredData);
      } catch (error) {
        console.error('Error fetching availability data:', error);
      }
      
    };
    
    fetchData();
  }, []); // Empty dependency array ensures useEffect runs only once on mount
  const handleTimeChange = (newSelectedTime) => {
    setSelectedTime(newSelectedTime);
  };

  console.log("Adata == ",Available_slots);
  // Test cases
  const result1 = availabilityData ? CheckSlotAvailability(start, selectedTime, date, availabilityData) : 'Loading...';


  return (
    <div>
      <TimeSlider onChange={handleTimeChange} />
      <AvailabilityTable availabilityData={Available_slots} selectedTime={selectedTime} />
      <p>{selectedTime}</p>
      <p>Result 1: {result1}</p>
    </div>
  );
};

export default App;