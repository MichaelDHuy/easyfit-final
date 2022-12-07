import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import timeConvert from '../helpers/timeConvert';

import '../styles/css/AdminClass.css';

export default function AdminClass(props) {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  const alertPopup = (id) => {
    document.getElementById(id).setAttribute('class', 'visible');
    setTimeout(() => {
      document.getElementById(id).removeAttribute('class');
    }, 2000);
  };

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const formatDate = (dateStr) => { // "2022-12-15T14:30:00.000Z"
    const tempDate = dateStr.split(/[-T.]+/); // tempDate = ["2022", "12", "15", "14:30:00", "000Z"]
    return `${months[tempDate[1] - 1]} ${tempDate[2]}, ${tempDate[0]}`; // "December 15, 2022 - 14:30:00"
  };
  const formatTime = (dateStr) => {
    const tempDate = dateStr.split(/[-T.]+/);
    return timeConvert(tempDate[3]);
  };

  useEffect(() => {
    const cancelRegistration = async (student_id, class_id) => {
      if (window.confirm(`Are you sure you wish to cancel this student's registration? This will refund them ${props.classObj.credit_cost} credits.`)) {
        axios.delete(`/classes/${class_id}/register`, { params: {
          student_id: student_id
        }})
          .then(() => {
            axios.get(`/students/${student_id}`)
              .then(result => {
                axios.put(`/students/${student_id}`, null, { params: {
                  credits: result.data[0].credits + props.classObj.credit_cost
                }})
                  .then(() => navigate('/admin'))
                  .catch(e => console.log(e));
              })
              .catch(e => console.log(e));
          })
          .catch(e => console.log(e));
      }
    };

    axios.get(`/classes/${props.classObj.class_id}/students`)
    .then(result => setStudents(result.data.map((element, index) =>
      <li key={index} className="bubble">
        <h2>{element.first_name} {element.last_name}</h2>
        <div className='email'>
          <h4>Email: </h4>
          <input onClick={event => {navigator.clipboard.writeText(event.target.value); alertPopup(element.student_id);}} value={element.email} readOnly/>
          <p id={element.student_id} className="invisible">Copied ✓</p>
        </div>
        <h4 id="credits">Credits: {element.credits}</h4>
        <button onClick={() => cancelRegistration(element.student_id, props.classObj.class_id)}>Cancel Registration</button>
      </li>
    )))
    .catch(e => console.log(e));
  }, [props, navigate]); 
  
  return (
    <div className="adminclass">
      <h1>Showing students for: {props.classObj.name}</h1>
      <h3>Day: {formatDate(props.classObj.start_datetime)}</h3>
      <h3>Time: {formatTime(props.classObj.start_datetime)} - {formatTime(props.classObj.end_datetime)}</h3>
      {students.length > 0 && <ul className='students'>
        {students}
      </ul>}
      {students.length === 0 && <h2>There are no students registered in this class.</h2>}
    </div>  
  )
}
