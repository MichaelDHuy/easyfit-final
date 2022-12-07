import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import SelectCredits from './SelectCredits';
import Receipt from './Receipt';

import '../styles/css/Purchase.css';

export default function Purchase(props) {
  const [paymentDetails, setPaymentDetails] = useState("");

  return (
    <>
      <Routes>
        <Route path='/' element={<SelectCredits studentId={props.studentId} setPaymentDetails={setPaymentDetails}/>}/>
        <Route path='/success' element={<Receipt success={true} details={paymentDetails}/>}/>
        <Route path='/error' element={<Receipt success={false} details={paymentDetails}/>}/>
      </Routes>
    </>
  )
}
