import React, {useState} from 'react';

import StripeContainer from './StripeContainer';

import '../styles/css/SelectCredits.css';

export default function SelectCredits(props) {
  const [credits, setCredits] = useState(1);
  const [formIsShown, setFormIsShown] = useState(false);

  const handleChange = (event) => {
    setCredits(event.target.value);
  };
  
  let subtotal = (credits * 15.00).toFixed(2);

  return (
    <div className='selectcredits'>
      <div className='bubble'>
        <h3>Please select how many credits you would like to purchase</h3>
        <label htmlFor='credits'>Credits selected:</label>
        <input id='credits' name='credits' type='number' value={credits} onChange={handleChange} min={1} max={10} />
        <h3 className='subtotal'>Subtotal:</h3>
        <p className='subtotal'>${subtotal} CAD</p>
        {!formIsShown && <button onClick={() => setFormIsShown(true)}>Proceed</button>}
      </div>
      {formIsShown && <StripeContainer credits={credits} studentId={props.studentId} subtotal={subtotal} setPaymentDetails={props.setPaymentDetails}/>}
    </div>
  )
}
