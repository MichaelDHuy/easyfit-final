import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';

import EmailInput from './EmailInput';
import CodeInput from './CodeInput';

import '../styles/css/Login.css';

export default function Login(props) {
  const [code, setCode] = useState(null);
  const [email, setEmail] = useState(null);
  const [studentId, setStudentId] = useState(null);
  const navigate = useNavigate();

  const generateUniqueCode = () => {
    return Math.random().toString(36).slice(2, 8);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setEmail(event.target[0].value);
    const unique_code = generateUniqueCode(); // Generate unique code
    navigate('/login/code');

    axios.get(`/students/email/${event.target[0].value}`) // Pull student info
      .then(result => {
        sendCode(email, unique_code);
        setStudentId(result.data[0].student_id);
        axios.put(`/students/${result.data[0].student_id}`, null, { params: { // Update student unique_code
          unique_code
        }})
          .then(() => {
            axios.get(`/students/code/${result.data[0].student_id}`)
              .then(result3 => {
                setCode(result3.data[0].unique_code);
              })
              .catch(e => console.log(e));
          })
          .catch(e => console.log(e));
      })
      .catch(e => console.log(e));
  };

  const sendCode = async (email, unique_code) => {
    axios.get(`/students/send/${email}`, { 
      params: {
        unique_code
      }
    }).catch(e => console.log(e));
  };

  const compareCodes = (inputCode) => {
    if (code === inputCode) {
      props.setCookieValue(studentId);
      return true;
    }
    return false;
  };

  return (
    <>
      <Routes>
        <Route path='/' element={<EmailInput submitHandler={submitHandler}/>}/>
        <Route path='/code' element={code ? <CodeInput sendCode={() => sendCode(email, code)} compareCodes={compareCodes}/> : <EmailInput submitHandler={submitHandler}/>}/>
      </Routes>
    </>
  );
}
