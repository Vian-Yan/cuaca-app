import React, { useState, useEffect } from 'react';

function DateTimeDisplay() {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = dateTime.toLocaleString();
  const formattedTime = dateTime.toLocaleTimeString();

  return (
    <div className="date-time-container">
      <h2 className="text-xl font-bold">Current Date and Time</h2>
      <p className="text-lg">{formattedDate}</p>
      <p className="text-lg">{formattedTime}</p>
    </div>
  );
}

export default DateTimeDisplay;
