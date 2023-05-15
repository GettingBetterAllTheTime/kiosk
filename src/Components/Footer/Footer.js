import React, { useState, useEffect } from 'react';
import './Footer.css';

const Footer = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="Footer">
        <div>Ver 1.7.9</div>
        <div>{currentDate.toLocaleString()}</div>
      </div>
    </>
  );
};

export default Footer;