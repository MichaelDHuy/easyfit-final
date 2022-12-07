import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import timeConvert from '../helpers/timeConvert';

import '../styles/css/Account.css';

export default function Account() {
  const [student, setStudent] = useState({});
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const cookies = new Cookies();

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const formatDate = (dateStr) => { // "2022-12-15T14:30:00.000Z"
      const tempDate = dateStr.split(/[-T.]+/); // tempDate = ["2022", "12", "15", "14:30:00", "000Z"]
      return `${months[tempDate[1] - 1]} ${tempDate[2]}, ${tempDate[0]}`; // "December 15, 2022"
    };
    const formatTime = (dateStr) => {
      const tempDate = dateStr.split(/[-T.]+/);
      return timeConvert(tempDate[3]);
    };

    const cancelRegistration = (class_id, credit_cost) => {
      if (window.confirm(`Are you sure you wish to cancel? This will refund you ${credit_cost} credits.`)) {
        axios.delete(`/classes/${class_id}/register`, { params: {
          student_id: cookies.get('loggedIn')
        }})
          .then(() => {
            axios.get(`/students/${cookies.get('loggedIn')}`)
              .then(result => {
                axios.put(`/students/${cookies.get('loggedIn')}`, null, { params: {
                  credits: result.data[0].credits + credit_cost
                }})
                  .then(() => window.location.reload(false))
                  .catch(e => console.log(e));
              })
              .catch(e => console.log(e));
          })
          .catch(e => console.log(e));
      }
    };

    axios.get(`/students/${cookies.get('loggedIn')}`)
      .then(result => setStudent(result.data[0]))
      .catch(e => {});
    axios.get(`/students/${cookies.get('loggedIn')}/classes`)
      .then(result => setClasses(result.data.map((element, index) => (
        <li key={index} className="bubble">
          <h2>{element.name}</h2>
          <h3>Day: {formatDate(element.start_datetime)}</h3>
          <h3>Time: {formatTime(element.start_datetime)} - {formatTime(element.end_datetime)}</h3>
          <h4>{element.description}</h4>
          <button disabled={element.difference.days < 1} onClick={() => cancelRegistration(element.class_id, element.credit_cost)}>Cancel Registration</button>
        </li>
      ))))
      .catch(e => {});
  }, []);

  return (
    <div className='account'>
      <h1 className='title'>Account</h1>
      <h2>Hello, {student.first_name}!</h2>
      <h3>You have {student.credits} credits</h3>
      {classes.length > 0 ? <ul>
        {classes}
      </ul> : <span>You aren't registered for any classes yet!</span>}
    </div>
  )
}
