import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import '../styles/css/Home.css';

export default function Home(props) {
  const [classTypeList, setClassTypeList] = useState([]);
  const navigate = useNavigate();

  // Axios call to server for list of class types
  useEffect(() => {
    axios.get('/classTypes')
      .then(result => setClassTypeList(result.data))
      .catch(e => {});
  }, []);

  const classTypes = classTypeList.map((element, index) => (
    <li key={index} className="bubble">
      <h1>{element.name}</h1>
      <h4>{element.description}</h4>
      <button onClick={() => {props.setClassTypeObj(element); navigate('/schedule');}}>View Schedule</button>
    </li>
  ))

  return (
    <div className="home">
      <h1 className="title">Pick a Class</h1>
      <ul>
        {classTypes}
      </ul>
    </div>
  );
};