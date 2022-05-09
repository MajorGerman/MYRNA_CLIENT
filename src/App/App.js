import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from '../navbar/Navbar';
import AllPosts from '../AllPosts/AllPosts'

function App() {
  const [userRoles, ] = useState(null)

  return (
    <div>
      <h1>Go Fuck yourself</h1>
      <Router>
        <Navbar roles={userRoles}/>
        <Routes>
          <Route path='/' exact />
          <Route path='/allPosts' element={<AllPosts/>} />
          <Route path='/subscriptionsPosts' component={AllPosts} />
          <Route path='/userPosts' component={AllPosts} />
          <Route path='/subscriptions' component={AllPosts} />
          <Route path='/addPost' component={AllPosts} />
          <Route path='/login' component={AllPosts} />
          <Route path='/registration' component={AllPosts} />
      </Routes>
      </Router>
      
    </div>
  );
}

export default App