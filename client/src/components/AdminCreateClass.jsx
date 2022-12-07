import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import '../styles/css/AdminCreateClass.css';

export default function AdminCreateClass(props) {
  const [classTypes, setClassTypes] = useState(null);
  const navigate = useNavigate();

  const createClass = event => {
    event.preventDefault();

    axios.post('/classes/create', null, { params: {
      class_type_id: event.target[0].value,
      start_datetime: `${event.target[1].value}:00.000Z`,
      end_datetime: `${event.target[1].value.split('T')[0]}T${event.target[2].value}:00.000Z`,
      credit_cost: event.target[3].value,
      max_students: event.target[4].value
    }})
      .then(() => navigate('/admin'))
      .catch(e => console.log(e));
  };

  useEffect(() => {
    axios.get('/classTypes')
      .then(result => setClassTypes(result.data.map((element, index) => <option key={index} value={element.class_type_id}>{element.name}</option>)))
      .catch(e => {});
  }, []);

  return (
    <div className="admincreateclass">
      <h1>Create a new class:</h1>
      <form onSubmit={createClass}>
        <div className="form__group field">
          <select id="type" name="type" className="form__field" required >
            {classTypes}
          </select>
          <label htmlFor="type" className="form__label">Choose the type of class:</label>
        </div>
        <div className="form__group field">
          <input id="date" name="date" className="form__field" type={"datetime-local"} required />
          <label htmlFor="date" className="form__label">Select the date and starting time for the class:</label>
        </div>
        <div className="form__group field">
          <input id="time" name="time" className="form__field" type={"time"} required/>
          <label htmlFor="time" className="form__label">Enter the ending time for the class:</label>
        </div>
        <div className="form__group field">
          <input id="credit" name="credit" className="form__field" type={"number"} min={1} required />
          <label htmlFor="credit" className="form__label">Enter how many credits this class will cost:</label>
        </div>
        <div className="form__group field">
          <input id="student" name="student" className="form__field" type={"number"} min={1} required />
          <label htmlFor="student" className="form__label">Enter the maximum number of students this class can have:</label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}