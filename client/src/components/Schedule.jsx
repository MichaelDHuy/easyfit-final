import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import ViewSchedule from './ViewSchedule';
import RegisterSuccess from './RegisterSuccess';

import '../styles/css/Schedule.css';

export default function Schedule(props) {
  const [classId, setClassId] = useState(null);

  return (
    <Routes>
      <Route path='/' element={<ViewSchedule classTypeObj={props.classTypeObj} setClassId={setClassId} cookies={props.cookies}/>}/>
      <Route path='/success' element={<RegisterSuccess classId={classId} cookies={props.cookies}/>}/>
    </Routes>
  )
};
