import React, { useState } from 'react';

import '../styles/css/EmailInput.css';

export default function EmailInput(props) {
  const [email, setEmail] = useState('');

  return (
    <div className='emailinput'>
      <article>
        <h4>Login</h4>
        <p>Please enter your email</p>
        <form action="http://localhost:3001/login" method="post" onSubmit={props.submitHandler}>
          <span> <i className="fa fa-envelope"></i> </span>
          <div className='form__group field'>
            <input id="email" name="email" placeholder="Email address" type="email" value={email} onChange={event => setEmail(event.target.value)} className='form__field' required />
            <label htmlFor='email' className='form__label'>Email address</label>
          </div>
          <button type='submit'>Submit</button>
          <p>Don't have an account? <a href="/register-account">Register</a> </p>
        </form>
      </article>
    </div>
  );
}
