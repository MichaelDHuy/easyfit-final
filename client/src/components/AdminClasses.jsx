import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import timeConvert from '../helpers/timeConvert';

import '../styles/css/Admin.css';

export default function Admin(props) {
  const [classLists, setClassLists] = useState([]);
  const navigate = useNavigate();

  //Axios call for the class
  useEffect(() => {
    const deleteClass = async (class_id, credit_cost) => {
      if (window.confirm(`Deleting this class will unregister all currently registered students and refund them ${credit_cost} credit(s). This cannot be undone, do you wish to continue?`)) {
        const students = await axios.get(`/classes/${class_id}/students`);
        students.data.forEach(async student => {
          await axios.put(`/students/${student.student_id}`, null, { params: {
            credits: student.credits + credit_cost
          }})
          await axios.delete(`/classes/${class_id}/register`, { params: {
            student_id: student.student_id
          }})
        });
        
        await axios.delete(`/classes/${class_id}`);
        navigate('/');
      }
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

    axios.get('/classes')
    .then(result => {
      setClassLists(result.data.map((element, index) => (
        <li key={index} className="bubble">
          <div className='title'>
            <h2>{element.name} -- {element.spots_remaining} spots left</h2>
            <i className="fa-solid fa-trash fa-xl" onClick={() => deleteClass(element.class_id, element.credit_cost)}></i>
          </div>
          <h3>Day: {formatDate(element.start_datetime)}</h3>
          <h3>Time: {formatTime(element.start_datetime)} - {formatTime(element.end_datetime)}</h3>
          <h4>{element.description}</h4>
          <Link to={'/admin/class/'}>
            <button onClick={() => props.setClassObj(element)}>View Student List</button>
          </Link>
          <h3 className="credits">Credits to Register: {element.credit_cost}</h3>
        </li>)));
    })
    .catch(e => console.log(e));
  }, [props, navigate]);

  return (
    <div className='admin'>
      <h1>ADMIN</h1>
      <div className='subtitle'>
        <h2>All Classes:</h2>
        <div>
          <Link to={'/admin/createclass'}>
            <button>Create a new class</button>
          </Link>
          <Link to={'/admin/createclasstype'}>
            <button>Create a new class type</button>
          </Link>
        </div>
      </div>
      <ul className='classList'>
        {classLists}
      </ul>
    </div>
  );
}
