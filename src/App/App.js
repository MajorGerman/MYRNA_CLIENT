import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from '../navbar/Navbar';
import AllPosts from '../AllPosts/AllPosts';
import AllUpdates from '../AllUpdates/AllUpdates';
import Registration from '../Registration/Registration';
import Login from '../Login/Login';
import Map from '../Map/Map';
import Notification from '../Notification/Notification';

function App() {

  const [userRoles, ] = useState(null)
  const [userToken, setUserToken] = useState()

  const [login, setLogin] = useState(false);
  const [reg, setReg] = useState(false);

  const [notify, setNotify] = useState(false);
  const [notifyText, setNotifyText] = useState("");

  const returnLogin = (bool) => {
    return (bool) ? <Login setLogin={setLogin} setUserToken={setUserToken}/> : '';
  }

  const returnRegistration = (bool) => {
    return (bool) ? <Registration setReg={setReg} setUserToken={setUserToken}/>: '';
  }

  const returnNotify = (bool) => {
    return (bool) ? <Notification notifyText={notifyText} setNotify={setNotify}/>: '';
  }

  return (
    <div>

      <Router>  

        <Navbar roles={userRoles} setLogin={setLogin} setReg={setReg} setNotify={setNotify} setNotifyText={setNotifyText}/> 
        {returnNotify(notify)}  
        {returnLogin(login)}
        {returnRegistration(reg)}
        <Routes>
          <Route path='/' exact />
          <Route path='/allPosts' element={<AllPosts/>} />
          <Route path='/subscriptionsPosts' component={AllPosts} />
          <Route path='/userPosts' component={AllPosts} />
          <Route path='/subscriptions' component={AllPosts} />
          <Route path='/addPost' component={AllPosts} />
          <Route path='/allUpdates' element={<AllUpdates/>} />
          <Route path='/map' element={<Map/>} />
        </Routes>
        
      </Router>
      
    </div>
  );
}

export default App