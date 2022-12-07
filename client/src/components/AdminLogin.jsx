import React from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

import '../styles/css/AdminLogin.css';

export default function AdminLogin(props) {
  const navigate = useNavigate();

  const handleSubmit = async event => {
    event.preventDefault();
    
    axios.get('/admin')
      .then(result => {
        if (event.target[0].value === result.data) props.setAdmin(true);
        navigate('/admin');
      })
      .catch(e => console.log(e));
  };

  return (
    <div className="adminlogin">
      <form onSubmit={handleSubmit}>
        <div className="form__group field">
          <input id="password" name="password" type={"password"} placeholder="Admin Password:" className="form__field" required />
          <label htmlFor="password" className="form__label">Admin Password:</label><br/>
        </div>
        <button type={"submit"}>Submit</button>
      </form>
    </div>
  )
}