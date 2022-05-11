import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from '../navbar/Navbar';
import AllPosts from '../AllPosts/AllPosts';
import AllUpdates from '../AllUpdates/AllUpdates';
import Registration from '../Registration/Registration';
import Login from '../Login/Login';

function App() {
  const [userRoles, ] = useState(null)
  const [userToken, setUserToken] = useState()

  const [login, setLogin] = useState(false);
  const [reg, setReg] = useState(false);

  const returnLogin = (bool) => {
    return (bool) ? <Login setUserToken={setUserToken}/> : '';
  }
  const returnRegistration = (bool) => {
    return (bool) ? <Registration setUserToken={setUserToken}/>: '';
  }

  return (
    <div>
      <Router>  
        <Navbar roles={userRoles} setLogin={setLogin} setReg={setReg}/> 
        {returnLogin()}
        {returnRegistration()}  
        <Routes>
          <Route path='/' exact />
          <Route path='/allPosts' element={<AllPosts/>} />
          <Route path='/subscriptionsPosts' component={AllPosts} />
          <Route path='/userPosts' component={AllPosts} />
          <Route path='/subscriptions' component={AllPosts} />
          <Route path='/addPost' component={AllPosts} />
          <Route path='/allUpdates' element={<AllUpdates/>} />
      </Routes>
        
      </Router>
      
    </div>
  );
}

export default App