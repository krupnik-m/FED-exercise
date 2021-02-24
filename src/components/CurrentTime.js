import React, { useEffect, useState } from 'react';
import moment from 'moment';

const CurrentTime = () => {
  const [time, setTime] = useState('-');

  const updateTime = () => {
    setTime(moment().format('HH:mm:ss'));
  };

  useEffect(() => {
    const handleTimer = setInterval(updateTime, 1000);
    return () => clearInterval(handleTimer);
  }, []);

  return <div>{time}</div>;
};

export default CurrentTime;
