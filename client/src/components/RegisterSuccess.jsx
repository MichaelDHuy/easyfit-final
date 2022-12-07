import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../styles/css/RegisterSuccess.css';

export default function RegisterSuccess(props) {
  const [display, setDisplay] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const formatDate = (dateStr) => { // "2022-12-15T14:30:00.000Z"
      const tempDate = dateStr.split(/[-T.]+/); // tempDate = ["2022", "12", "15", "14:30:00", "000Z"]
      return `${months[tempDate[1] - 1]} ${tempDate[2]}, ${tempDate[0]}`; // "December 15, 2022 - 14:30:00"
    };
    const formatTime = (dateStr) => {
      const tempDate = dateStr.split(/[-T.]+/);
      return `${tempDate[3].split(':').slice(0, 2).join(':')}${Number(tempDate[3].split(':')[0]) > 11 || Number(tempDate[3].split(':')[0]) === 24 ? "pm" : "am"}`;
    };

    axios.get(`/classes/${props.classId}`)
      .then(result => setDisplay(
        <>
          <h1>Register Success!</h1>
          <h3>Thank you for registering for {result.data[0].name}</h3>
          <h4>{formatDate(result.data[0].start_datetime)} @ {formatTime(result.data[0].start_datetime)} - {formatTime(result.data[0].end_datetime)}</h4>
          <span>Keep an eye out for the reminder email sent out one day before the class!</span>
          <button onClick={() => navigate('/account')}>View My Classes</button>
        </>
      ))
      .catch(e => console.log(e));
  }, [props.classId, navigate]);

  return (
    <div className="registersuccess">
      {display}
    </div>
  )
};
