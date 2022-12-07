import React from 'react';

import '../styles/css/Receipt.css';

export default function Receipt(props) {

  return (
    <div className="receipt">
      {props.success ? <><h1>Payment Successful!</h1><h4>Thank you for your payment, an email receipt will be sent to you shortly.</h4></> : <><h1>Oh no! That didn't work!</h1><h4>An error occurred while processing the payment</h4></>}
      <span>Details: {props.details.message}</span>
    </div>
  )
};
