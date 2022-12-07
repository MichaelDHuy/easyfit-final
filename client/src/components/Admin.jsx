import React, { useState } from 'react';
import { Routes, Route } from "react-router-dom";

import AdminClasses from './AdminClasses';
import AdminClass from './AdminClass';
import AdminStudent from './AdminStudent';
import AdminCreateClass from './AdminCreateClass';
import AdminCreateClassType from './AdminCreateClassType';

import '../styles/css/Admin.css';

export default function Admin() {
  const [studentId, setStudentId] = useState(0);
  const [classObj, setClassObj] = useState({});

  return (
    <>
      <Routes>
        <Route path="/" element={<AdminClasses setClassObj={setClassObj}/>}/>
        <Route path="/class" element={<AdminClass studentId={studentId} setStudentId={setStudentId} classObj={classObj}/>}/>
        <Route path="/createclass" element={<AdminCreateClass/>}/>
        <Route path="/createclasstype" element={<AdminCreateClassType/>}/>
        <Route path="/student" element={<AdminStudent studentId={studentId}/>}/>
      </Routes>
    </>
  );
}
