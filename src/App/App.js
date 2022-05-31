import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from '../Navbar/Navbar';
import AllPosts from '../AllPosts/AllPosts';
import AllUpdates from '../AllUpdates/AllUpdates';
import Registration from '../Registration/Registration';
import Login from '../Login/Login';
import Map from '../Map/Map';
import Notification from '../Notification/Notification';
import AddPost from '../AddPost/AddPost';
import Profile from '../Profile/Profile';
import Meetings from '../Meetings/Meetings';
import AddMeeting from '../AddMeeting/AddMeeting';

function App() {

  const [notify, setNotify] = useState(false);
  const [notifyText, setNotifyText] = useState("");


  const returnNotify = (bool) => {
    return (bool) ? <Notification notifyText={notifyText} setNotify={setNotify}/>: '';
  }

  return (
    <div>

      <Router>  

        <Navbar setNotify={setNotify} setNotifyText={setNotifyText}/> 
        {returnNotify(notify)}  
        <Routes>
          <Route path='/' exact/>
          <Route path='/allPosts' element={<AllPosts/>} />
          <Route path='/subscriptionsPosts' component={AllPosts} />
          <Route path='/userPosts' component={AllPosts} />
          <Route path='/subscriptions' component={AllPosts} />
          <Route path='/addPost' element={<AddPost/>} />
          <Route path='/allUpdates' element={<AllUpdates/>} />
          <Route path='/map' element={<Map/>} />
          <Route path='/profile' element={<Profile/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/registration' element={<Registration/>} />
          <Route path='/meetings' element={<Meetings/>} />
          <Route path='/addMeeting' element={<AddMeeting/>} />
        </Routes>
        
      </Router>
      
    </div>
  );
}

export default App