import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../styles/css/RegisterAccount.css';

export default function RegisterAccount(props) {
  const navigate = useNavigate();

  const submitHandler = event => {
    event.preventDefault();
    axios.post('/register', null, { params: {
      first_name: event.target[0].value,
      last_name: event.target[1].value,
      email: event.target[2].value
    }})
      .then(result => {
        props.setCookieValue(result.data.student_id);
        navigate('/');
        window.location.reload(false);
      })
      .catch(e => console.log(e));
  };

  return (
    <div className="registeraccount">
      <article>
        <h4>Create Account</h4>
        <p>Get started with your free account</p>
        <form onSubmit={submitHandler}>
          <div className='form__group field'>
            <input id="first_name" name="first_name" placeholder="First Name" type="text" className='form__field' required />
            <label htmlFor='first_name' className='form__label'>First Name</label>
          </div>
          <div className='form__group field'>
            <input id="last_name" name="last_name" placeholder="Last Name" type="text" className='form__field' required />
            <label htmlFor='last_name' className='form__label'>Last Name</label>
          </div>
          <div className='form__group field'>
            <input id="email" name="email" placeholder="Email address" type="email" className='form__field' required />
            <label htmlFor='email' className='form__label'>Email address</label>
          </div>
          <button type='submit'>Submit</button>
          <p>Already have an account? <a href="/login">Log In</a> </p>
        </form>
      </article>
    </div>
  );
}
