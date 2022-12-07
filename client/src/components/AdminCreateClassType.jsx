import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import '../styles/css/AdminCreateClassType.css';

export default function AdminCreateClassType(props) {
  const navigate = useNavigate();

  const createClassType = event => {
    event.preventDefault();

    axios.post('/classTypes/create', null, { params: {
      name: event.target[0].value,
      description: event.target[1].value
    }})
      .then(() => navigate('/admin'))
      .catch(e => console.log(e));
  };

  return (
    <div className="admincreateclasstype">
      <h1>Create a new class type:</h1>
      <form onSubmit={createClassType}>
        <div className="form__group field">
          <input id="name" name="name" placeholder="Enter the name:" className="form__field" type={"text"} required />
          <label htmlFor="name" className="form__label">Enter the name:</label>
        </div>
        <div className="form__group field">
          <textarea id="description" name="description" placeholder="Enter the description:" className="form__field" required ></textarea>
          <label htmlFor="description" className="form__label">Enter the description:</label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}