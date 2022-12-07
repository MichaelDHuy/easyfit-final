import React from 'react';
import { useNavigate } from 'react-router-dom';

import '../styles/css/CodeInput.css';

export default function CodeInput(props) {
  const navigate = useNavigate();

  const submitHandler = event => {
    event.preventDefault();
    props.compareCodes(event.target[0].value) ? navigate('/') : navigate('/login');
    window.location.reload(false);
  };

  return (
    <div className="codeinput">
      <article>
        <h2>Enter the code sent to your email:</h2>
        <form onSubmit={submitHandler}>
          <div className='form__group field'>
            <input id="code" name="code" type="password" placeholder='Type code here' className='form__field'/>
            <label htmlFor='code' className='form__label'>Type code here</label>
          </div>
          <button type='submit'>Submit</button>
        </form>
        <button onClick={props.sendCode}>Resend Code</button>
      </article>
    </div>
  );
}
