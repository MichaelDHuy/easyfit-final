import React, { useState } from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Cookies from 'universal-cookie';

import NavBar from './components/NavBar';
import Home from './components/Home';
import Schedule from './components/Schedule';
import Admin from './components/Admin';
import AdminLogin from './components/AdminLogin';
import Account from './components/Account';
import Login from './components/Login';
import RegisterAccount from './components/RegisterAccount';
import Purchase from './components/Purchase';

const App = () => {
  const [admin, setAdmin] = useState(false);
  const [classTypeObj, setClassTypeObj] = useState({});
  const cookies = new Cookies();

  const setCookieValue = (val) => {
    cookies.set('loggedIn', val, { path: "/" });
  };

  const logout = () => {
    cookies.remove('loggedIn', { path: "/" });
  };

  return (
    <>
      <Router>
      <NavBar loggedInId={cookies.get('loggedIn')} logout={logout} />
        <Routes>
          <Route path='/' element={<Home setClassTypeObj={setClassTypeObj}/>}/>
          <Route path='/schedule/*' element={<Schedule classTypeObj={classTypeObj} cookies={cookies}/>}/>
          <Route path='/account' element={cookies.get('loggedIn') ? <Account/> : <Navigate to='/login' replace={true}/>}/>
          <Route path='/admin/*' element={admin ? <Admin/> : <AdminLogin admin={admin} setAdmin={setAdmin}/>}/>
          <Route path='/login/*' element={<Login setCookieValue={setCookieValue}/>}/>
          <Route path='/purchase/*' element={cookies.get('loggedIn') ? <Purchase studentId={cookies.get('loggedIn')}/> : <Navigate to='/login' replace={true}/>}/>
          <Route path='/register-account' element={<RegisterAccount setCookieValue={setCookieValue}/>}/>
        </Routes>
      </Router>
    </>
  );
};

export default App;
